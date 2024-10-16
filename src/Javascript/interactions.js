const cells = document.querySelectorAll('.cell');
const digits = document.querySelectorAll('.digit')
const reset = document.querySelectorAll('.reset')[0]
const diffBtns = document.querySelectorAll('.difficulty')

cells.forEach(cell => {
    cell.addEventListener('click', function() {
      cells.forEach(cell => {
        cell.classList.remove('clicked')
      })
      if(!cell.classList.contains('blocked')) {
        cell.classList.add('clicked')
      }
    })
});

digits.forEach(digit => {
  digit.addEventListener('click', function() {
    cells.forEach(cell => {
      if(cell.classList.contains('clicked') && !cell.classList.contains('blocked')) {
        
        if(!checkBoard(Math.floor(Array.from(cells).indexOf(cell) / 9), Array.from(cells).indexOf(cell) % 9, digit.innerHTML)) {
          cell.classList.add('error')
        }else{
          cell.classList.remove('error')
        }
        cell.innerHTML = digit.innerHTML
      }
    })
  })
})

reset.addEventListener('click', function() {
  let difficulty = ""
  cells.forEach(cell => {
    cell.innerHTML = ''
    cell.classList.remove('blocked')
    cell.classList.remove('clicked')
    cell.classList.remove('error')
  })
  diffBtns.forEach(diffBtn => {
    if(diffBtn.classList.contains('selected')) {
      difficulty = diffBtn.innerHTML
    }
  });
  switch (difficulty) {
    case "Novice":
      generateSudoku(40)
      break;

    case "Intermédiaire":
      generateSudoku(50)
      break

    case "Difficile":
      generateSudoku(60)
      break
  
    default:
      generateSudoku(40)
      break;
  }
})

diffBtns.forEach(diffBtn => {

  diffBtn.addEventListener('click', function() {
    diffBtns.forEach(diffBtn => {
      diffBtn.classList.remove('selected')
    })
    diffBtn.classList.add('selected')
  })
})
