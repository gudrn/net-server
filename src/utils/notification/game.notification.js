import { config } from '../../config/config.js';
import { getProtoMessages } from '../../init/loadProtos.js';
import { PACKET_TYPE } from '../../constants/header.js';

/**
 * 패킷을 생성하는 유틸리티 함수
 * @param {Buffer} message - 전송할 메시지 버퍼
 * @param {number} type - 패킷 타입
 * @returns {Buffer} 패킷 길이, 타입, 메시지가 포함된 버퍼
 */
const makeNotification = (message, type) => {
  // 패킷 길이 정보를 포함한 버퍼 생성
  const packetLength = Buffer.alloc(config.packet.totalLength);
  packetLength.writeUInt32BE(
    message.length + config.packet.totalLength + config.packet.typeLength,
    0,
  );

  // 패킷 타입 정보를 포함한 버퍼 생성
  const packetType = Buffer.alloc(config.packet.typeLength);
  packetType.writeUInt8(type, 0);

  // 길이 정보와 메시지를 함께 전송
  return Buffer.concat([packetLength, packetType, message]);
};

/**
 * Ping 패킷을 생성하는 함수
 * @param {number} timestamp - 현재 시간
 * @returns {Buffer} 생성된 ping 패킷
 */
export const createPingPacket = (timestamp) => {
  const protoMessage = getProtoMessages();
  const ping = protoMessage.common.Ping;

  const payload = { timestamp };
  const message = ping.create(payload);
  const pingPacket = ping.encode(message).finish();

  return makeNotification(pingPacket, config.packet.type.ping);
};

/**
 * 유저들의 위치 정보를 담은 패킷을 생성하는 함수
 * @param {Array} users - 위치 정보를 포함한 유저 배열
 * @returns {Buffer} 생성된 위치 정보 패킷
 */
export const createLocationPacket = (users) => {
  const protoMessages = getProtoMessages();
  const Location = protoMessages.gameNotification.LocationUpdate;

  const payload = { users };
  const message = Location.create(payload);
  const locationPacket = Location.encode(message).finish();
  return makeNotification(locationPacket, PACKET_TYPE.LOCATION);
};

/**
 * 유저의 마지막 위치 정보를 담은 패킷을 생성하는 함수
 * @param {Object} position - x, y 좌표를 포함한 위치 객체
 * @returns {Buffer} 생성된 마지막 위치 패킷
 */
export const createLastPositionPacket = (position) => {
  const protoMessages = getProtoMessages();
  const LastPosition = protoMessages.game.LocationUpdatePayload;

  const payload = {
    x: position.x,
    y: position.y,
  };
  const message = LastPosition.create(payload);
  const lastPositionPacket = LastPosition.encode(message).finish();
  return makeNotification(lastPositionPacket, PACKET_TYPE.LAST_POSITION);
};
