import { getGameSession } from '../../session/game.session.js';
import { getProtoMessages } from '../../init/loadProtos.js';
import { createResponse } from '../../utils/response/createResponse.js';
import { HANDLER_ID, RESPONSE_SUCCESS_CODE } from '../../constants/handlerIds.js';
import { config } from '../../config/config.js';
import { PACKET_TYPE } from '../../constants/header.js';

const locationUpdateHandler = async ({ socket, userId, payload }) => {
  const { x, y, deviceId } = payload;
  const gameSession = getGameSession();
  gameSession.updateUserPosition(socket, x, y);

  const response = gameSession.getAllLocation(socket);

  // 모든 유저에게 위치 업데이트 전송
  socket.write(response);
};

export default locationUpdateHandler;
