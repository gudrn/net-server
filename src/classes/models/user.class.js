class User {
  constructor(socket, id, playerId, latency) {
    this.id = id;
    this.playerId = playerId;
    this.socket = socket;
    this.x = 0;
    this.y = 0;
    this.lastUpdateTime = Date.now();
    this.latency = latency;
  }

  updatePostion(x, y) {
    this.x = x;
    this.y = y;
    this.lastUpdateTime = Date.now();
  }
}

export default User;
