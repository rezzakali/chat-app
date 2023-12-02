import { Schema, model } from 'mongoose';

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required!'],
      minLength: [3, 'Name must be atleast 3 characters long!'],
    },
    email: {
      type: String,
      required: [true, 'Email is required!'],
      unique: [true, 'Email must be unique'],
      trim: true,
      validate: {
        validator: (value) => {
          const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
          return emailRegex.test(value);
        },
        message: 'Enter a valid email address!',
      },
    },
    password: {
      type: String,
      required: [true, 'Enter your password!'],
      minLength: [8, 'Password must be 8 characters!'],
      trim: true,
    },
    profilePicture: {
      url: {
        type: String,
      },
      fileId: {
        type: String,
      },
    },
  },
  { timestamps: true }
);

const User = model('User', userSchema);

export default User;
