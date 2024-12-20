

  
let result = [
  ["P", "H", "X", "P", "O"],
  ["T", " ", "R", " ", "E"],
  ["S", " ", "O", " ", "C"],
  ["A", "A", "R", "S", "E"],
  ["E", " ", "S", " ", "S"],
];

let solved = [
  ["H", "E", "A", "P", "S"],
  ["O", " ", "R", " ", "O"],
  ["P", " ", "E", " ", "R"],
  ["E", "X", "A", "C", "T"],
  ["S", " ", "S", " ", "S"],
];

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
  let result = [];
  for (let i = 0; i < 5; i++) {
    let r = res.slice(i * 5, i * 5 + 5);
    result.push(r);
  }
  console.log(result);
}

scramble(solved);

let score = [];

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
  }else{
    let board = document.getElementById("gameboard");   
    board.textContent = "";
    result.forEach((item, idx) => {
      item.forEach((letter, idx2) => {
        board.appendChild(createPeice(letter, [], idx, idx2));
      });
    });
  }
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

  /**
   *  letter = K
   *  row [s, p, e, c, k] solved
   *  row [k k c e b] result
   *
   *
   *  im looking at a k is there multiple Ks in the solved column if so how many (n) , then color n number
   *
   *
   */
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
  if (letterMoving != dropLetter) {
    moves += 1;
    movesDOM.innerHTML = moves;
  }

  setboard();
}

function drag(ev) {
    // console.log(ev.data.dragEvent.data.over);
    
    dropLetter = ev.data.dragEvent.data.over;
}

function touchMove(ev) {
    // console.log('touchmove');
    
    // console.log(ev.data.dragEvent.data.sensorEvent)
  let touch = ev.data.dragEvent.data.sensorEvent;
  let target = document.elementFromPoint(touch.clientX, touch.clientY);
  letterMoving = target
//   console.log(target);
//   dropLetter = document.elementFromPoint(touch.clientX, touch.clientY);
//   console.log(dropLetter    );
  
//   target.classList.add("dragging");

//   target.style;

}

function touchEnd(ev) {
    console.log(letterMoving);
    console.log(dropLetter);
    
    // dropLetter = ev.data.dragEvent.data.source
  if (dropLetter) {
    console.log('touchEnd');

    let LMpos1 = letterMoving.getAttribute("pos1");
    let LMpos2 = letterMoving.getAttribute("pos2");

    let DLpos1 = dropLetter.getAttribute("pos1");
    let DLpos2 = dropLetter.getAttribute("pos2");

    console.log(LMpos1, LMpos2, DLpos1, DLpos2);
    
    let temp = result[LMpos1][LMpos2];

    result[LMpos1][LMpos2] = result[DLpos1][DLpos2];
    result[DLpos1][DLpos2] = temp;
    if (letterMoving != dropLetter) {        
      moves += 1;
      let movesDOM = document.getElementById("moves");
      movesDOM.innerHTML = moves;
      setboard();
    console.log(result);
    
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
