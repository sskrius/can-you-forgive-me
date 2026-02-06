document.addEventListener('DOMContentLoaded', () => {
    const noBtn = document.getElementById('no-btn');
    const yesBtn = document.getElementById('yes-btn');
    const question = document.getElementById('question');
    const gifContainer = document.getElementById('gif-container');
    const card = document.querySelector('.card');

    const successGif = "https://media.tenor.com/gUiu1zyxfzYAAAAi/bear-kiss-bear-kisses.gif";

    // Mobile detection
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    // State for interactions
    let currentScale = 1;
    let clickCount = 0;

    // Custom GIF handling - Logic preserved, UI removed
    let uploadedGifs = [];
    const imgElement = gifContainer.querySelector('img');

    // Load from localStorage on start
    try {
        const savedGifs = localStorage.getItem('panda_custom_gifs');
        if (savedGifs) {
            uploadedGifs = JSON.parse(savedGifs);
        }
    } catch (e) {
        console.error("Could not load GIFs", e);
    }

    noBtn.addEventListener('click', () => {
        clickCount++;

        // Exponential growth (factor 1.5)
        currentScale *= 1.5;
        yesBtn.style.transform = `scale(${currentScale})`;

        // Cycle images logic: Change every 2 clicks, starting after the 2nd click
        // Default image stays for Click 1 and 2
        // Click 3 & 4 -> Custom 0
        // Click 5 & 6 -> Custom 1
        if (uploadedGifs.length > 0 && clickCount > 2) {
            const adjustedClick = clickCount - 3; // Starts at 0 for Click 3
            const imageIndex = Math.floor(adjustedClick / 2) % uploadedGifs.length;
            imgElement.src = uploadedGifs[imageIndex];
        }

        // Text changes based on click count
        if (clickCount === 1) {
            noBtn.textContent = "I'm sorry :(";
        } else if (clickCount === 2) {
            noBtn.textContent = "I'm really sorry :(";
        } else if (clickCount === 3) {
            noBtn.textContent = "It's all my fault (╥﹏╥)";
        } else if (clickCount === 4) {
            noBtn.textContent = "Let me make it up to you ♡";
        } else {
            // After enough persistence, just hide "No" entirely so they have to pick "Yes"
            noBtn.style.display = 'none';
        }
    });

    yesBtn.addEventListener('click', () => {
        // Confetti explosion
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
        });

        // Change content
        question.textContent = "I knew it! Love you too! ❤️";

        // Reset image
        const img = gifContainer.querySelector('img');
        img.src = successGif;
        img.alt = "Bears kissing";

        // Remove buttons
        const buttonGroup = document.querySelector('.button-group');
        buttonGroup.style.display = 'none';

        // Continuous confetti for a few seconds
        const duration = 3000;
        const end = Date.now() + duration;

        (function frame() {
            confetti({
                particleCount: 5,
                angle: 60,
                spread: 55,
                origin: { x: 0 }
            });
            confetti({
                particleCount: 5,
                angle: 120,
                spread: 55,
                origin: { x: 1 }
            });

            if (Date.now() < end) {
                requestAnimationFrame(frame);
            }
        }());
    });
});
