import * as Game from "./Game.js"

let currentLineColor = 'white'
let divGrid = document.querySelector('#div-grid')
let previousLineDom = null
let p1_previousBoxDom = null
let p2_previousBoxDom = null
let boardSize = 4

function getBoardSize() {
  return boardSize
}

function displayBoard(size) {
  boardSize = size
  Game.resetPossibleMoves()
  let rows = size * 2 + 1 //# of cols for each rowH/rowV
  let columns = rows
  let gridParts = ''
  let indexCount = 0
  for (let rowNum = 1; rowNum <= rows; rowNum++) {
    if (rowNum % 2 !== 0) { // rowH is odd
      gridParts += `<div class="grid-h-row">`
      for (let colNum = 1; colNum <= columns; colNum++) {
        if (colNum % 2 !== 0) { // is odd
          gridParts += `<div class="grid-dot"></div>`
        } else {
          gridParts += `<div class="grid-h-col" off></div>`
        }
      }
      gridParts += `</div>`

    } else { // rowV is odd
      gridParts += `<div class="grid-v-row">`
      for (let colNum = 1; colNum <= columns; colNum++) {
        if (colNum % 2 !== 0) {
          gridParts += `<div class="grid-v-col" off></div>`
        } else {
          gridParts += `<div class="grid-box"></div>`
        }
      }
      gridParts += `</div>`
    }
  }
  divGrid.innerHTML = gridParts
}

function displayCurrentPlayer() {
  let player = Game.getCurrentPlayerTurn()
  let playerTurnLabel = document.querySelector('#player-turn')
  playerTurnLabel.style.color = 'white';
  playerTurnLabel.textContent = `${player.getPlayerName()}'s Turn`
  playerTurnLabel.style.backgroundColor = player.getPlayerColor()
  currentLineColor = player.getPlayerColor()
}

function playableMove(e) {
  let className = e.target.className
  let moveIsOff = e.target.hasAttribute('off')
  if (className === 'grid-h-col' && moveIsOff || className === 'grid-v-col' && moveIsOff) {
    return true
  }
  return false
}

function createHoverListeners() {
  divGrid.addEventListener('mouseover', function (e) {
    if (playableMove(e)) {
      e.target.style.cursor = 'pointer'
      e.target.style.backgroundColor = currentLineColor
    } else {
      e.target.style.cursor = 'default'
    }
  })
  divGrid.addEventListener('mouseout', function (e) {
    if (playableMove(e)) {
      e.target.style.cursor = 'default'
      e.target.style.backgroundColor = 'rgb(245, 245, 245)'
    }
  })
}

function createClickListeners() {
  divGrid.addEventListener('click', clickedLinesListener)
}

function clickedLinesListener(e) {
  if (playableMove(e)) {
    Game.runMove(e.target)
  }
}

function disableClickLineListeners() {
  divGrid.removeEventListener('click', clickedLinesListener)
}

function fillLine(lineDom) {
  lineDom.removeAttribute('off')
  lineDom.setAttribute('on', '')
  lineDom.style.backgroundColor = currentLineColor
  lineDom.style.border = '3px solid black'
  if (previousLineDom !== null) {
    previousLineDom.style.border = '1px solid black'
  }
  previousLineDom = lineDom
}

function fillBox(boxDom) {
  boxDom.style.backgroundColor = currentLineColor
}

function displayScore(player, boxDom) {
  boxDom.innerHTML = player.getPlayerScore()
  if (player.getPlayerId() === 1) {
    if (p1_previousBoxDom !== null) {
      p1_previousBoxDom.innerHTML = ''
    }
    p1_previousBoxDom = boxDom
  } else {
    if (p2_previousBoxDom !== null) {
      p2_previousBoxDom.innerHTML = ''
    }
    p2_previousBoxDom = boxDom
  }   
}

function displayWinner(player) {
  let playerTurnLabel = document.querySelector('#player-turn')
  if (player === 'Tie!') {
    playerTurnLabel.textContent = player
    playerTurnLabel.style.backgroundColor = 'rgb(245, 245, 245)'
  } else {
    playerTurnLabel.textContent = `${player.getPlayerName()} wins!`
    playerTurnLabel.style.backgroundColor = player.getPlayerColor()
  }
}

export {
  getBoardSize,
  displayBoard,
  displayCurrentPlayer,
  createHoverListeners,
  createClickListeners,
  disableClickLineListeners,
  fillLine,
  fillBox,
  displayScore,
  displayWinner
}