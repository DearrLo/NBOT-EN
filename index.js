const { Client, GatewayIntentBits, REST, Routes } = require('discord.js');
const axios = require('axios');
require('dotenv').config();

const discordToken = process.env.DISCORD_TOKEN;  
const apiKey = process.env.WEATHER_TOKEN; 

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });




// !! BASIC STUFF !!

// Instance REST for registrer the slash commands
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


// Register de / commands on the serveur 

(async () => {
  try {
    console.log('Starting to record the slash\'s commands.');
    await rest.put(
      Routes.applicationCommands('1291301242533974037'),
      { body: commands }
  );
    console.log('Slash\'s Command realised with sucess.');
  } catch (error) {
    console.error(error);
  }
})();


// Startting the BOT and make it say it when it's ready :
client.once('ready', () => {
  console.log('Agent Romanoff, reporting for duty !');
});


// !! Commands help and weather !!

client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;

  // Commande /help
  if (interaction.commandName === 'help') {
    await interaction.reply('Here\'s everything i\'m capable of... and more much will come. ;) \n- /help : Affiche cette aide\n- /météo "ville") : permets de savoir si tu dois t\'habiller (ou non) chaudement pour moi...');
  }

  // Commande /weather NameOfTheCity
  if (interaction.commandName === 'weather') {
    const city = interaction.options.getString('city'); 
    if (!city) {
      await interaction.reply('Please, gimme a correct city honey, i still cannot guess for you...!');
      return;
    }

     // here's just the api's weather for permit him to interract with
     const url = `https://api.openweathermap.org/data/2.5/weather?q=${ville}&appid=${apiKey}&units=metric&lang=fr`;

     try {
        const response = await axios.get(url);
        const data = response.data;
        
        // here's we parameter the exact information we want the BOT to extract via the website
        const description = data.weather[0].description;
        const temperature = data.main.temp;
        const feels_like = data.main.feels_like;
        const humidity = data.main.humidity;
  
        // here's the BOT is replying
        await interaction.reply(`Météo à **${ville}** :\nDescription : ${description}\nTempérature : ${temperature}°C (ressenti ${feels_like}°C)\nHumidité : ${humidity}%`);
      } catch (error) {
        // managing the errors
        await interaction.reply('Sorry, I wasn\'t able to find the meteorological informations for this city, please double check the name and try again.');
      }
  }
});


// !! Specific stuff !!

client.on('messageCreate', message => {
    // ignore the message if it's the BOT itself who say it :
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
