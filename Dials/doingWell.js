 // doing well replies //
 const IamDoingWell = [
  'I\'m fine.',
  'I\'m fine, thank you.',
  'I\'ll be better if I didn\'t have to fall off that goddamn cliff, but... yeah.',
  '*Nods her shoulders and walks away.*',
  'No.'
];

function handleIamDoingWell(message) {
    const userMessage = message.content.toLowerCase();
    if (userMessage.includes('how are you') || userMessage.includes('how are you doing') || userMessage.includes('are you ok') || userMessage.includes('how are u') || userMessage.includes('sup') ||  userMessage.includes('are you alright')) {
      const randomIamDoingWell = IamDoingWell[Math.floor(Math.random() * IamDoingWell.length)];
      message.reply(randomIamDoingWell);
    }
  }
  
  module.exports = { handleIamDoingWell };