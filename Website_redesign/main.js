addEventListener("mousemove", (event) => {});

onmousemove = (event) => {
   let circle =  document.getElementById('mouse')
   console.log(event);
   circle.style.top = event.Y
};