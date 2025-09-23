// ========================================
// SALVA TECH - SCRIPTS INTERACTIFS
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    initScrollAnimations();
    initNavbarScroll();
    initTypeWriter();
    initParallax();
    initCounters();
    initSmoothScroll();
    initDarkMode();
});

// ========================================
// ANIMATIONS AU SCROLL
// ========================================
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Appliquer aux éléments à animer
    document.querySelectorAll('.service-box, .row > div, h2, .lead').forEach(el => {
        observer.observe(el);
    });
}

// ========================================
// NAVBAR TRANSPARENT AU SCROLL
// ========================================
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.backgroundColor = 'rgba(0, 31, 63, 0.95)';
            navbar.style.backdropFilter = 'blur(10px)';
        } else {
            navbar.style.backgroundColor = 'var(--primary-blue)';
            navbar.style.backdropFilter = 'none';
        }
    });
}

// ========================================
// EFFET MACHINE À ÉCRIRE
// ========================================
function initTypeWriter() {
    const element = document.querySelector('.hero-section h1');
    if (!element) return;

    const text = element.textContent;
    element.textContent = '';
    element.style.borderRight = '3px solid white';

    let i = 0;
    const typeWriter = () => {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        } else {
            // Faire clignoter le curseur
            setTimeout(() => {
                element.style.borderRight = 'none';
            }, 1000);
        }
    };

    setTimeout(typeWriter, 1000);
}

// ========================================
// EFFET PARALLAX
// ========================================
function initParallax() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroSection = document.querySelector('.hero-section');
        
        if (heroSection) {
            heroSection.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });
}

// ========================================
// COMPTEURS ANIMÉS
// ========================================
function initCounters() {
    const counters = [
        { element: '#clients-count', target: 150, suffix: '+' },
        { element: '#projects-count', target: 200, suffix: '+' },
        { element: '#years-count', target: 5, suffix: ' ans' }
    ];

    const animateCounter = (counter) => {
        const element = document.querySelector(counter.element);
        if (!element) return;

        let current = 0;
        const increment = counter.target / 50;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= counter.target) {
                element.textContent = counter.target + counter.suffix;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current) + counter.suffix;
            }
        }, 50);
    };

    // Observer pour déclencher l'animation
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                counters.forEach(animateCounter);
                observer.unobserve(entry.target);
            }
        });
    });

    const statsSection = document.querySelector('#stats');
    if (statsSection) {
        observer.observe(statsSection);
    }
}

// ========================================
// SCROLL FLUIDE
// ========================================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ========================================
// SYSTÈME DE NOTIFICATION
// ========================================
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-triangle'}"></i>
        <span>${message}</span>
        <button class="notification-close">&times;</button>
    `;

    document.body.appendChild(notification);

    // Animation d'entrée
    setTimeout(() => notification.classList.add('show'), 100);

    // Fermeture automatique
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 5000);

    // Fermeture manuelle
    notification.querySelector('.notification-close').addEventListener('click', () => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    });
}

// ========================================
// LOADER POUR LES FORMULAIRES
// ========================================
function showLoader(button) {
    const originalText = button.textContent;
    button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi en cours...';
    button.disabled = true;
    
    return () => {
        button.innerHTML = originalText;
        button.disabled = false;
    };
}

// ========================================
// MODE SOMBRE
// ========================================
function initDarkMode() {
    const darkModeToggle = document.getElementById('darkModeToggle');
    if (!darkModeToggle) return;

    // Charger la préférence sauvegardée
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateToggleIcon(savedTheme);

    darkModeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateToggleIcon(newTheme);
        
        // Animation du toggle
        darkModeToggle.style.transform = 'rotate(360deg)';
        setTimeout(() => {
            darkModeToggle.style.transform = '';
        }, 300);
    });
}

function updateToggleIcon(theme) {
    const darkModeToggle = document.getElementById('darkModeToggle');
    if (!darkModeToggle) return;
    
    const icon = darkModeToggle.querySelector('i');
    if (theme === 'dark') {
        icon.className = 'fas fa-sun';
        darkModeToggle.title = 'Basculer vers le mode clair';
    } else {
        icon.className = 'fas fa-moon';
        darkModeToggle.title = 'Basculer vers le mode sombre';
    }
}

// ========================================
// BOUTON SCROLL TO TOP
// ========================================
function initScrollToTop() {
    const scrollBtn = document.getElementById('scrollToTop');
    if (!scrollBtn) return;

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollBtn.classList.add('show');
        } else {
            scrollBtn.classList.remove('show');
        }
    });

    scrollBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ========================================
// CALCULATEUR DE DEVIS
// ========================================
function initQuoteCalculator() {
    const calculator = document.getElementById('quote-calculator');
    if (!calculator) return;

    const serviceCheckboxes = calculator.querySelectorAll('input[name="services"]');
    const quantityInputs = calculator.querySelectorAll('.quantity-input');
    const totalElement = document.getElementById('estimated-total');
    
    const prices = {
        'ordinateur': 350000,
        'imprimante': 85000,
        'onduleur': 45000,
        'installation': 25000,
        'support': 15000,
        'formation': 35000,
        'systeme-gestion': 150000
    };

    function calculateTotal() {
        let total = 0;
        
        serviceCheckboxes.forEach(checkbox => {
            if (checkbox.checked) {
                const service = checkbox.value;
                const quantityInput = calculator.querySelector(`#quantity-${service}`);
                const quantity = quantityInput ? parseInt(quantityInput.value) || 1 : 1;
                
                total += (prices[service] || 0) * quantity;
            }
        });

        if (totalElement) {
            totalElement.textContent = total.toLocaleString('fr-FR');
            
            // Animation du total
            totalElement.style.transform = 'scale(1.1)';
            setTimeout(() => {
                totalElement.style.transform = 'scale(1)';
            }, 200);
        }
    }

    // Écouteurs d'événements
    serviceCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const quantityContainer = calculator.querySelector(`#quantity-container-${this.value}`);
            if (quantityContainer) {
                quantityContainer.style.display = this.checked ? 'block' : 'none';
            }
            calculateTotal();
        });
    });

    quantityInputs.forEach(input => {
        input.addEventListener('input', calculateTotal);
    });

    // Calcul initial
    calculateTotal();
}

