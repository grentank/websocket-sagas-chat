import { Box, Typography } from '@mui/material';
import React from 'react';

export default function HomePage() {
  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    }}
    >
      <Typography>
        Websocket Lecture: constructing chat
      </Typography>
    </Box>
  );
}
