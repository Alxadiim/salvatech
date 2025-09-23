// Sélecteur de services ultra-simple - Salva Tech
class SimpleServiceSelector {
    constructor() {
        this.selected = new Map(); // Maintenant on stocke id -> quantité
        this.services = [
            { id: 'pc-bureau', name: 'PC de Bureau', price: 350000, icon: '💻' },
            { id: 'pc-portable', name: 'PC Portable', price: 400000, icon: '💻' },
            { id: 'imprimante', name: 'Imprimante', price: 125000, icon: '🖨️' },
            { id: 'onduleur', name: 'Onduleur', price: 65000, icon: '🔋' },
            { id: 'installation', name: 'Installation', price: 75000, icon: '🔧' },
            { id: 'support', name: 'Support Tech', price: 25000, icon: '🛠️' },
            { id: 'formation', name: 'Formation', price: 50000, icon: '📚' },
            { id: 'site-web', name: 'Site Web', price: 200000, icon: '🌐' },
            { id: 'logiciel', name: 'Logiciel Gestion', price: 150000, icon: '📊' }
        ];
        this.render();
    }
    
    render() {
        const container = document.getElementById('services-grid');
        if (!container) return;
        
        container.innerHTML = this.services.map(service => {
            const isSelected = this.selected.has(service.id);
            const quantity = this.selected.get(service.id) || 1;
            
            return `
                <div class="service-card ${isSelected ? 'selected' : ''}" onclick="selector.toggle('${service.id}')">
                    <div class="service-icon">${service.icon}</div>
                    <div class="service-name">${service.name}</div>
                    <div class="service-price">${service.price.toLocaleString()} F</div>
                    <div class="service-check">
                        <i class="fas fa-check"></i>
                    </div>
                    ${isSelected ? `
                        <div class="quantity-section" onclick="event.stopPropagation()">
                            <div class="quantity-label">Quantité :</div>
                            <div class="quantity-controls">
                                <button onclick="selector.changeQty('${service.id}', -1)" class="qty-btn">-</button>
                                <span class="qty-display">${quantity}</span>
                                <button onclick="selector.changeQty('${service.id}', 1)" class="qty-btn">+</button>
                            </div>
                        </div>
                    ` : ''}
                </div>
            `;
        }).join('');
        
        this.updateTotal();
    }
    
    toggle(id) {
        if (this.selected.has(id)) {
            this.selected.delete(id);
        } else {
            this.selected.set(id, 1); // Quantité par défaut = 1
        }
        this.render();
    }
    
    changeQty(id, change) {
        if (!this.selected.has(id)) return;
        
        const currentQty = this.selected.get(id);
        const newQty = currentQty + change;
        
        if (newQty <= 0) {
            this.selected.delete(id);
        } else {
            this.selected.set(id, newQty);
        }
        
        this.render();
    }
    
    updateTotal() {
        let total = 0;
        let itemCount = 0;
        
        // Calculer le total avec les quantités
        Array.from(this.selected).forEach(([id, qty]) => {
            const service = this.services.find(s => s.id === id);
            if (service) {
                total += service.price * qty;
                itemCount += qty;
            }
        });
        
        // Mettre à jour l'affichage du total
        const totalElement = document.getElementById('total');
        if (totalElement) {
            totalElement.textContent = total.toLocaleString();
        }
        
        const countElement = document.getElementById('count');
        if (countElement) {
            countElement.textContent = itemCount;
        }
        
        // Mettre à jour la liste détaillée
        this.updateDetailedView();
    }
    
    updateDetailedView() {
        const detailsElement = document.getElementById('selected-details');
        if (!detailsElement) return;
        
        if (this.selected.size === 0) {
            detailsElement.innerHTML = `
                <div class="no-selection">
                    <i class="fas fa-shopping-cart"></i>
                    <p>Aucun service sélectionné</p>
                </div>
            `;
            return;
        }
        
        let html = '<div class="selected-list">';
        
        Array.from(this.selected).forEach(([id, qty]) => {
            const service = this.services.find(s => s.id === id);
            if (service) {
                const subtotal = service.price * qty;
                html += `
                    <div class="selected-item">
                        <div class="item-info">
                            <span class="item-icon">${service.icon}</span>
                            <div class="item-details">
                                <div class="item-name">${service.name}</div>
                                <div class="item-calc">${service.price.toLocaleString()} × ${qty}</div>
                            </div>
                        </div>
                        <div class="item-total">${subtotal.toLocaleString()} F</div>
                    </div>
                `;
            }
        });
        
        html += '</div>';
        detailsElement.innerHTML = html;
    }
    
    getSelectedServices() {
        return Array.from(this.selected).map(([id, qty]) => {
            const service = this.services.find(s => s.id === id);
            return service ? {...service, quantity: qty} : null;
        }).filter(Boolean);
    }
}

let selector;
document.addEventListener('DOMContentLoaded', () => {
    selector = new SimpleServiceSelector();
});