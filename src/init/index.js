import { loadProtos } from './loadProtos.js';
import pools from '../db/database.js';
import { testAllDbConnections } from '../utils/db/testConnection.js';

const initServer = async () => {
  try {
    await loadProtos();
    await testAllDbConnections(pools);
    // 다음 작업
  } catch (e) {
    console.error(e);
    process.exit(1); // 오류 발생 시 프로세스 종료
  }
};

export default initServer;
