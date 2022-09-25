import {
  Grid,
} from '@mui/material';
import React from 'react';
import MessageForm from './MessageForm';
import MessagesList from './MessagesList';
import UsersList from './UsersList';

export default function PostsPage() {
  return (
    <Grid container>
      <MessageForm />
      <UsersList />
      <MessagesList />
    </Grid>
  );
}
