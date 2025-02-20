// Example correct answer for the crossword
const correctAnswer = [
  ['C', 'A', 'T'], 
  ['D', 'O', 'G'], 
  ['P', 'I', 'G']
];

// Function to check correctness and apply highlighting
function checkCorrectness() {
  const grid = document.querySelectorAll('.cell');
  grid.forEach((cell, index) => {
    const row = Math.floor(index / 3); // Adjust for your grid size
    const col = index % 3;
    const letter = cell.textContent.trim().toUpperCase();

    if (letter === correctAnswer[row][col]) {
      cell.classList.add('correct');
      cell.classList.remove('misplaced');
    } else if (correctAnswer[row].includes(letter)) {
      cell.classList.add('misplaced');
      cell.classList.remove('correct');
    } else {
      cell.classList.remove('correct', 'misplaced');
    }
  });
}

// Drag-and-Drop Functionality
function addDragAndDrop() {
  const cells = document.querySelectorAll('.cell');
  cells.forEach(cell => {
    cell.draggable = true;

    cell.addEventListener('dragstart', (e) => {
      e.dataTransfer.setData('text/plain', e.target.textContent.trim());
      e.target.textContent = ''; // Clear cell while dragging
    });

    cell.addEventListener('dragover', (e) => {
      e.preventDefault(); // Allow drop
    });

    cell.addEventListener('drop', (e) => {
      e.preventDefault();
      const droppedLetter = e.dataTransfer.getData('text/plain');
      e.target.textContent = droppedLetter;
      checkCorrectness(); // Check correctness after dropping
    });

    cell.addEventListener('touchstart', (e) => {
      draggedLetter = e.target.textContent.trim();
      e.target.textContent = ''; // Clear cell on touch start
      e.target.classList.add('dragging');
    });

    cell.addEventListener('touchmove', (e) => {
      e.preventDefault();
      const touch = e.touches[0];
      const targetCell = document.elementFromPoint(touch.clientX, touch.clientY);
      if (targetCell && targetCell.classList.contains('cell') && targetCell !== e.target) {
        targetCell.classList.add('drag-over');
      }
    });

    cell.addEventListener('touchend', (e) => {
      const touch = e.changedTouches[0];
      const targetCell = document.elementFromPoint(touch.clientX, touch.clientY);
      if (targetCell && targetCell.classList.contains('cell')) {
        targetCell.textContent = draggedLetter;
        targetCell.classList.remove('drag-over');
      }
      e.target.classList.remove('dragging');
      draggedLetter = null;
      checkCorrectness();
    });
  });
}

// Initialize the grid and functionality
function initializeGame() {
  const grid = document.querySelector('#grid');
  const letters = ['C', 'O', 'T', 'D', 'A', 'G', 'P', 'I', 'G']; // Example letters
  letters.forEach((letter, index) => {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.textContent = letter; // Fill initial grid
    grid.appendChild(cell);
  });

  addDragAndDrop(); // Add drag-and-drop functionality
}

// Run the game setup
initializeGame();
