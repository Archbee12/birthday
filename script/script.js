
let isDark = false;

const wishes = [
  "Wishing you a day filled with love and cheer! 🎉",
  "May your birthday be as amazing as you are! 🌟",
  "Another year older, but forever young at heart. 💖",
  "Hope your day is full of cake and laughter! 🍰😂",
  "Celebrate big, shine bright, and smile wide! ✨"
];

function launchConfettiBurst() {
  confetti({
    particleCount: 100,
    spread: 80,
    origin: { y: 0.6 }
  });
}

document.getElementById("toggleMode").addEventListener("click", function () {
  isDark = !isDark;
  document.body.classList.toggle("dark-mode");
  this.textContent = isDark ? "🌞" : "🌙";
});

document.getElementById("checkBtn").addEventListener("click", function () {
  const name = document.getElementById("nameInput").value.trim();
  const birthDate = new Date(document.getElementById("dateInput").value);
  const message = document.getElementById("message");
  const audio = document.getElementById("birthdaySong");
  const balloonContainer = document.getElementById("balloons");

  message.classList.remove("show");
  balloonContainer.innerHTML = ""; // Clear old balloons

  if (!name || isNaN(birthDate)) {
    message.textContent = "Please enter a valid name and birth date.";
    message.classList.add("show");
    return;
  }

  const today = new Date();
  const birthdayThisYear = new Date(today.getFullYear(), birthDate.getMonth(), birthDate.getDate());

  let resultText = "";

  if (
    today.getMonth() === birthDate.getMonth() &&
    today.getDate() === birthDate.getDate()
  ) {
    // 🎊 Birthday actions!
    const randomWish = wishes[Math.floor(Math.random() * wishes.length)];
    resultText = `🎉 Happy Birthday, ${name}! 🥳\n${randomWish}`;

    audio.play();

    // Balloons
    for (let i = 0; i < 10; i++) {
      const balloon = document.createElement("div");
      balloon.className = "balloon";
      balloon.textContent = "🎈";
      balloon.style.left = Math.random() * 90 + "%";
      balloon.style.animationDuration = (Math.random() * 3 + 3) + "s";
      balloonContainer.appendChild(balloon);
    }

    // 🎊 Initial confetti burst
    launchConfettiBurst();

    // Confetti every 3 seconds for 15 seconds
    let confettiInterval = setInterval(launchConfettiBurst, 3000);
    setTimeout(() => clearInterval(confettiInterval), 15000);

  } else {
    const oneDay = 24 * 60 * 60 * 1000;
    let daysLeft = Math.ceil((birthdayThisYear - today) / oneDay);
    if (daysLeft < 0) {
      const nextYearBirthday = new Date(today.getFullYear() + 1, birthDate.getMonth(), birthDate.getDate());
      daysLeft = Math.ceil((nextYearBirthday - today) / oneDay);
    }
    resultText = `Hi ${name}, your birthday is in ${daysLeft} day(s)! 🎈`;
  }

  message.textContent = resultText;
  message.classList.add("show");
});

document.getElementById("playMusicBtn").addEventListener("click", function () {
  const audio = document.getElementById("birthdaySong");

  audio.pause();            // Stop if already playing
  audio.currentTime = 0;    // Restart from beginning

  audio.play().catch((err) => {
    console.log("Couldn't play audio:", err);
    alert("Your browser blocked the audio. Try clicking the button again.");
  });
});

