import {
  Box, Button, Grid, Input,
} from '@mui/material';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { sendChatMessage } from '../../../redux/actions/chatActions';

export default function MessageForm() {
  const [input, setInput] = useState('');
  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    // На отправку формы диспатчим в слушатель Саги userMessage новое сообщение
    dispatch(sendChatMessage({ message: input }));
    setInput('');
  };
  return (
    <Grid
      item
      xs={12}
      flexDirection="col"
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
