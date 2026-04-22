// Configuration des notifications pour Salva Tech
const NotificationConfig = {
    
    // ===== EMAIL CONFIGURATION =====
    email: {
        enabled: true,
        service: 'formspree', // ou 'emailjs'
        formspreeId: 'meokgwon', // ID Formspree existant dans le projet
        recipientEmail: 'contact@salvatech.tech',
        
        // Configuration EmailJS (alternative)
        emailjs: {
            serviceId: 'YOUR_SERVICE_ID',
            templateId: 'YOUR_TEMPLATE_ID',
            publicKey: 'YOUR_PUBLIC_KEY'
        }
    },
    
    // ===== WHATSAPP CONFIGURATION =====
    whatsapp: {
        enabled: true,
        businessNumber: '221772404848', // Numéro Salva Tech
        autoOpen: false, // Si true, ouvre WhatsApp automatiquement
        
        // Template du message
        messageTemplate: (data) => {
            return `🗓️ *NOUVELLE DEMANDE RENDEZ-VOUS*%0A%0A` +
                   `👤 *Client:* ${data.name}%0A` +
                   `📞 *Tél:* ${data.phone}%0A` +
                   `🌍 *Localisation:* ${data.city}, ${data.country}%0A` +
                   `🔧 *Service:* ${data.service}%0A` +
                   `📅 *Date:* ${new Date(data.date).toLocaleDateString('fr-FR')}%0A` +
                   `⏰ *Heure:* ${data.time}%0A` +
                   `📍 *Adresse:* ${data.address}`;
        }
    },
    
    // ===== WEBHOOK CONFIGURATION =====
    webhook: {
        enabled: false, // Mettre à true pour activer
        discordUrl: 'YOUR_DISCORD_WEBHOOK_URL',
        slackUrl: 'YOUR_SLACK_WEBHOOK_URL',
        
        // Template Discord
        discordEmbed: (data) => ({
            embeds: [{
                title: "🗓️ Nouvelle demande de rendez-vous",
                color: 0x1e3a8a,
                fields: [
                    { name: "👤 Client", value: data.name, inline: true },
                    { name: "📞 Téléphone", value: data.phone, inline: true },
                    { name: "🌍 Localisation", value: `${data.city}, ${data.country}`, inline: true },
                    { name: "🔧 Service", value: data.service, inline: false },
                    { name: "📅 Date souhaitée", value: new Date(data.date).toLocaleDateString('fr-FR'), inline: true },
                    { name: "⏰ Heure souhaitée", value: data.time, inline: true },
                    { name: "📍 Adresse", value: data.address, inline: false }
                ],
                timestamp: new Date().toISOString(),
                footer: { text: "⚠️ Contacter le client sous 24h" }
            }]
        })
    },
    
    // ===== SMS CONFIGURATION =====
    sms: {
        enabled: false, // Requires paid service
        provider: 'twilio', // ou 'orange_sms_api'
        
        twilioConfig: {
            accountSid: 'YOUR_TWILIO_SID',
            authToken: 'YOUR_TWILIO_TOKEN',
            fromNumber: '+1234567890'
        },
        
        messageTemplate: (data) => {
            return `Salva Tech - Nouvelle demande RDV: ${data.name} (${data.phone}) pour ${data.service} le ${new Date(data.date).toLocaleDateString('fr-FR')} à ${data.time}`;
        }
    },
    
    // ===== GOOGLE SHEETS INTEGRATION =====
    googleSheets: {
        enabled: false,
        sheetId: 'YOUR_GOOGLE_SHEET_ID',
        apiKey: 'YOUR_GOOGLE_SHEETS_API_KEY'
    },
    
    // ===== BACKUP STORAGE =====
    backup: {
        localStorage: true, // Sauvegarde navigateur
        downloadCsv: false, // Téléchargement CSV automatique
        
        // Structure des données à sauvegarder
        dataFields: [
            'timestamp',
            'name',
            'phone', 
            'email',
            'country',
            'city',
            'address',
            'service',
            'date',
            'time',
            'message'
        ]
    }
};

// ===== INSTRUCTIONS D'INSTALLATION =====
/*

ÉTAPES POUR CONFIGURER LES NOTIFICATIONS :

1. EMAIL (FORMSPREE) - GRATUIT ET SIMPLE :
   a) Aller sur https://formspree.io
   b) Créer un compte gratuit
   c) Créer un nouveau formulaire
   d) Copier l'ID du formulaire
   e) Remplacer 'YOUR_FORMSPREE_FORM_ID' ci-dessus

2. WHATSAPP :
   - Déjà configuré avec le numéro +221 77 240 48 48
   - Mettre autoOpen: true pour ouvrir WhatsApp automatiquement

3. DISCORD WEBHOOK :
   a) Dans votre serveur Discord, aller dans les paramètres de salon
   b) Créer un webhook
   c) Copier l'URL du webhook
   d) Remplacer 'YOUR_DISCORD_WEBHOOK_URL'
   e) Mettre enabled: true

4. SMS (OPTIONNEL - PAYANT) :
   a) Créer un compte Twilio
   b) Obtenir les clés API
   c) Configurer les paramètres Twilio
   d) Mettre enabled: true

5. GOOGLE SHEETS (OPTIONNEL) :
   a) Créer une Google Sheet
   b) Activer l'API Google Sheets
   c) Obtenir les clés d'API
   d) Configurer l'intégration

*/

// Export pour utilisation
if (typeof module !== 'undefined' && module.exports) {
    module.exports = NotificationConfig;
}