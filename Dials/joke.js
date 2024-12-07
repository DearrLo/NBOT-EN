const { AttachmentBuilder } = require('discord.js');
const path = require('path');

// The jokes she can make lmao 
const joke = [
  { text: 'BLABLA?', image: 'nat1.jpg' },
  { text: 'BLABLA', image: 'nat1.jpg' },
  { text: 'BLABLA', image: 'nat1.jpg' },
];

function handleAJoke(message) {
  const userMessage = message.content.toLowerCase();

  if (userMessage.includes('tell me a joke') || userMessage.includes('Gimme a joke') || userMessage.includes('joke natahsa ?') || userMessage.includes('joke agent ?') || userMessage.includes('joke ?') || userMessage.includes('say a joke') || userMessage.includes('joke tasha')) {
    try {

      // Pick a random joke
      const randomJoke = joke[Math.floor(Math.random() * joke.length)];
      const textWithUsername = randomJoke.text.replace('{username}', message.author.username);

      // Create a local path for the pic
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
  
  module.exports = { handleAJoke };