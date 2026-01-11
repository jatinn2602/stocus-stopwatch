//timer

let [seconds, minutes, hours] = [0, 0, 0];
const displayTime = document.getElementById("displayTime");
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
let timer = null;
const switchBtn = document.querySelector(".play");
const reset = document.querySelector(".reset");
let number = 0;
function watchReset() {
  clearInterval(timer);
  [seconds, minutes, hours] = [0, 0, 0];
  displayTime.innerHTML = "00:00:00";
  switchBtn.innerHTML = "Start";
  switchBtn.style.background = "#D25353";
  switchBtn.style.border = "5px solid #D25353";
  number = 0;
}
reset.addEventListener("click", watchReset);

//switch between start and stop button
function switchButton() {
  if (number === 0) {
    timer = setInterval(stopwatch, 1000);
    switchBtn.innerHTML = "Stop";
    switchBtn.style.background = "transparent";
    switchBtn.style.border = "5px solid white";
    number = 1;
  } else if (number === 1) {
    clearInterval(timer);
    switchBtn.innerHTML = "Resume";
    switchBtn.style.background = "#D25353";
    switchBtn.style.border = "5px solid #D25353";
    number = 0;
  }
}

switchBtn.addEventListener("click", switchButton);

//fullscreen click event
let isFullscreen = false;
const fullscreenBtn = document.querySelector(".fullScreen");

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
const wallpapersBtn = document.querySelector(".wallpaperBtn");
const wallpaperDialog = document.querySelector(".dialog");
const closeBtn = document.querySelector(".closeBtn");

function openWallpaperDialog() {
  wallpaperDialog.style.display = "flex";
  gsap.set(".container", { clearProps: "all" });
  wallpaperDialog.style.display = "flex";

  gsap.from(".container", {
    y: 40,
    opacity: 0,
    duration: 0.6,
    ease: "power1.inOut",
  });
}

wallpapersBtn.addEventListener("click", openWallpaperDialog);

function closeWallpaperDialog() {
  gsap.to(".container", {
    y: 40,
    opacity: 0,
    duration: 0.4,
    ease: "power1.inOut",
    onComplete: () => {
      wallpaperDialog.style.display = "none";

      gsap.set(".container", {
        clearProps: "all",
      });
    },
  });
}

closeBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  closeWallpaperDialog();
});

//wallpaper objects

const wallpaperImages = [
  "images/wallpapers/1.jpg",
  "images/wallpapers/2.jpg",
  "images/wallpapers/3.png",
  "images/wallpapers/4.jpg",
  "images/wallpapers/5.png",
  "images/wallpapers/6.jpg",
  "images/wallpapers/7.jpg",
  "images/wallpapers/8.jpg",
  "images/wallpapers/9.jpg",
  "images/wallpapers/10.jpg",
];

//wallpaper insertion
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

//function for sync applied wallpapaer

const images = document.querySelectorAll(".image");
function syncActiveWallpaper(currentWallpaper) {
  images.forEach((img) => {
    if (img.src === currentWallpaper) {
      img.classList.add("active");
    } else {
      img.classList.remove("active");
    }
  });
}

//apply seleceted wallpaper
images.forEach((img) => {
  img.addEventListener("click", (e) => {
    const wallpaper = img.src;
    document.body.style.backgroundImage = `url(${wallpaper})`;
    syncActiveWallpaper(wallpaper);
    e.stopPropagation();
    closeWallpaperDialog();
    document.body.classList.remove("black-screen");
    black.innerHTML = "Switch to Black Screen";
  });
});

//black screen toggle
const black = document.querySelector(".black");
black.addEventListener("click", () => {
  const isBlack = document.body.classList.toggle("black-screen");

  black.innerHTML = isBlack ? "Switch Back" : "Switch to Black Screen";
  clearActiveWallpapers();
});

//function to remove active wallpaper border
function clearActiveWallpapers() {
  document
    .querySelectorAll(".image")
    .forEach((img) => img.classList.remove("active"));
}

//Stocus click refresh page
const heading = document.querySelector(".heading");
heading.addEventListener("click", (e) => {
  window.location.reload();
  console.log(e.target);
});

//custom wallpaper input
const addWallpaperBtn = document.querySelector(".add-wallpaper");
const fileInput = document.getElementById("customWallpaperInput");

addWallpaperBtn.addEventListener("click", () => {
  fileInput.click(); //opens file dialog
});

//apply custom wallpaper
fileInput.addEventListener("change", (e) => {
  const file = e.target.files[0];

  if (!file) return;

  // Optional: validate file type
  if (!file.type.startsWith("image/")) {
    alert("Please select an image file");
    return;
  }

  const imageURL = URL.createObjectURL(file);

  // apply as wallpaper
  document.body.style.backgroundImage = `url(${imageURL})`;

  // clear active class from preset wallpapers
  document
    .querySelectorAll(".image")
    .forEach((img) => img.classList.remove("active"));
});

//hide wallpaper choosing dialog box when we click anywhere on the screem
const dialog = document.querySelector(".dialog");
dialog.addEventListener("click", (e) => {
  e.stopPropagation();
  closeWallpaperDialog();
});

//gsap
const tl = gsap.timeline();

//timer animation
tl.from("#displayTime,.black,.buttons,.container", {
  y: 50,
  opacity: 0,
  duration: 1.3,
  ease: "power3.out",
})
  .from(".button,.heading", {
    x: -50,
    opacity: 0,
    duration: 1.2,
    ease: "power3.out",
  },"-=1.2")
  .from(
    ".fullScreen",
    {
      x: 50,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
    },
    "-=1.2"
  );
