const yesBtn = document.getElementById('yes-btn');
const noBtn = document.getElementById('no-btn');
const mainImage = document.getElementById('main-image');
const question = document.getElementById('question');
const mainContainer = document.getElementById('main-container');
const askPhase = document.getElementById('ask-phase');
const envelopePhase = document.getElementById('envelope-phase');
const letterPhase = document.getElementById('letter-phase');
const envelope = document.querySelector('.envelope');
const openBtn = document.getElementById('open-btn');

let noCount = 0;

// Playful rejection messages
const noMessages = [
    "No",
    "Nope",
    "Nahi",
    "Nahh",
    "Nhi hehe",
    "Not today",
    "Maybe not",
    "Nope nope",
    "Still no",
    "Nah fam",
    "Nope lol",
    "Nice try",
    "Nuh uh",
    "Not happening",
    "Naur",
    "Negative",
    "Nada",
    "Nahi ji"
];

const questionMessages = [
    "Angel, will you be my Valentine?",
    "Are you sure?",
    "Really sure?",
    "Think about our 3rd grade memories",
    "I'm gonna cry really hard",
    "Just say yes already",
    "Don't do this to me Bubbu",    
    "You're breaking my heart...",
    "Why are you doing this?",
    "Please say yes...",
    
];

const IMAGES = {
    asking: "https://media1.tenor.com/m/4ELCHnNVSqAAAAAC/cute-cha-pri.gif", 
    sad: "https://media1.tenor.com/m/K0Op-0SpsvkAAAAC/dudu-cute.gif", 
    crying: "https://media.tenor.com/U0OPHZokzkUAAAAj/what-seriously.gif", 
    angry: "https://media.tenor.com/gq-TIxME3U8AAAAj/mitao-cat.gif",
    tantrum: "https://media.tenor.com/kq78UYOOPEAAAAAi/cat-sad.gif",
    happy: "https://media1.tenor.com/m/ASn97P78H1MAAAAC/peach-cat-goma.gif",
    lastResort: "https://media.tenor.com/64-4Ck4pIkEAAAAC/peach-and-goma-peach.gif" 
};

// Preload images
Object.values(IMAGES).forEach(src => {
    const img = new Image();
    img.src = src;
});

if (noBtn) noBtn.addEventListener('click', handleNoClick);
if (yesBtn) yesBtn.addEventListener('click', handleYesClick);
if (openBtn) openBtn.addEventListener('click', openEnvelope);
if (envelope) envelope.addEventListener('click', openEnvelope);

// Smooth transition helper with improved fade timing
function nextPhase(currentId, nextId) {
    const current = document.getElementById(currentId);
    const next = document.getElementById(nextId);
    
    current.classList.add('fade-out');
    
    setTimeout(() => {
        current.classList.add('hidden');
        current.classList.remove('fade-out');
        
        next.classList.remove('hidden');
        // Trigger reflow
        void next.offsetWidth;
    }, 600); // Match fadeOut animation duration
}

function handleNoClick() {
    noCount++;
    
    // 1. Change Image - Diversify emotions
    if (noCount === 1) {
        mainImage.src = IMAGES.sad;
    } else if (noCount === 2) {
        mainImage.src = IMAGES.crying;
    } else if (noCount === 3) {
        mainImage.src = IMAGES.angry; // Head banging
    } else if (noCount === 4) {
        mainImage.src = IMAGES.tantrum; // Rolling on floor
    } else if (noCount === 5) {
        mainImage.src = IMAGES.lastResort; // Rolling on floor
    }

    // 2. Change Text (Button + Question)
    const messageIndex = Math.min(noCount, noMessages.length - 1);
    noBtn.innerText = noMessages[messageIndex];
    question.innerText = questionMessages[Math.min(noCount, questionMessages.length - 1)];

    // 3. Make Yes Button Bigger (but stop after 3 clicks)
    if (noCount <= 3) {
        const currentSize = parseFloat(window.getComputedStyle(yesBtn).fontSize);
        yesBtn.style.fontSize = `${currentSize * 1.5}px`;
    }

    // Phase 2: Evasion (The Final Trap)
    if (noCount >= 5) {
        noBtn.classList.add('runaway'); 
        noBtn.addEventListener('mouseover', teleportButton);
        noBtn.addEventListener('click', teleportButton);
        noBtn.addEventListener('touchstart', teleportButton); // Touch support
    }
}

let lastNoPosition = { x: 0, y: 0 };

