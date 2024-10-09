const { Client, GatewayIntentBits, REST, Routes } = require('discord.js');
const axios = require('axios');
require('dotenv').config();

const discordToken = process.env.DISCORD_TOKEN;  
const apiKey = process.env.WEATHER_TOKEN; 

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

// !! BASIC STUFF !!

// Instance REST for registering the slash commands
const rest = new REST({ version: '10' }).setToken(discordToken);  

// slash commands (for now only "weather" and "help"))
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

// Starting the BOT and confirming it's ready
client.once('ready', () => {
  console.log('Agent Romanoff, reporting for duty!');
});

// !! Commands help and weather !!

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
      await interaction.reply('Please, give me a correct city name, I still cannot guess for you...!');
      return;
    }

    // API URL for weather information
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=fr`;

    try {
      const response = await axios.get(url);
      const data = response.data;

      // Extract the necessary weather data
      const description = data.weather[0].description;
      const temperature = data.main.temp;
      const feels_like = data.main.feels_like;
      const humidity = data.main.humidity;

      // BOT replying with the weather information
      await interaction.reply(`Météo à **${city}** :\nDescription : ${description}\nTempérature : ${temperature}°C (ressenti ${feels_like}°C)\nHumidité : ${humidity}%`);
    } catch (error) {
      // Handle errors
      await interaction.reply('Sorry, I wasn\'t able to find the meteorological information for this city, please double-check the name and try again.');
    }
  }
});

// !! Specific stuff !!

client.on('messageCreate', message => {
  // Ignore the message if it's from the BOT itself
  if (message.author.bot) return;

  // Convert the message to lowercase
  const userMessage = message.content.toLowerCase();

  // !! ANTI-INSULT SQUAD !!
  const randomNoInsultes = [
    'LANGUAGE {username}!',
    'LANGUAGE.... FOR FUC-... Look what you made me do.',
    'That\'s so sad that a pretty mouth like yours says dirty things like that.',
    '{username}! It\'s the last time I\'m telling you! Your L A N G U A G E!'
  ];

  // Check if the message contains an insult
  if (userMessage.includes('fuck') || userMessage.includes('shit') || userMessage.includes('shut up') || userMessage.includes('ta gueule') || userMessage.includes('fucking') || userMessage.includes('motherfucker') || userMessage.includes('jfc') || userMessage.includes('asshole') || userMessage.includes('cunt') || userMessage.includes('debile') || userMessage.includes('idiot')) {
    let NoInsultes = randomNoInsultes[Math.floor(Math.random() * randomNoInsultes.length)];
    NoInsultes = NoInsultes.replace('{username}', message.author.username);
    message.reply(NoInsultes);
    return;
  }

  // Sarcastic responses
  const SarcasmWidow = [
    'Really? That\'s your plan?',
    'Fascinating… Want a trophy for that?',
    'I\'m already bored. Try again.',
    'Just so you know, I\'m not a babysitter.',
    'You seriously thought that was a good idea?',
    'Ah, blind confidence. Always a risky bet.',
    'I could help… but wouldn\'t that be too easy?',
    'If that was meant to impress me, you missed.',
    'I\'m not here to hold your hand.',
    'Try again. Maybe this time, you\'ll get it right.',
    'Oh, you made a mistake. Shocking.',
    'If you wanted drama, you should\'ve called me sooner.',
    'Here\{s a tip… you\'re digging yourself deeper.',
    'Ever heard of subtlety?',
    'If that was supposed to be smart, you\'re going to need a redo.',
    'Need me to handle it? \'Cause this is getting embarrassing.',
    'I don\'t do miracles, but I can try to clean up your mess.',
    'Oh, you were trying to be funny? Bad news: you\'re not.',
    'Should we pause so you can think it through, or keep doing whatever this is?',
    'I\'d give you advice, but I doubt you\'d listen.'
  ];

  if (userMessage.includes('natasha') || userMessage.includes('agent') || userMessage.includes('natasha?') || userMessage.includes('your opinion') || userMessage.includes('i want your opinion natasha') || userMessage.includes('lol natasha') || userMessage.includes('lmao')) {
    const randomSarcasm = SarcasmWidow[Math.floor(Math.random() * SarcasmWidow.length)];
    message.reply(randomSarcasm);
    return;
  }

  // Greetings responses
  const salutations = [
    'Hello to you too, {username}. How are you doing?',
    '*Nods* {username}. It\'s good to see you too, pal.',
    'Morning {username}! You didn\'t see Thor?',
    'Hi {username}! You didn\'t see Tony?',
    'Hi {username}! You didn\'t see Clint?',
    'Hey {username}! You didn\'t see my peanut butter sandwich?',
    'Hey, {username}! Hope you\'re doing just fine, dear.',
    'Hey {username}.'
  ];

  const IamDoingWell = [
    'I\'m fine.',
    'I\'m fine, thank you.',
    'I\'ll be better if I didn\'t have to fall off that goddamn cliff, but... yeah.',
    '*Nods her shoulders and walks away.*',
    'No.'
  ];

  if (userMessage.includes('sup tasha') || userMessage.includes('how are you agent') ||  userMessage.includes('how are you') ||userMessage.includes('i\'m good and you') || userMessage.includes('are you ok nat') || userMessage.includes('wassup') || userMessage.includes('how are you doing')) {
    const randomIamDoingWell = IamDoingWell[Math.floor(Math.random() * IamDoingWell.length)];
    message.reply(randomIamDoingWell);
  } else if (userMessage.includes('bonjour') || userMessage.includes('yo') || userMessage.includes('hello') || userMessage.includes('hi') || userMessage.includes('hey')) {
    let randomSalutation = salutations[Math.floor(Math.random() * salutations.length)];
    randomSalutation = randomSalutation.replace('{username}', message.author.username);
    message.reply(randomSalutation);
  }
});

client.login(discordToken);