window.onload = function () {
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
  const clonedEl1 = el1.cloneNode(true);
  const clonedEl2 = el2.cloneNode(true);
  
  // Replace them in the DOM.
  el1.parentNode.replaceChild(clonedEl2, el1);
  el2.parentNode.replaceChild(clonedEl1, el2);
  
  // Reattach pointerdown event listeners to the new clones.
  clonedEl1.addEventListener('pointerdown', onPointerDown);
  clonedEl2.addEventListener('pointerdown', onPointerDown);
}


}
