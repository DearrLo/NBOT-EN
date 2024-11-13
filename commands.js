// Import necessary modules
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
    description: 'You would like to give me a mission? Well, it\'s the place to be!'
  }
];

// Function to register slash commands on DC
async function registerCommands(clientId) {
  try {
    console.log('Starting to record the slash commands.');
    await rest.put(
      Routes.applicationCommands(1291301242533974037), 
      { body: commands }
    );
    console.log('Slash commands registered successfully.');
  } catch (error) {
    console.error(error);
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

    // URL for weather API
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

  // command for /mission
  if (interaction.commandName === 'mission') {
    handleMission(interaction);
  }
}

// import handle mission
const { handleMission } = require('./Dials/mission');

module.exports = { registerCommands, handleSlashCommands };