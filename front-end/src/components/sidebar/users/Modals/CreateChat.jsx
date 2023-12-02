import {
  Avatar,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  List,
  ListItem,
  ListItemPrefix,
  Typography,
} from '@material-tailwind/react';
import React, { useEffect } from 'react';
import { IoMdClose } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';
import { useCreateChatMutation } from '../../../../features/chat/chatApi';
import { updateChats } from '../../../../features/chat/chatSlice';
import { useGetUsersQuery } from '../../../../features/user/userApi';
import isUserOnline from '../../../../utility/isUserOnline';

const CreateChat = ({ open, setOpen }) => {
  const { user: loggedInUser } = useSelector((state) => state.auth);

  const { onlineUsers } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const {
    data: users,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetUsersQuery();

  const [createChat, { data: response, isSuccess: isChatCreateSuccess }] =
    useCreateChatMutation();

  const handleCreateChat = (id) => {
    const data = {
      firstId: loggedInUser?.id,
      secondId: id,
    };
    createChat(data);
  };

  useEffect(() => {
    if (isChatCreateSuccess) {
      dispatch(updateChats(response));
      setOpen(false);
    }
  }, [isChatCreateSuccess]);

  return (
    <Dialog open={open} size="xs">
      <DialogHeader className="justify-between">
        <Typography variant="h6">Create a chat</Typography>
        <IoMdClose
          onClick={() => setOpen(false)}
          className="cursor-pointer h-5 w-5"
        />
      </DialogHeader>
      <DialogBody className="overflow-y-scroll max-h-[450px]">
        <List>
          {isLoading && <Typography>Loading...</Typography>}
          {!isLoading && isError && (
            <Typography>
              {error?.data?.message || 'Something went wrong!'}
            </Typography>
          )}
          {users?.users?.length === 0 && <Typography>No users</Typography>}

          {!isLoading &&
            !isError &&
            users?.users?.length !== 0 &&
            users.users
              .filter(
                (user) => user._id.toString() !== loggedInUser?.id.toString()
              )
              .map((user, index) => {
                const { profilePicture, name, _id } = user;
                return (
                  <ListItem
                    key={index}
                    className="flex items-center justify-between px-2 rounded"
                    onClick={() => handleCreateChat(_id)}
                  >
                    <div className="flex items-center">
                      <ListItemPrefix className="relative">
                        <Avatar
                          variant="circular"
                          alt="candice"
                          src={profilePicture?.url}
                          className="w-8 h-8"
                        />{' '}
                        {onlineUsers?.length !== 0 &&
                          isUserOnline(onlineUsers, _id) && (
                            <div className="absolute top-0 right-0 w-2 h-2 rounded-full bg-green-400"></div>
                          )}
                      </ListItemPrefix>
                      <Typography
                        variant="paragraph"
                        color="blue-gray"
                        className="font-semibold"
                      >
                        {name}
                      </Typography>
                    </div>
                  </ListItem>
                );
              })}
        </List>
      </DialogBody>
      <DialogFooter></DialogFooter>
    </Dialog>
  );
};

export default CreateChat;
