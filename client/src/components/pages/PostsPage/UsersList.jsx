import {
  Grid, List, ListItem, ListItemButton, ListItemText, Paper,
} from '@mui/material';
import React from 'react';

export default function UsersList() {
  const users = ['1', '2', '3', '4'];
  return (
    <Grid item xs={3}>
      <Paper variant="outlined" elevation={20}>
        <List>
          {users.map((el) => (
            <ListItem>
              <ListItemButton>
                <ListItemText primary={el}>{el}</ListItemText>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Paper>
    </Grid>
  );
}
