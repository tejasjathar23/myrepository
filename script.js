let currentCard = 0;
const cards = document.querySelectorAll(".card");
const nextButton = document.getElementById("next-btn");
const startButton = document.getElementById("start-btn");

// Background Music (Dropbox direct link)
const backgroundMusic = new Audio("https://www.dropbox.com/scl/fi/ee90ex9gckiljwq9ivb7w/romantic_music.mp3?rlkey=ilsp3u48ih5udfqfl8ht4hxt8&raw=1");

startButton.addEventListener("click", () => {
    document.getElementById("heart-container").style.display = "none"; 
    document.getElementById("card-container").style.display = "flex"; 

    // Play music with user interaction fallback
    backgroundMusic.play().catch(() => {
        document.body.addEventListener("click", () => backgroundMusic.play(), { once: true });
    });

    backgroundMusic.loop = true;
    showCard(currentCard);
});

// Show the current card
function showCard(index) {
    if (index < cards.length) {
        cards[index].classList.add("show");
        cards[index].style.display = "block"; 
    }
}

// Handle the next button click (prevent double-clicks on mobile)
nextButton.addEventListener("pointerdown", () => {
    nextButton.disabled = true; // Prevent fast taps
    setTimeout(() => nextButton.disabled = false, 500); // Re-enable after 500ms

    if (currentCard < cards.length - 1) {
        cards[currentCard].classList.remove("show");
        setTimeout(() => {
            cards[currentCard].style.display = "none"; 
            currentCard++;
            showCard(currentCard);
        }, 300);
    } else {
        nextButton.style.display = "none"; 
        document.getElementById("final-message").style.display = "block";
    }
});

// Floating Hearts Effect for Mobile and Desktop
setInterval(() => {
    const heart = document.createElement("div");
    heart.classList.add("floating-heart");
    
    // Random position on the screen
    heart.style.left = Math.random() * 100 + "vw";
    
    // Add to the body
    document.body.appendChild(heart);
    
    // Remove after a few seconds to clean up the DOM
    setTimeout(() => heart.remove(), 5000);
}, 500);

// Mobile-Specific Adjustments
function adjustForMobile() {
    const viewportWidth = window.innerWidth;

    // Adjust floating heart size for mobile
    document.querySelectorAll(".floating-heart").forEach(heart => {
        if (viewportWidth <= 768) {
            heart.style.width = "20px";  
            heart.style.height = "20px";  
        }
    });

    // Adjust card styles on mobile (scale down size for small screens)
    if (viewportWidth <= 768) {
        cards.forEach(card => {
            card.style.transform = "scale(0.9)";
        });
    }
}

// Adjust layout when resizing
window.addEventListener("resize", adjustForMobile);
adjustForMobile();  // Call on page load to adjust layout
