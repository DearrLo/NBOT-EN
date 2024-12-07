const { AttachmentBuilder } = require('discord.js');
const path = require('path');

// too long messages replies //
const botheredRandom = [
  { text: '{username}, you realize I stopped reading about one minute ago, right?', image: 'tl1.jpg' },
  { text: 'Is there a point to this? Or are we just filling the air?', image: 'tl2.jpg' },
  { text: 'If I wanted a lecture, I\'d ask Fury.', image: 'tl3.jpg' },
  { text: 'That\'s a lot of words for something that could\'ve been a sentence, {username}.', image: 'tl1.jpg' },
  { text: 'You sure you\'re not trying to write a novel here?', image: 'tl4.jpg' },
  { text: 'Wow {username}, you must love the sound of your own voice.', image: 'tl2.jpg' },
  { text: 'I\'d tell you to breathe, but I\'m kind of enjoying the silence when you\'re done.', image: 'tl3.jpg' },
  { text: 'This… really could\'ve been summed up in two words.', image: 'tl4.jpg' },
  { text: 'Summarize, for god sake.', image: 'tl3.jpg' }
];

function handleLongMessages(message) {
  const maxLength = 30;

  if (message.content.length > maxLength) {
    try {
      //Select a random answer in botheredRandom
      const randomBothered = botheredRandom[Math.floor(Math.random() * botheredRandom.length)];
      const textWithUsername = randomBothered.text.replace('{username}', message.author.username);

      // Create a local path
      const imagePath = path.join(__dirname, '../Images/relatedtoOther', randomBothered.image);

      // Create an attachment
      const attachment = new AttachmentBuilder(imagePath);

      // Reply to the user with the text + picture
      message.reply({ content: textWithUsername, files: [attachment] });
    } catch (error) {
      // Gestion des erreurs
      console.error('Error sending message with attachment:', error);
      message.reply('Sorry, something went wrong when trying to send an image.');
    }
  }
}

module.exports = { handleLongMessages };
 
  