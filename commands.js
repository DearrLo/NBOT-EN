// Necessary moduls that we need import first
const { REST, Routes } = require('discord.js');
const axios = require('axios');
require('dotenv').config();

// Tokens from .env file
const discordToken = process.env.DISCORD_TOKEN;  
const apiKey = process.env.WEATHER_TOKEN; 

// Instance REST for registering the slash commands
const rest = new REST({ version: '10' }).setToken(discordToken);  

// Slash commands ("help", "weather", and more to come)
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
  },
  {
    name: 'mission',
    description: 'You received a new mission from Agent Romanoff!'
  }
];

// Function to register slash commands on Discord
async function registerCommands(clientId) {
  try {
    console.log('Starting to record the slash commands.');
    await rest.put(
      Routes.applicationCommands(clientId),
      { body: commands }
    );
    console.log('Slash commands registered successfully.');
  } catch (error) {
    console.error('Error registering slash commands:', error);
  }
}

// Handle slash commands based on interaction
async function handleSlashCommands(interaction) {
  if (!interaction.isCommand()) return;

  // Command /help
  if (interaction.commandName === 'help') {
    await interaction.reply('Here\'s everything I\'m capable of... and more is coming. ;) \n- /help : Shows this help\n- /weather "city" : Shows the weather in a city\n- /mission : Get a random mission');
  }

  // Command /weather
  if (interaction.commandName === 'weather') {
    const city = interaction.options.getString('city'); 
    if (!city) {
      await interaction.reply('Please provide a valid city.');
      return;
    }

    // URL for the weather's API
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=fr`;

    try {
      const response = await axios.get(url);
      const data = response.data;

      // Extract necessary data for the weather report
      const description = data.weather[0]?.description;
      const temperature = data.main?.temp;
      const feels_like = data.main?.feels_like;
      const humidity = data.main?.humidity;

      // Check if all data is available before replying
      if (!description || !temperature || !feels_like || !humidity) {
        await interaction.reply("Sorry, the weather information is incomplete.");
        return;
      }

      // Reply with the weather information
      await interaction.reply(`Weather in **${city}** :\nDescription : ${description}\nTemperature : ${temperature}°C (feels like ${feels_like}°C)\nHumidity : ${humidity}%`);
    } catch (error) {
      // Handle errors
      await interaction.reply('Sorry, I couldn\'t find the weather information for this city. Please check for typos and try again.');
    }
  }

  // Command /mission
  if (interaction.commandName === 'mission') {
    handleMission(interaction);
  }
}

// Import handleMission from mission.js
const { handleMission } = require('./Dials/mission');

module.exports = { registerCommands, handleSlashCommands };