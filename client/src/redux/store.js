import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import authReducer from './reducers/authReducer';
import chatMessageReducer from './reducers/chatMessagesReducer';
import chatUserReducer from './reducers/chatUsersReducer';
import pagesReducer from './reducers/pagesReducer';
import wsReducer from './reducers/wsReducer';
import rootSaga from './sagas/rootSaga';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    authUser: authReducer,
    pages: pagesReducer,
    chatUsers: chatUserReducer,
    chatMessages: chatMessageReducer,
    ws: wsReducer,
  },
  middleware: (defaultMiddlewares) => [...defaultMiddlewares(), sagaMiddleware],
});

sagaMiddleware.run(rootSaga);

export default store;
