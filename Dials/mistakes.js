const { AttachmentBuilder } = require('discord.js');
const path = require('path');

// Mistakes responses
const erreurs = [
  'made a mistake', 'mistake', 'failure', 'i screwed', 
  'i failed', 'fail', 'fucked it up', 'i fucked up'
];

// Array of possible responses when a mistake is detected
const replyMistakes = [
  { text: "Don't worry, even the best fall sometimes.", image: 'nat4.jpg' },
  { text: "Mistakes are proof that you are trying.", image: 'nat4.jpg' },
  { text: "It's okay, we all mess up sometimes.", image: 'nat4.jpg' },
  { text: "If you fall, I will be here... unless you fell from a plane. Then, good luck.", image: 'nat4.jpg' },
  { text: "L O S E R.", image: 'natSass.jpg' },
  { text: "... didn't think you can fell deeper.", image: 'natSass.jpg' },
  { text: "What do you want me to tell you ?", image: 'natSass.jpg' }
];

function handleMistakes(message) {
  const userMessage = message.content.toLowerCase();

  for (const erreur of erreurs) {
    if (userMessage.includes(erreur)) {
      // Pick a random response from replyMistakes
      const randomMistake = replyMistakes[Math.floor(Math.random() * replyMistakes.length)];

      // If the response has an image associated with it
      if (randomMistake.image) {
        try {
          // Create a path to the local image
          const imagePath = path.join(__dirname, '../Images/relatedToOther', randomMistake.image);
          console.log("Image Path:", imagePath); // Debugging log to check the path

          // Create an attachment with the image
          const attachment = new AttachmentBuilder(imagePath);

          // Reply to the message with the text and the attached image
          message.reply({ content: randomMistake.text, files: [attachment] });
        } catch (error) {
          // Error handling
          console.error('Error sending message with attachment:', error);
          message.reply('Sorry, something went wrong when trying to send an image.');
        }
      } else {
        // If there is no image, reply with just the text
        message.reply(randomMistake.text);
      }

      return; // To avoid multiple responses in case of multiple keywords found
    }
  }
}

module.exports = { handleMistakes };