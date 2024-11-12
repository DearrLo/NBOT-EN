
 
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

function handleSalutations(message) {
    const userMessage = message.content.toLowerCase();
    if (userMessage.includes('bonjour') || userMessage.includes('hello') || userMessage.includes('hi') || userMessage.includes('yo') || userMessage.includes('hey')) {
      let randomSalutation = salutations[Math.floor(Math.random() * salutations.length)];
      randomSalutation = randomSalutation.replace('{username}', message.author.username);
      message.reply(randomSalutation);
    }
  }
  
  module.exports = { handleSalutations };