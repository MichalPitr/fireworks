document.addEventListener('DOMContentLoaded', () => {
    const numberOfFireworks = 15;
    const messageTimeout = 3000;
    const fireworkDelay = 800;

    for (let i = 0; i < numberOfFireworks; i++) {
        setTimeout(()=>{
            createFirework();
        }, fireworkDelay*i)
    }

    setTimeout(() => {
        displayHappyNewYearMessage();
    }, messageTimeout);
});

function displayHappyNewYearMessage() {
    const message = document.createElement('h1');
    message.textContent = 'Happy New Year!';
    message.className = 'new-year-message';
    document.body.appendChild(message);

    setTimeout(() => {
        message.classList.add('new-year-message-visible');
    }, 100); // Short delay before starting the animation
}

function createFirework() {
    const firework = document.createElement('div');
    firework.className = 'firework';
    document.body.appendChild(firework);

    firework.style.left = window.innerWidth*0.25 + window.innerWidth* Math.random() * 0.5 + 'px'

    let positionY = 0;
    const speed = Math.random() * 3 + 3;

    function moveFirework() {
        positionY += speed;
        firework.style.bottom = positionY + 'px';

        if (positionY < window.innerHeight) {
            requestAnimationFrame(moveFirework);
        } else {
            firework.remove();
        }
    }

    moveFirework();

    // Set the explosion to occur after 2 seconds
    setTimeout(() => {
        explode(firework);
    }, 2000);
}

function explode(firework) {
    const numberOfParticles = 30;
    color = getRandomBrightColor()
    for (let i = 0; i < numberOfParticles; i++) {
        createParticle(firework, color);
    }

    firework.remove(); // Remove the firework after explosion
}
function createParticle(firework, color) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.backgroundColor = color;
    document.body.appendChild(particle);

    const size = Math.random() * 4 + 5;
    particle.style.width = size + 'px';
    particle.style.height = size + 'px';

    const angle = Math.random() * Math.PI * 2;
    let speed = Math.random() * 5 + 5; // Start with a higher speed
    const deceleration = 0.95; // Deceleration factor

    const fireworkRect = firework.getBoundingClientRect();
    particle.style.left = fireworkRect.left + fireworkRect.width / 2 + 'px';
    particle.style.top = fireworkRect.top + fireworkRect.height / 2 + 'px';

    function moveParticle() {
        speed *= deceleration; // Apply deceleration
        const velocityX = Math.cos(angle) * speed;
        const velocityY = Math.sin(angle) * speed + 1; // Little Y velocity to simulate gravity.

        const x = Math.min(Math.max(0, parseInt(particle.style.left) + velocityX), window.innerWidth);
        const y = Math.min(Math.max(0, parseInt(particle.style.top) + velocityY), window.innerHeight);
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';

        let opacity = parseFloat(particle.style.opacity);
        opacity -= 0.03;
        particle.style.opacity = opacity;

        if (opacity > 0 && x > 0 && x < window.innerWidth && y > 0 && y < window.innerHeight) {
            requestAnimationFrame(moveParticle);
        } else {
            particle.remove();
        }
    }

    particle.style.opacity = 1;
    moveParticle();
}


function getRandomBrightColor() {
    // Generate each color component in the higher range (128-255)
    const red = Math.floor(Math.random() * 128 + 128);
    const green = Math.floor(Math.random() * 128 + 128);
    const blue = Math.floor(Math.random() * 128 + 128);

    // Convert each component to a hexadecimal string and concatenate
    return `#${red.toString(16)}${green.toString(16)}${blue.toString(16)}`;
}