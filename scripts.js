const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');
const fullScreen = player.querySelector('.fullscreen');
const fullScreenIcon = fullScreen.querySelector('.fullscreen-icon');
let inFullScreen = false;

function togglePlay() {
    // if (video.paused) {
    //     video.play();
    // } else {
    //     video.pause();
    // }
    const method = video.paused ? 'play' : 'pause';
    video[method]();
}

function updateButton() {
    const icon = this.paused ? '►' : '❚ ❚';
    toggle.textContent = icon;
}

function skip() {
    // console.log(this.dataset.skip);
    video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate() {
    video[this.name] = this.value;
    // console.log (this.value);
}

function handleProgressUpdate() {
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
    // console.log(scrubTime);
}

function toggleFullScreen() {
    if (!inFullScreen) {
        makeFullScreen();
    }
    else {
        makeNotFullscreen();
    }
}

function makeFullScreen() {
    if (player.requestFullscreen) {
        player.requestFullscreen();
    }
    else if (player.msRequestFullscreen) {
        player.msRequestFullscreen();
    }
    else if (player.mozRequestFullscreen) {
        player.mozRequestFullscreen();
    }
    else if (player.webkitExitFullscreen) {
        player.webkitExitFullscreen();
    }
    else if (player.webkitRequestFullscreen) {
        player.webkitRequestFullscreen();
    }
    inFullScreen = true;
    return;
}

function makeNotFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    }
    else if (document.msExitFullscreen) {
        document.msExitFullscreen();
    }
    else if (document.mozCancelFullscreen) {
        document.mozCancelFullscreen();
    }
    else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    }
    inFullScreen = false;
    return;
}

function updateFullScreenButton() {
    const fullScreenIconText = this.webkitIsFullScreen || this.mozIsFullScreen || this.isFullScreen ? 'fullscreen_exit' : 'fullscreen';
    fullScreenIcon.textContent = fullScreenIconText;
}

video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgressUpdate);

toggle.addEventListener('click', togglePlay);

skipButtons.forEach(button => button.addEventListener('click', skip));

ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));

let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);

fullScreen.addEventListener('click', toggleFullScreen);
document.addEventListener('webkitfullscreenchange', updateFullScreenButton);
document.addEventListener('mozfullscreenchange', updateFullScreenButton);
document.addEventListener('fullscreenchange', updateFullScreenButton);