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
      await connection.beginTransaction();
      // 쿼리 실행
      const result = await connection.query('UPDATE users SET x = ?, y = ? WHERE device_id = ?', [
        user.x,
        user.y,
        user.id,
      ]);
      // 트랜잭션 커밋
      await connection.commit();
    } catch (connectionError) {
      console.error('데이터베이스 연결 중 오류 발생:', connectionError);
    }
  }

  gameSession.removeUser(socket);
  removeUser(socket);
};
