let isUserInteracting = false; // Indique si l'utilisateur interagit
const scrollSpeed = 30; // Pixels par étape (valeur réduite pour une transition plus fluide)
const scrollDelay = 16; // Délai entre les étapes (environ 60 fps pour fluidité)
const interactionTimeout = 3000; // Temps d'inactivité avant de relancer le défilement automatique

let scrollInterval; // Intervalle pour le défilement automatique
let userInteractionTimeout; // Timeout pour relancer le défilement après interaction

// Fonction pour effectuer un défilement automatique
function autoScroll() {
    if (!isUserInteracting) {
        const scrollPosition = window.scrollY;
        const windowHeight = window.innerHeight;
        const documentHeight = document.body.scrollHeight;

        if (scrollPosition + windowHeight < documentHeight - 1) {
            // Défilement fluide vers le bas
            window.scrollBy({
                top: scrollSpeed,
                behavior: "smooth",
            });
        } else {
            // Bas atteint, retour fluide en haut
            clearInterval(scrollInterval); // Arrêter le défilement temporairement
            window.scrollTo({
                top: 0,
                behavior: "smooth",
            });
            setTimeout(() => {
                startAutoScroll(); // Reprendre le défilement après un délai
            }, 500); // Temps avant de recommencer à défiler
        }
    }
}

// Fonction pour arrêter temporairement le défilement automatique
function stopAutoScroll() {
    isUserInteracting = true;
    clearInterval(scrollInterval);
    clearTimeout(userInteractionTimeout);

    // Redémarrer le défilement automatique après un délai d'inactivité
    userInteractionTimeout = setTimeout(() => {
        isUserInteracting = false;
        startAutoScroll();
    }, interactionTimeout);
}

// Fonction pour démarrer le défilement automatique
function startAutoScroll() {
    scrollInterval = setInterval(autoScroll, scrollDelay);
}

// Détecter l'interaction utilisateur
window.addEventListener("scroll", stopAutoScroll);
window.addEventListener("mousemove", stopAutoScroll);

// Lancer le défilement automatique au chargement de la page
startAutoScroll();
