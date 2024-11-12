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

function handleCompliments(message) {
    const userMessage = message.content.toLowerCase();
    if (userMessage.includes('beautiful natasha') || userMessage.includes('beautiful nat') || userMessage.includes('beautiful agent') || userMessage.includes('pretty') || userMessage.includes('not only pretty') || userMessage.includes('hot nat') || userMessage.includes('hot natasha') || userMessage.includes('hot agent') || userMessage.includes('amazing tasha') || userMessage.includes('amazing agent') || userMessage.includes('amazing natasha') || userMessage.includes('smart agent') || userMessage.includes('smart natasha') || userMessage.includes('smart nat') || userMessage.includes('gorgeous natasha') || userMessage.includes('gorgeous agent') || userMessage.includes('pretty natasha') || userMessage.includes('pretty agent') || userMessage.includes('perfect') || userMessage.includes('perfect tasha') || userMessage.includes('most beautiful')) {
      let randomCompliment = complimentsRandom[Math.floor(Math.random() * complimentsRandom.length)];
      randomCompliment = randomCompliment.replace('{username}', message.author.username);
      message.reply(randomCompliment);
    }
  }
  
  module.exports = { handleCompliments };