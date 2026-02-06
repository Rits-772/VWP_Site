let currentStep = 1;

function nextStep(stepNumber) {
    // Get current and next step elements
    const currentId = typeof currentStep === 'number' ? `step${currentStep}` : `step${currentStep}`;
    const current = document.getElementById(currentId);
    const nextId = typeof stepNumber === 'number' ? `step${stepNumber}` : `step${stepNumber}`;
    const next = document.getElementById(nextId);
    
    // Add exit animation to current step
    current.classList.add('exit');
    
    // Wait for animation to complete before showing next step
    setTimeout(() => {
        current.classList.remove('active', 'exit');
        next.classList.add('active');
        currentStep = stepNumber;
    }, 400);
}

function showFinalMessage(isYes) {
    const current = document.getElementById(`step${currentStep}`);
    const finalStep = isYes ? document.getElementById('step7-yes') : document.getElementById('step7-no');
    
    // Add exit animation to current step
    current.classList.add('exit');
    
    // Wait for animation to complete before showing final step
    setTimeout(() => {
        current.classList.remove('active', 'exit');
        finalStep.classList.add('active');
        
        // Trigger confetti animation if "Yes"
        if (isYes) {
            createMoreConfetti();
        }
    }, 400);
}

function createMoreConfetti() {
    const celebration = document.querySelector('.celebration');
    const colors = ['#ff6b9d', '#ffa8db', '#667eea', '#764ba2', '#f093fb'];
    
    // Create additional confetti pieces
    for (let i = 0; i < 20; i++) {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.animationDelay = Math.random() * 3 + 's';
        confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
        celebration.appendChild(confetti);
    }
}

// Add keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        const activeStep = document.querySelector('.step.active');
        const button = activeStep.querySelector('.btn');
        if (button) {
            button.click();
        }
    }
});

// Add particle cursor effect
document.addEventListener('mousemove', (e) => {
    if (Math.random() > 0.9) {
        const particle = document.createElement('div');
        particle.style.position = 'fixed';
        particle.style.width = '5px';
        particle.style.height = '5px';
        particle.style.borderRadius = '50%';
        particle.style.background = 'rgba(255, 255, 255, 0.6)';
        particle.style.left = e.clientX + 'px';
        particle.style.top = e.clientY + 'px';
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '9999';
        particle.style.animation = 'particle-fade 1s ease-out forwards';
        
        document.body.appendChild(particle);
        
        setTimeout(() => {
            particle.remove();
        }, 1000);
    }
});

// Add CSS for particle animation
const style = document.createElement('style');
style.textContent = `
    @keyframes particle-fade {
        0% {
            opacity: 1;
            transform: scale(1) translateY(0);
        }
        100% {
            opacity: 0;
            transform: scale(0) translateY(-30px);
        }
    }
`;
document.head.appendChild(style);
