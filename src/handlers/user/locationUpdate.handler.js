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

  const protoMessages = getProtoMessages();
  const allUsers = gameSession.getUsers();
  const LocationUpdate = protoMessages.gameNotification.LocationUpdate;
  const userLocation = LocationUpdate.create({
    users: allUsers
      .filter((user) => user.socket !== socket)
      .map((user) => ({
        id: user.id,
        playId: user.playerId,
        x: user.x,
        y: user.y,
      })),
  });

  const buffer = LocationUpdate.encode(userLocation).finish();
  const packetLength = Buffer.alloc(config.packet.totalLength);
  packetLength.writeUInt32BE(
    buffer.length + config.packet.totalLength + config.packet.typeLength,
    0,
  );

  const packetType = Buffer.alloc(config.packet.typeLength);
  packetType.writeUInt8(PACKET_TYPE.LOCATION, 0);

  const response = Buffer.concat([packetLength, packetType, buffer]);

  // 모든 유저에게 위치 업데이트 전송
  socket.write(response);
};

export default locationUpdateHandler;
