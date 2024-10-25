import { getProtoMessages } from '../../init/loadProtos.js';
import { config } from '../../config/config.js';
import { PACKET_TYPE } from '../../constants/header.js';

export const createResponse = (handlerId, responseCode, data = null, userId) => {
  const protoMessage = getProtoMessages(handlerId);
  const response = protoMessage.response.Response;

  const responsePayload = {
    handlerId,
    responseCode,
    timestamp: Date.now(),
    data: data ? Buffer.from(JSON.stringify(data)) : null,
  };

  const buffer = response.encode(responsePayload).finish();
  const packetLength = Buffer.alloc(config.packet.headerLength);
  packetLength.writeUInt32BE(
    buffer.length + config.packet.headerLength + config.packet.packetTypeLength,
    0,
  );

  const packetType = Buffer.alloc(config.packet.packetTypeLength);
  packetType.writeUInt8(PACKET_TYPE.NORMAL, 0);

  return Buffer.concat([packetLength, packetType, buffer]);
};
