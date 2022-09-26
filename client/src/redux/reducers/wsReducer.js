const { SET_WS } = require('../types');

// Хранит либо true, либо null -- в зависимости от состояния сокета
const wsReducer = (state = null, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_WS:
      return payload;
    default:
      return state;
  }
};

export default wsReducer;
