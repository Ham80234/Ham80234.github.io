import a from './js/helpers.js'
import { getItem, setItem } from './js/localStorage.js';
import { createBoard } from './js/board.js';
import events from './js/events.js'

setItem('test', 'test2')
const board = document.getElementById('board')

console.log(createBoard(board));

