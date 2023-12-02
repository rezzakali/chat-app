const validatePassword = (password) => {
  if (password.length < 8) {
    return 'Password must be at least 8 characters long!';
  } else if (!/[a-z]/.test(password) || !/[A-Z]/.test(password)) {
    return 'Password must contain both uppercase and lowercase characters!';
  }
  return null; // Return null if password passes validation
};

export default validatePassword;
