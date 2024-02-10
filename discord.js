const Discord = require('discord.js');
const axios = require('axios');

const client = new Discord.Client();
const prefix = '!'; // Préfixe des commandes du bot

// // URL de l'API Vinted
const apiUrl = 'VOTRE_URL_API_VINTED';

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);

    // Démarrer l'intervalle de recherche toutes les 24 heures (en millisecondes) dès que le bot est prêt
    startSearchInterval();
});

client.on('message', async (message) => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    if (command === 'search') {
        // Effectue une recherche immédiatement si la commande est envoyée
        searchItems(message.channel);
    } else if (command === 'buy') {
        // Implémente la logique pour acheter un article en un clic
    }
});

// Fonction pour démarrer l'intervalle de recherche
function startSearchInterval() {
    setInterval(() => {
        // Effectuer une recherche automatique à intervalles réguliers pour chaque marque spécifiée
        searchItemsForBrand('Nike', 'ID_DU_SALON_NIKE');
        searchItemsForBrand('Lacoste', 'ID_DU_SALON_LACOSTE');
        // Ajoutez d'autres marques et leurs salons correspondants si nécessaire
    }, 24 * 60 * 60 * 1000); // Une fois par jour
}

// Fonction pour effectuer la recherche d'articles
async function searchItems(channel) {
    try {
        const searchTerm = 'vêtements'; // Terme de recherche par défaut
        const response = await axios.get(`http://localhost:3000/api/search?term=${searchTerm}`);

        const items = response.data;
        items.forEach(item => {
            // Envoyer les détails de chaque article dans le chat Discord
            channel.send(`Nom: ${item.name}\nPrix: ${item.price}\nTaille: ${item.size}\nÉtat: ${item.condition}\nDescription: ${item.description}\nImage: ${item.image}\navis: ${item.reviews}`);
        });
    } catch (error) {
        console.error('Erreur lors de la recherche:', error.message);
        // Vous pouvez gérer l'erreur en envoyant un message dans le chat Discord ou en journalisant l'erreur
    }
}

client.login('MTIwNTQ3NzU0Njk1OTgzOTMxMw.Gq2AB2.Bl38Zzpwkhk8I40DStymiUAp1V9QBl0qEd4cEk'); // Remplacez par le token de votre bot
