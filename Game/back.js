
   let result = [
    ['M', ' ', ' ', ' ', 'L'],
    ['E', ' ', ' ', ' ', 'X'],
    ['G', 'I', 'A', 'E', 'M'],
    ['E', ' ', ' ', ' ', 'R']
]

let solved = [
    ['A', ' ', ' ', ' ', 'G'],
    ['X', ' ', ' ', ' ', 'E'],
    ['L', 'I', 'M', 'E', 'R'],
    ['E', ' ', ' ', ' ', 'M']
]

let moves = 0

let letterMoving = ''
let dropLetter = ''

function setboard() {
    let board = document.getElementById("gameboard")
    board.innerHTML = ''
    result.forEach((item, idx) => {
        item.forEach((letter, idx2) => {
            board.appendChild(createPeice(letter, [], idx, idx2))
        })
    })
}

function checkPeice(item){
    let pos1 = item.getAttribute('pos1');
    let pos2 = item.getAttribute('pos2');
    let letter = item.innerHTML
    let letterSolved = solved[pos1][pos2]

    if (letter == letterSolved) { 
        return  'correct'
    }

    let row = []
    row.forEach(row => row.push([row[pos1]]))
    let col = []

    solved.forEach(i => col.push(i[pos2]))

    if (row.includes(letter)) {
        return 'partial'
    }

    if (col.includes(letter)) {
        return 'partial'
    }
}

function allowDrop(ev) {
    ev.preventDefault();
}

function drop(ev) {
    ev.preventDefault()
    let movesDOM = document.getElementById('moves')
    dropLetter = ev.target
    let LMpos1 = letterMoving.getAttribute('pos1')
    let LMpos2 = letterMoving.getAttribute('pos2')

    let DLpos1 = dropLetter.getAttribute('pos1')
    let DLpos2 = dropLetter.getAttribute('pos2')

    let temp = result[DLpos1][DLpos2]

    result[DLpos1][DLpos2] = result[LMpos1][LMpos2]
    result[LMpos1][LMpos2] = temp

    moves += 1
    movesDOM.innerHTML = moves

    setboard()
}

function drag(ev) {
    ev.preventDefault()
    letterMoving = ev.target
}

function touchStart(ev) {
    ev.preventDefault()
    letterMoving = ev.target
}

function touchMove(ev) {
    ev.preventDefault()
    let touch = ev.touches[0]
    let target = document.elementFromPoint(touch.clientX, touch.clientY)
    if (target && target.classList.contains('peice')) {
        dropLetter = target
    }
}

function touchEnd(ev) {
    ev.preventDefault()
    if (dropLetter) {
        let LMpos1 = letterMoving.getAttribute('pos1')
        let LMpos2 = letterMoving.getAttribute('pos2')

        let DLpos1 = dropLetter.getAttribute('pos1')
        let DLpos2 = dropLetter.getAttribute('pos2')

        let temp = result[DLpos1][DLpos2]

        result[DLpos1][DLpos2] = result[LMpos1][LMpos2]
        result[LMpos1][LMpos2] = temp

        moves += 1
        let movesDOM = document.getElementById('moves')
        movesDOM.innerHTML = moves

        setboard()
    }
}

function createPeice(content, classes=[], pos1, pos2) {
    let peice = document.createElement('div')
    if(content != ' ') {
        classes.push('peice')
        peice.innerText = content

        peice.setAttribute('pos1', pos1)
        peice.setAttribute('pos2', pos2)
        peice.ondragstart = drag
        peice.ondrop = drop
        peice.ondragover = allowDrop
        peice.draggable = true
        peice.addEventListener('touchstart', touchStart, false)
        peice.addEventListener('touchmove', touchMove, false)
        peice.addEventListener('touchend', touchEnd, false)
        classes.push(checkPeice(peice))
        peice.classList.add(...classes)
    }
    return peice
}

// Initialize the board
document.addEventListener("DOMContentLoaded", function() {
    setboard()
})