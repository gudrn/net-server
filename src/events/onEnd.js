// 게임 세션과 유저 세션 관리를 위한 모듈 임포트
import { getGameSession } from '../session/game.session.js';
import { removeUser } from '../session/user.session.js';
// 데이터베이스 연결을 위한 풀 임포트
import pools from '../db/database.js';

// 소켓 연결이 종료될 때 실행되는 이벤트 핸들러
export const onEnd = (socket) => async () => {
  console.log('클라이언트 연결이 종료되었습니다.');
  // 현재 게임 세션 가져오기
  const gameSession = getGameSession();
  // 소켓에 해당하는 유저 정보 가져오기
  const user = gameSession.getUser(socket);

  // 유저가 존재하는 경우
  if (user) {
    try {
      // 데이터베이스 연결 생성
      const connection = await pools.USER_DB.getConnection();
      // 트랜잭션 시작
      await connection.beginTransaction();

      // 유저의 마지막 위치(x, y)를 데이터베이스에 업데이트
      const result = await connection.query('UPDATE users SET x = ?, y = ? WHERE device_id = ?', [
        user.x,
        user.y,
        user.id,
      ]);
      // 트랜잭션 성공적으로 완료
      await connection.commit();
    } catch (connectionError) {
      // 데이터베이스 작업 중 오류 발생 시 에러 로깅
      console.error('데이터베이스 연결 중 오류 발생:', connectionError);
    }
  }

  // 게임 세션에서 유저 제거
  gameSession.removeUser(socket);
  // 유저 세션에서도 유저 제거
  removeUser(socket);
};
