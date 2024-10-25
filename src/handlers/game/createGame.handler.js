import { v4 as uuidv4 } from 'uuid';
import { handleError } from '../../utils/error/errorHandler.js';
import { addGameSession } from '../../session/game.session.js';
import { getUserById } from '../../session/user.session.js';
import { createResponse } from '../../utils/response/createResponse.js';
import { HANDLER_ID, RESPONSE_SUCCESS_CODE } from '../../constants/handlerIds.js';
import { ErrorCodes } from '../../utils/error/errorCodes.js';
import CustomError from '../../utils/error/customError.js';

const createGameHandler = ({ socket, userId, payload }) => {
  try {
    const gameId = uuidv4();
    const gameSession = addGameSession(gameId);

    const user = getUserById(userId);
    if (!user) {
      throw new CustomError(ErrorCodes.USER_NOT_FOUND);
    }

    gameSession.addUser(user);

    const createGameResponse = createResponse(
      HANDLER_ID.CREATE_GAME,
      RESPONSE_SUCCESS_CODE,
      { gameId, message: '게임 생성 완료' },
      userId,
    );
    socket.write(createGameResponse);
  } catch (error) {
    handleError(socket, error);
  }
};

export default createGameHandler;
