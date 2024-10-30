import { getGameSession } from '../../session/game.session.js';

const locationUpdateHandler = async ({ socket, userId, payload }) => {
  const { x, y, deviceId } = payload;
  const gameSession = getGameSession();
  gameSession.updateUserPosition(socket, x, y);

  const response = gameSession.getAllLocation(socket);

  // 모든 유저에게 위치 업데이트 전송
  socket.write(response);
};

export default locationUpdateHandler;
