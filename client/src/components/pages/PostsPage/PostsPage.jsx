import {
  Grid,
} from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getChatMessages } from '../../../redux/actions/chatActions';
import MessageForm from './MessageForm';
import MessagesList from './MessagesList';
import UsersList from './UsersList';

export default function PostsPage() {
  const user = useSelector((state) => state.authUser);
  const ws = useSelector((state) => state.ws);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user.id && ws) {
      // Диспатчим в слушатель Саги getUserMessages для получения актуальных сообщений
      dispatch(getChatMessages());
    }
  }, [user, ws]);
  return (
    <Grid container>
      <MessageForm />
      <UsersList />
      <MessagesList />
    </Grid>
  );
}
