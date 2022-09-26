import { ADD_CHAT_MESSAGE, SET_CHAT_MESSAGES } from '../types';

const chatMessageReducer = (state = [], action) => {
  const { type, payload } = action;
  switch (type) {
    // Оба action-а приходят с WS бэкенда, их диспатчит эффект Саги emit()
    case ADD_CHAT_MESSAGE:
      return [payload, ...state];
    case SET_CHAT_MESSAGES:
      return payload;
    default:
      return state;
  }
};

export default chatMessageReducer;
