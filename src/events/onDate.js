import { config } from '../config/config.js';
import { PACKET_TYPE } from '../constants/header.js';
import { packetParser } from '../utils/parser/packetParser.js';
import { getHandlerById } from '../handlers/index.js';
import { getUserById } from '../session/user.session.js';
import { handleError } from '../utils/error/errorHandler.js';

export const onDate = (socket) => async (data) => {
  socket.buffer = Buffer.concat([socket.buffer, data]);

  const toatlHeaderLength = config.packet.headerLength + config.packet.packetTypeLength;

  while (socket.buffer.length >= toatlHeaderLength) {
    const length = socket.buffer.readUInt32BE(0, config.packet.headerLength);
    const packetType = socket.buffer.readUInt8(config.packet.headerLength);
    if (socket.buffer.length >= toatlHeaderLength) {
      const packet = socket.buffer.subarray(toatlHeaderLength, length);
      socket.buffer = socket.buffer.subarray(length);
      try {
        switch (packetType) {
          case PACKET_TYPE.PING:
            break;
          case PACKET_TYPE.NORMAL:
            const packetparser = packetParser(packet);
            const user = getUserById(packetparser.userId);
            let handler = getHandlerById(packetparser.handlerId);
            await handler({ socket, userId: packetparser.userId, payload: packetparser.payload });
            break;
          case PACKET_TYPE.LOCATION:
            break;
        }
      } catch (error) {
        handleError(socket, error);
      }
    } else {
      break;
    }
  }
};
