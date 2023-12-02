import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Login } from '../features/auth/authSlice';

const useAuthCheck = () => {
  const dispatch = useDispatch();
  const [authCheck, setAuthCheck] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');

    if (token && user) {
      const parsedToken = JSON.parse(token);
      const parsedUser = JSON.parse(user);
      dispatch(Login({ token: parsedToken, user: parsedUser }));
    }
    setAuthCheck(true);
  }, [dispatch, setAuthCheck]);

  return authCheck;
};

export default useAuthCheck;
