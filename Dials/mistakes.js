  // Mistakes responses 
  const erreurs = [
    'made a mistake', 'mistake', 'failure', 'i screwed',
    'i failed', 'fail', 'fucked it up', 'i fucked up'
  ];
  
  function handleMistakes(message) {
    const userMessage = message.content.toLowerCase();
  
    for (const erreur of erreurs) {
      if (userMessage.includes(erreur)) {
        const randomMistake = mistakeRandom[Math.floor(Math.random() * mistakeRandom.length)];
        message.reply(randomMistake);
        return; // Pour éviter plusieurs réponses en cas de plusieurs mots-clés trouvés
      }
    }
  }