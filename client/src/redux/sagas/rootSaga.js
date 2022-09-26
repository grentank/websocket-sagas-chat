import { all } from 'redux-saga/effects';
import initWebSocketWatcher from './chatWatcherSaga';

// Сюда можно добавить много Саг, все добавить в массив
export default function* rootSaga() {
  yield all([
    initWebSocketWatcher(),
  ]);
}
