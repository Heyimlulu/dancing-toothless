let wrapper = document.querySelector("#wrapper");
let video = document.querySelector("video");
let button = document.querySelector("#btnMusicOnOff");
let aboutModal = document.querySelector("#aboutModal");

let isPlaying = false;
let timeout = null;

video.volume = 0.2;

function togglePlay() {
  if (!isPlaying) {
    video.muted = false;
    isPlaying = true;
    button.innerHTML = "<i class='fa-solid fa-volume-xmark'></i> Stop Music";

    wrapper.classList.remove("opacity-60");
    
    // Track play event
    if (typeof gtag !== 'undefined') {
      gtag('event', 'play_music', {
        'event_category': 'interaction',
        'event_label': 'music_on'
      });
    }
  } else {
    video.muted = true;
    isPlaying = false;
    button.innerHTML = "<i class='fa-solid fa-music'></i> Music On/Off";

    wrapper.classList.add("opacity-60");
    
    // Track stop event
    if (typeof gtag !== 'undefined') {
      gtag('event', 'stop_music', {
        'event_category': 'interaction',
        'event_label': 'music_off'
      });
    }
  }
}

function toggleAbout() {
  if (aboutModal.classList.contains("hidden")) {
    aboutModal.classList.remove("hidden");
    
    // Track open modal event
    if (typeof gtag !== 'undefined') {
      gtag('event', 'view_about', {
        'event_category': 'interaction',
        'event_label': 'about_modal_open'
      });
    }
  } else {
    aboutModal.classList.add("hidden");
  }
}

function copyLink(e) {
  e.preventDefault();
  navigator.clipboard.writeText("https://toothless.fun");
  const icon = e.currentTarget.querySelector("i");
  const originalClass = icon.className;
  
  icon.className = "fa-solid fa-check text-xl";
  setTimeout(() => {
    icon.className = originalClass;
  }, 2000);
  
  // Track copy link event
  if (typeof gtag !== 'undefined') {
    gtag('event', 'share', {
      'method': 'copy_link',
      'content_type': 'link'
    });
  }
}


let aboutBtn = document.querySelector("button[onclick='toggleAbout()']");
let installBtn = document.querySelector("#btnInstall");
let shareButtons = document.querySelector(".fixed.right-6.top-6");
let deferredPrompt;

// PWA Install Logic
window.addEventListener('beforeinstallprompt', (e) => {
  // Prevent Chrome 67 and earlier from automatically showing the prompt
  e.preventDefault();
  // Stash the event so it can be triggered later.
  deferredPrompt = e;
  // Update UI to notify the user they can add to home screen
  installBtn.classList.remove('hidden');
});

async function installApp() {
  if (deferredPrompt) {
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    deferredPrompt = null;
    installBtn.classList.add('hidden');
    
    // Track install event
    if (typeof gtag !== 'undefined') {
      gtag('event', 'install_app', {
        'event_category': 'engagement',
        'event_label': 'pwa_install'
      });
    }
  }
}

// Hide elements after 2 seconds
function hideElements() {
  if (isPlaying) {
    button.classList.add("opacity-0", "transition-opacity", "duration-200");
    aboutBtn.classList.add("opacity-0", "transition-opacity", "duration-200");
    installBtn.classList.add("opacity-0", "transition-opacity", "duration-200");
    shareButtons.classList.add("opacity-0", "transition-opacity", "duration-200");
  }
}

// Reset timeout and show elements when video is not playing
function resetHideElements() {
  clearTimeout(timeout);
  button.classList.remove("opacity-0", "transition-opacity", "duration-200");
  aboutBtn.classList.remove("opacity-0", "transition-opacity", "duration-200");
  installBtn.classList.remove("opacity-0", "transition-opacity", "duration-200");
  shareButtons.classList.remove("opacity-0", "transition-opacity", "duration-200");
  
  // Only set timeout if video is playing
  if (isPlaying) {
    timeout = setTimeout(hideElements, 2000);
  }
}

resetHideElements();

// Add event listeners
document.addEventListener("mousemove", resetHideElements);
document.addEventListener("keydown", (e) => {
  if (e.code === "Space") {
    e.preventDefault(); // Prevent scrolling
    togglePlay();
    resetHideElements();
  }
});
