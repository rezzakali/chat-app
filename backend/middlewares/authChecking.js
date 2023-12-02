import jwt from 'jsonwebtoken';
import ErrorResponse from '../utility/error.js';

const verifyToken = (req, res, next) => {
  try {
    const token = req.headers['x-access-token'];
    if (!token) {
      return next(
        new ErrorResponse('A token is require for authentication!', 403)
      );
    }
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    return next(new ErrorResponse(error.message || 'Not Authenticated!', 500));
  }
};
export default verifyToken;
