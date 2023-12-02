import { Button, Input } from '@material-tailwind/react';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { AiOutlineSend } from 'react-icons/ai';
import { useSelector } from 'react-redux';
import { io } from 'socket.io-client';
import { useCreateMessageMutation } from '../../features/message/messageApi';
import findRecipientId from '../../utility/findRecipientId';

const socket = io('http://localhost:3000');

const SentMessageInput = () => {
  const [value, setValue] = useState('');

  const { selectedChat } = useSelector((state) => state.chat);
  const { user } = useSelector((state) => state.auth);

  const recepientId = findRecipientId(selectedChat, user?.id);

  const [
    createMessage,
    { data: response, isLoading, isSuccess, isError, error },
  ] = useCreateMessageMutation();

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (value === '') return;
    const data = {
      text: value,
      chatId: selectedChat?._id,
      senderId: user?.id,
    };
    createMessage(data);
  };

  useEffect(() => {
    if (isSuccess) {
      setValue('');
    }
    if (isError) {
      toast.error(error?.data?.message);
    }
  }, [isSuccess, isError, error, response]);

  useEffect(() => {
    if (socket === null) return;
    socket.emit('sendMessage', { ...value, recepientId });
  }, [socket]);

  return (
    <form
      onSubmit={handleSendMessage}
      className="w-full flex items-center justify-between gap-x-2 px-2"
    >
      <Input
        labelProps={{
          className: 'hidden',
        }}
        variant="static"
        placeholder="Type a text..."
        icon={<AiOutlineSend />}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        required
      />
      <Button type="submit" variant="outlined" size="sm" disabled={isLoading}>
        Send
      </Button>
    </form>
  );
};

export default SentMessageInput;
