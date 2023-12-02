import {
  Avatar,
  Dialog,
  DialogBody,
  Typography,
} from '@material-tailwind/react';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useGetMessagesQuery } from '../../features/message/messageApi';
import Message from './Message';
import SentMessageInput from './SentMessageInput';

const ChatBox = () => {
  const [open, setOpen] = useState(false);

  const { selectedChat, isChatSelect, selectedUser } = useSelector(
    (state) => state.chat
  );

  const {
    data: messages,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetMessagesQuery(selectedChat?._id);

  return (
    <React.Fragment>
      {!isChatSelect && (
        <div className="flex items-center justify-center mx-auto h-[550px] w-3/4 border">
          <Typography>Select a user to start conversation</Typography>
        </div>
      )}

      {isChatSelect && (
        <>
          <div className="w-3/4 hidden lg:block h-[470px]">
            <div className="w-full border h-[50px]">
              <div className="flex items-center h-10 px-1 bg-gray-200 rounded gap-x-3">
                <Avatar
                  variant="circular"
                  alt="candice"
                  src={selectedUser && selectedUser?.profilePicture?.url}
                  className="w-8 h-8 cursor-pointer"
                  onClick={() => setOpen(true)}
                />
                <Typography className="font-semibold capitalize">
                  {selectedUser?.name}
                </Typography>
              </div>
            </div>
            <div className={`h-[430px] my-2 border rounded overflow-y-scroll`}>
              {messages?.length === 0 && (
                <Typography className="text-center my-3">
                  No messages
                </Typography>
              )}

              {messages?.length !== 0 &&
                messages.map((message, index) => {
                  return <Message key={index} message={message} />;
                })}
            </div>
            <div className="w-full h-[65px] bottom-0 bg-gray-200 rounded">
              <SentMessageInput />
            </div>
          </div>
        </>
      )}
      {open && (
        <Dialog size="xs" open={open} handler={() => setOpen(false)}>
          <DialogBody>
            <img
              alt="nature"
              className="h-[18rem] w-full rounded-lg object-cover object-center"
              src={selectedUser?.profilePicture?.url}
            />
          </DialogBody>
        </Dialog>
      )}
    </React.Fragment>
  );
};

export default ChatBox;
