import { getProtoMessages } from '../../init/loadProtos.js';
import { RESPONSE_SUCCESS_CODE, HANDLER_ID } from '../../constants/handlerIds.js';
import pools from '../../db/database.js';
import { PACKET_TYPE } from '../../constants/header.js';
import { config } from '../../config/config.js';

const lastPositionHandler = async ({ socket, userId }) => {
  try {
    const connection = await pools.USER_DB.getConnection();

    try {
      const [rows] = await connection.query(
        'SELECT x, y FROM users WHERE device_id = ? ORDER BY created_at DESC LIMIT 1',
        [userId],
      );

      const position = rows[0] || { x: 0, y: 0 };

      const protoMessage = getProtoMessages(HANDLER_ID.LAST_POSITION);
      const lastPositionResponse = protoMessage.gameLastPosition.LastPositionResponse;

      const responsePayload = {
        x: position.x,
        y: position.y,
      };

      const buffer = lastPositionResponse.encode(responsePayload).finish();
      const packetLength = Buffer.alloc(config.packet.totalLength);
      packetLength.writeUInt32BE(
        buffer.length + config.packet.totalLength + config.packet.typeLength,
        0,
      );

      const packetType = Buffer.alloc(config.packet.typeLength);
      packetType.writeUInt8(PACKET_TYPE.LAST_POSITION, 0);

      const responseBuffer = Buffer.concat([packetLength, packetType, buffer]);
      socket.write(responseBuffer);
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error('마지막 위치 조회 중 오류 발생:', error);
    throw error;
  }
};

export default lastPositionHandler;
