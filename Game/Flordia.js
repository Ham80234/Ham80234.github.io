let resultArr = [
  [
    ["A", "E", "D", "H", "W"],
    ["R", " ", "A", " ", "S"],
    ["T", " ", "T", " ", "I"],
    ["I", "O", "W", "D", "A"],
    ["T", " ", "O", " ", "W"],
  ],
  [
    ["E", "E", "M", "N", "M"],
    ["H", " ", " ", "E", " "],
    ["E", "R", "I", "T", "I"],
    ["O", " ", " ", "I", " "],
    ["S", "S", "Y", "O", "L"],
  ],
  [
    ["E", "R", "C", "K", "I"],
    ["E", " ", " ", "N", " "],
    ["C", "R", "A", "D", "V"],
    ["E", " ", " ", "R", " "],
    ["A", " ", " ", "E", " "],
  ],
  [
    ["R", "E", "I", "H", "M"],
    ["A", " ", " ", "E", " "],
    ["T", "O", "E", "X", "L"],
    ["D", " ", " ", "D", " "],
    ["R", "I", "E", "S", "D"],
  ],
  [
    ["T", "A", "R", "N", "E"],
    ["L", " ", "S", " ", "N"],
    ["D", "S", "P", "O", "C"],
    ["A", " ", "A", " ", "O"],
    ["N", "R", "O", "O", "T"],
  ],
];

let solvedArr = [
  [
    ["W", "I", "D", "O", "W"],
    ["A", " ", "A", " ", "O"],
    ["I", " ", "T", " ", "R"],
    ["S", "W", "E", "A", "T"],
    ["T", " ", "D", " ", "H"],
  ],
  [
    ["S", "M", "I", "L", "E"],
    ["H", " ", " ", "I", " "],
    ["E", "N", "E", "M", "Y"],
    ["E", " ", " ", "I", " "],
    ["R", "O", "O", "T", "S"],
  ],
  [
    ["N", "I", "E", "C", "E"],
    ["E", " ", " ", "R", " "],
    ["R", "A", "D", "A", "R"],
    ["V", " ", " ", "C", " "],
    ["E", " ", " ", "K", " "],
  ],
  [
    ["H", "I", "R", "E", "D"],
    ["E", " ", " ", "X", " "],
    ["A", "D", "M", "I", "T"],
    ["R", " ", " ", "L", " "],
    ["D", "O", "S", "E", "E"],
  ],
  [
    ["H", "E", "A", "V", "E"],
    ["I", " ", " ", "E", " "],
    ["D", " ", " ", "I", " "],
    ["E", "A", "G", "L", "E"],
    ["S", " ", " ", "S", " "],
  ],
  [
    ["S", "T", "O", "O", "L"],
    ["C", " ", "P", " ", "O"],
    ["A", "R", "E", "N", "A"],
    ["N", " ", "R", " ", "N"],
    ["T", "O", "A", "D", "S"],
  ],
];
let score = [];
let dayOfweek = new Date();
let solved = solvedArr[dayOfweek.getDay() % 6];
let result = resultArr[dayOfweek.getDay() % 6];

function scramble(arr) {
  let res = arr.flat();
  for (let i = 0; i < 5000; i++) {
    let a = Math.floor(Math.random() * res.length);
    let b = Math.floor(Math.random() * res.length);

    if (res[a] !== " " && res[b] !== " ") {
      let temp = res[a];
      res[a] = res[b];
      res[b] = temp;
    }
  }
  console.log(res);
}

scramble(solved);

let Running = true;
let moves = 0;

let letterMoving = "";
let dropLetter = "";

function setboard() {
  if (checkWin()) {
    score.shift();

    let s = document.getElementById("score");
    s.style.display = "flex";

    setTimeout(shoot, 100);
    setTimeout(shoot, 200);
    setTimeout(shoot, 300);
  }
  let board = document.getElementById("gameboard");
  board.innerHTML = "";
  result.forEach((item, idx) => {
    item.forEach((letter, idx2) => {
      board.appendChild(createPeice(letter, [], idx, idx2));
    });
  });
}

function checkWin() {
  let amount = document.querySelectorAll("#gameboard > .peice");
  let correct = document.querySelectorAll("#gameboard > .correct");
  let partial = document.querySelectorAll("#gameboard > .partial");

  score.push((correct.length + partial.length / 2) / amount.length);

  return solved
    .map((row, i) => {
      return row.map((cell, j) => cell === result[i][j]).every(Boolean);
    })
    .every(Boolean);
}

