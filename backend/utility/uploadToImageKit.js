import imagekit from '../config/imageKitConfig.js';

const uploadToImageKit = async (file, folderPath) => {
  try {
    const response = await imagekit.upload({
      file: file.buffer,
      fileName: file.originalname,
      useUniqueFileName: true,
      folder: folderPath,
    });

    return response;
  } catch (error) {
    throw new Error(`Image upload failed: ${error.message}`);
  }
};

export default uploadToImageKit;
