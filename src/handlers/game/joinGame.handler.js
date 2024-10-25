import { handleError } from '../../utils/error/errorHandler.js';
import { getGameSession, getAllGameSessions } from '../../session/game.session.js';
import CustomError from '../../utils/error/customError.js';
import { ErrorCodes } from '../../utils/error/errorCodes.js';
import { getUserById } from '../../session/user.session.js';
import { createResponse } from '../../utils/response/createResponse.js';
import { HANDLER_IDS, RESPONSE_SUCCESS_CODE } from '../../constants/handlerIds.js';

const joinGameHandler = ({ socket, userId, payload }) => {
  try {
    const { gameId } = payload;
    let gameSession = getGameSession(gameId);
    if (!gameSession) {
      const availableGames = getAllGameSessions();
      if (availableGames.length > 0) {
        gameSession = availableGames[0];
      } else {
        throw new CustomError(ErrorCodes.GAME_NOT_FOUND);
      }
    }
    const user = getUserById(userId);
    if (!user) {
      throw new CustomError(ErrorCodes.USER_NOT_FOUND);
    }
    const existUser = gameSession.getUser(userId);
    if (!existUser) {
      gameSession.addUser(user);
    }

    const joinGameResponse = createResponse(
      HANDLER_IDS.JOIN_GAME,
      RESPONSE_SUCCESS_CODE,
      { gameId, message: '게임 참여 완료' },
      userId,
    );

    socket.write(joinGameResponse);
  } catch (error) {
    handleError(socket, error);
  }
};

export default joinGameHandler;
