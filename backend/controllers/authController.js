import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import imagekit from '../config/imageKitConfig.js';
import checkValidationResult from '../middlewares/checkValidationResult.js';
import User from '../models/userModel.js';
import ErrorResponse from '../utility/error.js';
import upload from '../utility/imageUploader.js';
import uploadToImageKit from '../utility/uploadToImageKit.js';
import {
  validateEmail,
  validatePasswordChange,
  validateSignin,
  validateSignup,
} from '../utility/validations.js';

// ###################### SIGNUP CONTROLLER ########################
export const signUpController = [
  upload.single('file'),
  validateSignup,
  checkValidationResult,
  async (req, res, next) => {
    try {
      const { name, email, password } = req.body;

      // check if user already exists in the database
      const user = await User.findOne({ email });

      if (user) {
        return next(
          new ErrorResponse('User already exists with this email!', 403)
        );
      }

      const hashedPassword = bcrypt.hashSync(password, 10);

      if (!req.file) {
        return next(new ErrorResponse('Profile picture upload failed!', 400));
      }

      const folderPath = 'users';
      const imageUploadResponse = await uploadToImageKit(req.file, folderPath);

      const newUser = new User({
        name,
        email,
        password: hashedPassword,
        profilePicture: {
          url: imageUploadResponse?.url,
          fileId: imageUploadResponse.fileId,
        },
      });

      await newUser.save();

      return res
        .status(201)
        .json({ success: true, message: 'Sign up successfully!' });
    } catch (error) {
      return next(new ErrorResponse(error.message, 500));
    }
  },
];

// ####################### SIGN IN CONTROLLER #######################
export const signInController = [
  validateSignin,
  checkValidationResult,
  async (req, res, next) => {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email });

      if (!user) {
        return next(new ErrorResponse('Invalid credentials', 404));
      }

      const isValidPassword = await bcrypt.compare(password, user.password);

      if (!isValidPassword) {
        return next(new ErrorResponse('Invalid credentials', 400));
      }

      // generate token
      const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE_IN,
      });

      return res.status(201).json({
        success: true,
        message: 'Logged in successfully!',
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          profilePicture: user.profilePicture,
        },
      });
    } catch (error) {
      return next(new ErrorResponse(error.message, 500));
    }
  },
];

// ####################### CHANGE PASSWORD CONTROLLER #######################
export const changePassword = [
  validatePasswordChange,
  checkValidationResult,
  async (req, res, next) => {
    try {
      const { email, oldPassword, newPassword } = req.body;
      // find user by email
      let user = await User.findOne({ email });

      if (!user) {
        return next(new ErrorResponse('Invalid credentials!', 404));
      }

      // check the current password is currect or not
      const isValidPassword = await bcrypt.compare(oldPassword, user.password);

      if (!isValidPassword) {
        return next(new ErrorResponse('Incorrect old password', 401));
      }

      // hashing the new password
      const hashedPassword = await bcrypt.hash(newPassword, 10);

      // Update the user's password in the database
      user.password = hashedPassword;
      await user.save();

      return res
        .status(201)
        .json({ success: true, message: 'Password changed successfully!' });
    } catch (error) {
      return next(new ErrorResponse(error.message, 500));
    }
  },
];

// ################# CHANGE PROFILE PICTURE CONTROLLER ##################
export const changeProfile = [
  upload.single('file'),
  validateEmail,
  checkValidationResult,
  async (req, res, next) => {
    try {
      if (!req.file) {
        return next(new ErrorResponse('Profile picture is required!', 400));
      }

      const { email } = req.body;
      // find user by email
      let user = await User.findOne({ email });

      if (!user) {
        return next(new ErrorResponse('User not found!', 404));
      }

      if (user.profilePicture.fileId) {
        const { fileId } = user.profilePicture;
        imagekit.deleteFile(fileId, async (error, result) => {
          if (error) {
            return next(new ErrorResponse('Failed to update profile!', 500));
          }

          // Proceed to upload and update the user profile image after successful deletion
          const folderPath = 'users';
          const imageUploadResponse = await uploadToImageKit(
            req.file,
            folderPath
          );

          if (imageUploadResponse) {
            const { fileId, url } = imageUploadResponse;
            user.profilePicture.url = url;
            user.profilePicture.fileId = fileId;

            try {
              await user.save();
              return res.status(200).json({
                success: true,
                message: 'Profile picture changed succssfully!',
              });
            } catch (error) {
              return next(
                new ErrorResponse('Failed to update profile picture!', 500)
              );
            }
          } else {
            return next(
              new ErrorResponse('Failed to update profile picture!', 500)
            );
          }
        });
      } else {
        // If no fileId exists, simply upload the new image
        const folderPath = 'users';
        const imageUploadResponse = await uploadToImageKit(
          req.file,
          folderPath
        );
        if (imageUploadResponse) {
          const { fileId, url } = imageUploadResponse;
          user.profilePicture.url = url;
          user.profilePicture.fileId = fileId;

          try {
            await user.save();
            return res.status(200).json({
              success: true,
              message: 'Profile picture changed succssfully!',
            });
          } catch (error) {
            return next(
              new ErrorResponse('Failed to update profile picture!', 500)
            );
          }
        } else {
          return next(
            new ErrorResponse('Failed to update profile picture!', 500)
          );
        }
      }
    } catch (error) {
      return next(new ErrorResponse(error.message, 500));
    }
  },
];
