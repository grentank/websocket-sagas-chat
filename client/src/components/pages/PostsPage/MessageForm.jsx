import {
  Box, Button, Grid, Input,
} from '@mui/material';
import React, { useState } from 'react';

export default function MessageForm() {
  const [input, setInput] = useState('');
  const submitHandler = (e) => {
    e.preventDefault();
  };
  return (
    <Grid
      item
      xs={12}
      direction="col"
      justifyContent="center"
      alignItems="center"
    >
      <Box
        component="form"
        onSubmit={submitHandler}
        direction="row"
        justifyContent="center"
        alignItems="center"
        sx={{
          m: 3,
          flexDirection: 'row',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Input value={input} onChange={(e) => setInput(e.target.value)} name="message" sx={{ width: '60%' }} />
        <Button type="submit" variant="outlined" sx={{ marginLeft: 5 }}>Send</Button>
      </Box>
    </Grid>
  );
}
