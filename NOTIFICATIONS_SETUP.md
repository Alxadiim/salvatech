# 📧 Configuration des Notifications - Salva Tech

## 🚀 Guide Rapide d'Installation

### 1. EMAIL (Formspree) - GRATUIT ⭐ RECOMMANDÉ

**La solution la plus simple pour recevoir les demandes par email :**

1. **Créer un compte Formspree :**
   - Aller sur https://formspree.io
   - Inscription gratuite (jusqu'à 50 soumissions/mois)

2. **Créer un formulaire :**
   - Cliquer "New Form"
   - Nom : "Demandes Rendez-vous Salva Tech"
   - Email de réception : `lo.salva.tech@gmail.com`

3. **Copier l'ID du formulaire :**
   - Format : `xzbqwxyz` (exemple)
   - Dans `notification-config.js`, ligne 7 :
   ```javascript
   formspreeId: 'xzbqwxyz', // ⬅️ Remplacer ici
   ```

4. **Activer :**
   ```javascript
   email: {
       enabled: true, // ✅ Déjà activé
   ```

**✅ TERMINÉ ! Les demandes arrivent maintenant par email.**

---

### 2. WHATSAPP - GRATUIT ⭐ FACILE

**Recevoir les demandes directement sur WhatsApp :**

1. **Dans `notification-config.js`, ligne 21 :**
   ```javascript
   autoOpen: true, // ⬅️ Changer false en true
   ```

2. **Les demandes s'ouvriront automatiquement dans WhatsApp**
   - Numéro configuré : +221 77 240 48 48

**✅ TERMINÉ ! Clic automatique vers WhatsApp.**

---

### 3. DISCORD - GRATUIT (Optionnel)

**Notifications instantanées sur Discord :**

1. **Créer un serveur Discord pour Salva Tech**

2. **Créer un webhook :**
   - Dans un salon → Paramètres → Intégrations → Webhooks
   - "Créer un webhook"
   - Copier l'URL du webhook

3. **Configurer :**
   ```javascript
   webhook: {
       enabled: true, // ⬅️ Changer false en true
       discordUrl: 'https://discord.com/api/webhooks/123...', // ⬅️ Coller l'URL
   ```

---

## 📊 État Actuel des Notifications

| Service | État | Configuration |
|---------|------|---------------|
| 📧 **Email** | ⚠️ À configurer | Remplacer `YOUR_FORMSPREE_FORM_ID` |
| 📱 **WhatsApp** | ✅ Prêt | Numéro +221 77 240 48 48 |
| 💬 **Discord** | ⚠️ Optionnel | Remplacer `YOUR_DISCORD_WEBHOOK_URL` |
| 📊 **Backup Local** | ✅ Actif | localStorage du navigateur |

---

## 🔧 Test des Notifications

1. **Ouvrir la page rendez-vous**
2. **Remplir un formulaire test**
3. **Vérifier :**
   - Console navigateur (F12) pour les logs
   - Email de réception
   - WhatsApp (si autoOpen activé)
   - Discord (si configuré)

---

## 🚨 Dépannage

**❌ Email ne fonctionne pas :**
- Vérifier l'ID Formspree dans `notification-config.js`
- Vérifier la console pour les erreurs (F12)

**❌ WhatsApp ne s'ouvre pas :**
- Vérifier que `autoOpen: true`
- Vérifier le numéro de téléphone

**❌ Discord ne reçoit rien :**
- Vérifier l'URL du webhook
- Vérifier que `enabled: true`

---

## 📈 Options Avancées (Payantes)

### SMS (Twilio)
- Configuration dans `notification-config.js`
- Coût : ~$0.05 par SMS

### Google Sheets
- Sauvegarde automatique dans une feuille de calcul
- Gratuit avec API Google

---

## 💡 Recommandations

1. **Commencer par Formspree** (email) - Le plus fiable
2. **Activer WhatsApp** - Très pratique au Sénégal  
3. **Discord optionnel** - Pour équipe technique
4. **Tester régulièrement** les notifications

---

**🎯 Objectif : Recevoir TOUTES les demandes de rendez-vous sans en perdre !**