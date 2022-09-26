const { WebSocketServer } = require('ws');
const { Message, User } = require('../db/models');

// Создаём экземпляр ВебСокет сервера,
// clientTracking отвечает за то, где хранятся соединения (у нас в Map)
// noServer отвечает за то, будет ли создан новый сервер, или останется слушатель на том же порту
const wss = new WebSocketServer({ clientTracking: false, noServer: true });

// После установления соединения выполнится слушатель:
wss.on('connection', (ws, request, wsMap) => {
  // Заберём юзера из сессии и добавим в Map со всеми подключениями
  const { id, name } = request.session.user;
  wsMap.set(id, { ws, user: request.session.user });

  //   console.log('Map:', Array.from(wsMap.values()).map((el) => el.user));

  // После установки соединения выслать всем подписчикам о новом подписчике
  for (const [, wsClient] of wsMap) {
    wsClient.ws.send(JSON.stringify(
      { type: 'SET_CHAT_USERS', payload: Array.from(wsMap.values()).map((el) => el.user) },
    ));
  }

  // Добавляем слушатель события message
  ws.on('message', async (resData) => {
    // от клиента испускается событие message, ловится тут и достаются данные в resData
    const { type, payload } = JSON.parse(resData);

    // Клиенты будут высылать resData в виде Redux Action (объект с полями type, payload)
    switch (type) {
      // Данный кейс испускается, когда подписчик добавляет 1 сообщение
      case 'SET_CHAT_MESSAGE':
        const message = await Message.create({ authorId: id, body: payload.message });
        // Всем подписчикам данного сервера высылаем action с добавлением нового сообщения
        for (const [, wsClient] of wsMap) {
          wsClient.ws.send(JSON.stringify({
            type: 'ADD_CHAT_MESSAGE',
            payload: {
              name, id, message: message.body, msId: message.id,
            },
          }));
        }
        break;
        // Этот кейс запускается, когда подписчик хочет впервые подгрузить сообщения (из useEffect)
      case 'GET_CHAT_MESSAGES':
        const messages = await Message.findAll({ limit: 5, include: User });
        const data = JSON.parse(JSON.stringify(messages)).map((el) => ({
          name: el.User.name,
          id: el.User.id,
          message: el.body,
          msId: el.id,
        }));
        // Высылаем только этому подписчику action со списком сообщений
        ws.send(JSON.stringify({
          type: 'SET_CHAT_MESSAGES',
          payload: data,
        }));

        break;

      default:
        break;
    }
  });

  // В случае ошибки соединения, всем подписчикам сообщаем о новом списке юзеров
  ws.on('error', () => {
    wsMap.delete(id);
    for (const [, wsClient] of wsMap) {
      wsClient.ws.send(JSON.stringify(
        { type: 'SET_CHAT_USERS', payload: Array.from(wsMap.values()).map((el) => el.user) },
      ));
    }
  });

  // В случае закрытия соединения, всем подписчикам сообщаем о новом списке юзеров
  ws.on('close', () => {
    wsMap.delete(id);
    for (const [, wsClient] of wsMap) {
      wsClient.ws.send(JSON.stringify(
        { type: 'SET_CHAT_USERS', payload: Array.from(wsMap.values()).map((el) => el.user) },
      ));
    }
  });
});

module.exports = wss;
