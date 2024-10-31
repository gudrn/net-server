# 내일배움캠프 Node.js 게임서버

### TCP 실전 게임서버

## 핸들러 설명

이 게임 서버는 다양한 핸들러를 통해 클라이언트 요청을 처리합니다. 각 핸들러는 특정 작업을 수행하며, `src/handlers/index.js` 파일에서 관리됩니다.

### 핸들러 목록

- **INITIAL 핸들러**

  - **ID**: `HANDLER_ID.INITIAL`
  - **설명**: 초기 연결 시 클라이언트의 초기 데이터를 처리합니다.
  - **프로토타입**: `initial.initialPayload`

- **LOCATION_UPDATE 핸들러**

  - **ID**: `HANDLER_ID.LOCATION_UPDATE`
  - **설명**: 클라이언트의 위치 업데이트 요청을 처리합니다.
  - **프로토타입**: `game.LocationUpdatePayload`

- **SAVE_POSITION 핸들러**

  - **ID**: `HANDLER_ID.SAVE_POSITION`
  - **설명**: 클라이언트의 현재 위치를 저장합니다.
  - **프로토타입**: `game.LocationUpdatePayload`
  - **참고**: 현재 사용하지 않고 빌드 되지 않는 상태에서 임시로 둠. 해당 기능 socket 연결이 끊어지면 위치 저장하게 만듬.

- **LAST_POSITION_REQUEST 핸들러**
  - **ID**: `HANDLER_ID.LAST_POSITION_REQUEST`
  - **설명**: 클라이언트의 마지막 위치 요청을 처리합니다.
  - **프로토타입**: `gameLastPosition.LastPositionRequest`

### 핸들러 사용법

`getHandlerById(handlerId)` 함수를 사용하여 특정 핸들러를 가져올 수 있습니다. 핸들러 ID가 유효하지 않으면 `CustomError`가 발생합니다.

`getProtoTypeNameByHandlerId(handlerId)` 함수를 사용하여 핸들러 ID에 해당하는 프로토타입 이름을 가져올 수 있습니다. 이 함수도 유효하지 않은 핸들러 ID에 대해 `CustomError`를 발생시킵니다.

## 프로젝트 구조

프로젝트는 다음과 같은 구조로 구성되어 있습니다:

### 주요 디렉토리

- **src/**: 소스 코드가 위치한 메인 디렉토리
  - **classes/**: 클래스 정의 파일들
    - **managers/**: 매니저 클래스들
    - **models/**: 모델 클래스들
  - **config/**: 설정 파일들
  - **constants/**: 상수 정의
  - **db/**: 데이터베이스 관련 파일들
    - **migration/**: DB 마이그레이션 파일
    - **sql/**: SQL 쿼리문
    - **user/**: 사용자 관련 DB 로직
  - **events/**: 이벤트 핸들러
  - **handlers/**: 요청 핸들러
    - **game/**: 게임 관련 핸들러
    - **user/**: 사용자 관련 핸들러
  - **init/**: 초기화 관련 코드
  - **protobuf/**: Protocol Buffer 정의
    - **notification/**: 알림 관련 프로토콜
    - **request/**: 요청 관련 프로토콜
    - **response/**: 응답 관련 프로토콜
  - **session/**: 세션 관리
  - **utils/**: 유틸리티 함수들
    - **db/**: DB 관련 유틸
    - **error/**: 에러 처리
    - **notification/**: 알림 관련 유틸
    - **parser/**: 파싱 유틸
    - **response/**: 응답 관련 유틸

### 기타 디렉토리

- **assets/**: 정적 자원 파일
- **node_modules/**: npm 패키지들
