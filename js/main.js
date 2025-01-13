let wrapper = document.querySelector("#wrapper");
let video = document.querySelector("video");
let button = document.querySelector("#btnMusicOnOff");

let isPlaying = false;
let timeout = null;

video.volume = 0.2;

function togglePlay() {
  if (!isPlaying) {
    video.muted = false;
    isPlaying = true;
    button.innerHTML = "<i class='fa-solid fa-volume-xmark'></i>";

    wrapper.classList.remove("opacity-60");
  } else {
    video.muted = true;
    isPlaying = false;
    button.innerHTML = "<i class='fa-solid fa-volume-high'></i>";

    wrapper.classList.add("opacity-60");
  }
}

// Hide button after 2 seconds
function hideElements() {
  if (isPlaying) {
    button.classList.add("opacity-0", "transition-opacity", "duration-200");
  }
}

// Reset timeout and show button when video is not playing
function resetHideElements() {
  clearTimeout(timeout);
  button.classList.remove("opacity-0", "transition-opacity", "duration-200");
  timeout = setTimeout(hideElements, 2000);
}

resetHideElements();

// Add event listeners
document.addEventListener("mousemove", resetHideElements);

// Check if user is on mobile
if (window.innerWidth <= 1024) {
  // Remove all elements from body
  document.body.innerHTML = "";
}
