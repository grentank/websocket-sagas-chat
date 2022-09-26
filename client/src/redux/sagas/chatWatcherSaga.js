import {
  take, put, call, fork, takeEvery,
} from 'redux-saga/effects';
import { eventChannel, END } from 'redux-saga';
import {
  GET_CHAT_MESSAGES, SET_CHAT_MESSAGE, SET_WS, SOCKET_INIT,
} from '../types';

// Слушатель событий сокета
function createSocketChannel(socket, action) {
  return eventChannel((emit) => {
    // При открытии канала сокета устанавливаем в Redux состояние сокета на true
    socket.onopen = () => {
      console.log('action --->', action);
      emit({ type: SET_WS, payload: true });
    };

    // При ошибке устанавливаем в Redux состояние сокета на null
    socket.onerror = function (error) {
      emit({ type: SET_WS, payload: null });
    };

    // При приёме сообщения диспатчим в Redux сообщение с бэкенда (который высылает готовый action)
    socket.onmessage = function (event) {
      console.log('message --->>', JSON.parse(event.data));
      emit(JSON.parse(event.data));
    };

    // При закрытии устанавливаем в Redux состояние сокета на null
    socket.onclose = function (event) {
      emit({ type: SET_WS, payload: null });
    };

    // При закрытии совершаем отписку
    return () => {
      console.log('Socket off');
      emit(END);
    };
  });
}

// Создаём вебсокет, когда был запущен SOCKET_INIT
function createWebSocketConnection() {
  return new WebSocket(process.env.REACT_APP_WSURL);
}

// Когда был dispatch на добавление нового поста, высылаем данный action
// серверу, с которым настроено ws соединение
function* userMessage(socket) {
  while (true) {
    const message = yield take(SET_CHAT_MESSAGE);
    console.log('mess---->>', message);
    socket.send(JSON.stringify(message));
  }
}

// Когда был dispatch на получение постов из useEffect, высылаем данный action
// серверу, с которым настроено ws соединение
function* getUserMessages(socket) {
  while (true) {
    const message = yield take(GET_CHAT_MESSAGES);
    socket.send(JSON.stringify(message));
  }
}

function* chatWorker(action) {
  // Создаёт WS на клиенте
  const socket = yield call(createWebSocketConnection);
  // Создаёт канал пересылки сообщений
  const socketChannel = yield call(createSocketChannel, socket, action);

  // Запускает слушатели диспатча по добавлению поста или получению всех постов
  // чтобы эти данные передать в socket
  yield fork(userMessage, socket);
  yield fork(getUserMessages, socket);

  // Поддерживаем канал событий активным, слушающим наш сокет
  while (true) {
    try {
      const backAction = yield take(socketChannel);
      yield put(backAction);
    } catch (err) {
      console.error('socket error:', err);
    }
  }
}

// Слушатель, когда будет диспатч инициализации WS
export default function* initWebSocketWatcher() {
  // Запускается worker
  yield takeEvery(SOCKET_INIT, chatWorker);
}
