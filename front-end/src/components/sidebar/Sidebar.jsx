import { Typography } from '@material-tailwind/react';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useGetChatsQuery } from '../../features/chat/chatApi';
import { setChats } from '../../features/chat/chatSlice';
import SearchUser from './users/SearchUser';
import User from './users/User';

const Sidebar = () => {
  const { user: loggedInUser } = useSelector((state) => state.auth);

  const { chats } = useSelector((state) => state.chat);

  const {
    data: response,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetChatsQuery(loggedInUser?.id);

  const dispatch = useDispatch();

  useEffect(() => {
    if (isSuccess) {
      dispatch(setChats(response));
    }
  }, [response, isSuccess]);

  return (
    <div className="lg:w-1/4 sm:w-full">
      <SearchUser />
      {isLoading && <Typography>Loading...</Typography>}
      {!isLoading && isError && <Typography>{error?.data?.message}</Typography>}
      {!isLoading && !isError && chats?.length === 0 && (
        <Typography>No chats</Typography>
      )}
      {!isLoading &&
        !isError &&
        chats?.length !== 0 &&
        chats?.map((chat, index) => {
          return <User key={index} chat={chat} />;
        })}
    </div>
  );
};

export default Sidebar;
