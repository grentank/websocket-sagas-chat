const express = require('express');
const morgan = require('morgan');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const cors = require('cors');
//  Подключаем модуль http для настройки переключения на WS
const http = require('http');
// Забираем экземпляр WebSocketServer
const wss = require('./webSocket');

const authRouter = require('./routes/authRouter');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;
// Сюда будут сохраняться добавляющиеся подключения
// в виде пары ключ-значение
// Ключ - user.id, значение - объект с сокетом
app.locals.ws = new Map();

// Забираем sessionParser, чтобы его использовать далее
const sessionParser = session({
  name: 'sid_socket',
  secret: process.env.SESSION_SECRET ?? 'test',
  resave: true,
  store: new FileStore(),
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 12,
    httpOnly: true,
  },
});

app.use(cors({
  credentials: true,
  origin: true,
}));
app.use(morgan('dev'));
// вместо app.use(session({ ..... }))
app.use(sessionParser);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', authRouter);

// Создаём экземпляр http сервера
const server = http.createServer(app);

// Слушаем, когда придёт событие upgrade для создания WS-подключения
server.on('upgrade', (request, socket, head) => {
  console.log('Parsing session from request...');

  // Проверяем, авторизован ли пользователь по наличию сессии
  sessionParser(request, {}, () => {
    if (!request.session.user) {
      socket.write('HTTP/1.1 401 Unauthorized\r\n\r\n');
      socket.destroy();
      return;
    }

    console.log('Session is parsed!');
    // Апгрейдим соединение до WS, высылаем событие connection
    wss.handleUpgrade(request, socket, head, (ws) => {
      wss.emit('connection', ws, request, app.locals.ws);
    });
  });
});

// Запускаем сервер на порту PORT
server.listen(PORT, () => console.log(`Server has started on PORT ${PORT}`));