// ========================================
// CHAT EN LIGNE SIMULÉ
// ========================================
function initLiveChat() {
    const chatButton = document.getElementById('chat-button');
    const chatWidget = document.getElementById('chat-widget');
    const closeChatBtn = document.getElementById('close-chat');
    const chatMessages = document.getElementById('chat-messages');
    const chatInput = document.getElementById('chat-input');
    const sendBtn = document.getElementById('send-message');

    if (!chatButton || !chatWidget) return;

    const responses = [
        "Bonjour ! Comment puis-je vous aider aujourd'hui ?",
        "Merci pour votre question. Un de nos techniciens va vous répondre sous peu.",
        "Pour un devis personnalisé, n'hésitez pas à remplir notre formulaire de devis.",
        "Nous sommes disponibles du lundi au vendredi de 8h à 18h.",
        "Avez-vous d'autres questions ? Je suis là pour vous aider !"
    ];

    let messageCount = 0;

    function addMessage(text, isUser = false) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `chat-message ${isUser ? 'user-message' : 'bot-message'}`;
        messageDiv.innerHTML = `
            <div class="message-content">
                ${text}
            </div>
            <div class="message-time">
                ${new Date().toLocaleTimeString('fr-FR', {hour: '2-digit', minute: '2-digit'})}
            </div>
        `;
        
        if (chatMessages) {
            chatMessages.appendChild(messageDiv);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }
    }

    chatButton?.addEventListener('click', () => {
        chatWidget.style.display = 'flex';
        chatButton.style.display = 'none';
        
        // Message d'accueil automatique
        if (messageCount === 0) {
            setTimeout(() => addMessage(responses[0]), 500);
            messageCount++;
        }
    });

    closeChatBtn?.addEventListener('click', () => {
        chatWidget.style.display = 'none';
        chatButton.style.display = 'flex';
    });

    function sendMessage() {
        const message = chatInput?.value.trim();
        if (!message) return;

        addMessage(message, true);
        chatInput.value = '';

        // Réponse automatique après un délai
        setTimeout(() => {
            const randomResponse = responses[Math.floor(Math.random() * responses.length)];
            addMessage(randomResponse);
        }, 1000 + Math.random() * 2000);
    }

    sendBtn?.addEventListener('click', sendMessage);
    chatInput?.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
}

// ========================================
// AMÉLIORATION DES FORMULAIRES
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    // Initialiser toutes les fonctionnalités
    initScrollToTop();
    initQuoteCalculator();
    initLiveChat();
    
    // Améliorer tous les formulaires de contact
    const forms = document.querySelectorAll('#contact-form');
    
    forms.forEach(form => {
        form.addEventListener('submit', async function(event) {
            event.preventDefault();
            
            const submitButton = form.querySelector('button[type="submit"]');
            const resetLoader = showLoader(submitButton);
            
            try {
                const formData = new FormData(form);
                
                const response = await fetch("https://formspree.io/f/meokgwon", {
                    method: "POST",
                    body: formData,
                    headers: { 'Accept': 'application/json' }
                });

                if (response.ok) {
                    showNotification('Message envoyé avec succès ! Nous vous répondrons bientôt.', 'success');
                    setTimeout(() => {
                        window.location.href = "merci.html";
                    }, 2000);
                } else {
                    throw new Error('Erreur lors de l\'envoi');
                }
            } catch (error) {
                showNotification('Erreur lors de l\'envoi. Veuillez réessayer.', 'error');
            } finally {
                resetLoader();
            }
        });
    });
});
