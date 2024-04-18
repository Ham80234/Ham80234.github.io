function random(event) { 
    let letters = document.getElementsByClassName('letter') 
    console.log(letters);
}

const defaults = {
    spread: 360,
    ticks: 50,
    gravity: 0,
    decay: 0.94,
    startVelocity: 30,
    shapes: ["star"],
    colors: ["FFE400", "FFBD00", "E89400", "FFCA6C", "FDFFB8"],
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
  



  function trigger() { 

    let ctx = document.getElementById('click')
    ctx.classList.add('animate__hinge')

    setTimeout(shoot, 100);
    setTimeout(shoot, 100);
    setTimeout(shoot, 200);
    setTimeout(shoot, 300);
    setTimeout(shoot, 400);
    setTimeout(shoot, 500);
    setTimeout(shoot, 600);
    setTimeout(shoot, 700);
    setTimeout(shoot, 800);

    let will = document.getElementById('will')
    will.classList.remove('hide')
    will.classList.add('animate__lightSpeedInLeft')

    let you = document.getElementById('you')
    you.classList.remove('hide')
    you.classList.add('animate__lightSpeedInLeft')


    let quest = document.getElementById('quest')
    quest.classList.remove('hide')
    quest.classList.add('animate__rollIn')

    let up = document.getElementsByClassName('up')
    let down = document.getElementsByClassName('down')
    console.log(up)

    
    Array.from(up).forEach(e => {
        e.classList.remove('hide')
        e.classList.add('animate__bounceInUp')
    })

    Array.from(down).forEach(e => {
        e.classList.remove('hide')
        e.classList.add('animate__bounceInDown')
    })

  }