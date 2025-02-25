import pools from '../database.js';
import { SQL_QUERIES } from './user.queries.js';
import { toCamelCase } from '../../utils/transformCase.js';

export const findUserByDeviceId = async (deviceId) => {
  const [user] = await pools.USER_DB.query(SQL_QUERIES.FIND_USER_BY_DEVICE_ID, [deviceId]);
  return toCamelCase(user[0]);
};

export const createUser = async (deviceId) => {
  await pools.USER_DB.query(SQL_QUERIES.CREATE_USER, [deviceId]);
  return { deviceId };
};

export const updateUserLogin = async (id) => {
  await pools.USER_DB.query(SQL_QUERIES.UPDATE_USER_LOGIN, [id]);
};
