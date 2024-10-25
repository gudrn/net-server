import BaseManager from './base.manager.js';

class IntervalManager extends BaseManager {
  constructor() {
    super();
    this.interval = new Map();
  }

  addPlayer(playerId, callback, interval, type = 'user') {
    if (!this.interval.has(playerId)) {
      this.interval.set(playerId, new Map());
    }
    this.interval.get(playerId).set(type, setInterval(callback, interval));
  }

  addGame(gameId, callback, interval) {
    this.addPlayer(gameId, callback, interval, 'game');
  }

  addUpdatePosition(playerId, callback, interval) {
    this.addPlayer(playerId, callback, interval, 'updatePosition');
  }

  removePlayer(playerId) {
    if (this.interval.has(playerId)) {
      const userInterval = this.interval.get(playerId);
      userInterval.forEach((interval) => {
        clearInterval(interval);
      });
      this.interval.delete(playerId);
    }
  }

  removeInterval(playerId, type) {
    if (this.interval.has(playerId)) {
      const userInterval = this.interval.get(playerId);
      if (userInterval.has(type)) {
        clearInterval(userInterval.get(type));
        userInterval.delete(type);
      }
    }
  }

  clear() {
    this.interval.forEach((userInterval) => {
      userInterval.forEach((interval) => {
        clearInterval(interval);
      });
    });
  }
}

export default IntervalManager;
