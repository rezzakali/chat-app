import {
  Avatar,
  Button,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Typography,
} from '@material-tailwind/react';
import React from 'react';
import { CiPower } from 'react-icons/ci';
import { FaRegUserCircle } from 'react-icons/fa';
import { HiOutlineCog6Tooth } from 'react-icons/hi2';
import { MdForwardToInbox } from 'react-icons/md';
import { useSelector } from 'react-redux';

// profile menu component
const profileMenuItems = [
  {
    label: 'My Profile',
    icon: FaRegUserCircle,
  },
  {
    label: 'Edit Profile',
    icon: HiOutlineCog6Tooth,
  },
  {
    label: 'Inbox',
    icon: MdForwardToInbox,
  },
  {
    label: 'Sign Out',
    icon: CiPower,
  },
];

const Profile = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { user } = useSelector((state) => state.auth);
  const { url } = user?.profilePicture;

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <Menu
      allowHover
      open={isMenuOpen}
      handler={setIsMenuOpen}
      placement="bottom-end"
    >
      <MenuHandler>
        <Button
          variant="text"
          color="blue-gray"
          className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto hover:bg-transparent"
        >
          <Avatar
            variant="circular"
            size="sm"
            alt="user"
            src={url}
            className="object-cover"
          />
        </Button>
      </MenuHandler>
      <MenuList className="p-1">
        {profileMenuItems.map(({ label, icon }, key) => {
          const isLastItem = key === profileMenuItems.length - 1;
          return (
            <MenuItem
              key={label}
              onClick={closeMenu}
              className={`flex items-center gap-2 rounded ${
                isLastItem
                  ? 'hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10'
                  : ''
              }`}
            >
              {React.createElement(icon, {
                className: `h-4 w-4 ${isLastItem ? 'text-red-500' : ''}`,
              })}
              <Typography
                as="span"
                variant="small"
                className="font-normal"
                color={isLastItem ? 'red' : 'inherit'}
              >
                {label}
              </Typography>
            </MenuItem>
          );
        })}
      </MenuList>
    </Menu>
  );
};

export default Profile;
