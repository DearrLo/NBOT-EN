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


function handleDrama(message) {
    const userMessage = message.content.toLowerCase();
    if (userMessage.includes('drama') || userMessage.includes('spill the tea') || userMessage.includes('argue') || userMessage.includes('fight') || userMessage.includes('gossip')) {
      const randomDrama = dramaRandom[Math.floor(Math.random() * dramaRandom.length)];
      message.reply(randomDrama);
    }
  }
  
  module.exports = { handleErreurs, handleRewards, handleSalutations, handleIamDoingWell, handleDrama };