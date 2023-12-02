import { Navbar, Typography } from '@material-tailwind/react';
import React from 'react';
import Profile from './ProfileMenu/Profile';
import Notifications from './notifications/Notifications';

const Navigation = () => {
  return (
    <Navbar className="sticky top-0 inset-0 z-50 max-w-full rounded-none shadow border-b p-3">
      <div className="flex items-center justify-between text-blue-gray-900 mx-2">
        <Typography variant="h6" className="mr-4 cursor-pointer py-1.5">
          Chat App
        </Typography>
        <div className="flex items-center gap-x-5">
          <Notifications />
          <Profile />
        </div>
      </div>
    </Navbar>
  );
};
export default Navigation;
