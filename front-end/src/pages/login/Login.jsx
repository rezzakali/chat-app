import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Input,
  Typography,
} from '@material-tailwind/react';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { IoEyeOffOutline, IoEyeOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import { useSigninMutation } from '../../features/auth/authApi';
import validatePassword from '../../utility/validatePassword';

const Login = () => {
  const [value, setValue] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const [signin, { data: response, isLoading, isSuccess, isError, error }] =
    useSigninMutation();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValue((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = value;
    if (!email) {
      toast.error('Email is required!');
    } else {
      const passwordError = validatePassword(password);
      if (passwordError) {
        toast.error(passwordError);
      }
      signin(value);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(response?.message);
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
          </CardBody>
          <CardFooter className="pt-0">
            <Button
              variant="gradient"
              type="submit"
              disabled={isLoading}
              fullWidth
            >
              {isLoading ? 'Loading...' : 'Sign In'}
            </Button>
            <Typography variant="small" className="mt-6 flex justify-center">
              Don&apos;t have an account?
              <Link
                to="/signup"
                variant="small"
                color="blue-gray"
                className="ml-1 font-bold"
              >
                Sign up
              </Link>
            </Typography>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default Login;
