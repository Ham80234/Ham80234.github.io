document.addEventListener("DOMContentLoaded", () => {
  const spots = document.querySelectorAll(".spot");
  const buttons = document.querySelectorAll("button");
  const correctCode = "1234";
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
          alert("Access granted!");
        } else {
          alert("Wrong code!");
        }
        input = "";
      } else if (/[0-9]/.test(text)) {
        // Add digit (max 4)
        if (input.length < 4) input += text;
      }

      // Update visual spots
      spots.forEach((spot, i) => {
        spot.textContent = input[i] || "0";
      });
    });
  });
});
