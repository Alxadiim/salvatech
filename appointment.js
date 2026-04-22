// ========================================
// SYSTÈME DE RENDEZ-VOUS SALVA TECH
// ========================================

class AppointmentSystem {
    constructor() {
        this.selectedService = null;
        this.selectedDate = null;
        this.selectedTime = null;
        this.currentMonth = new Date().getMonth();
        this.currentYear = new Date().getFullYear();
        
        // Créneaux horaires disponibles
        this.timeSlots = {
            morning: ['08:00', '09:00', '10:00', '11:00'],
            afternoon: ['14:00', '15:00', '16:00', '17:00'],
            saturday: ['09:00', '10:00', '11:00', '14:00', '15:00']
        };
        
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.generateCalendar();
        this.updateCalendarStatus();
    }
    
    setupEventListeners() {
        // Sélection du type de service
        document.querySelectorAll('.appointment-type-card').forEach(card => {
            card.addEventListener('click', () => this.selectService(card));
        });
        
        // Validation du formulaire
        document.getElementById('appointment-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.confirmAppointment();
        });
        
        // Validation en temps réel
        document.getElementById('terms-accept').addEventListener('change', () => {
            this.validateForm();
        });
        
        ['client-name', 'client-phone', 'client-address'].forEach(id => {
            document.getElementById(id).addEventListener('input', () => {
                this.validateForm();
            });
        });
        
