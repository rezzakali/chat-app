import React, { Fragment } from 'react';
import { Toaster } from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import Navigation from './components/navbar/Navbar';
import useAuthCheck from './hooks/useAuthCheck';
import NotFound from './pages/Not-Found';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import PrivateRoute from './protect_route/PrivateRoute';
import PublicRoute from './protect_route/PublicRoute';

const App = () => {
  const isAuth = useAuthCheck();
  const { token, user } = useSelector((state) => state.auth);

  return (
    <Fragment>
      {token && user && user?.id && <Navigation />}
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path="/signin"
          element={
            <PublicRoute>
              {' '}
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            zIndex: 9999,
          },
        }}
      />
    </Fragment>
  );
};

export default App;
