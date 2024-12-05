const { AttachmentBuilder } = require('discord.js');
const path = require('path');

// salutations responses
const salutations = [
  { text: 'Hello to you too, {username}. How are you doing?', image: 'nat1.jpg' },
  { text: '*Nods* {username}. It\'s good to see you too, pal.', image: 'nat1.jpg' },
  { text: 'Morning {username}! You didn\'t see Thor?', image: 'nat1.jpg' },
  { text: 'Hi {username}! You didn\'t see Tony?', image: 'nat2.jpg' },
  { text: 'Hi {username}! You didn\'t see Clint?', image: 'nat2.jpg' },
  { text: 'Hey {username}! You didn\'t see my peanut butter sandwich?', image: 'nat3.jpg' },
  { text: 'Hey, {username}! Hope you\'re doing just fine, dear.', image: 'nat3.jpg' },
  { text: 'Hey {username}.', image: 'nat3.jpg' }
];

function handleSalutations(message) {
  const userMessage = message.content.toLowerCase();

  if (userMessage.includes('bonjour') || userMessage.includes('hello') || userMessage.includes('hi') || userMessage.includes('yo') || userMessage.includes('hey')) {
    try {

      // Pick a random salutation
      const randomSalutation = salutations[Math.floor(Math.random() * salutations.length)];
      const textWithUsername = randomSalutation.text.replace('{username}', message.author.username);

      // CReate a local path for the pic
      const imagePath = path.join(__dirname, '../Images/relatedtoSalutations', randomSalutation.image);
      console.log("Image Path:", imagePath); // Debugging log pour vérifier le chemin

      // Create the attacment with the pic
      const attachment = new AttachmentBuilder(imagePath);

      // reply with text + pic
      message.reply({ content: textWithUsername, files: [attachment] });
      
    } catch (error) {

      // For catching errors
      console.error('Error sending message with attachment:', error);
      message.reply('Sorry, something went wrong when trying to send an image.');
    }
  }
}
  
  module.exports = { handleSalutations };