function teleportButton(e) {
    if (noCount < 5) return; 
    
    e.preventDefault();

    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    
    // Get actual button dimensions
    const btnRect = noBtn.getBoundingClientRect();
    const btnWidth = btnRect.width;
    const btnHeight = btnRect.height;
    
    const margin = 80; // Safe margin from edges
    const minDistanceFromLast = 200; // Minimum pixels from last position

    let randomX, randomY;
    let attempts = 0;
    const maxAttempts = 50;

    do {
        // Generate random position within safe bounds
        // Ensure the ENTIRE button (left edge to right edge) stays within viewport
        const maxX = viewportWidth - btnWidth - margin;
        const maxY = viewportHeight - btnHeight - margin;
        
        randomX = margin + Math.random() * (maxX - margin);
        randomY = margin + Math.random() * (maxY - margin);
        
        // Clamp to absolutely ensure it's within bounds
        randomX = Math.max(margin, Math.min(randomX, maxX));
        randomY = Math.max(margin, Math.min(randomY, maxY));
        
        // Check distance from last position
        const distance = Math.hypot(randomX - lastNoPosition.x, randomY - lastNoPosition.y);
        
        if (distance >= minDistanceFromLast || attempts === 0) {
            break;
        }
        
        attempts++;
    } while (attempts < maxAttempts);

    // Store this position for next time
    lastNoPosition = { x: randomX, y: randomY };

    // Random rotation between -45deg and +45deg
    const randomRotation = Math.random() * 90 - 45;

    noBtn.style.position = 'fixed'; 
    noBtn.style.left = `${randomX}px`;
    noBtn.style.top = `${randomY}px`;
    noBtn.style.transform = `rotate(${randomRotation}deg)`;
    noBtn.style.transition = 'all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)'; // Smoother easing
}

function handleYesClick() {
    // Phase 3: Celebration
    askPhase.innerHTML = `
        <div class="image-container">
            <img src="${IMAGES.happy}" alt="Happy character" style="width: 200px; height: 200px;">
        </div>
        <h1 class="success-message">Yay! I knew you'd say Yes!</h1>
        <button id="next-btn" style="background-color: #ff3366; color: white; padding: 15px 30px; font-size: 1.2rem; border-radius: 50px; border: none; cursor: pointer; margin-top: 20px;">Next</button>
    `;
    
    // Confetti
    triggerConfetti();

    document.getElementById('next-btn').addEventListener('click', () => {
        nextPhase('ask-phase', 'envelope-phase');
    });
}

function openEnvelope() {
    envelope.classList.add('open');
    setTimeout(() => {
        nextPhase('envelope-phase', 'letter-phase');
        triggerConfetti();
    }, 1000); // Reduced from 1500ms
}

// Roadmap Animation with milestones
function showRoadmap() {
    setTimeout(() => {
        const milestones = document.querySelectorAll('.milestone');
        
        // Milestones appear with staggered delay (already animated via CSS)
        // Start countdown timers
        startCountdowns();
        
    }, 300);
}

// Countdown timer functionality
function startCountdowns() {
    const milestones = document.querySelectorAll('.milestone[data-date]');
    
    function updateCountdowns() {
        const now = new Date();
        
        milestones.forEach((milestone, index) => {
            const targetDate = new Date(milestone.dataset.date + 'T00:00:00');
            const countdownEl = document.getElementById(`countdown-${index}`);
            
            if (!countdownEl) return;
            
            const diff = targetDate - now;
            
            if (diff <= 0) {
                countdownEl.textContent = "It's Today! 🎉";
                countdownEl.style.color = '#FFB6C1';
                return;
            }
            
            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);
            
            if (days > 0) {
                countdownEl.textContent = `${days}d ${hours}h ${minutes}m`;
            } else if (hours > 0) {
                countdownEl.textContent = `${hours}h ${minutes}m ${seconds}s`;
            } else {
                countdownEl.textContent = `${minutes}m ${seconds}s`;
            }
        });
    }
    
    // Update immediately and then every second
    updateCountdowns();
    setInterval(updateCountdowns, 1000);
}

function triggerConfetti() {
    var duration = 3 * 1000;
    var animationEnd = Date.now() + duration;
    var defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInOut(min, max) {
        return Math.random() * (max - min) + min;
    }

    var interval = setInterval(function() {
        var timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
            return clearInterval(interval);
        }

        var particleCount = 50 * (timeLeft / duration);
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInOut(0.1, 0.3), y: Math.random() - 0.2 } }));
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInOut(0.7, 0.9), y: Math.random() - 0.2 } }));
    }, 250);
}

// Global expose
window.nextPhase = nextPhase;
window.showRoadmap = showRoadmap;
