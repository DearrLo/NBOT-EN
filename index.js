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
client.on('ready', () => {
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







// !! Specific stuff !!

client.on('messageCreate', message => {
  if (message.author.bot) return;
  const userMessage = message.content.toLowerCase();

  // !! ANTI-INSULT SQUAD !!
  const randomNoInsultes = [
    'LANGUAGE {username}!',
    'LANGUAGE.... FOR FUC-... Look what you made me do.',
    'That\'s so sad that a pretty mouth like yours says dirty things like that.',
    '{username}! It\'s the last time I\'m telling you! Your L A N G U A G E!'
  ];

    // Check if the message contains an insult
    if (userMessage.includes('fuck') || userMessage.includes('shit') || userMessage.includes('bitch') || userMessage.includes('shut up') || userMessage.includes('ta gueule') || userMessage.includes('fucking') || userMessage.includes('motherfucker') || userMessage.includes('jfc') || userMessage.includes('asshole') || userMessage.includes('cunt') || userMessage.includes('debile') || userMessage.includes('idiot')) {
      let NoInsultes = randomNoInsultes[Math.floor(Math.random() * randomNoInsultes.length)];
      NoInsultes = NoInsultes.replace('{username}', message.author.username);
      message.reply(NoInsultes);
      return;
    }

  // Mistakes responses 
  const mistakeRandom = [
    'Really? That\'s your plan?',
    'Just so you know, I\'m not a babysitter.',
    'You seriously thought that was a good idea?',
    'Ah, blind confidence. Always a risky bet.',
    'I could help… but wouldn\'t that be too easy?',
    'I\'m not here to hold your hand. Find a solution by yourself.',
    'Try again. Maybe this time, you\'ll get it right.',
    'Oh, you made a mistake. Shocking.',
    'Here\'s a tip… you\'re digging yourself deeper.',
    'If that was supposed to be smart, you\'re going to need a redo.',
    'Need me to handle it? \'Cause this is getting embarrassing.',
    'I don\'t do miracles, but I can try to clean up your mess.',
    'Should we pause so you can think it through, or keep doing whatever this is?',
    'I\'d give you advice, but I doubt you\'d listen.'
  ];

  if (userMessage.includes('made a mistake') || userMessage.includes('mistake') || userMessage.includes('failure') || userMessage.includes('i screwed') || userMessage.includes('i failed') || userMessage.includes('fail') ||  userMessage.includes('fucked it up') || userMessage.includes('i fucked up')) {
    const randomMistake = mistakeRandom[Math.floor(Math.random() * mistakeRandom.length)];
    message.reply(randomMistake);
    return;
  }

  // Reward replies
  const rewardRandom = [
    'Fascinating… Want a trophy for that?',
    'If that was meant to impress me, you missed.',
    'Not bad. Tony\'s gonna love telling you how he does that in his sleep.',
    'Great. Another achievement even Bruce in \'cool mode\' could pull off.',
    'Is this a victory? Call Cap, he\'ll probably hand you a plastic medal.',
    'You expecting a standing ovation? Well, well, it\'s not gonna happen with me alive.',
    'Finally\'? Took you as long as Ultron to realize he was losing.',
    'Wow, you\'re faster than Hulk trying to solve a Rubik\'s Cube.',
    'Congrats… Reminds me of my Red Room days—except we didn\'t celebrate mediocrity',
    'Impressive. Almost as tough as surviving the Red Room… oh wait, not even close.',
    'Finally? Took you long enough. In the Red Room, you\'d be replaced by now.',
    'You think that\'s hard? Try getting out of the Red Room with your sanity intact.',
    'Oh, you succeeded? In my world, we call that \'Tuesday\'.'
  ];

  if (userMessage.includes('i finally did it') || userMessage.includes('i did it') || userMessage.includes('nailed it') || userMessage.includes('nail it') || userMessage.includes('i rocked') || userMessage.includes('i rock') || userMessage.includes('i archived it?') || userMessage.includes('finally') || userMessage.includes('it was hard') || userMessage.includes('it was tough')) {
    const randomReward = rewardRandom[Math.floor(Math.random() * rewardRandom.length)];
    message.reply(randomReward);
    return;
  }

  // Drama/spill the tea replies
  const dramaRandom = [
    'If you wanted drama, you should\'ve called me sooner.',
    'Oh, you were trying to be funny? Bad news: you\'re not.',
    'Wait, you call that arguing ? Try arguing with someone while dodging bullets.',
    'You want tea? I\'ve spilled more blood than you\'ll ever spill gossip.',
    'Oh, this is what you call intense? I\'ve had more interesting conversations with a punching bag.',
    'This little mess is what\'s bothering you? Try escaping from mind control—then we\'ll talk.',
    'This little situation is what\'s getting to you? I\'ve handled more complicated things before breakfast.',
    'Oh, are we still talking about this? I thought we moved on from trivial stuff ages ago.'
  ];

  if (userMessage.includes('natasha') || userMessage.includes('agent') || userMessage.includes('natasha?') || userMessage.includes('your opinion') || userMessage.includes('i want your opinion natasha') || userMessage.includes('lol natasha') || userMessage.includes('lmao')) {
    const randomDrama = dramaRandom[Math.floor(Math.random() * dramaRandom.length)];
    message.reply(randomDrama);
    return;
  }

  // There's too many caracters replies
  const maxLength = 60;

  if (message.content.length > maxLength) {
    const botheredRandom = [
      '{username}, you realize I stopped reading about one minute ago, right?',
      'Is there a point to this? Or are we just filling the air?',
      'If I wanted a lecture, I\'d ask Fury.',
      'That\'s a lot of words for something that could\'ve been a sentence, {username}.',
      'You sure you\'re not trying to write a novel here?',
      'Wow {username}, you must love the sound of your own voice.',
      'I\'d tell you to breathe, but I\'m kind of enjoying the silence when you\'re done.',
      'This… really could\'ve been summed up in two words.',
      'Summarize, for god sake.'
    ];

    const randomBothered = botheredRandom[Math.floor(Math.random() * botheredRandom.length)];
    message.reply(randomBothered.replace('{username}', message.author.username));
    return;
  }


  // Compliments replies
  const complimentRandom = [
    'Ever heard of subtlety?',
    'Tell me something I don\'t know.',
    'Thank you, {username}.',
    'Flattery\'s cute, but I was already aware.',
    'You think I didn\'t already know? Please.',
    'Aw, how sweet {username}. Too bad I\'ve been hearing that forever.',
    'Duh. I\'m already aware.',
    'Wow, thanks. Try not to faint.'
  ];

  if (userMessage.includes('beautiful natasha') || userMessage.includes('beautiful nat') || userMessage.includes('beautiful agent') || userMessage.includes('pretty') || userMessage.includes('not only pretty') || userMessage.includes('hot nat') || userMessage.includes('hot natasha') || userMessage.includes('hot agent') || userMessage.includes('amazing tasha') || userMessage.includes('amazing agent') || userMessage.includes('amazing natasha') || userMessage.includes('smart agent') || userMessage.includes('smart natasha') || userMessage.includes('smart nat') || userMessage.includes('georgous natasha') || userMessage.includes('georgous agent') || userMessage.includes('pretty natasha') || userMessage.includes('pretty agent') || userMessage.includes('perfect') || userMessage.includes('perfect tasha') ||userMessage.includes('most beautiful')) {
    const randomCompliment = complimentRandom[Math.floor(Math.random() * complimentRandom.length)];
    message.reply(randomCompliment);
    return;
  }



  // salutations responses
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

  if (userMessage.includes('sup tasha') || userMessage.includes('how are you agent') ||  userMessage.includes('how are you') || userMessage.includes('i\'m good and you') || userMessage.includes('are you ok nat') || userMessage.includes('wassup') || userMessage.includes('how are you doing')) {
    const randomIamDoingWell = IamDoingWell[Math.floor(Math.random() * IamDoingWell.length)];
    message.reply(randomIamDoingWell);
}
  if (userMessage.includes('bonjour') || userMessage.includes('yo') || userMessage.includes('hello') || 
  userMessage.includes('hi') || userMessage.includes('hey')) {
let randomSalutation = salutations[Math.floor(Math.random() * salutations.length)];
randomSalutation = randomSalutation.replace('{username}', message.author.username);
message.reply(randomSalutation);
  }
});

client.login(discordToken);
