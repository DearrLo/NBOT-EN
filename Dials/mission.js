// list of possible missions
const missions = [
    'Infiltrate your fridge and gather intelligence there. Oh and... something to eat.',
    'Pet your animal. Right now.',
    'Drink water you dry piece of-...',
    'Go to your partner and tell \'em how much you love them. Don\'t say thank you, it\'s fine.',
    'Eliminate a threat Something like your cleaning duties.',
    'Do your bed. Don\'t be a lazy being.',
    'Wipe your floor. C\'mon !',
    'Drink water. More water, always more.'
];

function handleMission(interaction) {

    // pick a random mission from the missions array
    const randomMission = missions[Math.floor(Math.random() * missions.length)];
    
    // reply to the user with the selected mission
    interaction.reply(`Your mission, should you choose to accept it: ${randomMission}`);
}

module.exports = { handleMission };