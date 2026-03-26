const rail = document.querySelector('.carousel-rail');
const btnGauche = document.querySelector('.btn-gauche');
const btnDroite = document.querySelector('.btn-droite');

// On crée une sécurité pour empêcher de cliquer comme un fou et de casser l'animation
let enMouvement = false;

// ------------------------------------
// BOUTON SUIVANT (Glisse vers la gauche)
// ------------------------------------
btnDroite.addEventListener('click', () => {
    if (enMouvement) return; // Si ça bouge déjà, on ignore le clic
    enMouvement = true;

    // 1. On active l'animation fluide et on décale le rail d'une case
    rail.style.transition = 'transform 0.5s ease-in-out';
    rail.style.transform = 'translateX(-100%)';

    // 2. On attend 500 millisecondes (le temps que l'animation se termine)
    setTimeout(() => {
        // Le tour de magie : on coupe l'animation
        rail.style.transition = 'none';
        
        // On prend la toute première diapo et on la déplace à la fin du rail !
        const premiereDiapo = rail.firstElementChild;
        rail.appendChild(premiereDiapo);
        
        // On remet le rail à 0 en cachette
        rail.style.transform = 'translateX(0)';
        
        enMouvement = false; // On autorise le prochain clic
    }, 500); 
});

// ------------------------------------
// BOUTON PRÉCÉDENT (Glisse vers la droite)
// ------------------------------------
btnGauche.addEventListener('click', () => {
    if (enMouvement) return;
    enMouvement = true;

    // Le tour de magie INVERSE : on le fait AVANT l'animation
    // 1. On prend la dernière diapo et on la place tout au début
    const derniereDiapo = rail.lastElementChild;
    rail.prepend(derniereDiapo);
    
    // 2. On décale instantanément le rail (sans animation) pour cacher la triche
    rail.style.transition = 'none';
    rail.style.transform = 'translateX(-100%)';

    // (Petite pause technique obligatoire pour que le navigateur comprenne)
    rail.offsetHeight; 

    // 3. On remet l'animation en marche et on glisse vers 0
    rail.style.transition = 'transform 0.5s ease-in-out';
    rail.style.transform = 'translateX(0)';

    // 4. On libère le clic quand c'est fini
    setTimeout(() => {
        enMouvement = false;
    }, 500);
});
