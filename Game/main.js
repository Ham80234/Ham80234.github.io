let result = [
    [' ', 'D', ' ', 'S', ' '],
    ['R', 'E', 'K', 'E', 'N'],
    [' ', 'T', ' ', 'U', ' '],
    ['F', 'E', 'K', 'S', 'S'],
    [' ', 'R', ' ', 'S', ' ']
]

let solved = [
    [' ', 'R', ' ', 'S', ' '],
    ['D', 'E', 'S', 'K', 'S'],
    [' ', 'F', ' ', 'U', ' '],
    ['T', 'E', 'E', 'N', 'S'],
    [' ', 'R', ' ', 'K', ' ']
]

let score = []

let Running = true;
let moves = 0

let letterMoving = ''
let dropLetter = ''

    function setboard() {
        if (checkWin()) { 

            
            score.shift()
            console.log(score);

            let s = document.getElementById('score')
            s.style.display = 'flex'
            
            setTimeout(shoot, 100)
            setTimeout(shoot, 200)
            setTimeout(shoot, 300)
        }
        let board = document.getElementById("gameboard")
        board.innerHTML = ''
        result.forEach((item, idx) => {
            item.forEach((letter, idx2) => {
                board.appendChild(createPeice(letter, [], idx, idx2))
            })
        })
    }

    function checkWin() {
        let amount = document.querySelectorAll('#gameboard > .peice')
        let correct = document.querySelectorAll('#gameboard > .correct')
        let partial = document.querySelectorAll('#gameboard > .partial')

        score.push((correct.length + (partial.length/2))/amount.length)
        console.log(score);
        return solved.map((row, i) => {
            return row.map((cell, j) => cell === result[i][j]).every(Boolean);
        }).every(Boolean);
    }

    function checkPeice(item){
        if (Running){
            let pos1 = item.getAttribute('pos1')
            let pos2 = item.getAttribute('pos2')
            let letter = item.innerHTML
            const letterSolved = solved[pos1][pos2]

            let lettersToCheck = []
            let row = solved[pos1]
            let col = []
            solved.forEach(i => col.push(i[pos2]))
            
            lettersToCheck = [[...getReleventLetters(row, pos1)], [...getReleventLetters(col, pos2)]]
            if(letter == letterSolved) { 
                return 'correct'
            }
            if (lettersToCheck.flat().includes(letter)){
                return 'partial'
            }
    }
    }

    function getReleventLetters(arr, pos) {
        // if no spaces then return full row, 
        // if a space on both sides just retrun the letter
         
        if (!arr.some(item => item.split(',')[0] === ' ')){
            return arr
        }else {
            return [arr[pos]]
        }
    }


    function allowDrop(ev) {
        
        ev.preventDefault();
      }

    function drop(ev) {
        let movesDOM = document.getElementById('moves')
        dropLetter = ev.target
        let LMpos1 = letterMoving.getAttribute('pos1')
        let LMpos2 = letterMoving.getAttribute('pos2')
        
        let DLpos1 = dropLetter.getAttribute('pos1')
        let DLpos2 = dropLetter.getAttribute('pos2')

        let temp = result[DLpos1][DLpos2]

        result[DLpos1][DLpos2] =  result[LMpos1][LMpos2] 

        result[LMpos1][LMpos2] = temp
        if (letterMoving != dropLetter) { 
            moves += 1
            movesDOM.innerHTML = moves
        }
    
        setboard()

      }

    function drag(ev) {
        letterMoving = ev.target
    }

    function touchMove(ev) {
        let Moveable = document.getElementsByClassName('dragItem') // 
        // console.log(Moveable);
        ev.preventDefault()
        let touch = ev.touches[0]
        let target = document.elementFromPoint(touch.clientX, touch.clientY)
        let peice //
        if(Moveable.length == 0){
            peice =  createPeice(letterMoving.innerHTML, ['dragItem'], '1', '1') //
            peice.style.position = 'absolute' // 
            peice.style.width = '4rem' // 
            peice.style.height = '4rem' // 
            peice.style.transform =  'translate(-50%, -50%)' //
           
            
        }else { 
            peice =  Moveable[0]    
        }
        console.log(peice);
        peice.style.top = touch.clientX
        
        peice.style.top = `${touch.clientY}px`
        peice.style.left = `${touch.clientX}px`
        document.body.appendChild(peice)

        target.style
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
            if (letterMoving != dropLetter) { 
                moves += 1
                let movesDOM = document.getElementById('moves')
                movesDOM.innerHTML = moves
            }
            let remove = document.getElementsByClassName('dragItem')[0]
            document.body.removeChild(remove)
    
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
            peice.addEventListener('touchstart', drag, false)
            peice.addEventListener('touchmove', touchMove, false)
            peice.addEventListener('touchend', touchEnd, false)
            peice.pos2 = pos2
            peice.ondragstart = drag
            peice.ondrop = drop
            peice.ondragover = allowDrop
            peice.draggable = true  
            classes.push(checkPeice(peice))
            peice.classList.add(...classes)
          
        }
        return peice
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
    let date = new Date()
    let res = `CrossDrop Score for ${date.getMonth()+1}/${date.getDate()}\n`
    console.log(score);
    score.forEach((percentage, idx) => {
        let rating = ['🟥', '🟨', '🤏',]
        res += `turn ${idx+1}: ${percentage * 100}%\n`
    })

    res += 'Crossdrop: https://ham80234.github.io/Game'
    navigator.clipboard.writeText(res)
    let checkmark = document.getElementById('checkmark')
    checkmark.style.opacity = 100
    setTimeout()
}