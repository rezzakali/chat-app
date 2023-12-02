import multer from 'multer';

// multer storage
const storage = multer.memoryStorage();

// limits
const limits = {
  fileSize: 1000000, // 1 MB
};

// file filter
const fileFilter = (req, file, cb) => {
  const allowedFileTypes = ['image/png', 'image/jpg', 'image/jpeg'];

  if (allowedFileTypes.includes(file.mimetype)) {
    // accept the file
    cb(null, true);
  } else {
    // reject the file
    cb(new Error('Unsupported file type!'), false);
  }
};

const upload = multer({ storage, limits, fileFilter });

export default upload;
