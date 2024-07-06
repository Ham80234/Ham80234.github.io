/**
 * data Struct
 * {
 *  "content": "LETTER",
 *  "correct": Boolean,
 *  "patial" : Boolean
 *  "positions" : [num, num]
 * }
 */

import { setItem } from './localStorage'

let currentBoard = [
  ["S", "C", "T", "Y", "A"],
  ["A", " ", " ", "N", " "],
  ["I", " ", " ", "E", " "],
  ["R", "E", "P", "M", "E"],
  ["H", " ", " ", "H", " "],
];

let solved = [
  ["N", "I", "C", "H", "E"],
  ["Y", " ", " ", "E", " "],
  ["M", " ", " ", "A", " "],
  ["P", "E", "A", "R", "S"],
  ["H", " ", " ", "T", " "],
];

let state = []

let init = (boardState) =>  {
    boardState.forEach((item, j) => { 
        let objArr = []
        item.forEach((letter, i) => {
            let temp = {
                letter : letter,
                correct: false,
                partial: false,
                position: [j, i],
                blank: letter == ' ' ? true : false
            }
            objArr.push(temp)
        })
        state.push(objArr)
    })
    console.log(state);
}

let createBoard = (board) => {
    let boardCurrent = init(currentBoard)
    from.setItem('board', boardCurrent)

};
createBoard('document.get', currentBoard)

let createPeice = (item) => { 
    let peice = document.createElement('div')
    peice.innerHTML = item.letter
    peice.classList += 'peice'

};

export { createBoard };
