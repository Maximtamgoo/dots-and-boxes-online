class Player {
  constructor(playerName, playerColor, playerId) {
    this.playerName = playerName
    this.playerColor = playerColor
    this.playerId = playerId
    this.playerScore = 0
  }

  setPlayerName(name) {
    this.playerName = name
  }

  getPlayerName() {
    return this.playerName
  }

  setPlayerColor(color) {
    this.playerColor = color
  }

  getPlayerColor() {
    return this.playerColor
  }

  setPlayerId(id) {
    this.playerId = id
  }

  getPlayerId() {
    return this.playerId
  }

  addPlayerScore(n) {
    this.playerScore += n
  }

  getPlayerScore() {
    return this.playerScore
  }

}
export default Player