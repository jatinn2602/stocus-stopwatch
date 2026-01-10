let [seconds, minutes, hours] = [0, 0, 0];
let displayTime = document.getElementById("displayTime");
let timer = null;
const switchBtn = document.querySelector(".play");
let number = 0;
let num = 0;
const fullscreenBtn = document.querySelector(".fullScreen");
const wallpapersBtn = document.querySelector(".wallpaperBtn");
const wallpaperDialog = document.querySelector(".dialog");
const closeBtn = document.querySelector(".closeBtn");

//timer
function stopwatch() {
  seconds++;
  if (seconds == 60) {
    seconds = 0;
    minutes++;
    if (minutes == 60) {
      minutes = 0;
      hours++;
    }
  }

  let h = hours < 10 ? "0" + hours : hours;
  let m = minutes < 10 ? "0" + minutes : minutes;
  let s = seconds < 10 ? "0" + seconds : seconds;
  displayTime.innerHTML = h + ":" + m + ":" + s;
}

// resets the ongoing timer
function watchReset() {
  clearInterval(timer);
  [seconds, minutes, hours] = [0, 0, 0];
  displayTime.innerHTML = "00:00:00";
  switchBtn.innerHTML = "Start";
  switchBtn.style.background = "#D25353";
  switchBtn.style.border = "5px solid #D25353";
  number = 0;
}

//switch between start and stop button
function switchButton() {
  if (number === 0) {
    timer = setInterval(stopwatch, 1000);
    switchBtn.innerHTML = "Stop";
    switchBtn.style.background = "transparent";
    switchBtn.style.border = "5px solid white";
    number = 1;
    console.log(number);
  } else if (number === 1) {
    clearInterval(timer);
    switchBtn.innerHTML = "Resume";
    switchBtn.style.background = "#D25353";
    switchBtn.style.border = "5px solid #D25353";
    number = 0;
    console.log(number);
  }
}

//fullscreen click event
let isFullscreen = false;

fullscreenBtn.addEventListener("click", () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
    fullscreenBtn.src = "images/minimize.png";
    document.body.style.height = "81vh";
    isFullscreen = true;
  } else {
    document.exitFullscreen();
    fullscreenBtn.src = "images/full-size.png";
    document.body.style.height = "76vh";
    isFullscreen = false;
  }
});

//fullscreen by pressing 'f' button
document.addEventListener("keydown", (e) => {
  if (e.key === "f" || e.key === "F") {
    document.documentElement.requestFullscreen();
  }
});
document.addEventListener("fullscreenchange", () => {
  document.body.style.height = document.fullscreenElement ? "81vh" : "76vh";
});

//wallpaper dialog box toggle
wallpapersBtn.addEventListener("click", () => {
  wallpaperDialog.style.display = "flex";
});
closeBtn.addEventListener("click", () => {
  wallpaperDialog.style.display = "none";
});

//wallpaper selection

const wallpaperImages = [
  "https://i.pinimg.com/736x/67/07/17/670717930e42e77b96933f157ab3aa29.jpg",
  "https://i.pinimg.com/736x/bc/44/8b/bc448b2c1a788e86f1dc71413e24b883.jpg",
  "https://i.pinimg.com/1200x/de/d5/3f/ded53f0f51047a7686808d3eb4b4e143.jpg",
  "https://i.pinimg.com/736x/83/dd/29/83dd2961a32eec253eb6af37344a12f2.jpg",
  "https://i.pinimg.com/736x/1f/d7/30/1fd730eccc287715036ead0d3531694e.jpg",
  "https://i.pinimg.com/1200x/59/61/38/596138beb239ada8aab67dbb4e288be7.jpg",
  "https://i.pinimg.com/736x/7b/13/c7/7b13c7e4e3fe802f452e64959f29d4f3.jpg",
  "https://i.pinimg.com/1200x/2b/d6/c5/2bd6c56fc6519514ada6add14d821fcb.jpg",
  "https://i.pinimg.com/1200x/13/c8/ac/13c8ac48ee7f486faf6aadd437b2d069.jpg",
];

const container = document.querySelector(".wallpapers");

wallpaperImages.forEach((src) => {
  const box = document.createElement("div");
  box.className = "box";

  const img = document.createElement("img");
  img.className = "image";
  img.src = src;

  box.appendChild(img);
  container.appendChild(box);
});

container.addEventListener("click", (e) => {
  if (e.target.tagName === "IMG") {
    document.body.style.backgroundImage = `url(${e.target.src})`;
    wallpaperDialog.style.display = "none";
  }
});

//black screen toggle
const black = document.querySelector(".black");
// function blackScreenToggle() {
//   black.addEventListener("click", () => {
//   if (number === 0) {
//       document.body.style.backgroundImage = "none";
//       black.innerHTML = "Switch Back";
//       number = 1;
//     }
//     else if (number===1) {
//       document.body.style.backgroundImage = `linear-gradient(rgba(0,0,0,0.4),rgba(0,0,0,0.4)),url(images/background.jpg)`;
//       black.innerHTML = "Switch to Black Screen";
//       number =0;
//     }
// })}

black.addEventListener("click", () => {
  const isBlack = document.body.classList.toggle("black-screen");

  black.innerHTML = isBlack ? "Switch Back" : "Switch to Black Screen";
});
