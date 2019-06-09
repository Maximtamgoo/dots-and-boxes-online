import * as BoardUI from "./BoardUI.js"
import * as Boxes from "./Boxes.js"

let currentPlayerTurn
let possibleMoves = []
let player1
let player2

function startLocalGame(p1, p2) {
  player1 = p1
  player2 = p2
  setCurrentPlayerTurn(player1)
}

function setPossibleMoves() {
  let rows = document.querySelectorAll('.grid-v-row, .grid-h-row')
  let cols = document.querySelectorAll('.grid-v-col, .grid-h-col')
  let boxes = document.querySelectorAll('.grid-box')
  let indexCount = 0
  let boxCount = 0
  for (let i = 0; i < rows.length; i++) {
    let orient = (i % 2 === 0) ? 'h' : 'v'
    let lines = rows[i].querySelectorAll(`.grid-${orient}-col`)
    for (let j = 0; j < lines.length; j++) {
      possibleMoves.push({
        index: indexCount++,
        orient,
        taken: false,
        lineDom: lines[j]
      })
      let currentMove = possibleMoves[indexCount - 1]
      if (orient === 'h' && currentMove.index < cols.length - BoardUI.getBoardSize()) {
        currentMove.boxDom = boxes[boxCount++]
      }
    }
  }
}

function getPossibleMoves() {
  return possibleMoves
}

function resetPossibleMoves() {
  possibleMoves = []
}

function runMove(clickedElement) {
  BoardUI.disableClickLineListeners()

  let move = findMove(clickedElement)
  move.taken = true
  BoardUI.fillLine(move.lineDom)

  let boxDoms = findBoxes(move)

  if (boxDoms.length !== 0) {
    boxDoms.forEach((boxDom) => {
      BoardUI.fillBox(boxDom)
    })
    updateScore(boxDoms)
  } else {
    switchPlayerTurn()
    BoardUI.displayCurrentPlayer()
    BoardUI.createClickListeners()
    return
  }

  let noMovesLeft = possibleMoves.every((move) => move.taken === true)
  if (noMovesLeft) {
    let player = getWinner()
    BoardUI.displayWinner(player)
    endGame()
  }
  BoardUI.createClickListeners()
}

function findMove(clickedElement) {
  let index = possibleMoves.findIndex((p) => p.lineDom === clickedElement)
  return possibleMoves[index]
}

function setCurrentPlayerTurn(turn) {
  currentPlayerTurn = turn
}

function getCurrentPlayerTurn() {
  return currentPlayerTurn
}

function switchPlayerTurn() {
  if (getCurrentPlayerTurn() === player1) {
    setCurrentPlayerTurn(player2)
  } else {
    setCurrentPlayerTurn(player1)
  }
}

function findBoxes(move) {
  let {
    lines1,
    lines2
  } = Boxes.findAdjacentLines(move)
  let boxDoms = []
  if (Boxes.isBox(lines1)) {
    boxDoms.push(Boxes.findBox_1_Dom(move))
  }
  if (Boxes.isBox(lines2)) {
    boxDoms.push(Boxes.findBox_2_Dom(move))
  }
  return boxDoms
}

function getWinner() {
  let p1Score = player1.getPlayerScore()
  let p2Score = player2.getPlayerScore()

  if (p1Score === p2Score) {
    return 'Tie!'
  }
  if (p1Score > p2Score) {
    return player1
  } else {
    return player2
  }
}

function endGame() {
  console.log('endGame()')
}

function updateScore(boxDoms) {
  let score = boxDoms.length
  let player = getCurrentPlayerTurn()
  player.addPlayerScore(score)
  BoardUI.displayScore(player, boxDoms[score-1])
}

export {
  startLocalGame,
  setPossibleMoves,
  getPossibleMoves,
  resetPossibleMoves,
  runMove,
  getCurrentPlayerTurn
}