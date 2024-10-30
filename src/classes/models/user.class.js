class User {
  constructor(socket, id, playerId, latency) {
    this.id = id;
    this.playerId = playerId;
    this.socket = socket;
    this.x = 0;
    this.y = 0;
    this.lastUpdateTime = Date.now();
    this.latency = latency;
    this.velocityX = 0;
    this.velocityY = 0;
  }

  updatePostion(x, y) {
    // 속도 계산
    this.velocityX = (x - this.x) / this.latency;
    this.velocityY = (y - this.y) / this.latency;

    this.x = x;
    this.y = y;
    this.lastUpdateTime = Date.now();
  }

  // 추측항법을 사용하여 위치를 추정하는 메서드
  calculatePosition(latency) {
    const currentTime = Date.now();
    const timeDiff = (currentTime - this.lastUpdateTime + latency) / 1000;

    // 현재 속도를 기반으로 예측 위치 계산
    return {
      x: this.x + this.velocityX * timeDiff,
      y: this.y + this.velocityY * timeDiff,
    };
  }
}

export default User;
