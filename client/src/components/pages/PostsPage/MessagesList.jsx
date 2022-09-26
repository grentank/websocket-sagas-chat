import {
  Grid, List, ListItem, ListItemButton, ListItemText, Paper,
} from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';

export default function MessagesList() {
  const chatMessages = useSelector((state) => state.chatMessages);
  return (
    <Grid item xs={8} sx={{ marginLeft: 2 }}>
      <List>
        {chatMessages.map((el) => (
          <ListItem key={el.msId}>
            <ListItemButton>
              <ListItemText primary={el.message} secondary={el.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Grid>
  );
}
