import {
  Grid, List, ListItem, ListItemButton, ListItemText, Paper,
} from '@mui/material';
import React from 'react';

export default function MessagesList() {
  const messages = ['1u', '2u', '3u', '4u'];
  return (
    <Grid item xs={8} sx={{ marginLeft: 2 }}>
      <List>
        {messages.map((el) => (
          <Paper variant="outlined" elevation={20}>
            <ListItem>
              <ListItemButton>
                <ListItemText primary={el}>{el}</ListItemText>
              </ListItemButton>
            </ListItem>
          </Paper>
        ))}
      </List>
    </Grid>
  );
}
