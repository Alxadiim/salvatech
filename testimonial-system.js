// Système de gestion des témoignages - Salva Tech
class TestimonialSystem {
    constructor() {
        this.testimonials = [
            {
                name: "Amadou Diallo",
                company: "Directeur, Commerce Plus",
                rating: 5,
                text: "Salva Tech a transformé notre gestion commerciale. Le système qu'ils ont développé est parfaitement adapté à nos besoins.",
                service: "Système de gestion",
                date: "2024-12-15"
            },
            {
                name: "Fatou Seck",
                company: "Responsable IT, Boutique Mode",
                rating: 5,
                text: "Service professionnel et support technique réactif. Nous recommandons Salva Tech sans hésitation.",
                service: "Support technique",
                date: "2024-12-10"
            },
            {
                name: "Moussa Ba",
                company: "Gérant, Restaurant Le Baobab",
                rating: 5,
                text: "Excellent accompagnement dans la digitalisation de notre restaurant. Formation claire et équipe compétente.",
                service: "Formation",
                date: "2024-12-05"
            }
        ];
        
        this.init();
    }
    
    init() {
        this.setupForm();
        this.setupCharCounter();
        this.setupRatingSystem();
        this.displayRecentTestimonials();
    }
    
    setupForm() {
        const form = document.getElementById('testimonial-form');
        if (!form) return;
        
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            await this.submitTestimonial();
        });
    }
    
    setupCharCounter() {
        const textarea = document.getElementById('testimonial-text');
        const counter = document.getElementById('char-count');
        
        if (!textarea || !counter) return;
        
        textarea.addEventListener('input', () => {
            const length = textarea.value.length;
            counter.textContent = length;
            
            if (length > 500) {
                counter.style.color = '#dc3545';
                textarea.value = textarea.value.substring(0, 500);
                counter.textContent = '500';
            } else {
                counter.style.color = '#6c757d';
            }
        });
    }
    
    setupRatingSystem() {
        const ratingInputs = document.querySelectorAll('input[name="rating"]');
        const labels = document.querySelectorAll('.rating-input label');
        
        ratingInputs.forEach((input, index) => {
            input.addEventListener('change', () => {
                this.updateRatingDisplay(input.value);
            });
        });
        
        labels.forEach((label, index) => {
            label.addEventListener('mouseenter', () => {
                this.highlightStars(5 - index);
            });
        });
        
        const ratingContainer = document.querySelector('.rating-input');
        if (ratingContainer) {
            ratingContainer.addEventListener('mouseleave', () => {
                const selectedRating = document.querySelector('input[name="rating"]:checked');
                if (selectedRating) {
                    this.updateRatingDisplay(selectedRating.value);
                } else {
                    this.clearRatingDisplay();
                }
            });
        }
    }
    
    updateRatingDisplay(rating) {
        const labels = document.querySelectorAll('.rating-input label');
        labels.forEach((label, index) => {
            const starIndex = 5 - index;
            if (starIndex <= rating) {
                label.style.color = '#ffc107';
            } else {
                label.style.color = '#e9ecef';
            }
        });
    }
    
    highlightStars(count) {
        const labels = document.querySelectorAll('.rating-input label');
        labels.forEach((label, index) => {
            const starIndex = 5 - index;
            if (starIndex <= count) {
                label.style.color = '#ffc107';
            } else {
                label.style.color = '#e9ecef';
            }
        });
    }
    
    clearRatingDisplay() {
        const labels = document.querySelectorAll('.rating-input label');
        labels.forEach(label => {
            label.style.color = '#e9ecef';
        });
    }
    
    async submitTestimonial() {
        const form = document.getElementById('testimonial-form');
        const formData = new FormData(form);
        
        // Validation
        const name = formData.get('client_name');
        const email = formData.get('client_email');
        const rating = formData.get('rating');
        const text = formData.get('testimonial_text');
        const consent = formData.get('publish_consent');
        
        if (!name || !email || !rating || !text || !consent) {
            this.showMessage('Veuillez remplir tous les champs obligatoires', 'error');
            return;
        }
        
        // Préparer les données
        const testimonialData = {
            name: name,
            company: formData.get('company') || '',
            email: email,
            service: formData.get('service_used') || '',
            rating: parseInt(rating),
            text: text,
            consent: true,
            date: new Date().toISOString(),
            ip: 'client-ip', // En production, récupérer l'IP côté serveur
        };
        
        try {
            // Ajouter toutes les données au FormData pour envoi
            Object.keys(testimonialData).forEach(key => {
                formData.append('testimonial_' + key, testimonialData[key]);
            });
            
            // Envoyer via Formspree
            const response = await fetch('https://formspree.io/f/meokgwon', {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (response.ok) {
                this.showMessage('Merci ! Votre témoignage a été envoyé avec succès.', 'success');
                form.reset();
                this.clearRatingDisplay();
                
                // Sauvegarder le type de soumission
                localStorage.setItem('lastSubmissionType', 'testimonial');
                
                // Redirection après 3 secondes
                setTimeout(() => {
                    window.location.href = 'merci.html?type=testimonial';
                }, 3000);
            } else {
                throw new Error('Erreur lors de l\'envoi');
            }
            
        } catch (error) {
            console.error('Erreur:', error);
            this.showMessage('Une erreur est survenue. Veuillez réessayer.', 'error');
        }
    }
    
    showMessage(message, type) {
        // Supprimer les messages existants
        const existingMessages = document.querySelectorAll('.alert-message');
        existingMessages.forEach(msg => msg.remove());
        
        // Créer le nouveau message
        const alertClass = type === 'success' ? 'alert-success' : 'alert-danger';
        const icon = type === 'success' ? 'fa-check-circle' : 'fa-exclamation-triangle';
        
        const messageDiv = document.createElement('div');
        messageDiv.className = `alert ${alertClass} alert-message d-flex align-items-center`;
        messageDiv.innerHTML = `
            <i class="fas ${icon} me-2"></i>
            ${message}
        `;
        
        // Insérer le message
        const form = document.getElementById('testimonial-form');
        form.insertBefore(messageDiv, form.firstChild);
        
        // Auto-suppression après 5 secondes
        setTimeout(() => {
            messageDiv.remove();
        }, 5000);
    }
    
    displayRecentTestimonials() {
        const container = document.getElementById('recent-testimonials');
        if (!container) return;
        
        // Afficher les 3 témoignages les plus récents
        const recent = this.testimonials.slice(0, 3);
        
        container.innerHTML = recent.map(testimonial => `
            <div class="col-lg-4 mb-4">
                <div class="testimonial-card h-100">
                    <div class="testimonial-content">
                        <div class="stars mb-3">
                            ${this.generateStars(testimonial.rating)}
                        </div>
                        <p class="testimonial-text">"${testimonial.text}"</p>
                    </div>
                    <div class="testimonial-author">
                        <div class="author-avatar">
                            <i class="fas fa-user"></i>
                        </div>
                        <div class="author-info">
                            <h6>${testimonial.name}</h6>
                            <small>${testimonial.company}</small>
                            ${testimonial.service ? `<div class="service-badge">${testimonial.service}</div>` : ''}
                        </div>
                    </div>
                </div>
            </div>
        `).join('');
    }
    
    generateStars(rating) {
        let stars = '';
        for (let i = 1; i <= 5; i++) {
            if (i <= rating) {
                stars += '<i class="fas fa-star"></i>';
            } else {
                stars += '<i class="far fa-star"></i>';
            }
        }
        return stars;
    }
}

// Initialisation
document.addEventListener('DOMContentLoaded', () => {
    new TestimonialSystem();
});