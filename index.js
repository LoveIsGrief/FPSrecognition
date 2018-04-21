/**
 * Bad pseudo-randomization, but oh well... we only expect 4 samples
 * @param array {Array}
 * @param i {Number} - iteration
 * @return {Array} randomized / shuffled array
 */
function randomize(array, i = 3) {
    if (i <= 0) {
        return array
    }
    let copy = Array.from(array)
    let ret = [];
    while (copy.length > 0) {
        ret.push(copy.splice(Math.random() * copy.length, 1)[0])
    }
    return randomize(ret, --i)
}

const allFps = [
    25, 30, 50, 60
];
const randomFps = randomize(allFps);
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

let $rightArrow = $(".right-arrow");
let $leftArrow = $(".left-arrow");
const $guessContainer = $(".guess-container");
let currentIndex = 0;
let guesses = {};

/**
 * Disabled arrows when we reach the beginning or end of samples
 */
function updateArrows() {
    if (currentIndex === randomFps.length - 1) {
        $rightArrow.classList.add("deactivated");
        $rightArrow.disabled = "true";
    } else if (currentIndex === 0) {
        $leftArrow.classList.add("deactivated");
        $leftArrow.setAttribute("disabled", true);
        $leftArrow.disabled = "true";
    } else {
        $rightArrow.disabled = false;
        $leftArrow.disabled = false;
    }
}

/**
 * Loads next sample
 */
function next() {
    if (currentIndex >= randomFps.length - 1) {
        return
    }
    load(++currentIndex);
    updateArrows();
}

/**
 * Loads previous sample
 */
function previous() {
    if (currentIndex <= 0) {
        return
    }
    load(--currentIndex);
    updateArrows();
}

/**
 * Loads a sample at
 * @param index
 */
function load(index = 0) {
    let fps = randomFps[index];
    // generate the panel contents and insert them
    $(".fps-overlay").innerText = fps;
    const $video = $("video");
    $video.src = `/media/${fps}_fps.mp4`;
    $video.play();
    updateGuesses();
}

/**
 * Highlight the guess button if a guess was made
 */
function updateGuesses() {
    $$(".guess-container button").forEach(($button) => {
        let guessedFps = guesses[randomFps[currentIndex]];
        if ($button.value !== guessedFps) {
            $button.classList.remove("guessed");
        } else {
            $button.classList.add("guessed")
        }
    })
}

/**
 * Stores a guess
 * @param e {Event}
 */
function onGuessClick(e) {
    let $button = e.target;
    guesses[randomFps[currentIndex]] = $button.value;
    updateGuesses();
}

// Make the guess buttons
allFps.forEach((fps) => {
    let $guessButton = document.createElement("button");
    $guessButton.value = $guessButton.innerText = fps;
    $guessContainer.addEventListener("click", onGuessClick)
    $guessContainer.appendChild($guessButton);
})

$leftArrow.addEventListener("click", previous);
$rightArrow.addEventListener("click", next);

$("button.resolve").addEventListener("click", () => {
    $(".content").classList.add("resolved");
})

// Initial setup
load();
updateArrows();
