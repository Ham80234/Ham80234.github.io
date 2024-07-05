import a from './js/helpers.js'
import { getItem, setItem } from './js/localStorage.js';
import { createBoard } from './js/board.js';

setItem('test', 'test2')
const board = document.getElementById('board')

console.log(createBoard(board));

