import {
  Grid, List, ListItem, ListItemButton, ListItemText, Paper,
} from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';

export default function UsersList() {
  const chatUsers = useSelector((state) => state.chatUsers);
  return (
    <Grid item xs={3}>
      <List>
        {chatUsers.map((user) => (
          <ListItem key={user.id}>
            <ListItemButton>
              <ListItemText primary={user.name}>{user.name}</ListItemText>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Grid>
  );
}
