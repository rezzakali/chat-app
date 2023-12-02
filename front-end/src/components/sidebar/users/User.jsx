import {
  Avatar,
  Card,
  List,
  ListItem,
  ListItemPrefix,
  Typography,
} from '@material-tailwind/react';
import moment from 'moment/moment';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedChat } from '../../../features/chat/chatSlice';
import { useGetUserQuery } from '../../../features/user/userApi';
import findRecipientId from '../../../utility/findRecipientId';
import isUserOnline from '../../../utility/isUserOnline';

const User = ({ chat }) => {
  const { user: loggedInUser } = useSelector((state) => state.auth);
  const { onlineUsers } = useSelector((state) => state.user);
  const [recepientId, setRecepientId] = useState(null);
  const [skip, setSkip] = useState(true);

  const dispatch = useDispatch();

  const {
    data: response,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetUserQuery(recepientId, { skip: skip });

  useEffect(() => {
    const id = findRecipientId(chat, loggedInUser?.id);
    if (id) {
      setRecepientId(id);
      setSkip(false);
    }
  }, [chat, loggedInUser?.id]);

  return (
    <Card
      className={`w-full overflow-y-scroll max-h-[470px] rounded-none shadow-none`}
    >
      <List className="py-1">
        <ListItem
          className="flex items-center justify-between px-2 rounded"
          onClick={() =>
            dispatch(setSelectedChat({ id: chat?._id, user: response?.user }))
          }
        >
          <div className="flex items-center">
            <ListItemPrefix className="relative">
              <Avatar
                variant="circular"
                alt="candice"
                src={response?.user?.profilePicture?.url}
                className="w-8 h-8"
              />
              {onlineUsers?.length > 0 &&
                isUserOnline(onlineUsers, response?.user?._id) && (
                  <div className="absolute top-0 right-0 w-2 h-2 rounded-full bg-green-400"></div>
                )}
            </ListItemPrefix>
            <div className="w-auto">
              <Typography variant="paragraph" color="blue-gray">
                {response?.user?.name}
              </Typography>
              <Typography
                variant="small"
                color="gray"
                className="font-normal text-ellipsis"
              >
                Latest messagess ssss
              </Typography>
            </div>
          </div>
          <div className="flex flex-col items-end  justify-between space-y-2">
            <div className="w-[17px] h-[17px] bg-green-400 flex items-center justify-center text-white rounded-full text-[13px]">
              5
            </div>
            <Typography className="text-[5px] bottom-0">
              {moment(new Date()).format('l')}
            </Typography>
          </div>
        </ListItem>
      </List>
    </Card>
  );
};

export default User;