        ['client-country', 'client-city'].forEach(id => {
            document.getElementById(id).addEventListener('change', () => {
                this.validateForm();
            });
        });
    }
    
    selectService(card) {
        // Désélectionner les autres cartes
        document.querySelectorAll('.appointment-type-card').forEach(c => 
            c.classList.remove('selected')
        );
        
        // Sélectionner la carte actuelle
        card.classList.add('selected');
        
        // Stocker les informations du service
        this.selectedService = {
            type: card.dataset.service,
            title: card.querySelector('h5').textContent,
            duration: parseInt(card.dataset.duration),
            price: card.dataset.price
        };
        
        // Afficher les informations du service
        this.displayServiceInfo();
        
        // Régénérer le calendrier avec les disponibilités
        this.generateCalendar();
        this.updateCalendarStatus();
        
        this.validateForm();
    }
    
    displayServiceInfo() {
        if (!this.selectedService) return;
        
        const serviceInfoDiv = document.getElementById('selected-service-info');
        const serviceDetails = document.getElementById('service-details');
        
        const priceText = this.selectedService.price === 'gratuit' ? 
            'Gratuit' : `${parseInt(this.selectedService.price).toLocaleString()} FCFA`;
        
        serviceDetails.innerHTML = `
            <div><strong>${this.selectedService.title}</strong></div>
            <div>Durée: ${this.selectedService.duration} minutes</div>
            <div>Prix: ${priceText}</div>
        `;
        
        serviceInfoDiv.style.display = 'block';
    }
    
    generateCalendar() {
        const calendar = document.getElementById('appointment-calendar');
        const today = new Date();
        const firstDay = new Date(this.currentYear, this.currentMonth, 1);
        const lastDay = new Date(this.currentYear, this.currentMonth + 1, 0);
        const startDate = new Date(firstDay);
        startDate.setDate(startDate.getDate() - firstDay.getDay());
        
        const monthNames = [
            'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
            'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
        ];
        
        let calendarHTML = `
            <div class="calendar-header">
                <button type="button" class="btn btn-outline-primary btn-sm" onclick="appointmentSystem.changeMonth(-1)">
                    <i class="fas fa-chevron-left"></i>
                </button>
                <h5 class="month-year">${monthNames[this.currentMonth]} ${this.currentYear}</h5>
                <button type="button" class="btn btn-outline-primary btn-sm" onclick="appointmentSystem.changeMonth(1)">
                    <i class="fas fa-chevron-right"></i>
                </button>
            </div>
            <div class="calendar-grid">
                <div class="calendar-days-header">
                    <div class="day-header">Dim</div>
                    <div class="day-header">Lun</div>
                    <div class="day-header">Mar</div>
                    <div class="day-header">Mer</div>
                    <div class="day-header">Jeu</div>
                    <div class="day-header">Ven</div>
                    <div class="day-header">Sam</div>
                </div>
                <div class="calendar-days">
        `;
        
        // Générer les jours
        const currentDate = new Date(startDate);
        for (let week = 0; week < 6; week++) {
            for (let day = 0; day < 7; day++) {
                const dateStr = currentDate.toISOString().split('T')[0];
                const isCurrentMonth = currentDate.getMonth() === this.currentMonth;
                const isPast = currentDate < today.setHours(0,0,0,0);
                const isSunday = currentDate.getDay() === 0;
                let dayClass = 'calendar-day';
                if (!isCurrentMonth) dayClass += ' other-month';
                if (isPast) dayClass += ' past';
                if (isSunday) dayClass += ' sunday';
                if (this.selectedService && !isPast && !isSunday) dayClass += ' available';
                if (dateStr === this.selectedDate) dayClass += ' selected';
                
                calendarHTML += `
                    <div class="${dayClass}" 
                         data-date="${dateStr}" 
                         onclick="appointmentSystem.selectDate('${dateStr}', this)">
                        ${currentDate.getDate()}
                    </div>
                `;
                
                currentDate.setDate(currentDate.getDate() + 1);
            }
        }
        
        calendarHTML += `
                </div>
            </div>
            <div class="calendar-legend">
                <div class="legend-item">
                    <span class="legend-color available"></span> Sélectionnable
                </div>
                <div class="legend-item">
                    <span class="legend-color past"></span> Passé
                </div>
                <div class="legend-item">
                    <span class="legend-color sunday"></span> Dimanche
                </div>
            </div>
        `;
        
        calendar.innerHTML = calendarHTML;
    }
    

    
    changeMonth(direction) {
        this.currentMonth += direction;
        if (this.currentMonth < 0) {
            this.currentMonth = 11;
            this.currentYear--;
        } else if (this.currentMonth > 11) {
            this.currentMonth = 0;
            this.currentYear++;
        }
        this.generateCalendar();
    }
    
    selectDate(dateStr, dayElement) {
        if (!this.selectedService || dayElement.classList.contains('past') || 
            dayElement.classList.contains('sunday') || !dayElement.classList.contains('available')) {
            return;
        }
        
        // Désélectionner la date précédente
        document.querySelectorAll('.calendar-day.selected').forEach(day => 
            day.classList.remove('selected')
        );
        
        // Sélectionner la nouvelle date
        dayElement.classList.add('selected');
        this.selectedDate = dateStr;
        
        // Générer les créneaux horaires
        this.generateTimeSlots(dateStr);
        
        this.validateForm();
    }
    
    generateTimeSlots(dateStr) {
        const date = new Date(dateStr);
        const dayOfWeek = date.getDay();
        
        let availableSlots;
        if (dayOfWeek === 6) { // Samedi
            availableSlots = this.timeSlots.saturday;
        } else { // Lundi à vendredi
            availableSlots = [...this.timeSlots.morning, ...this.timeSlots.afternoon];
        }
        
        const timeSlotsContainer = document.getElementById('time-slots-container');
        const timeSlotsGrid = document.getElementById('time-slots-grid');
        
        let slotsHTML = '';
        availableSlots.forEach(time => {
            const slotClass = 'time-slot available';
            
            slotsHTML += `
                <div class="col-6 col-md-4">
                    <button type="button" class="${slotClass}" 
                            data-time="${time}" 
                            onclick="appointmentSystem.selectTimeSlot('${time}', this)">
                        ${time}
                    </button>
                </div>
            `;
        });
        
        timeSlotsGrid.innerHTML = slotsHTML;
        timeSlotsContainer.style.display = 'block';
    }
    
    selectTimeSlot(time, slotElement) {
        // Désélectionner le créneau précédent
        document.querySelectorAll('.time-slot.selected').forEach(slot => 
            slot.classList.remove('selected')
        );
        
        // Sélectionner le nouveau créneau
        slotElement.classList.add('selected');
        this.selectedTime = time;
        
        // Mettre à jour le récapitulatif
        this.updateSummary();
        
        this.validateForm();
    }
    
    updateSummary() {
        if (!this.selectedService || !this.selectedDate || !this.selectedTime) return;
        
        const summaryContainer = document.getElementById('appointment-summary');
        const summaryContent = document.getElementById('summary-content');
        
        const date = new Date(this.selectedDate);
        const formattedDate = date.toLocaleDateString('fr-FR', {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
        
        const priceText = this.selectedService.price === 'gratuit' ? 
            'Gratuit' : `${parseInt(this.selectedService.price).toLocaleString()} FCFA`;
        
        const urgencyText = document.getElementById('client-urgency')?.value || 'Normal';

        summaryContent.innerHTML = `
            <div class="summary-item">
                <i class="fas fa-cog me-2"></i>
                <strong>${this.selectedService.title}</strong>
            </div>
            <div class="summary-item">
                <i class="fas fa-calendar me-2"></i>
                ${formattedDate}
            </div>
            <div class="summary-item">
                <i class="fas fa-clock me-2"></i>
                ${this.selectedTime} (${this.selectedService.duration} min)
            </div>
            <div class="summary-item">
                <i class="fas fa-exclamation-circle me-2"></i>
                Urgence: ${urgencyText}
            </div>
            <div class="summary-item">
                <i class="fas fa-money-bill me-2"></i>
                ${priceText}
            </div>
        `;
        
        summaryContainer.style.display = 'block';
    }
    
    validateForm() {
        const name = document.getElementById('client-name').value;
        const phone = document.getElementById('client-phone').value;
        const country = document.getElementById('client-country').value;
        const city = document.getElementById('client-city').value;
        const address = document.getElementById('client-address').value;
        const terms = document.getElementById('terms-accept').checked;
        
        const isValid = this.selectedService && this.selectedDate && this.selectedTime && 
                       name && phone && country && city && address && terms;
        
        document.getElementById('confirm-appointment').disabled = !isValid;
        this.updateCalendarStatus();
    }

    updateCalendarStatus() {
        const status = document.getElementById('calendar-status-message');
        if (!status) return;

        if (!this.selectedService) {
            status.textContent = 'Sélectionnez d\'abord un type d\'intervention pour activer le calendrier.';
            status.classList.remove('d-none');
            return;
        }

        if (!this.selectedDate) {
            status.textContent = 'Service sélectionné. Choisissez une date disponible dans le calendrier.';
            status.classList.remove('d-none');
            return;
        }

        if (!this.selectedTime) {
            status.textContent = 'Date sélectionnée. Choisissez un créneau horaire disponible.';
            status.classList.remove('d-none');
            return;
        }

        status.classList.add('d-none');
    }

    confirmAppointment() {
        if (!this.selectedService || !this.selectedDate || !this.selectedTime) return;
        
        const formData = {
            service: this.selectedService,
            date: this.selectedDate,
            time: this.selectedTime,
            urgency: document.getElementById('client-urgency')?.value || 'normal',
            name: document.getElementById('client-name').value,
            phone: document.getElementById('client-phone').value,
            country: document.getElementById('client-country').value,
            city: document.getElementById('client-city').value,
            email: document.getElementById('client-email').value,
            address: document.getElementById('client-address').value,
            message: document.getElementById('client-message').value
        };
        
        // Simuler l'enregistrement du rendez-vous
        this.saveAppointment(formData);
        
        // Afficher la confirmation
        this.showConfirmation(formData);
    }
    
    async saveAppointment(formData) {
        // Enregistrer les données localement
        console.log('Rendez-vous enregistré:', formData);
        localStorage.setItem('lastAppointment', JSON.stringify(formData));
        
        // Envoyer par email via Formspree
        try {
            await this.sendEmailNotification(formData);
        } catch (error) {
            console.error('Erreur envoi email:', error);
        }
        
        // Envoyer vers WhatsApp (optionnel)
        this.sendWhatsAppNotification(formData);
        
        // Envoyer notification Discord/Slack (optionnel)
        try {
            await this.sendWebhookNotification(formData);
        } catch (error) {
            console.error('Erreur webhook:', error);
        }
    }
    
    async sendEmailNotification(formData) {
        const emailData = {
            subject: `🗓️ Nouvelle demande de rendez-vous - ${formData.service.title}`,
            message: `
📅 NOUVELLE DEMANDE DE RENDEZ-VOUS

👤 Client: ${formData.name}
📞 Téléphone: ${formData.phone}
📧 Email: ${formData.email || 'Non fourni'}
🌍 Pays: ${formData.country}
🏙️ Ville: ${formData.city}
📍 Adresse: ${formData.address}
⏳ Urgence: ${formData.urgency || 'normal'}

🔧 Service: ${formData.service.title}
📅 Date souhaitée: ${new Date(formData.date).toLocaleDateString('fr-FR')}
⏰ Heure souhaitée: ${formData.time}

💬 Message: ${formData.message || 'Aucun message'}

⚠️ IMPORTANT: Contacter le client sous 24h pour confirmer le rendez-vous.
            `,
            email: formData.email || '',
            name: formData.name,
            phone: formData.phone
        };
        
        const response = await fetch('https://formspree.io/f/meokgwon', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(emailData)
        });
        
        if (!response.ok) {
            throw new Error('Erreur envoi email');
        }
    }
    
    sendWhatsAppNotification(formData) {
        const message = `🗓️ *NOUVELLE DEMANDE RENDEZ-VOUS*%0A%0A👤 *Client:* ${formData.name}%0A📞 *Tél:* ${formData.phone}%0A🏙️ *Ville:* ${formData.city}%0A🔧 *Service:* ${formData.service.title}%0A⏳ *Urgence:* ${formData.urgency || 'Normal'}%0A📅 *Date:* ${new Date(formData.date).toLocaleDateString('fr-FR')}%0A⏰ *Heure:* ${formData.time}`;
        
        const whatsappUrl = `https://wa.me/221772404848?text=${message}`;
        
        // Optionnel: ouvrir WhatsApp automatiquement
        // window.open(whatsappUrl, '_blank');
        
        console.log('Lien WhatsApp généré:', whatsappUrl);
    }
    
    async sendWebhookNotification(formData) {
        const webhookUrl = 'YOUR_DISCORD_WEBHOOK_URL'; // À remplacer
        
        const embed = {
            embeds: [{
                title: "🗓️ Nouvelle demande de rendez-vous",
                color: 0x1e3a8a, // Bleu Salva Tech
                fields: [
                    { name: "👤 Client", value: formData.name, inline: true },
                    { name: "📞 Téléphone", value: formData.phone, inline: true },
                    { name: "🌍 Localisation", value: `${formData.city}, ${formData.country}`, inline: true },
                    { name: "🔧 Service", value: formData.service.title, inline: false },
                    { name: "⏳ Urgence", value: formData.urgency || 'Normal', inline: true },
                    { name: "📅 Date souhaitée", value: new Date(formData.date).toLocaleDateString('fr-FR'), inline: true },
                    { name: "⏰ Heure souhaitée", value: formData.time, inline: true },
                    { name: "📍 Adresse", value: formData.address, inline: false }
                ],
                timestamp: new Date().toISOString(),
                footer: {
                    text: "⚠️ Contacter le client sous 24h"
                }
            }]
        };
        
        if (webhookUrl !== 'YOUR_DISCORD_WEBHOOK_URL') {
            const response = await fetch(webhookUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(embed)
            });
            
            if (!response.ok) {
                throw new Error('Erreur webhook Discord');
            }
        }
    }
    
    showConfirmation(formData) {
        const modal = new bootstrap.Modal(document.getElementById('confirmationModal'));
        const confirmationDetails = document.getElementById('confirmation-details');
        
        const date = new Date(formData.date);
        const formattedDate = date.toLocaleDateString('fr-FR', {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
        
        const priceText = formData.service.price === 'gratuit' ? 
            'Gratuit' : `${parseInt(formData.service.price).toLocaleString()} FCFA`;
        
        confirmationDetails.innerHTML = `
            <div class="confirmation-item">
                <strong>Service:</strong> ${formData.service.title}
            </div>
            <div class="confirmation-item">
                <strong>Date:</strong> ${formattedDate}
            </div>
            <div class="confirmation-item">
                <strong>Heure:</strong> ${formData.time}
            </div>
            <div class="confirmation-item">
                <strong>Urgence:</strong> ${formData.urgency || 'Normal'}
            </div>
            <div class="confirmation-item">
                <strong>Client:</strong> ${formData.name}
            </div>
            <div class="confirmation-item">
                <strong>Téléphone:</strong> ${formData.phone}
            </div>
            <div class="confirmation-item">
                <strong>Prix:</strong> ${priceText}
            </div>
        `;
        
        modal.show();
        
        // Réinitialiser le formulaire après confirmation
        setTimeout(() => {
            this.resetForm();
        }, 2000);
    }
    
    resetForm() {
        document.getElementById('appointment-form').reset();
        this.selectedService = null;
        this.selectedDate = null;
        this.selectedTime = null;
        
        document.querySelectorAll('.appointment-type-card.selected').forEach(card => 
            card.classList.remove('selected')
        );
        
        document.getElementById('selected-service-info').style.display = 'none';
        document.getElementById('appointment-summary').style.display = 'none';
        document.getElementById('time-slots-container').style.display = 'none';
        
        this.generateCalendar();
        this.updateCalendarStatus();
    }
}

// Fonction pour mettre à jour les villes selon le pays
function updateCities() {
    const countrySelect = document.getElementById('client-country');
    const citySelect = document.getElementById('client-city');
    const phoneInput = document.getElementById('client-phone');
    
    const cities = {
        'SN': {
            placeholder: '+221 XX XXX XX XX',
            cities: ['Dakar', 'Thiès', 'Saint-Louis', 'Kaolack', 'Ziguinchor', 'Diourbel', 'Tambacounda', 'Fatick', 'Kolda', 'Matam', 'Kaffrine', 'Kédougou', 'Louga', 'Sédhiou']
        },
        'GM': {
            placeholder: '+220 XXX XXXX',
            cities: ['Banjul', 'Serekunda', 'Brikama', 'Bakau', 'Lamin', 'Sukuta', 'Gunjur', 'Farafenni']
        },
        'ML': {
            placeholder: '+223 XX XX XX XX',
            cities: ['Bamako', 'Sikasso', 'Mopti', 'Koutiala', 'Ségou', 'Kayes', 'Gao', 'Tombouctou']
        },
        'GW': {
            placeholder: '+245 XXX XXXX',
            cities: ['Bissau', 'Bafatá', 'Gabú', 'Bissorã', 'Bolama', 'Cacheu', 'Catió', 'Canchungo']
        },
        'MR': {
            placeholder: '+222 XX XX XX XX',
            cities: ['Nouakchott', 'Nouadhibou', 'Kaédi', 'Rosso', 'Zouerate', 'Atar', 'Selibaby', 'Aleg']
        }
    };
    
    const selectedCountry = countrySelect.value;
    citySelect.innerHTML = '<option value="">Sélectionnez votre ville</option>';
    
    if (selectedCountry && cities[selectedCountry]) {
        phoneInput.placeholder = cities[selectedCountry].placeholder;
        cities[selectedCountry].cities.forEach(city => {
            const option = document.createElement('option');
            option.value = city;
            option.textContent = city;
            citySelect.appendChild(option);
        });
    } else {
        phoneInput.placeholder = 'Numéro de téléphone';
    }
}

// Initialiser le système de rendez-vous
let appointmentSystem;

document.addEventListener('DOMContentLoaded', function() {
    appointmentSystem = new AppointmentSystem();
});

// Fonction utilitaire pour formater les numéros de téléphone
document.getElementById('client-phone')?.addEventListener('input', function(e) {
    let value = e.target.value.replace(/\D/g, '');
    if (value.startsWith('221')) {
        value = '+' + value;
    } else if (value.startsWith('77') || value.startsWith('78') || value.startsWith('76') || value.startsWith('70')) {
        value = '+221' + value;
    }
    e.target.value = value;
});