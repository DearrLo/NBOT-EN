const { Client, GatewayIntentBits, REST, Routes } = require('discord.js');
const axios = require('axios');
require('dotenv').config();

const discordToken = process.env.DISCORD_TOKEN;  // Récupérer le token du bot depuis le fichier .env (nom de variable corrigé)
const apiKey = process.env.WEATHER_TOKEN; 

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

// !! BASIQUE STUFF !!

// Instance REST pour enregistrer les commandes slash
const rest = new REST({ version: '10' }).setToken(discordToken);  // Utiliser discordToken (majuscule)

// Commandes slash (enregistre "/météo" et "/help")
const commands = [
  {
    name: 'help',
    description: 'Affiche les commandes disponibles.',
  },
  {
    name: 'météo',
    description: 'Affiche la météo d\'une ville',
    options: [
      {
        name: 'ville',
        type: 3,
        description: 'Nom de la ville dont vous voulez connaître la météo',
        required: true,
      }
    ]
  }
];

// Enregistrer les commandes slash sur ton serveur
(async () => {
  try {
    console.log('Début de l\'enregistrement des commandes slash.');
    await rest.put(Routes.applicationGuildCommands('1291301242533974037', '1150709577139097750'), { body: commands });
    console.log('Les commandes slash ont été enregistrées avec succès.');
  } catch (error) {
    console.error(error);
  }
})();


// Quand le bot est prêt
client.once('ready', () => {
  console.log('Agent Romanoff, reporting for duty !');
});


// !! COMMANDES HELP et MÉTÉO !!

client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;

  // Commande /help
  if (interaction.commandName === 'help') {
    await interaction.reply('Here\'s everything i\'m capable of... and more much will come. ;) \n- /help : Affiche cette aide\n- /météo "ville") : permets de savoir si tu dois t\'habiller (ou non) chaudement pour moi...');
  }

  // Commande /météo NOMVILLE
  if (interaction.commandName === 'météo') {
    const ville = interaction.options.getString('ville'); // Récupérer le nom de la ville
    if (!ville) {
      await interaction.reply('Please, gimme a correct city honey, i still cannot guess for you...!');
      return;
    }

     // Requête à l'API OpenWeatherMap pour récupérer la météo de la ville
     const url = `https://api.openweathermap.org/data/2.5/weather?q=${ville}&appid=${apiKey}&units=metric&lang=fr`;

     try {
        const response = await axios.get(url);
        const data = response.data;
        
        // Extraire les informations utiles de la réponse
        const description = data.weather[0].description;
        const temperature = data.main.temp;
        const feels_like = data.main.feels_like;
        const humidity = data.main.humidity;
  
        // Répondre avec les informations météo
        await interaction.reply(`Météo à **${ville}** :\nDescription : ${description}\nTempérature : ${temperature}°C (ressenti ${feels_like}°C)\nHumidité : ${humidity}%`);
      } catch (error) {
        // Gérer les erreurs, par exemple si la ville n'est pas trouvée
        await interaction.reply('Sorry, I wasn\'t able to find the meteorological informations for this city, please double check the name and try again.');
      }
  }
});


// !! Spécifiques stuff !!

// Écouter les messages envoyés dans les canaux texte par tous les utilisateurs
client.on('messageCreate', message => {
    // Ignorer les messages du bot lui-même
    if (message.author.bot) return;

    // FR FR FR FR FR convertir le message en minuscule pour que la vérification soit insensible à la casse
    const userMessage = message.content.toLowerCase();










    // !! ANTI INSULTE SQUAD !!

    // randoms replies of the BOT for insults
    const randomNoInsultes = [
        'LANGUAGE {username}!',
        'LANGUAGE.... FOR FUC-... Look what you made me do.',
        'That\'s so sad that a pretty mouth like yours say dirty things like that.',
        '{username} ! It\'s the last time I\'m telling you ! YOUR  L A N G U A G E!',
    ];

    // check if the message contain an insult
    if (userMessage.includes('fuck') || userMessage.includes('shit') || userMessage.includes('shut up') || userMessage.includes('ta gueule') || userMessage.includes('fucking') || userMessage.includes('motherfucker') || userMessage.includes('jfc') || userMessage.includes('asshole') || userMessage.includes('cunt') || userMessage.includes('debile') || userMessage.includes('idiot')) {
        
        // pick a random reply if the BOT detect an insult
        let NoInsultes = randomNoInsultes[Math.floor(Math.random() * randomNoInsultes.length)];

        NoInsultes = NoInsultes.replace('{username}', message.author.username);

      
        message.reply(NoInsultes);

        // return for the BOT not giving too many replies to the insult(s)
        return;
    }


    // replies that the BOT can give to the "hi" or whatever
    const salutations = [
        'Hello to you too, {username}. how are you doing ?',
        '*Nods* {username}. It\'s good to see you too, pal.',
        'Morning {username} ! You didn\'t see Thor ?',
        'Hi {username} ! You didn\'t see Tony ?',
        'Hi {username} ! You didn\'t see Clint ?',
        'Hey {username} ! You didn\'t see my peanuts butter sandwich ?',
        'Hey, {username} ! Hope you\'re doing just fine, dear.',
        'Hey {username}.'
    ];

    // replies that the BOT can give to the question "how're you" or whatever
    const IamDoingWell = [
        'I\'m fine.',
        'I\'m fine, thank you.',
        'I\'ll be better if i didn\'t have to fall of this goddam cliff but-... yeah.',
        '*Nods her shoulders and go back from her she came.*',
        'N o.'
    ];

    // verify if the message contain one of this words
    if (userMessage.includes('Sup tasha') || userMessage.includes('How are you agent') || userMessage.includes('I\'m good and you ?') || userMessage.includes('you\'re okay nat') || userMessage.includes('are you ok') || userMessage.includes('wassup') || userMessage.includes('how are you doing')) {
        
        // picking a random reply for the BOT
        const randomIamDoingWell = IamDoingWell[Math.floor(Math.random() * IamDoingWell.length)];
        message.reply(randomIamDoingWell);
    
    // check if one of the salutation message didn't get detected yet
    } else if (userMessage.includes('bonjour') || userMessage.includes('yo') || userMessage.includes('hello') || userMessage.includes('hi') || userMessage.includes('hey')) {
        
        // pick a random salutation
        let randomSalutation = salutations[Math.floor(Math.random() * salutations.length)];

        // replace {username} by the actual user @
        randomSalutation = randomSalutation.replace('{username}', message.author.username);

        // replying to the message with the actual and random BOT preset message
        message.reply(randomSalutation);
    }
});





client.login(discordToken);  
