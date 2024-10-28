import { getGameSession } from '../../session/game.session.js';
import { createResponse } from '../../utils/response/createResponse.js';
import { HANDLER_ID, RESPONSE_SUCCESS_CODE } from '../../constants/handlerIds.js';
import pools from '../../db/database.js';

const savePositionHandler = async ({ socket, userId, payload }) => {
  const { x, y } = payload;
  const gameSession = getGameSession();

  try {
    // 게임 세션에서 위치 업데이트
    gameSession.updateUserPosition(socket, x, y);

    // DB에 위치 저장
    const query = `
      INSERT INTO users (device_id, x, y) 
      VALUES (?, ?, ?)
      ON DUPLICATE KEY UPDATE x = VALUES(x), y = VALUES(y)
    `;

    await pools.USER_DB.query(query, [userId, x, y]);

    return createResponse({
      handlerId: HANDLER_ID.SAVE_POSITION,
      statusCode: RESPONSE_SUCCESS_CODE,
    });
  } catch (error) {
    console.error('위치 저장 중 오류 발생:', error);
    throw error;
  }
};

export default savePositionHandler;
