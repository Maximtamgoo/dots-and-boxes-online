import * as Game from "./Game.js"
import * as BoardUI from "./BoardUI.js"

function findAdjacentLines(move) {
  let lines1, lines2
  if (move.orient === 'h') {
    lines1 = find_top_lines(move)
    lines2 = find_bottom_lines(move)
  } else {
    lines1 = find_left_lines(move)
    lines2 = find_right_lines(move)
  }
  return { lines1, lines2 }
}

function getLines(indexes) {
  let lines = []
  indexes.forEach((index) => {
    lines.push(Game.getPossibleMoves()[index])
  })
  return lines
}

function find_top_lines(move) {
  let left_index, top_index, right_index
  if (move.index < BoardUI.getBoardSize()) {
    return false
  } else {
    right_index = move.index - BoardUI.getBoardSize()
    left_index = right_index - 1
    top_index = left_index - BoardUI.getBoardSize()
    return getLines([left_index, top_index, right_index])
  }
}

function find_bottom_lines(move) {
  let left_index, bottom_index, right_index
  if (move.index >= Game.getPossibleMoves().length - BoardUI.getBoardSize()) {
    return false
  } else {
    left_index = move.index + BoardUI.getBoardSize()
    right_index = left_index + 1
    bottom_index = right_index + BoardUI.getBoardSize()
    return getLines([left_index, bottom_index, right_index])
  }
}

function isVerticalEdge(move) {
  let prevLine = Game.getPossibleMoves()[move.index - 1]
  let nextLine = Game.getPossibleMoves()[move.index + 1]
  let leftEdge = prevLine.orient === 'h' && nextLine.orient === 'v'
  let rightEdge = prevLine.orient === 'v' && nextLine.orient === 'h'
  if (leftEdge) {
    return 'left'
  }
  if (rightEdge) {
    return 'right'
  }
  return false
}

function find_left_lines(move) {
  let left_index, top_index, bottom_index
  if (isVerticalEdge(move) === 'left') {
    return false
  } else {
    left_index = move.index - 1
    top_index = left_index - BoardUI.getBoardSize()
    bottom_index = move.index + BoardUI.getBoardSize()
    return getLines([left_index, top_index, bottom_index])
  }
}

function find_right_lines(move) {
  let right_index, top_index, bottom_index
  if (isVerticalEdge(move) === 'right') {
    return false
  } else {
    right_index = move.index + 1
    top_index = move.index - BoardUI.getBoardSize()
    bottom_index = right_index + BoardUI.getBoardSize()
    return getLines([right_index, top_index, bottom_index])
  }
}

function isBox(lines) {
  if (lines === false) return false
  return lines.every((line) => line.taken === true)
}

function findBox_1_Dom(move) {
  if (move.orient === 'h') {
    return Game.getPossibleMoves()[move.index - (BoardUI.getBoardSize() * 2 + 1)].boxDom
  } else {
    return Game.getPossibleMoves()[move.index - (BoardUI.getBoardSize() + 1)].boxDom
  }
}

function findBox_2_Dom(move) {
  if (move.orient === 'h') {
    return Game.getPossibleMoves()[move.index].boxDom
  } else {
    return Game.getPossibleMoves()[move.index - BoardUI.getBoardSize()].boxDom
  }
}

export {
  findAdjacentLines,
  isBox,
  findBox_1_Dom,
  findBox_2_Dom
}