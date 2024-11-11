  // Mistakes responses 
  const mistakeRandom = [
    'Really? That\'s your plan?',
    'Just so you know, I\'m not a babysitter.',
    'You seriously thought that was a good idea?',
    'Ah, blind confidence. Always a risky bet.',
    'I could help… but wouldn\'t that be too easy?',
    'I\'m not here to hold your hand. Find a solution by yourself.',
    'Try again. Maybe this time, you\'ll get it right.',
    'Oh, you made a mistake. Shocking.',
    'Here\'s a tip… you\'re digging yourself deeper.',
    'If that was supposed to be smart, you\'re going to need a redo.',
    'Need me to handle it? \'Cause this is getting embarrassing.',
    'I don\'t do miracles, but I can try to clean up your mess.',
    'Should we pause so you can think it through, or keep doing whatever this is?',
    'I\'d give you advice, but I doubt you\'d listen.'
  ];

function handleMistakes(message) {
    const userMessage = message.content.toLowerCase();
    if (userMessage.includes('made a mistake') || userMessage.includes('mistake') || userMessage.includes('failure') || userMessage.includes('i screwed') || userMessage.includes('i failed') || userMessage.includes('fail') || userMessage.includes('fucked it up') || userMessage.includes('i fucked up')) {
      const randomMistake = mistakeRandom[Math.floor(Math.random() * mistakeRandom.length)];
      message.reply(randomMistake);
    }
  }

  module.exports = { handleMistakes };