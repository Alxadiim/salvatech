// Fonctions WhatsApp pour Salva Tech

const WhatsAppService = {
    phoneNumber: '221772404848',
    
    // Messages prédéfinis par service
    messages: {
        general: "Bonjour Salva Tech, j'aimerais avoir plus d'informations sur vos services.",
        vente: "Bonjour Salva Tech, j'aimerais des informations sur votre matériel informatique.",
        support: "Bonjour Salva Tech, j'ai besoin d'une intervention technique urgente.",
        gestion: "Bonjour Salva Tech, j'aimerais des informations sur vos logiciels de gestion.",
        audit: "Bonjour Salva Tech, j'aimerais un audit de mon système informatique.",
        formation: "Bonjour Salva Tech, j'aimerais m'inscrire à une formation IT.",
        devis: "Bonjour Salva Tech, j'aimerais obtenir un devis personnalisé.",
        rdv: "Bonjour Salva Tech, j'aimerais prendre rendez-vous pour une intervention.",
        question: "Bonjour Salva Tech, j'ai une question technique."
    },

    // Générer URL WhatsApp
    generateUrl(messageType = 'general', customMessage = null) {
        const message = customMessage || this.messages[messageType] || this.messages.general;
        return `https://wa.me/${this.phoneNumber}?text=${encodeURIComponent(message)}`;
    },

    // Ouvrir WhatsApp avec message prédéfini
    openChat(messageType = 'general', customMessage = null) {
        const url = this.generateUrl(messageType, customMessage);
        window.open(url, '_blank', 'noopener,noreferrer');
    },

    // Créer bouton WhatsApp dynamique
    createButton(container, messageType = 'general', buttonText = 'WhatsApp', buttonClass = 'btn btn-success') {
        const button = document.createElement('a');
        button.href = this.generateUrl(messageType);
        button.className = buttonClass;
        button.target = '_blank';
        button.rel = 'noopener';
        button.innerHTML = `<i class="fab fa-whatsapp me-2"></i>${buttonText}`;
        
        if (container) {
            container.appendChild(button);
        }
        
        return button;
    },

    // Messages contextuels selon la page
    getContextualMessage() {
        const path = window.location.pathname;
        
        if (path.includes('vente-materiel')) {
            return this.messages.vente;
        } else if (path.includes('installation-support')) {
            return this.messages.support;
        } else if (path.includes('systemes-gestion')) {
            return this.messages.gestion;
        } else if (path.includes('conseil-audit')) {
            return this.messages.audit;
        } else if (path.includes('formations')) {
            return this.messages.formation;
        } else if (path.includes('devis')) {
            return this.messages.devis;
        } else if (path.includes('rendez-vous')) {
            return this.messages.rdv;
        } else if (path.includes('FAQ')) {
            return this.messages.question;
        } else {
            return this.messages.general;
        }
    },

    // Initialiser les boutons WhatsApp contextuels
    initContextualButtons() {
        const contextualMessage = this.getContextualMessage();
        
        // Mettre à jour le bouton flottant avec message contextuel
        const floatingButton = document.querySelector('.whatsapp-float');
        if (floatingButton) {
            floatingButton.href = this.generateUrl(null, contextualMessage);
        }
    },

    // Animation du bouton flottant
    animateFloatingButton() {
        const button = document.querySelector('.whatsapp-float');
        if (!button) return;

        // Animation périodique pour attirer l'attention
        setInterval(() => {
            button.style.transform = 'scale(1.1)';
            setTimeout(() => {
                button.style.transform = 'scale(1)';
            }, 300);
        }, 10000); // Toutes les 10 secondes
    },

    // Tracking des clics WhatsApp (optionnel)
    trackClick(messageType = 'general') {
        if (typeof gtag !== 'undefined') {
            gtag('event', 'whatsapp_click', {
                'custom_parameter': messageType
            });
        }
        
        console.log(`WhatsApp clicked: ${messageType}`);
    },

    // Créer message personnalisé pour rendez-vous
    createAppointmentMessage(formData) {
        return `Bonjour Salva Tech, je souhaite prendre rendez-vous:

👤 Nom: ${formData.name}
📞 Téléphone: ${formData.phone}
🏙️ Ville: ${formData.city}
🔧 Service: ${formData.service}
📅 Date souhaitée: ${new Date(formData.date).toLocaleDateString('fr-FR')}
⏰ Heure souhaitée: ${formData.time}

Merci de me confirmer la disponibilité.`;
    }
};

// Initialiser au chargement de la page
document.addEventListener('DOMContentLoaded', function() {
    WhatsAppService.initContextualButtons();
    WhatsAppService.animateFloatingButton();
    
    // Ajouter gestionnaires d'événements pour tracking
    document.querySelectorAll('a[href*="wa.me"]').forEach(link => {
        link.addEventListener('click', function() {
            const messageType = this.getAttribute('data-message-type') || 'general';
            WhatsAppService.trackClick(messageType);
        });
    });
});

// Exposer globalement pour utilisation dans d'autres scripts
window.WhatsAppService = WhatsAppService;