// Configuration régionale pour Salva Tech
const RegionalConfig = {
    countries: {
        'SN': {
            name: 'Sénégal',
            flag: '🇸🇳',
            currency: 'FCFA',
            phoneCode: '+221',
            status: 'active',
            coverage: 'complete',
            cities: ['Dakar', 'Thiès', 'Saint-Louis', 'Kaolack', 'Ziguinchor', 'Diourbel', 'Tambacounda', 'Fatick', 'Kolda', 'Matam', 'Kaffrine', 'Kédougou', 'Louga', 'Sédhiou'],
            services: {
                'vente-materiel': { available: true, deliveryTime: '24-48h', shippingCost: 0 },
                'installation-support': { available: true, responseTime: '2-4h', travelCost: 0 },
                'systemes-gestion': { available: true, setupTime: '1-3 jours', supportLevel: 'premium' },
                'conseil-audit': { available: true, consultationFee: 0, reportDelay: '5-7 jours' },
                'formations': { available: true, groupSize: '5-20', certification: true }
            },
            pricing: {
                baseRate: 1.0,
                travelMultiplier: 1.0,
                urgencyMultiplier: 1.5
            }
        },
        'GM': {
            name: 'Gambie',
            flag: '🇬🇲',
            currency: 'GMD',
            phoneCode: '+220',
            status: 'expanding',
            coverage: 'major-cities',
            cities: ['Banjul', 'Serekunda', 'Brikama', 'Bakau', 'Lamin', 'Sukuta', 'Gunjur', 'Farafenni'],
            services: {
                'vente-materiel': { available: true, deliveryTime: '3-5 jours', shippingCost: 15000 },
                'installation-support': { available: true, responseTime: '24-48h', travelCost: 25000 },
                'systemes-gestion': { available: true, setupTime: '2-5 jours', supportLevel: 'standard' },
                'conseil-audit': { available: true, consultationFee: 50000, reportDelay: '7-10 jours' },
                'formations': { available: true, groupSize: '3-15', certification: true }
            },
            pricing: {
                baseRate: 1.2,
                travelMultiplier: 1.5,
                urgencyMultiplier: 2.0
            }
        },
        'ML': {
            name: 'Mali',
            flag: '🇲🇱',
            currency: 'FCFA',
            phoneCode: '+223',
            status: 'coming-soon',
            coverage: 'planning',
            cities: ['Bamako', 'Sikasso', 'Mopti', 'Koutiala', 'Ségou', 'Kayes', 'Gao', 'Tombouctou'],
            services: {
                'vente-materiel': { available: false, deliveryTime: 'TBD', shippingCost: 'TBD' },
                'installation-support': { available: false, responseTime: 'TBD', travelCost: 'TBD' },
                'systemes-gestion': { available: false, setupTime: 'TBD', supportLevel: 'TBD' },
                'conseil-audit': { available: true, consultationFee: 75000, reportDelay: '10-14 jours' },
                'formations': { available: true, groupSize: '5-20', certification: true }
            },
            pricing: {
                baseRate: 1.3,
                travelMultiplier: 2.0,
                urgencyMultiplier: 2.5
            }
        },
        'GW': {
            name: 'Guinée-Bissau',
            flag: '🇬🇼',
            currency: 'FCFA',
            phoneCode: '+245',
            status: 'coming-soon',
            coverage: 'planning',
            cities: ['Bissau', 'Bafatá', 'Gabú', 'Bissorã', 'Bolama', 'Cacheu', 'Catió', 'Canchungo'],
            services: {
                'vente-materiel': { available: false, deliveryTime: 'TBD', shippingCost: 'TBD' },
                'installation-support': { available: false, responseTime: 'TBD', travelCost: 'TBD' },
                'systemes-gestion': { available: false, setupTime: 'TBD', supportLevel: 'TBD' },
                'conseil-audit': { available: true, consultationFee: 100000, reportDelay: '14-21 jours' },
                'formations': { available: true, groupSize: '3-15', certification: false }
            },
            pricing: {
                baseRate: 1.4,
                travelMultiplier: 2.5,
                urgencyMultiplier: 3.0
            }
        },
        'MR': {
            name: 'Mauritanie',
            flag: '🇲🇷',
            currency: 'MRU',
            phoneCode: '+222',
            status: 'coming-soon',
            coverage: 'planning',
            cities: ['Nouakchott', 'Nouadhibou', 'Kaédi', 'Rosso', 'Zouerate', 'Atar', 'Selibaby', 'Aleg'],
            services: {
                'vente-materiel': { available: false, deliveryTime: 'TBD', shippingCost: 'TBD' },
                'installation-support': { available: false, responseTime: 'TBD', travelCost: 'TBD' },
                'systemes-gestion': { available: false, setupTime: 'TBD', supportLevel: 'TBD' },
                'conseil-audit': { available: true, consultationFee: 125000, reportDelay: '14-21 jours' },
                'formations': { available: true, groupSize: '5-15', certification: false }
            },
            pricing: {
                baseRate: 1.5,
                travelMultiplier: 3.0,
                urgencyMultiplier: 3.5
            }
        }
    },

    // Fonction pour obtenir les informations d'un pays
    getCountryInfo(countryCode) {
        return this.countries[countryCode] || null;
    },

    // Fonction pour obtenir les villes d'un pays
    getCities(countryCode) {
        const country = this.getCountryInfo(countryCode);
        return country ? country.cities : [];
    },

    // Fonction pour vérifier la disponibilité d'un service
    isServiceAvailable(countryCode, serviceName) {
        const country = this.getCountryInfo(countryCode);
        if (!country) return false;
        
        const service = country.services[serviceName];
        return service ? service.available : false;
    },

    // Fonction pour calculer les tarifs
    calculatePricing(countryCode, basePrice, options = {}) {
        const country = this.getCountryInfo(countryCode);
        if (!country) return basePrice;

        let finalPrice = basePrice * country.pricing.baseRate;

        if (options.includeTravel) {
            finalPrice *= country.pricing.travelMultiplier;
        }

        if (options.isUrgent) {
            finalPrice *= country.pricing.urgencyMultiplier;
        }

        return Math.round(finalPrice);
    },

    // Fonction pour formater les prix selon la devise
    formatPrice(price, countryCode) {
        const country = this.getCountryInfo(countryCode);
        if (!country) return price.toLocaleString();

        switch (country.currency) {
            case 'FCFA':
                return price.toLocaleString() + ' FCFA';
            case 'GMD':
                return 'D ' + price.toLocaleString();
            case 'MRU':
                return price.toLocaleString() + ' MRU';
            default:
                return price.toLocaleString();
        }
    },

    // Fonction pour obtenir le message de statut
    getStatusMessage(countryCode) {
        const country = this.getCountryInfo(countryCode);
        if (!country) return '';

        switch (country.status) {
            case 'active':
                return '✅ Service complet disponible';
            case 'expanding':
                return '🚀 Service en expansion';
            case 'coming-soon':
                return '⏳ Bientôt disponible - Conseil et formation uniquement';
            default:
                return '';
        }
    }
};

// Export pour utilisation dans d'autres fichiers
if (typeof module !== 'undefined' && module.exports) {
    module.exports = RegionalConfig;
}