document.addEventListener("DOMContentLoaded", () => {
  const spots = document.querySelectorAll(".spot");
  const buttons = document.querySelectorAll("button");
  const correctCode = "097642";
  let input = "";

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const text = btn.textContent.trim();

      if (text === "backspace") {
        // Remove last digit
        input = input.slice(0, -1);
      } else if (text === "arrow_forward") {
        // Check passcode
        if (input === correctCode) {
          secondPhase()
        } else {
          incorrect()
        }
        input = "";
      } else if (/[0-9]/.test(text)) {
        // Add digit (max 4)
        if (input.length < 6) input += text;
      }

      // Update visual spots
      spots.forEach((spot, i) => {
        spot.textContent = input[i] || "0";
      });
    });
  });
});

function secondPhase() {
    let passcode = document.getElementsByClassName('passcode')[0]
    console.log(passcode);
    let morus = document.getElementsByClassName('licence')[0]
    
    passcode.classList.remove('animate__fadeIn')
    passcode.classList.add('animate__fadeOut')
    passcode.classList.add('displayNone')

    morus.classList.remove('displayNone')
    morus.classList.add('animate__fadeIn')

}


function incorrect() {
    let input = document.getElementsByClassName('input')[0]
    input.classList.add('animate__animated')
    input.classList.add('animate__shakeX')
    input.classList.add('fontRed')
    
    setTimeout(() => {
        input.classList.remove('animate__animated')
        input.classList.remove('animate__shakeX')
        input.classList.remove('fontRed')
    
    }, 700)
    
}