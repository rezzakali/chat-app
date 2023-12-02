import {
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Typography,
} from '@material-tailwind/react';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { useSelector } from 'react-redux';
import { io } from 'socket.io-client';

const socket = io('http://localhost:3000');

const Message = ({ message }) => {
  const [openMenu, setOpenMenu] = useState(false);
  const { selectedChat } = useSelector((state) => state.chat);
  // console.log(message);
  // console.log(selectedChat);

  const { user } = useSelector((state) => state.auth);

  const isSentByMe = message?.senderId === user?.id;

  useEffect(() => {
    if (socket === null) return;
    socket.on('getMessage', (res) => {
      console.log(res);
      // if(selectedChat?._id!==)
    });
    return () => {
      socket.off('getMessage');
    };
  }, [socket]);

  return (
    <div
      className={`p-2 flex items-start ${
        isSentByMe ? 'justify-end' : 'justify-start'
      }`}
    >
      {isSentByMe && (
        <Menu open={openMenu} handler={setOpenMenu}>
          <MenuHandler>
            <div className="bg-gray-300 rounded-full p-1 mr-1 cursor-pointer">
              <BsThreeDotsVertical className="w-3 h-3" />
            </div>
          </MenuHandler>
          <MenuList className="py-2">
            <MenuItem className="hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10 text-red-500">
              Delete
            </MenuItem>
          </MenuList>
        </Menu>
      )}
      <div>
        <div
          className={`mt-1 bg-gray-200 max-w-[300px] p-2 ${
            isSentByMe ? 'rounded-bl-lg' : 'rounded-br-lg'
          }  rounded-tr-lg rounded-tl-lg flex items-center justify-center`}
        >
          <Typography className="text-justify">{message?.text}</Typography>
        </div>
        <Typography className="text-[11px]">
          {moment(message.createdAt).format('lll')}
        </Typography>
      </div>
    </div>
  );
};

export default Message;
