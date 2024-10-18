let progress = document.getElementById("progress");
let song = document.getElementById("song");
let ctrlIcon = document.getElementById("ctrlIcon");
let intervalId;  // Store interval ID

song.onloadedmetadata = function () {
    progress.max = song.duration;
    progress.value = song.currentTime;
};

function playPause() {
    if (ctrlIcon.classList.contains("fa-pause")) {
        song.pause();
        ctrlIcon.classList.remove("fa-pause");
        ctrlIcon.classList.add("fa-play");

        // Clear the interval when the song is paused
        clearInterval(intervalId);
    } else {
        song.play();
        ctrlIcon.classList.add("fa-pause");
        ctrlIcon.classList.remove("fa-play");

        // Ensure only one interval is running
        clearInterval(intervalId);
        intervalId = setInterval(() => {
            progress.value = song.currentTime;
        }, 500);
    }
}

// Ensure progress bar updates only when the song is playing
song.addEventListener("timeupdate", () => {
    if (!progress.getAttribute('data-clicked')) {
        progress.value = song.currentTime;
    }
});

// Update song time when progress bar is clicked once
progress.oninput = function () {
    song.currentTime = progress.value;

    // Resume playback if paused when clicking progress bar
    if (song.paused) {
        ctrlIcon.classList.add("fa-pause");
        ctrlIcon.classList.remove("fa-play");
        song.play();

        // Clear any previous intervals and start a new one
        clearInterval(intervalId);
        intervalId = setInterval(() => {
            progress.value = song.currentTime;
        }, 500);
    }
};
