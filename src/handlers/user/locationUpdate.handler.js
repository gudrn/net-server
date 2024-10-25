import { getGameSession } from '../../session/game.session.js';

const locationUpdateHandler = async ({ socket, userId, payload }) => {
  const { x, y } = payload;
  const gameSession = getGameSession();
  gameSession.updateUserPosition(socket, x, y);
  let user = gameSession.getUser(socket);
  console.log(user.x, user.y);
};

export default locationUpdateHandler;
