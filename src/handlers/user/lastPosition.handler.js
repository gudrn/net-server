import pools from '../../db/database.js';
import { createLastPositionPacket } from '../../utils/notification/game.notification.js';

const lastPositionHandler = async ({ socket, userId }) => {
  try {
    const connection = await pools.USER_DB.getConnection();

    try {
      const [rows] = await connection.query(
        'SELECT x, y FROM users WHERE device_id = ? ORDER BY created_at DESC LIMIT 1',
        [userId],
      );

      const position = rows[0] || { x: 0, y: 0 };

      const response = createLastPositionPacket(position);

      socket.write(response);
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error('마지막 위치 조회 중 오류 발생:', error);
    throw error;
  }
};

export default lastPositionHandler;
