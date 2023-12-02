import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import io from 'socket.io-client';
import ChatBox from '../../components/chat-box/ChatBox';
import Sidebar from '../../components/sidebar/Sidebar';
import { setOnlineUsers } from '../../features/user/userSlice';

// Socket.IO event listeners
const socket = io('http://localhost:3000');

const Home = () => {
  const { user } = useSelector((state) => state.auth);
  const [newSocket, setNewSocket] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    socket.on('connect', () => {
      console.log('Connected to server');
      setNewSocket(socket);
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from server');
    });

    // Additional event listeners and emitter functions based on your app's requirements
    // socket.emit('customEvent', data);

    return () => {
      // Clean up the socket connection when the component unmounts
      socket.disconnect();
    };
  }, [user]);

  useEffect(() => {
    if (newSocket === null) return;
    socket.emit('addNewUser', user?.id);
    socket.on('getOnlineUsers', (res) => {
      console.log('onlineUsers', res);
      dispatch(setOnlineUsers(res));
    });
  }, [newSocket]);

  return (
    <div className="p-3 flex items-start justify-start gap-x-2">
      <Sidebar />
      <ChatBox />
    </div>
  );
};

export default Home;
