// too long messages replies //
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

function handleLongMessages(message) {
    const maxLength = 60;
    if (message.content.length > maxLength) {
      let randomBothered = botheredRandom[Math.floor(Math.random() * botheredRandom.length)];
      randomBothered = randomBothered.replace('{username}', message.author.username);
      message.reply(randomBothered);
    }
  }
  
  module.exports = { handleLongMessages };
 
  