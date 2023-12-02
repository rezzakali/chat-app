import { Badge } from '@material-tailwind/react';
import React from 'react';
import { IoMdNotificationsOutline } from 'react-icons/io';
const Notifications = () => {
  return (
    <React.Fragment>
      <div className="cursor-pointer">
        <Badge content={1}>
          <IoMdNotificationsOutline className="w-5 h-5" />
        </Badge>
      </div>
    </React.Fragment>
  );
};

export default Notifications;
