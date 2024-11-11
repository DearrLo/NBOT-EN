// Anti insult squad
const randomNoInsultes = [
  'LANGUAGE, {username}!',
  'LANGUAGE... FOR FUC-... Look what you made me do.',
  'That\'s so sad that a pretty mouth like yours says dirty things like that.',
  '{username}! It\'s the last time I\'m telling you! Your L A N G U A G E!'
];

function handleAntiInsultes(message) {
  const userMessage = message.content.toLowerCase();
  const insultes = ['fuck', 'shit', 'bitch', 'shut up', 'ta gueule', 'fucking', 'motherfucker', 'jfc', 'asshole', 'cunt', 'debile', 'idiot'];
  for (const insulte of insultes) {
    if (userMessage.includes(insulte)) {
      let randomResponse = randomNoInsultes[Math.floor(Math.random() * randomNoInsultes.length)];
      randomResponse = randomResponse.replace('{username}', message.author.username);
      message.reply(randomResponse);
      return;
    }
  }
}

module.exports = { handleAntiInsultes };