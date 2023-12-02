import ErrorResponse from '../utility/error.js';

const errorHandler = (err, req, res, next) => {
  // ##################### default values ##########################
  let message = err.message || 'Internal server error!';
  let statusCode = err.statusCode || 500;

  // ############# check err is an instance of ErrorResponse ###########
  if (err instanceof ErrorResponse) {
    message = err.message;
    statusCode = err.statusCode;
  }

  // ################# mongoDB duplicate value error  ######################
  if (err.code === 11000) {
    message = `Duplicate value don't allowed!`;
    statusCode = 400; // Bad Request
  }

  // #################### mongoDB validationError ##########################
  if (err.name === 'ValidationError') {
    const messages = Object.values(err.errors).map((val) => val.message);
    message = messages.join(', ');
    statusCode = 400;
  }

  // ###################### finally return response ########################
  res.status(statusCode).json({ success: false, message });
};

export default errorHandler;
