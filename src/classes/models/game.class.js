import IntervalManager from '../managers/interval.manager.js';
import { createLocationPacket } from '../../utils/notification/game.notification.js';
const MAX_PLAYERS = 4;

class Game {
  constructor(id) {
    this.id = id;
    this.users = [];
    this.intervalManager = new IntervalManager();
    this.state = `waiting`; // waiting, inProgress
  }

  addUser(user) {
    if (this.users.length >= MAX_PLAYERS) {
      throw new Error(`Game session is full`);
    }
    this.users.push(user);

    // this.intervalManager.addPlayer(user.id, user.latency, 1000);
    // if (this.users.length === MAX_PLAYERS) {
    //   setTimeout(() => {
    //     this.startGame();
    //   }, 3000);
    // }
  }

  getUser(socket) {
    return this.users.find((user) => user.socket === socket);
  }

  getUsers() {
    return this.users;
  }

  removeUser(socket) {
    this.users = this.users.filter((user) => user.socket !== socket);
    this.intervalManager.removePlayer(socket);
    if (this.users.length < MAX_PLAYERS) {
      this.state = `waiting`;
    }
  }

  startGame() {
    this.state = `inProgress`;
  }
  updateUserPosition(socket, x, y) {
    const user = this.getUser(socket);
    user.x = x;
    user.y = y;
  }
  getAllLocation(socket) {
    const locationData = this.users
      .filter((user) => user.socket !== socket)
      .map((user) => {
        const { x, y } = user.calculatePosition(user.latency);
        return { id: user.id, playId: user.playerId, x, y };
      });
    return createLocationPacket(locationData);
  }
}
export default Game;
