const isUserOnline = (onlineUsers, userId) => {
  return onlineUsers.some(
    (user) => user?.userId?.toString() === userId?.toString()
  );
};

export default isUserOnline;
