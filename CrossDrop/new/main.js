window.onload = function () {
    let gameboard  = [
      ["P", "H", "X", "P", "O"],
      ["T", " ", "R", " ", "E"],
      ["S", " ", "O", " ", "C"],
      ["A", "A", "R", "S", "E"],
      ["E", " ", "S", " ", "S"],
    ];
  
    let gameGrid = document.getElementById('grid')
  
    function create_gameBoard() { 
      gameboard.forEach((i, idx) => {
        i.forEach((j, jdx) => {
          let peice = document.createElement('div')
          console.log(jdx);
          peice.setAttribute('x', idx)
          peice.setAttribute('y', jdx)
          if (j != ' '){ 
            peice.classList += 'grid-item'
          }else{
            peice.classList += 'blank_space'
          }
          peice.innerHTML = j;
          gameGrid.appendChild(peice)
        })
      })
    }
  
    create_gameBoard()
  
  
  
    let draggedItem = null;
    let startX = 0;
    let startY = 0;
    // Add pointerdown event to every grid item.
    document.querySelectorAll('.grid-item').forEach(item => {
      item.addEventListener('pointerdown', onPointerDown);
    });
  
    function onPointerDown(e) {
      draggedItem = this;
      // Record where the pointer started.
      startX = e.clientX;
      startY = e.clientY;
      
      // Add dragging style.
      draggedItem.classList.add('dragging');
      
      // Set pointer capture to receive all pointer events.
      draggedItem.setPointerCapture(e.pointerId);
      
      // Attach pointermove and pointerup events.
      draggedItem.addEventListener('pointermove', onPointerMove);
      draggedItem.addEventListener('pointerup', onPointerUp);
      draggedItem.addEventListener('pointercancel', onPointerUp);
    }
  
    function onPointerMove(e) {
      // Calculate the movement delta.
      const deltaX = e.clientX - startX;
      const deltaY = e.clientY - startY;
      // Move the element using CSS transform.
      draggedItem.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
    }
  
    function onPointerUp(e) {
      // Remove the pointer event listeners.
      draggedItem.removeEventListener('pointermove', onPointerMove);
      draggedItem.removeEventListener('pointerup', onPointerUp);
      draggedItem.removeEventListener('pointercancel', onPointerUp);
      
      // Remove dragging style and reset transform.
      draggedItem.classList.remove('dragging');
      draggedItem.style.transform = '';
  
      // Determine the drop target.
      const dropX = e.clientX;
      const dropY = e.clientY;
      
      // Temporarily hide the dragged item so elementFromPoint returns the underlying element.
      draggedItem.style.visibility = 'hidden';
      const dropTarget = document.elementFromPoint(dropX, dropY);
      draggedItem.style.visibility = 'visible';
  
      // If the drop target is another grid item, swap their positions.
      if (dropTarget && dropTarget.classList.contains('grid-item') && dropTarget !== draggedItem) {
        swapElements(draggedItem, dropTarget);
      }
      
      draggedItem = null;
    }
  
    // Function to swap two elements in the DOM.
    function swapElements(el1, el2) {
      // Clone both elements.
      // const clonedEl1 = el1.cloneNode(true);
      // const clonedEl2 = el2.cloneNode(true);
      
      // // Replace them in the DOM.
      // el1.parentNode.replaceChild(clonedEl2, el1);
      // el2.parentNode.replaceChild(clonedEl1, el2);
  
      // // Get new positions (Last)
      // const newRect1 = el1.getBoundingClientRect();
      // const newRect2 = el2.getBoundingClientRect();
     
      //      // Calculate the differences (Invert)
      // const deltaX1 = rect1.left - newRect1.left;
      // const deltaY1 = rect1.top - newRect1.top;
      // const deltaX2 = rect2.left - newRect2.left;
      // const deltaY2 = rect2.top - newRect2.top;
  
      // el1.style.transition = 'none';
      // el2.style.transition = 'none';
      // el1.style.transform = `translate(${deltaX1}px, ${deltaY1}px)`;
      // el2.style.transform = `translate(${deltaX2}px, ${deltaY2}px)`;
  
      // el1.getBoundingClientRect();
      // el2.getBoundingClientRect();
  
      // el1.style.transition = 'transform 0.3s ease';
      // el2.style.transition = 'transform 0.3s ease';
      // el1.style.transform = '';
      // el2.style.transform = '';
  
      // console.log(el1);
      // console.log(el2);
  
      // let temp = {
      //   value: el1.innerHTML,
      //   x: el1.getAttribute('x'),
      //   y: el1.getAttribute('y')
      // }
  
      // console.log(temp);
      
      
      
      // // Reattach pointerdown event listeners to the new clones.
      // clonedEl1.addEventListener('pointerdown', onPointerDown);
      // clonedEl2.addEventListener('pointerdown', onPointerDown);
  
      // Get initial positions (First)
      const rect1 = el1.getBoundingClientRect();
      const rect2 = el2.getBoundingClientRect();
      
      // Create a temporary placeholder to help swap positions.
      const placeholder = document.createElement('div');
      placeholder.style.width = `${rect1.width}px`;
      placeholder.style.height = `${rect1.height}px`;
      el1.parentNode.insertBefore(placeholder, el1);
      
      // Swap elements in the DOM.
      // (If the elements are adjacent, the order must be handled carefully.)
      if (el1.nextElementSibling === el2) {
        el1.parentNode.insertBefore(el2, el1);
      } else {
        el2.parentNode.insertBefore(el1, el2);
      }
      placeholder.parentNode.insertBefore(el2, placeholder);
      placeholder.remove();
      
      // Get new positions (Last)
      const newRect1 = el1.getBoundingClientRect();
      const newRect2 = el2.getBoundingClientRect();
  
      // Calculate the differences (Invert)
      const deltaX1 = rect1.left - newRect1.left;
      const deltaY1 = rect1.top - newRect1.top;
      const deltaX2 = rect2.left - newRect2.left;
      const deltaY2 = rect2.top - newRect2.top;
  
      // Immediately apply the inverted transform so they appear in the old positions.
      el1.style.transition = 'none';
      el2.style.transition = 'none';
      el1.style.transform = `translate(${deltaX1}px, ${deltaY1}px)`;
      el2.style.transform = `translate(${deltaX2}px, ${deltaY2}px)`;
  
      // Force reflow to ensure the browser applies the initial transform.
      el1.getBoundingClientRect();
      el2.getBoundingClientRect();
  
      // Animate to the final position (Play)
      el1.style.transition = 'transform 0.3s ease';
      el2.style.transition = 'transform 0.3s ease';
      el1.style.transform = '';
      el2.style.transform = '';
  
      // Clean up transition styles after the animation finishes.
      setTimeout(() => {
        el1.style.transition = '';
        el2.style.transition = '';
      }, 300);
  
      // Reattach pointerdown event listeners for the swapped elements.
      el1.addEventListener('pointerdown', onPointerDown);
      el2.addEventListener('pointerdown', onPointerDown);
    }
  }
