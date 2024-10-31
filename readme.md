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
