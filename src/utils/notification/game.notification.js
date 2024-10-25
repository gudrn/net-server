import config from '../../config/config.js';
import { getProtoMessages } from '../../init/loadProtos.js';

const makeNotification = (message, type) => {
  const packetLength = Buffer.alloc(config.packet.totalLength);
  packetLength.writeUInt32BE(message.length + config.packet.totalLength, 0);

  const packetType = Buffer.alloc(config.packet.typeLength);
  packetType.writeUInt8(type, 0);

  return Buffer.concat([packetLength, packetType]);
};

export const createPingPacket = (timestamp) => {
  const protoMessage = getProtoMessages();
};
