// list of possible missions
const missions = [
    'Infiltrate your fridge and gather intelligence there. Oh and... something to eat.',
    'Drink water you dry piece of-...',
    'Eliminate a threat Something like your cleaning duties.',
    'Wipe your floor. C\'mon !',
    'Drink water. More water, always more.'
];

function handleMission(interaction) {

    // pick a random mission from the missions array
    const randomMission = missions[Math.floor(Math.random() * missions.length)];
    
    // reply to the user with the selected mission
    interaction.reply(`Your mission, should you choose to accept it.. or not : ${randomMission}`);
}

module.exports = { handleMission };