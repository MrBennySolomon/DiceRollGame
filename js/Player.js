class Player{
  constructor(name) {
    this.name = name;
    this.wins = 0;
  }

  getName() {
    return this.name;
  }

  setName(name) {
    this.name = name;
  }

  getWins() {
    return this.wins;
  }

  updateWins() {
    this.wins++;
  }

  setWins(num) {
    this.wins = num;
  }
}