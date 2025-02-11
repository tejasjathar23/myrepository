let currentCard = 0;
const cards = document.querySelectorAll(".card");
const nextButton = document.getElementById("next-btn");
const startButton = document.getElementById("start-btn");

// Background Music (Replace FILE_ID with your actual Google Drive file ID)
// Load the audio from Dropbox
const backgroundMusic = new Audio("https://www.dropbox.com/scl/fi/ee90ex9gckiljwq9ivb7w/romantic_music.mp3?rlkey=ilsp3u48ih5udfqfl8ht4hxt8&raw=1");

startButton.addEventListener("click", () => {
    document.getElementById("heart-container").style.display = "none"; 
    document.getElementById("card-container").style.display = "flex"; 

    // Play music with user interaction fallback
    backgroundMusic.play().catch(error => {
        console.log("Autoplay blocked. Waiting for user interaction...");
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

// Handle the next button click for transitioning between cards
nextButton.addEventListener("click", () => {
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

// Add touch event for mobile devices (for start and next button)
startButton.addEventListener("touchstart", () => {
    startButton.click();
});

nextButton.addEventListener("touchstart", () => {
    nextButton.click();
});

// Mobile-Specific Adjustments
function adjustForMobile() {
    const viewportWidth = window.innerWidth;

    // Adjust floating heart size for mobile
    const hearts = document.querySelectorAll(".floating-heart");
    hearts.forEach(heart => {
        if (viewportWidth <= 768) {
            heart.style.width = "20px";  // Smaller hearts for mobile
            heart.style.height = "20px";  // Smaller hearts for mobile
        }
    });

    // Adjust card styles on mobile (scale down size for small screens)
    if (viewportWidth <= 768) {
        cards.forEach(card => {
            card.style.transform = "scale(0.9)"; // Slightly smaller on mobile
        });
    }
}

// Adjust layout when resizing
window.addEventListener("resize", adjustForMobile);
adjustForMobile();  // Call on page load to adjust layout
