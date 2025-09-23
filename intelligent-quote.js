// Configuration intelligente des devis - Salva Tech
const QuoteConfig = {
    
    // ===== CATALOGUE PRODUITS =====
    products: {
        // MATÉRIEL INFORMATIQUE
        'ordinateur-bureau': {
            name: 'Ordinateur de bureau',
            category: 'materiel',
            basePrice: 350000,
            priceRange: { min: 250000, max: 800000 },
            options: {
                'basique': { price: 250000, description: 'Usage bureautique - Celeron, 4GB RAM, 500GB HDD' },
                'standard': { price: 350000, description: 'Usage professionnel - Core i3, 8GB RAM, 256GB SSD' },
                'performance': { price: 500000, description: 'Usage avancé - Core i5, 16GB RAM, 512GB SSD' },
                'premium': { price: 750000, description: 'Usage intensif - Core i7, 32GB RAM, 1TB SSD' }
            },
            accessories: ['clavier', 'souris', 'ecran', 'onduleur'],
            estimatedDelivery: '3-5 jours',
            warranty: '2 ans'
        },
        
        'ordinateur-portable': {
            name: 'Ordinateur portable',
            category: 'materiel',
            basePrice: 400000,
            priceRange: { min: 300000, max: 1200000 },
            options: {
                'basique': { price: 300000, description: '14" - Celeron, 4GB RAM, 500GB HDD' },
                'standard': { price: 450000, description: '15" - Core i3, 8GB RAM, 256GB SSD' },
                'performance': { price: 650000, description: '15" - Core i5, 16GB RAM, 512GB SSD' },
                'gaming': { price: 950000, description: '17" Gaming - Core i7, 16GB RAM, RTX Graphics' }
            },
            accessories: ['souris', 'sacoche', 'onduleur'],
            estimatedDelivery: '2-4 jours',
            warranty: '2 ans'
        },
        
        'imprimante': {
            name: 'Imprimante multifonction',
            category: 'materiel',
            basePrice: 85000,
            priceRange: { min: 65000, max: 350000 },
            options: {
                'jet-encre': { price: 65000, description: 'Jet d\'encre couleur - Usage domestique' },
                'laser': { price: 120000, description: 'Laser monochrome - Usage bureau' },
                'laser-couleur': { price: 180000, description: 'Laser couleur - Usage professionnel' },
                'grand-format': { price: 320000, description: 'A3+ - Usage design/impression' }
            },
            accessories: ['cartouches', 'papier'],
            estimatedDelivery: '1-3 jours',
            warranty: '1 an'
        },
        
        'onduleur': {
            name: 'Onduleur UPS',
            category: 'materiel',
            basePrice: 45000,
            priceRange: { min: 35000, max: 250000 },
            options: {
                '650va': { price: 35000, description: '650VA - 1 PC + Écran' },
                '1200va': { price: 55000, description: '1200VA - 2-3 équipements' },
                '2000va': { price: 85000, description: '2000VA - Petit bureau' },
                '3000va': { price: 150000, description: '3000VA - Bureau complet' }
            },
            accessories: ['batteries'],
            estimatedDelivery: '1-2 jours',
            warranty: '2 ans'
        },
        
        'serveur': {
            name: 'Serveur d\'entreprise',
            category: 'materiel',
            basePrice: 750000,
            priceRange: { min: 450000, max: 2500000 },
            options: {
                'tour': { price: 450000, description: 'Serveur tour - PME' },
                'rack-1u': { price: 750000, description: 'Serveur rack 1U - Entreprise' },
                'rack-2u': { price: 1200000, description: 'Serveur rack 2U - Grande entreprise' }
            },
            accessories: ['disques-additionnels', 'ram-additionnelle'],
            estimatedDelivery: '5-10 jours',
            warranty: '3 ans'
        }
    },
    
    // ===== SERVICES =====
    services: {
        'installation-complete': {
            name: 'Installation complète système',
            category: 'service',
            basePrice: 25000,
            priceMultiplier: 1.0,
            estimatedTime: '2-4 heures',
            includes: ['Installation OS', 'Configuration réseau', 'Logiciels de base', 'Formation utilisateur']
        },
        
        'maintenance': {
            name: 'Contrat maintenance annuel',
            category: 'service',
            basePrice: 50000,
            priceMultiplier: 0.8, // Réduction pour contrat annuel
            estimatedTime: 'Support continu',
            includes: ['Support téléphonique', 'Interventions prioritaires', 'Mises à jour', 'Diagnostic préventif']
        },
        
        'formation': {
            name: 'Formation utilisateurs',
            category: 'service',
            basePrice: 75000,
            priceMultiplier: 1.2,
            estimatedTime: '1-2 jours',
            includes: ['Formation personnalisée', 'Manuel utilisateur', 'Support post-formation']
        },
        
        'logiciel-gestion': {
            name: 'Logiciel de gestion',
            category: 'software',
            basePrice: 150000,
            options: {
                'basique': { price: 150000, description: 'Gestion stock + ventes' },
                'standard': { price: 250000, description: 'Gestion complète + comptabilité' },
                'premium': { price: 400000, description: 'ERP complet + modules avancés' }
            },
            estimatedTime: '3-7 jours configuration',
            includes: ['Installation', 'Configuration', 'Formation', 'Support 6 mois']
        }
    },
    
    // ===== RÈGLES DE CALCUL INTELLIGENT =====
    calculations: {
        // Remises par volume
        volumeDiscounts: [
            { threshold: 3, discount: 0.05, label: '5% de remise (3+ articles)' },
            { threshold: 5, discount: 0.10, label: '10% de remise (5+ articles)' },
            { threshold: 10, discount: 0.15, label: '15% de remise (10+ articles)' }
        ],
        
        // Multiplicateurs régionaux
        regionalMultipliers: {
            'SN': { multiplier: 1.0, delivery: 0, label: 'Sénégal' },
            'GM': { multiplier: 1.15, delivery: 25000, label: 'Gambie' },
            'ML': { multiplier: 1.25, delivery: 50000, label: 'Mali' },
            'GW': { multiplier: 1.30, delivery: 75000, label: 'Guinée-Bissau' },
            'MR': { multiplier: 1.35, delivery: 100000, label: 'Mauritanie' }
        },
        
        // Recommandations intelligentes
        recommendations: {
            'ordinateur-bureau': ['ecran', 'clavier', 'souris', 'onduleur', 'installation-complete'],
            'ordinateur-portable': ['souris', 'sacoche', 'onduleur', 'installation-complete'],
            'imprimante': ['cartouches', 'papier', 'installation-complete'],
            'serveur': ['onduleur', 'installation-complete', 'maintenance', 'formation']
        },
        
        // Packages promotionnels
        packages: {
            'pack-bureautique': {
                name: 'Pack Bureau Complet',
                items: ['ordinateur-bureau', 'imprimante', 'onduleur'],
                discount: 0.08,
                bonusServices: ['installation-complete']
            },
            'pack-entreprise': {
                name: 'Pack Entreprise',
                items: ['ordinateur-bureau', 'imprimante', 'serveur'],
                discount: 0.12,
                bonusServices: ['installation-complete', 'formation']
            }
        }
    },
    
    // ===== FONCTIONS UTILITAIRES =====
    
    // Calculer prix avec options
    calculateProductPrice(productKey, optionKey, quantity = 1) {
        const product = this.products[productKey];
        if (!product) return 0;
        
        const option = optionKey ? product.options[optionKey] : null;
        const basePrice = option ? option.price : product.basePrice;
        
        return basePrice * quantity;
    },
    
    // Calculer remise volume
    calculateVolumeDiscount(totalItems) {
        const applicableDiscount = this.calculations.volumeDiscounts
            .filter(d => totalItems >= d.threshold)
            .sort((a, b) => b.discount - a.discount)[0];
            
        return applicableDiscount || { discount: 0, label: '' };
    },
    
    // Obtenir recommandations
    getRecommendations(selectedProducts) {
        const recommendations = new Set();
        
        selectedProducts.forEach(productKey => {
            const productRecs = this.calculations.recommendations[productKey] || [];
            productRecs.forEach(rec => recommendations.add(rec));
        });
        
        return Array.from(recommendations);
    },
    
    // Détection de packages automatique
    detectPackages(selectedProducts) {
        const detectedPackages = [];
        
        Object.entries(this.calculations.packages).forEach(([packKey, pack]) => {
            const hasAllItems = pack.items.every(item => selectedProducts.includes(item));
            if (hasAllItems) {
                detectedPackages.push({ key: packKey, ...pack });
            }
        });
        
        return detectedPackages;
    },
    
    // Calcul prix final avec toutes les règles
    calculateFinalQuote(selections, country = 'SN') {
        let subtotal = 0;
        let totalItems = 0;
        
        // Calcul sous-total
        selections.forEach(selection => {
            const price = this.calculateProductPrice(
                selection.product, 
                selection.option, 
                selection.quantity
            );
            subtotal += price;
            totalItems += selection.quantity;
        });
        
        // Remise volume
        const volumeDiscount = this.calculateVolumeDiscount(totalItems);
        const discountAmount = subtotal * volumeDiscount.discount;
        
        // Multiplicateur régional
        const regional = this.calculations.regionalMultipliers[country];
        const regionalMultiplier = regional ? regional.multiplier : 1.0;
        const deliveryCost = regional ? regional.delivery : 0;
        
        // Calcul final
        const subtotalAfterDiscount = subtotal - discountAmount;
        const regionalTotal = subtotalAfterDiscount * regionalMultiplier;
        const finalTotal = regionalTotal + deliveryCost;
        
        return {
            subtotal,
            discountAmount,
            volumeDiscount,
            regionalMultiplier,
            deliveryCost,
            finalTotal,
            totalItems
        };
    }
};

// Export pour utilisation
if (typeof module !== 'undefined' && module.exports) {
    module.exports = QuoteConfig;
}