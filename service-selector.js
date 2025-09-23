// Système de sélection de services et calcul automatique - Salva Tech
class ServiceSelector {
    constructor() {
        this.selectedServices = {};
        this.services = {
            // MATÉRIEL INFORMATIQUE
            'ordinateur-bureau': {
                name: 'Ordinateur de bureau',
                category: 'Matériel Informatique',
                price: 350000,
                description: 'PC complet avec écran, clavier, souris',
                icon: 'fas fa-desktop'
            },
            'ordinateur-portable': {
                name: 'Ordinateur portable',
                category: 'Matériel Informatique',
                price: 400000,
                description: 'Laptop professionnel avec garantie',
                icon: 'fas fa-laptop'
            },
            'imprimante-laser': {
                name: 'Imprimante laser',
                category: 'Matériel Informatique',
                price: 125000,
                description: 'Imprimante multifonction laser couleur',
                icon: 'fas fa-print'
            },
            'imprimante-jet': {
                name: 'Imprimante jet d\'encre',
                category: 'Matériel Informatique',
                price: 85000,
                description: 'Imprimante économique pour bureau',
                icon: 'fas fa-print'
            },
            'onduleur-1500va': {
                name: 'Onduleur 1500VA',
                category: 'Matériel Informatique',
                price: 65000,
                description: 'Protection électrique pour vos équipements',
                icon: 'fas fa-battery-half'
            },
            'onduleur-3000va': {
                name: 'Onduleur 3000VA',
                category: 'Matériel Informatique',
                price: 120000,
                description: 'Onduleur haute capacité pour entreprise',
                icon: 'fas fa-battery-full'
            },
            
            // SERVICES TECHNIQUES
            'installation-reseau': {
                name: 'Installation réseau',
                category: 'Services Techniques',
                price: 75000,
                description: 'Installation complète de réseau informatique',
                icon: 'fas fa-network-wired'
            },
            'support-technique': {
                name: 'Support technique',
                category: 'Services Techniques',
                price: 25000,
                description: 'Assistance technique à distance ou sur site',
                icon: 'fas fa-tools'
            },
            'maintenance-preventive': {
                name: 'Maintenance préventive',
                category: 'Services Techniques',
                price: 35000,
                description: 'Entretien régulier de vos équipements',
                icon: 'fas fa-wrench'
            },
            
            // LOGICIELS & SYSTÈMES
            'systeme-gestion-simple': {
                name: 'Système de gestion simple',
                category: 'Logiciels & Systèmes',
                price: 150000,
                description: 'Logiciel de gestion adapté aux PME',
                icon: 'fas fa-chart-line'
            },
            'systeme-gestion-avance': {
                name: 'Système de gestion avancé',
                category: 'Logiciels & Systèmes',
                price: 350000,
                description: 'Solution complète avec modules personnalisés',
                icon: 'fas fa-cogs'
            },
            'site-web-vitrine': {
                name: 'Site web vitrine',
                category: 'Logiciels & Systèmes',
                price: 200000,
                description: 'Site web professionnel responsive',
                icon: 'fas fa-globe'
            },
            
            // FORMATION
            'formation-bureautique': {
                name: 'Formation bureautique',
                category: 'Formation',
                price: 50000,
                description: 'Formation Word, Excel, PowerPoint',
                icon: 'fas fa-graduation-cap'
            },
            'formation-informatique': {
                name: 'Formation informatique',
                category: 'Formation',
                price: 75000,
                description: 'Formation générale en informatique',
                icon: 'fas fa-chalkboard-teacher'
            },
            'formation-logiciel': {
                name: 'Formation logiciel spécifique',
                category: 'Formation',
                price: 60000,
                description: 'Formation sur votre logiciel de gestion',
                icon: 'fas fa-laptop-code'
            }
        };
        
        this.init();
    }
    
    init() {
        this.renderServices();
        this.updateQuoteSummary();
    }
    
