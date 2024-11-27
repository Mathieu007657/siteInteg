let isUserInteracting = false; 
const scrollSpeed = 30; 
const scrollDelay = 0.00001; //faire en sorte qu'il soit fait plus rapidement
const interactionTimeout = 3000; 

let scrollInterval; 
let userInteractionTimeout;

function autoScroll() {
    if (!isUserInteracting) {
        const scrollPosition = window.scrollY;
        const windowHeight = window.innerHeight;
        const documentHeight = document.body.scrollHeight;

        if (scrollPosition + windowHeight < documentHeight - 1) {
            window.scrollBy({
                top: scrollSpeed,
                behavior: "smooth",
            });
        } else {
            clearInterval(scrollInterval); 
            window.scrollTo({
                top: 0,
                behavior: "smooth",
            });
            setTimeout(() => {
                startAutoScroll();
            }, 500); 
        }
    }
}


function stopAutoScroll() {
    isUserInteracting = true;
    clearInterval(scrollInterval);
    clearTimeout(userInteractionTimeout);


    userInteractionTimeout = setTimeout(() => {
        isUserInteracting = false;
        startAutoScroll();
    }, interactionTimeout);
}


function startAutoScroll() {
    scrollInterval = setInterval(autoScroll, scrollDelay);
}


window.addEventListener("scroll", stopAutoScroll);
window.addEventListener("mousemove", stopAutoScroll);


startAutoScroll();

document.addEventListener("DOMContentLoaded", () => {
    const images = document.querySelectorAll(".gallery img");
    const lightbox = document.createElement("div");
    lightbox.className = "lightbox";
    lightbox.innerHTML = `
        <button class="close">&times;</button>
        <button class="prev">&laquo;</button>
        <img src="" alt="Lightbox Image">
        <button class="next">&raquo;</button>
    `;
    document.body.appendChild(lightbox);

    const lightboxImage = lightbox.querySelector("img");
    const closeBtn = lightbox.querySelector(".close");
    const prevBtn = lightbox.querySelector(".prev");
    const nextBtn = lightbox.querySelector(".next");

    let currentIndex = 0;

    // Open lightbox
    images.forEach((img, index) => {
        img.addEventListener("click", () => {
            currentIndex = index;
            updateLightbox();
            lightbox.style.display = "flex";
        });
    });

    // Close lightbox
    closeBtn.addEventListener("click", () => {
        lightbox.style.display = "none";
    });

    // Navigate lightbox
    prevBtn.addEventListener("click", () => {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        updateLightbox();
    });

    nextBtn.addEventListener("click", () => {
        currentIndex = (currentIndex + 1) % images.length;
        updateLightbox();
    });

    // Update lightbox image
    function updateLightbox() {
        lightboxImage.src = images[currentIndex].src;
        lightboxImage.alt = images[currentIndex].alt;
    }
});
