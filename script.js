const openBtn = document.getElementById("openBtn");
const continueBtn = document.getElementById("continueBtn");
const cakeBtn = document.getElementById("cakeBtn");

const lightBtn = document.getElementById("lightBtn");
const blowBtn = document.getElementById("blowBtn");
const finalBtn = document.getElementById("finalBtn");

const envelope = document.getElementById("envelope");

const intro = document.getElementById("intro");
const messageScreen = document.getElementById("messageScreen");
const celebration = document.getElementById("celebration");
const cakeScreen = document.getElementById("cakeScreen");
const finalScreen = document.getElementById("finalScreen");

const cakeMessage = document.getElementById("cakeMessage");
const musicBtn = document.getElementById("musicBtn");

const flames = document.querySelectorAll(".flame");

let audioContext;
let masterGain;
let musicPlaying = false;
let musicTimer;


/* ================= MUSIC ================= */

function startMusic() {

    if (musicPlaying) return;

    audioContext = new (window.AudioContext || window.webkitAudioContext)();

    masterGain = audioContext.createGain();
    masterGain.gain.value = 0.035;

    masterGain.connect(audioContext.destination);

    musicPlaying = true;

    playMelody();
}

function playNote(frequency, duration, delay = 0) {

    if (!audioContext || !musicPlaying) return;

    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();

    oscillator.type = "sine";
    oscillator.frequency.value = frequency;

    gain.gain.setValueAtTime(0, audioContext.currentTime + delay);

    gain.gain.linearRampToValueAtTime(
        1,
        audioContext.currentTime + delay + 0.05
    );

    gain.gain.exponentialRampToValueAtTime(
        0.001,
        audioContext.currentTime + delay + duration
    );

    oscillator.connect(gain);
    gain.connect(masterGain);

    oscillator.start(audioContext.currentTime + delay);
    oscillator.stop(audioContext.currentTime + delay + duration);
}

function playMelody() {

    if (!musicPlaying) return;

    const melody = [
        261.63,
        329.63,
        392.00,
        329.63,
        293.66,
        349.23,
        440.00,
        349.23
    ];

    melody.forEach((note, index) => {
        playNote(note, 1.5, index * 0.75);
    });

    musicTimer = setTimeout(playMelody, 6000);
}

function stopMusic() {

    musicPlaying = false;

    clearTimeout(musicTimer);

    if (masterGain) {
        masterGain.gain.exponentialRampToValueAtTime(
            0.001,
            audioContext.currentTime + 0.5
        );
    }

    musicBtn.textContent = "♫";
}


/* زر الموسيقى */

musicBtn.addEventListener("click", () => {

    if (!musicPlaying) {
        startMusic();
        musicBtn.textContent = "🔊";
    } else {
        stopMusic();
        musicBtn.textContent = "♫";
    }

});


/* ================= START ================= */

openBtn.addEventListener("click", () => {

    envelope.classList.add("open");

    startMusic();

    setTimeout(() => {
        messageScreen.scrollIntoView({
            behavior: "smooth"
        });
    }, 900);

    musicBtn.textContent = "🔊";

});


/* ================= CONTINUE ================= */

continueBtn.addEventListener("click", () => {

    celebration.scrollIntoView({
        behavior: "smooth"
    });

});


/* ================= CAKE ================= */

cakeBtn.addEventListener("click", () => {

    cakeScreen.scrollIntoView({
        behavior: "smooth"
    });

});


/* ================= LIGHT CANDLES ================= */

lightBtn.addEventListener("click", () => {

    flames.forEach(flame => {
        flame.style.display = "block";
    });

    lightBtn.classList.add("hidden");

    blowBtn.classList.remove("hidden");

    cakeMessage.textContent = "اتمنى أمنية جميلة ❤️";

});


/* ================= BLOW CANDLES ================= */

blowBtn.addEventListener("click", () => {

    flames.forEach(flame => {
        flame.style.display = "none";
    });

    blowBtn.classList.add("hidden");

    cakeMessage.textContent = "كل سنة وإنت طيب يا حبيبي 🎉❤️";

    createConfetti();

    setTimeout(() => {
        finalBtn.classList.remove("hidden");
    }, 1500);

});


/* ================= FINAL ================= */

finalBtn.addEventListener("click", () => {

    finalScreen.scrollIntoView({
        behavior: "smooth"
    });

});


/* ================= CONFETTI ================= */

function createConfetti() {

    for (let i = 0; i < 45; i++) {

        const piece = document.createElement("span");

        piece.style.position = "fixed";
        piece.style.left = Math.random() * 100 + "vw";
        piece.style.top = "-20px";
        piece.style.width = "8px";
        piece.style.height = "8px";
        piece.style.background = i % 2 === 0
            ? "#C6A969"
            : "#607D8B";

        piece.style.borderRadius = "50%";
        piece.style.zIndex = "999";
        piece.style.pointerEvents = "none";

        document.body.appendChild(piece);

        const fall = piece.animate(
            [
                {
                    transform: "translateY(0) rotate(0deg)",
                    opacity: 1
                },
                {
                    transform:
                        `translateY(110vh) rotate(${Math.random() * 700}deg)`,
                    opacity: 0
                }
            ],
            {
                duration: 3000 + Math.random() * 2500,
                easing: "ease-out"
            }
        );

        fall.onfinish = () => {
            piece.remove();
        };
    }
}
