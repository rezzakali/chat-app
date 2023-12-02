import { validationResult } from 'express-validator';

const checkValidationResult = (req, res, next) => {
  // Check for validation errors
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

export default checkValidationResult;
