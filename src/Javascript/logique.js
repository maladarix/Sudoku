let cell = document.querySelectorAll('.cell')
let board = []
let savedBoard = []

function generateSudoku(difficulty) {
  board = Array.from({length: 9}, () => Array(9).fill(0))
  savedBoard = []
  fillDiagonalle()
  fillRemaining(0, 3)
  saveBoardState(board)
  showBoard(difficulty)
}

function fillDiagonalle() {
  for (let i = 0; i < 9; i += 3) {
    fillBox(i, i)
  }
}

function fillRemaining(i, j) {
  if(i == 9 - 1 && j == 9) {
    return true
  }

  if(j == 9) {
    i += 1
    j = 0
  }

  if(board[i][j] !== 0) {
    return fillRemaining(i, j + 1)
  }

  for (let num = 1; num <= 9; num++) {
    if(checkIfSafe(i, j, num)) {
      board[i][j] = num
      if(fillRemaining(i, j + 1)) {
        return true
      }
      board[i][j] = 0
    }
  }
  return false
}

function fillBox(row, col) {
  let num = 0
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      while (true) {
        num = randomNumber()
        if(unUsedInBox(row, col, num)) {
          break 
        }
      }
      board[row + i][col + j] = num
    }
  }
}

function checkIfSafe(i, j, num) {
  return (
    unUsedInRow(i, num) &&
    unUserInCol(j, num) &&
    unUsedInBox(i - (i % 3), j - (j % 3), num)
  );
}

function unUsedInRow(i, num) {
  for (let j = 0; j < 9; j++) {
    if(board[i][j] == num) {
      return false
    }
  }
  return true
}

function unUserInCol(j, num) {
  for (let i = 0; i < 9; i++) {
    if(board[i][j] == num) {
      return false
    }
  }
  return true
}

function unUsedInBox(row, col, num) {
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if(board[row + i][col + j] === num) {
        return false
      }
    }
  }
  return true
}

function randomNumber() {
  return Math.floor(Math.random() * 9 + 1)
}

function hideCells(hiddenNum) {
  while (hiddenNum != 0) {
    let i = Math.floor(Math.random() * 9)
    let j = Math.floor(Math.random() * 9)

    if(board[i][j] != 0) {
      hiddenNum --
      board[i][j] = 0
    }
  }
  return
}

function saveBoardState(board) {
  savedBoard = board.map(row => [...row]);
  return savedBoard;
}

function showBoard(difficulty) {
  hideCells(difficulty)
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if(board[i][j] != 0) {
        cell[j + (i * 9)].innerHTML = board[i][j]
        cell[j + (i * 9)].classList.add('blocked')
      }
    }
  }
}

function checkBoard(i, j, num) {  
  if(savedBoard[i][j] == num) {  
    return true
  }else{
    return false
  }
}


generateSudoku(40)