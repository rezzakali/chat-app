import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardFooter,
  Input,
  Typography,
} from '@material-tailwind/react';
import { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { IoEyeOffOutline, IoEyeOutline } from 'react-icons/io5';
import { MdOutlineCloudUpload } from 'react-icons/md';
import { Link, Navigate } from 'react-router-dom';
import { useSignupMutation } from '../../features/auth/authApi';
import validatePassword from '../../utility/validatePassword';

const Register = () => {
  const [value, setValue] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [file, setFile] = useState(null);

  const [signup, { data: response, isLoading, isSuccess, isError, error }] =
    useSignupMutation();

  const inputFile = useRef(null);

  const handleUploadClick = () => {
    inputFile.current.click();
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const allowedFileTypes = ['image/jpg', 'image/jpeg', 'image/png'];
    if (file && file.size <= 1048576) {
      if (allowedFileTypes.includes(file.type)) {
        setFile(file);
      } else {
        toast.error('Only jpg, jpeg , png file allowed!');
      }
    } else {
      toast.error('File size exceeds 1MB');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValue((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, password } = value;

    if (!name || !email) {
      toast.error('Empty fields required!');
    } else {
      const passwordError = validatePassword(password);
      if (passwordError) {
        toast.error(passwordError);
      } else {
        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('password', password);
        formData.append('file', file);
        signup(formData);
      }
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(response?.message);
      <Navigate to={'/signin'} />;
    }
    if (isError) {
      toast.error(error?.data?.message);
    }
  }, [response, isSuccess, isError, error]);

  return (
    <div className="flex items-center justify-center h-screen">
      <Card className="w-96">
        <form onSubmit={handleSubmit}>
          <CardBody className="flex flex-col gap-4">
            <Input
              label="Name"
              size="md"
              type="name"
              value={value.name}
              onChange={handleInputChange}
              name="name"
              required
            />
            <Input
              label="Email"
              size="md"
              type="email"
              value={value.email}
              onChange={handleInputChange}
              name="email"
              required
            />
            <Input
              label="Password"
              size="md"
              type={showPassword ? 'text' : 'password'}
              value={value.password}
              name="password"
              onChange={handleInputChange}
              required
              icon={
                showPassword ? (
                  <IoEyeOutline
                    onClick={() => setShowPassword(!showPassword)}
                    className="cursor-pointer"
                  />
                ) : (
                  <IoEyeOffOutline
                    onClick={() => setShowPassword(!showPassword)}
                    className="cursor-pointer"
                  />
                )
              }
            />
            <div className="flex items-center gap-2">
              <Button
                size="md"
                variant="gradient"
                className="flex items-center gap-3 w-full"
                onClick={handleUploadClick}
              >
                <MdOutlineCloudUpload />
                Upload Files
              </Button>
              <input
                type="file"
                style={{ display: 'none' }}
                ref={inputFile}
                onChange={handleFileUpload}
                accept="image/jpg image/jpeg image/png"
              />
              {file && (
                <Avatar
                  size="md"
                  src={file && URL.createObjectURL(file)}
                  alt="avatar"
                  className="object-cover"
                />
              )}
            </div>
          </CardBody>
          <CardFooter className="pt-0">
            <Button
              variant="gradient"
              type="submit"
              disabled={isLoading}
              fullWidth
            >
              {isLoading ? 'Loading...' : '  Sign Up'}
            </Button>
            <Typography variant="small" className="mt-6 flex justify-center">
              Already have an account!
              <Link
                to="/signin"
                variant="small"
                color="blue-gray"
                className="ml-1 font-bold"
              >
                Sign In
              </Link>
            </Typography>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default Register;
