import { ErrorCodes } from '../../utils/error/errorCodes.js';
import customError from '../../utils/error/customError.js';

class BaseManager {
  constructor() {
    if (new.target === BaseManager) {
      throw new customError(ErrorCodes.CANNOT_INSTANTIATE_DIRECTLY);
    }
  }

  addPlayer(palyerId, ...args) {
    throw new customError(ErrorCodes.NOT_IMPLEMENTED, 'addPlayer');
  }

  removePlayer(palyerId) {
    throw new customError(ErrorCodes.NOT_IMPLEMENTED, 'removePlayer');
  }

  clear() {
    throw new customError(ErrorCodes.NOT_IMPLEMENTED, 'clear');
  }
}
export default BaseManager;