function checkPeice(item) {
  if (Running) {
    let pos1 = item.getAttribute("pos1");
    let pos2 = item.getAttribute("pos2");
    let letter = item.innerHTML;
    const letterSolved = solved[pos1][pos2];

    let lettersToCheck = [];
    let row = solved[pos1];
    let col = [];
    solved.forEach((i) => col.push(i[pos2]));

    lettersToCheck = [
      [...getReleventLetters(row, pos1, letter)],
      [...getReleventLetters(col, pos2, letter)],
    ];
    if (letter == letterSolved) {
      item.removeEventListener("ondrop", drop);
      item.removeEventListener("touchend", touchEnd);
      item.removeEventListener("ondragover", allowDrop);
      item.removeEventListener("touchmove", touchMove);
      item.removeEventListener("touchstart", drag);
      item.removeEventListener("ondragstart", drag);

      return "correct";
    }
    if (lettersToCheck.flat().includes(letter)) {
      return "partial";
    }
  }
}

function getReleventLetters(arr, pos, letter) {
  // if no spaces then return full row,
  // if a space on both sides just retrun the letter
  let res = [];
  if (!arr.some((item) => item == " ")) {
    res = arr;
  } else {
    res = [];
  }
  //filter out solved

  return res;
}

function allowDrop(ev) {
  ev.preventDefault();
}

function drop(ev) {
  let movesDOM = document.getElementById("moves");
  dropLetter = ev.target;
  let LMpos1 = letterMoving.getAttribute("pos1");
  let LMpos2 = letterMoving.getAttribute("pos2");

  let DLpos1 = dropLetter.getAttribute("pos1");
  let DLpos2 = dropLetter.getAttribute("pos2");

  let temp = result[DLpos1][DLpos2];

  result[DLpos1][DLpos2] = result[LMpos1][LMpos2];

  result[LMpos1][LMpos2] = temp;
  if (letterMoving != dropLetter && !dropLetter.classList.contains('correct') && !letterMoving.classList.contains('correct')) {
    moves += 1;
    movesDOM.innerHTML = moves;
    setboard();
  }
}

function drag(ev) {
  if(!ev.target.classList.contains('correct')) {
    letterMoving = ev.target;
  }
}

function touchMove(ev) {
  ev.preventDefault();
  let touch = ev.touches[0];
  let target = document.elementFromPoint(touch.clientX, touch.clientY);
  target.style.position = "relative";
  target.style.left = ev.clientX - target.offsetWidth / 2 + "px";
  target.style.top = ev.clientY - target.offsetHeight / 2 + "px";

  target.style;
  if (target && target.classList.contains("peice")) {
    dropLetter = target;
  }
}

function touchEnd(ev) {
  ev.preventDefault();
  if (dropLetter) {
    let LMpos1 = letterMoving.getAttribute("pos1");
    let LMpos2 = letterMoving.getAttribute("pos2");

    let DLpos1 = dropLetter.getAttribute("pos1");
    let DLpos2 = dropLetter.getAttribute("pos2");

    let temp = result[DLpos1][DLpos2];

    result[DLpos1][DLpos2] = result[LMpos1][LMpos2];
    result[LMpos1][LMpos2] = temp;
    if (letterMoving != dropLetter && !dropLetter.classList.contains('correct') && !letterMoving.classList.contains('correct')) {
      moves += 1;
      let movesDOM = document.getElementById("moves");
      movesDOM.innerHTML = moves;
      setboard();
    }
  }
}

function createPeice(content, classes = [], pos1, pos2) {
  let peice = document.createElement("div");
  if (content != " ") {
    classes.push("peice");

    peice.innerText = content;

    peice.setAttribute("pos1", pos1);
    peice.setAttribute("pos2", pos2);
    peice.addEventListener("touchstart", drag, false);
    peice.addEventListener("touchmove", touchMove, false);
    peice.addEventListener("touchend", touchEnd, false);
    peice.pos2 = pos2;
    peice.ondragstart = drag;
    peice.ondrop = drop;
    peice.ondragover = allowDrop;
    peice.draggable = true;
    classes.push(checkPeice(peice));
    peice.classList.add(...classes);
  }
  return peice;
}

const defaults = {
  spread: 360,
  ticks: 50,
  gravity: 0,
  decay: 0.94,
  startVelocity: 30,
  shapes: ["star"],
  colors: ["a7c957", "f3de2c"],
};

function shoot() {
  confetti({
    ...defaults,
    particleCount: 40,
    scalar: 1.2,
    shapes: ["star"],
  });

  confetti({
    ...defaults,
    particleCount: 10,
    scalar: 0.75,
    shapes: ["circle"],
  });
}

function copyScore() {
  let date = new Date();
  let res = `CrossDrop Score for ${date.getMonth() + 1}/${date.getDate()}\n`;
  score.forEach((percentage, idx) => {
    let rating = ["🟥", "🟨", "🤏"];
    res += `turn ${idx + 1}: ${parseFloat(percentage * 100).toFixed(2)}%\n`;
  });

  res += "Crossdrop: https://ham80234.github.io/Game";
  navigator.clipboard.writeText(res);
  let checkmark = document.getElementById("checkmark");
  checkmark.style.opacity = 100;
  setTimeout();
}
