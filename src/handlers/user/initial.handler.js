import { addUser } from '../../session/user.session.js';
import { HANDLER_ID, RESPONSE_SUCCESS_CODE } from '../../constants/handlerIds.js';
import { createResponse } from '../../utils/response/createResponse.js';
import { handleError } from '../../utils/error/errorHandler.js';
import { getGameSession } from '../../session/game.session.js';
import { findUserByDeviceId, createUser } from '../../db/user/user.db.js';
const initialHandler = async ({ socket, userId, payload }) => {
  try {
    const { deviceId, latency, playerId } = payload;
    console.log(deviceId);
    let user = await findUserByDeviceId(deviceId);
    if (!user) {
      user = await createUser(deviceId);
    }
    user = addUser(socket, userId, playerId, latency);
    const gameSession = getGameSession();
    gameSession.addUser(user);
    // 유저 정보 응답 생성
    const initialResponse = createResponse(
      HANDLER_ID.INITIAL,
      RESPONSE_SUCCESS_CODE,
      { userId: user.id },
      deviceId,
    );

    // 소켓을 통해 클라이언트에게 응답 메시지 전송
    socket.write(initialResponse);
  } catch (error) {
    handleError(socket, error);
  }
};

export default initialHandler;
