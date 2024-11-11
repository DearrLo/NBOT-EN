const { Client, GatewayIntentBits, REST, Routes } = require('discord.js');
const axios = require('axios');
require('dotenv').config();

const discordToken = process.env.DISCORD_TOKEN;  
const apiKey = process.env.WEATHER_TOKEN; 


// Importation of the functions
const { handleAntiInsultes } = require('./Dials/antiInsults');
const { handleCompliments}  = require ('./Dials/compliments');
const { handleIamDoingWell } = require ('./Dials/doingWell');
const { handleDrama } = require ('./Dials/drama');
const { handleLongMessages } = require ('./Dials/longMessages');
const { handleMistakes } = require ('./Dials/mistakes');
const { handleRewards } = require ('./Dials/reward');
const { handleRewards } = require ('./Dials/salutations');



const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });


// !! BASIC STUFF !!
// Instance REST for registering the slash commands
const rest = new REST({ version: '10' }).setToken(discordToken);  

// slash commands (for now only "weather" and "help" but more will come) //
const commands = [
  {
    name: 'help',
    description: 'Show the available commands.',
  },
  {
    name: 'weather',
    description: 'Show the weather of a given city',
    options: [
      {
        name: 'city',
        type: 3,
        description: 'Name of the city you wanna know the weather of',
        required: true,
      }
    ]
  }
];

// Register the slash commands on the server
(async () => {
  try {
    console.log('Starting to record the slash commands.');
    await rest.put(
      Routes.applicationCommands('1291301242533974037'),
      { body: commands }
    );
    console.log('Slash commands registered successfully.');
  } catch (error) {
    console.error(error);
  }
})();


// Starting the BOT and confirming it's ready to go !
client.on('ready', () => {
  console.log('Agent Romanoff, reporting for duty!');
});


// !! COMMANDS HELP AND WEATHER (and soon more) !!
client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;


  // Command /help
  if (interaction.commandName === 'help') {
    await interaction.reply('Here\'s everything I\'m capable of... and more is coming. ;) \n- /help : Shows this help\n- /weather "city" : Shows the weather in a city');
  }


  // Command /weather NameOfTheCity
  if (interaction.commandName === 'weather') {
    const city = interaction.options.getString('city'); 
    if (!city) {
      await interaction.reply('Veuillez fournir une ville correcte.');
      return;
    }

    // Weather information API's
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=fr`;

    try {
      const response = await axios.get(url);
      const data = response.data;

      // Extract the necessary weather data
      const description = data.weather[0]?.description;
      const temperature = data.main?.temp;
      const feels_like = data.main?.feels_like;
      const humidity = data.main?.humidity;

      // Vérification des données avant d'envoyer le message
      if (!description || !temperature || !feels_like || !humidity) {
        await interaction.reply("Désolé, les informations météorologiques sont incomplètes.");
        return;
      }

      // BOT replying with the weather information
      await interaction.reply(`Météo à **${city}** :\nDescription : ${description}\nTempérature : ${temperature}°C (ressenti ${feels_like}°C)\nHumidité : ${humidity}%`);
    } catch (error) {
      // Handle errors
      await interaction.reply('Désolé, je n\'ai pas pu trouver les informations météorologiques pour cette ville. Veuillez vérifier le nom et réessayer.');
    }
  }
});

// !! Messages listener !!
client.on('messageCreate', message => {
  if (message.author.bot) return;
  const userMessage = message.content.toLowerCase();

  // Appel des fonctions spécifiques pour chaque type de réponse
  handleAntiInsultes(message);  
  handleCompliments(message);
  handleIamDoingWell(message);
  handleDrama(message);
  handleLongMessages(message);
  handleMistakes(message);
  handleRewards(message);
  handleSalutations(message);
});


// Connexion du client avec le token du bot
client.login(discordToken);