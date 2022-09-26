import { SET_CHAT_USERS } from '../types';

const chatUserReducer = (state = [], action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_CHAT_USERS: // Этот action приходит с WS бэкенда, его диспатчит эффект Саги emit()
      return payload;
    default:
      return state;
  }
};

export default chatUserReducer;
