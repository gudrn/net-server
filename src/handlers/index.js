import { HANDLER_ID } from '../constants/handlerIds.js';
import CustomError from '../utils/error/customError.js';
import { ErrorCodes } from '../utils/error/errorCodes.js';
import initialHandler from './user/initial.handler.js';
import locationUpdateHandler from './user/locationUpdate.handler.js';
import savePositionHandler from './user/savePosition.handler.js';
import lastPositionHandler from './user/lastPosition.handler.js';
const handlers = {
  [HANDLER_ID.INITIAL]: {
    handler: initialHandler,
    prototype: 'initial.initialPayload',
  },
  [HANDLER_ID.LOCATION_UPDATE]: {
    handler: locationUpdateHandler,
    prototype: 'game.LocationUpdatePayload',
  },
  [HANDLER_ID.SAVE_POSITION]: {
    handler: savePositionHandler,
    prototype: 'gameSaveLocation.SavePositionPayload',
  },
  [HANDLER_ID.LAST_POSITION_REQUEST]: {
    handler: lastPositionHandler,
    prototype: 'gameLastPosition.LastPositionRequest',
  },
};

export const getHandlerById = (handlerId) => {
  if (!handlers[handlerId]) {
    throw new CustomError(
      ErrorCodes.UNKNOWN_HANDLER_ID,
      `핸들러를 찾을 수 없습니다: ID ${handlerId}`,
    );
  }
  return handlers[handlerId].handler;
};

export const getProtoTypeNameByHandlerId = (handlerId) => {
  if (!handlers[handlerId]) {
    // packetParser 체크하고 있지만 그냥 추가합니다.
    throw new CustomError(
      ErrorCodes.UNKNOWN_HANDLER_ID,
      `핸들러를 찾을 수 없습니다: ID ${handlerId}`,
    );
  }
  return handlers[handlerId].prototype;
};
