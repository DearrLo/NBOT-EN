require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');

// this is for the import of slash functions
const { registerCommands, handleSlashCommands } = require('./commands');

// this is the functions for the handling chat with the bot
const { handleAJoke } = require('./Dials/joke');
const { handleAntiInsultes } = require('./Dials/antiInsults');
const { handleCompliments } = require('./Dials/compliments');
const { handleIamDoingWell } = require('./Dials/doingWell');
const { handleDrama } = require('./Dials/drama');
const { handleLongMessages } = require('./Dials/longMessages');
const { handleMistakes } = require('./Dials/mistakes');
const { handleRewards } = require('./Dials/reward');
const { handleSalutations } = require('./Dials/salutations');

const discordToken = process.env.DISCORD_TOKEN;
console.log("Discord Token:", discordToken);

// instances to bring for the BOT
const client = new Client({ 
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});



// !! BASIC STUFF !!

// Registering slash commands
(async () => {
  try {
    await registerCommands('1291301242533974037'); // Replace the ID if necessary
    console.log("Slash commands registered successfully.");
  } catch (error) {
    console.error("Error registering slash commands:", error);
  }
})();


// !! COMMANDS HELP AND WEATHER (and soon more) !!

// Handle slash command interactions
client.on('interactionCreate', async interaction => {
  try {
    await handleSlashCommands(interaction);
  } catch (error) {
    console.error("Error handling interaction:", error);
  }
});

// !! Messages listener !!
// Listen to all incoming messages (think to manage the perms for the bot don't turn annoying)
client.on('messageCreate', message => {
  if (message.author.bot) return;



  // Calling specific functions for each type of response
  handleAJoke(message);
  handleAntiInsultes(message);
  handleCompliments(message);
  handleIamDoingWell(message);
  handleDrama(message);
  handleLongMessages(message);
  handleMistakes(message);
  handleRewards(message);
  handleSalutations(message);
});

// Starting the bot and confirming it's ready to go!
client.login(discordToken).then(() => {
  console.log('Agent Romanoff, reporting for duty!');
}).catch((error) => {
  console.error("Login failed:", error);
});
