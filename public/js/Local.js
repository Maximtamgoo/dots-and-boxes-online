import * as BoardUI from "./BoardUI.js"
import * as Game from "./Game.js"
import Player from "./Player.js"

let newGameBtn = document.querySelector('.new-game-btn')
let sizeDropDown = document.querySelector('.size-drop-down')
let playerTurn = document.querySelector('#player-turn')
let activeGame = false
let player1
let player2

function resetGame() {
  player1 = ''
  player2 = ''
  playerTurn.textContent = 'Player Turn'
  playerTurn.style.backgroundColor = 'rgb(240, 240, 240)'
  playerTurn.style.color = 'rgb(50, 50, 50)'
  BoardUI.displayBoard(Number(sizeDropDown.value))
  newGameBtn.textContent = 'New Game'
  activeGame = false
  enableMenuParts()
}

function disableMenuParts() {
  sizeDropDown.setAttribute('disabled', '')
}

function enableMenuParts() {
  sizeDropDown.removeAttribute('disabled')
}

sizeDropDown.addEventListener('change', function (e) {
  if (!activeGame) {
    BoardUI.displayBoard(Number(e.target.value))
  }
})

newGameBtn.addEventListener('click', function () {
  if (activeGame) {
    resetGame()
    return
  }

  activeGame = true
  disableMenuParts()
  newGameBtn.textContent = 'Reset Game'

  player1 = new Player('Player 1', '#FFA500', 1)
  player2 = new Player('Player 2', '#007bff', 2)

  Game.startLocalGame(player1, player2)
  Game.setPossibleMoves()
  BoardUI.displayCurrentPlayer()
  BoardUI.createHoverListeners()
  BoardUI.createClickListeners()
})