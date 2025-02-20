window.onload = function(){
  
  let boxes = document.getElementsByClassName('box')
console.log(boxes);

console.log(boxes.length); // Ensure length is 1
console.log(boxes[0])

function drag(e) {
  console.log(e);
  
}

function dragging(e) {

  // console.log(e);
    
}

function drop(e) {
  console.log('drop');
}
let obj = Array.from((document.getElementsByClassName('box')[0]))
console.log(obj);

boxes[0].addEventListener('dragstart', drag)
boxes[0].addEventListener('drag', dragging)
boxes[0].addEventListener('dragend', drop)
}

