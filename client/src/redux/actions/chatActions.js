import { GET_CHAT_MESSAGES, SET_CHAT_MESSAGE, SET_CHAT_USERS } from '../types';

// Данный action приходит с бэкенда, когда добавляется новый пользователь
// На фронте мы его не вызываем нигде (хотя могли бы)
export const setChatUsers = (payload) => ({
  type: SET_CHAT_USERS,
  payload,
});

// Этот action отрабатывает внутри useEffect и активирует в Саге getUserMessages
export const getChatMessages = () => ({
  type: GET_CHAT_MESSAGES,
});

// Этот action отрабатывает при отправке нового поста и активирует в Саге userMessage
export const sendChatMessage = (payload) => ({
  type: SET_CHAT_MESSAGE,
  payload,
});
