import { getGameSession } from '../session/game.session.js';
import { removeUser } from '../session/user.session.js';
import pools from '../db/database.js';

export const onEnd = (socket) => async () => {
  console.log('클라이언트 연결이 종료되었습니다.');
  const gameSession = getGameSession();
  const user = gameSession.getUser(socket);

  if (user) {
    try {
      const connection = await pools.USER_DB.getConnection();
      try {
        await connection.query('UPDATE users SET x = ?, y = ? WHERE device_id = ?', [
          user.x,
          user.y,
          user.id,
        ]);
      } finally {
        connection.release();
      }
    } catch (error) {
      console.error('유저 위치 저장 중 오류 발생:', error);
    }
  }

  gameSession.removeUser(socket);
  removeUser(socket);
};