    renderServices() {
        const container = document.getElementById('services-list');
        if (!container) return;
        
        // Grouper par catégorie
        const categories = {};
        Object.entries(this.services).forEach(([id, service]) => {
            if (!categories[service.category]) {
                categories[service.category] = [];
            }
            categories[service.category].push({id, ...service});
        });
        
        let html = '';
        Object.entries(categories).forEach(([category, services]) => {
            html += `
                <div class="service-category mb-4">
                    <h6 class="text-primary-blue mb-3">${category}</h6>
                    <div class="row">
            `;
            
            services.forEach(service => {
                html += `
                    <div class="col-md-6 mb-3">
                        <div class="service-card" data-service-id="${service.id}">
                            <div class="service-header d-flex align-items-center">
                                <div class="service-icon me-3">
                                    <i class="${service.icon}"></i>
                                </div>
                                <div class="flex-grow-1">
                                    <h6 class="service-title mb-1">${service.name}</h6>
                                    <p class="service-description text-muted mb-2">${service.description}</p>
                                    <div class="service-price text-primary fw-bold">${service.price.toLocaleString()} FCFA</div>
                                </div>
                                <div class="service-controls">
                                    <div class="form-check mb-2">
                                        <input class="form-check-input service-checkbox" type="checkbox" id="service-${service.id}" 
                                               onchange="serviceSelector.toggleService('${service.id}')">
                                        <label class="form-check-label" for="service-${service.id}"></label>
                                    </div>
                                    <div class="quantity-controls" style="display: none;">
                                        <button type="button" class="btn btn-sm btn-outline-secondary" 
                                                onclick="serviceSelector.changeQuantity('${service.id}', -1)">-</button>
                                        <span class="quantity-display mx-2">1</span>
                                        <button type="button" class="btn btn-sm btn-outline-secondary" 
                                                onclick="serviceSelector.changeQuantity('${service.id}', 1)">+</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
            });
            
            html += `
                    </div>
                </div>
            `;
        });
        
        container.innerHTML = html;
    }
    
    toggleService(serviceId) {
        const checkbox = document.getElementById(`service-${serviceId}`);
        const serviceCard = document.querySelector(`[data-service-id="${serviceId}"]`);
        const quantityControls = serviceCard.querySelector('.quantity-controls');
        
        if (checkbox.checked) {
            // Ajouter le service
            this.selectedServices[serviceId] = {
                ...this.services[serviceId],
                quantity: 1
            };
            serviceCard.classList.add('selected');
            quantityControls.style.display = 'block';
        } else {
            // Retirer le service
            delete this.selectedServices[serviceId];
            serviceCard.classList.remove('selected');
            quantityControls.style.display = 'none';
            // Remettre la quantité à 1
            const quantityDisplay = serviceCard.querySelector('.quantity-display');
            quantityDisplay.textContent = '1';
        }
        
        this.updateQuoteSummary();
        this.updateRecommendations();
    }
    
    changeQuantity(serviceId, change) {
        if (!this.selectedServices[serviceId]) return;
        
        const newQuantity = this.selectedServices[serviceId].quantity + change;
        if (newQuantity < 1) return;
        
        this.selectedServices[serviceId].quantity = newQuantity;
        
        // Mettre à jour l'affichage
        const serviceCard = document.querySelector(`[data-service-id="${serviceId}"]`);
        const quantityDisplay = serviceCard.querySelector('.quantity-display');
        quantityDisplay.textContent = newQuantity;
        
        this.updateQuoteSummary();
    }
    
    updateQuoteSummary() {
        const summaryContainer = document.getElementById('selected-services');
        const totalElement = document.getElementById('total-amount');
        
        if (Object.keys(this.selectedServices).length === 0) {
            summaryContainer.innerHTML = `
                <div class="text-muted text-center py-3">
                    <i class="fas fa-mouse-pointer fa-2x mb-2"></i>
                    <p class="mb-0">Sélectionnez des services<br>pour voir votre devis</p>
                </div>
            `;
            totalElement.textContent = '0';
            return;
        }
        
        let html = '';
        let total = 0;
        
        Object.entries(this.selectedServices).forEach(([id, service]) => {
            const subtotal = service.price * service.quantity;
            total += subtotal;
            
            html += `
                <div class="selected-service-item d-flex justify-content-between align-items-center mb-2 pb-2 border-bottom">
                    <div class="flex-grow-1">
                        <div class="fw-medium">${service.name}</div>
                        <small class="text-muted">Quantité: ${service.quantity}</small>
                    </div>
                    <div class="text-end">
                        <div class="fw-bold">${subtotal.toLocaleString()} FCFA</div>
                    </div>
                </div>
            `;
        });
        
        summaryContainer.innerHTML = html;
        totalElement.textContent = total.toLocaleString();
    }
    
    updateRecommendations() {
        const recommendationsSection = document.getElementById('recommendations-section');
        const recommendationsList = document.getElementById('recommendations-list');
        
        // Logique simple de recommandations
        const recommendations = [];
        const selectedIds = Object.keys(this.selectedServices);
        
        // Si ordinateur sélectionné, recommander imprimante et onduleur
        if (selectedIds.some(id => id.includes('ordinateur'))) {
            if (!selectedIds.some(id => id.includes('imprimante'))) {
                recommendations.push('imprimante-laser');
            }
            if (!selectedIds.some(id => id.includes('onduleur'))) {
                recommendations.push('onduleur-1500va');
            }
        }
        
        // Si système de gestion, recommander formation
        if (selectedIds.some(id => id.includes('systeme'))) {
            if (!selectedIds.some(id => id.includes('formation'))) {
                recommendations.push('formation-logiciel');
            }
        }
        
        // Si installation réseau, recommander support
        if (selectedIds.includes('installation-reseau')) {
            if (!selectedIds.includes('support-technique')) {
                recommendations.push('support-technique');
            }
        }
        
        if (recommendations.length > 0) {
            let html = '';
            recommendations.forEach(serviceId => {
                const service = this.services[serviceId];
                if (service) {
                    html += `
                        <div class="recommendation-item p-2 border rounded mb-2">
                            <div class="d-flex align-items-center">
                                <i class="${service.icon} text-warning me-2"></i>
                                <div class="flex-grow-1">
                                    <div class="fw-medium">${service.name}</div>
                                    <small class="text-muted">${service.price.toLocaleString()} FCFA</small>
                                </div>
                                <button class="btn btn-sm btn-outline-primary" onclick="serviceSelector.addRecommendation('${serviceId}')">
                                    <i class="fas fa-plus"></i>
                                </button>
                            </div>
                        </div>
                    `;
                }
            });
            
            recommendationsList.innerHTML = html;
            recommendationsSection.style.display = 'block';
        } else {
            recommendationsSection.style.display = 'none';
        }
    }
    
    addRecommendation(serviceId) {
        const checkbox = document.getElementById(`service-${serviceId}`);
        if (checkbox) {
            checkbox.checked = true;
            this.toggleService(serviceId);
        }
    }
    
    getQuoteData() {
        return {
            services: this.selectedServices,
            total: Object.values(this.selectedServices).reduce((sum, service) => 
                sum + (service.price * service.quantity), 0)
        };
    }
}

// Initialisation
let serviceSelector;
document.addEventListener('DOMContentLoaded', function() {
    serviceSelector = new ServiceSelector();
});