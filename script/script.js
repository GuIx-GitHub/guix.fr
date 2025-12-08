// Fonction pour toggler le menu mobile
function toggleMenu() {
    const navLinks = document.getElementById('navLinks');
    navLinks.classList.toggle('active');
}

// Fonction pour copier le pseudo Discord
function copyDiscord() {
    const discordUsername = 'guix.fr';
    const copyText = document.getElementById('copyText');
    const originalText = copyText.textContent;
    
    // Utiliser l'API clipboard
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(discordUsername).then(() => {
            copyText.textContent = '✓ Copié !';
            setTimeout(() => {
                copyText.textContent = originalText;
            }, 2000);
        }).catch(err => {
            console.error('Erreur de copie:', err);
            fallbackCopy(discordUsername, copyText, originalText);
        });
    } else {
        fallbackCopy(discordUsername, copyText, originalText);
    }
}

// Méthode alternative de copie
function fallbackCopy(text, element, originalText) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    document.body.appendChild(textArea);
    textArea.select();
    
    try {
        document.execCommand('copy');
        element.textContent = '✓ Copié !';
        setTimeout(() => {
            element.textContent = originalText;
        }, 2000);
    } catch (err) {
        console.error('Erreur de copie:', err);
        element.textContent = 'guix.fr';
    }
    
    document.body.removeChild(textArea);
}

// Ajouter l'événement au bouton après le chargement du DOM
document.addEventListener('DOMContentLoaded', function() {
    const copyBtn = document.getElementById('copyBtn');
    if (copyBtn) {
        copyBtn.addEventListener('click', copyDiscord);
    }
});

// Observer pour animer les barres de progression
const observerOptions = {
    threshold: 0.5
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progressBars = entry.target.querySelectorAll('.progress');
            progressBars.forEach(bar => {
                const progress = bar.getAttribute('data-progress');
                setTimeout(() => {
                    bar.style.width = progress + '%';
                }, 100);
            });
        }
    });
}, observerOptions);

// Observer la section des compétences
const skillsSection = document.getElementById('competences');
if (skillsSection) {
    observer.observe(skillsSection);
}

// Scroll fluide pour les liens d'ancrage
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Fermer le menu mobile après le clic
            const navLinks = document.getElementById('navLinks');
            navLinks.classList.remove('active');
        }
    });
});