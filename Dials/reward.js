
// Reward replies
const rewardRandom = [
  'Fascinating… Want a trophy for that?',
  'If that was meant to impress me, you missed.',
  'Not bad. Tony\'s gonna love telling you how he does that in his sleep.',
  'Great. Another achievement even Bruce in \'cool mode\' could pull off.',
  'Is this a victory? Call Cap, he\'ll probably hand you a plastic medal.',
  'You expecting a standing ovation? Well, well, it\'s not gonna happen with me alive.',
  'Finally\'? Took you as long as Ultron to realize he was losing.',
  'Wow, you\'re faster than Hulk trying to solve a Rubik\'s Cube.',
  'Congrats… Reminds me of my Red Room days—except we didn\'t celebrate mediocrity',
  'Impressive. Almost as tough as surviving the Red Room… oh wait, not even close.',
  'Finally? Took you long enough. In the Red Room, you\'d be replaced by now.',
  'You think that\'s hard? Try getting out of the Red Room with your sanity intact.',
  'Oh, you succeeded? In my world, we call that \'Tuesday\'.'
];
function handleRewards(message) {
    const userMessage = message.content.toLowerCase();
    if (userMessage.includes('i finally did it') || userMessage.includes('i did it') || userMessage.includes('nailed it') || userMessage.includes('nail it') || userMessage.includes('i rocked') || userMessage.includes('i rock') || userMessage.includes('i achieved it') || userMessage.includes('finally') || userMessage.includes('it was hard') || userMessage.includes('it was tough')) {
      const randomReward = rewardRandom[Math.floor(Math.random() * rewardRandom.length)];
      message.reply(randomReward);
    }
  }

  module.exports = { handleRewards };