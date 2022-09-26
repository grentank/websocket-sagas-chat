const { SET_WS, SOCKET_INIT } = require('../types');

// Устанавливает true/null в зависимости от состояния сокета
export const setWs = (ws) => ({
  type: SET_WS,
  payload: ws,
});

// Данный action слушает Сага initWebSocketWatcher
export const socketInit = () => ({ type: SOCKET_INIT });
