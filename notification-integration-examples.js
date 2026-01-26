// ===================================================================
// EXEMPLE D'INTÉGRATION - Système de Notifications PokeChill
// ===================================================================
// Ce fichier montre comment intégrer le système de notifications
// dans différents contextes du jeu
// ===================================================================

// ===================================================================
// 1. INTÉGRATION DANS EXPLORE.JS
// ===================================================================

// Fonction originale : catchPokemon() dans explore.js
function catchPokemonWithNotification(pokemon) {
  const isNew = !pkmn[pokemon.id].caught || pkmn[pokemon.id].caught === 0;
  const isShiny = pokemon.shiny;
  
  // Logique de capture normale
  pkmn[pokemon.id].caught = (pkmn[pokemon.id].caught || 0) + 1;
  // ... reste du code de capture ...
  
  // NOUVEAU : Notifications
  if (window.notify) {
    if (isShiny) {
      window.notify.shiny(pokemon.id);
    }
    if (isNew) {
      window.notify.newPokemon(pokemon.id);
    }
  }
  
  updatePokedex();
  saveGame();
}

// Génération de Pokémon avec notification shiny
function generateWildPokemonWithNotification(areaId) {
  const pokemon = generatePokemon(areaId);
  
  // Vérification shiny (1/400)
  if (rng(1/400)) {
    pokemon.shiny = true;
    
    // NOUVEAU : Notification immédiate pour shiny trouvé
    if (window.notify) {
      window.notify.shiny(pokemon.id);
    }
  }
  
  return pokemon;
}


// ===================================================================
// 2. INTÉGRATION DANS SHOP.JS
// ===================================================================

// Fonction d'achat avec notification
function buyItemWithNotification(itemId, quantity = 1) {
  const item = itemDictionary[itemId];
  const totalCost = item.price * quantity;
  
  // Vérifier si le joueur a assez d'argent
  if (saved.money < totalCost) {
    if (window.notify) {
      window.notify.info('❌ Achat échoué', 'Pas assez d\'argent!', 3000);
    }
    return false;
  }
  
  // Effectuer l'achat
  saved.money -= totalCost;
  saved.items[itemId] = (saved.items[itemId] || 0) + quantity;
  
  // NOUVEAU : Notification d'achat réussi
  if (window.notify) {
    window.notify.item(itemId, quantity);
  }
  
  saveGame();
  updateShop();
  return true;
}


// ===================================================================
// 3. INTÉGRATION DANS LE SYSTÈME DE COMBAT
// ===================================================================

// Notification de victoire avec récompenses
function onBattleVictoryWithNotification(enemyTeam, rewards) {
  // Logique de victoire normale
  saved.battlesWon = (saved.battlesWon || 0) + 1;
  
  // Attribution des récompenses
  saved.money += rewards.money;
  saved.exp += rewards.exp;
  
  // NOUVEAU : Notification de victoire
  if (window.notify) {
    window.notify.info(
      '🎉 Victoire!',
      `+${rewards.money}$ | +${rewards.exp} EXP`,
      4000
    );
  }
  
  // Vérifier les achievements
  checkBattleAchievements();
  
  saveGame();
}

// Notification niveau supérieur
function onPokemonLevelUpWithNotification(pokemonId, newLevel) {
  const pokemon = pkmn[pokemonId];
  pokemon.level = newLevel;
  
  // NOUVEAU : Notification de niveau supérieur
  if (window.notify) {
    const pokemonName = pkmnDictionary[pokemonId].name.fr || pkmnDictionary[pokemonId].name.en;
    window.notify.info(
      '⬆️ Niveau Supérieur!',
      `${pokemonName} est maintenant niveau ${newLevel}!`,
      4000
    );
  }
  
  // Vérifier si le pokémon apprend de nouvelles capacités
  checkNewMoves(pokemonId, newLevel);
  
  updatePokedex();
  saveGame();
}


// ===================================================================
// 4. INTÉGRATION DANS LE SYSTÈME D'ACHIEVEMENTS
// ===================================================================

// Système d'achievements avec notifications
const achievements = {
  shinyHunter: {
    id: 'shiny-hunter',
    title: 'Chasseur de Shiny',
    description: 'Capturer 10 Pokémon shiny',
    condition: () => Object.values(pkmn).filter(p => p.caught && p.shiny).length >= 10,
    unlocked: false
  },
  masterTrainer: {
    id: 'master-trainer',
    title: 'Maître Dresseur',
    description: 'Capturer tous les Pokémon',
    condition: () => Object.values(pkmn).every(p => p.caught > 0),
    unlocked: false
  },
  champion: {
    id: 'champion',
    title: 'Champion',
    description: 'Gagner 100 combats',
    condition: () => (saved.battlesWon || 0) >= 100,
    unlocked: false
  }
};

function checkAchievements() {
  Object.values(achievements).forEach(achievement => {
    if (!achievement.unlocked && achievement.condition()) {
      achievement.unlocked = true;
      
      // NOUVEAU : Notification d'achievement
      if (window.notify) {
        window.notify.achievement(
          achievement.title,
          achievement.description
        );
      }
      
      // Sauvegarder le statut
      saved.achievements = saved.achievements || {};
      saved.achievements[achievement.id] = true;
      saveGame();
    }
  });
}


// ===================================================================
// 5. INTÉGRATION DANS LE SYSTÈME D'ÉVOLUTION
// ===================================================================

// Notification d'évolution
function evolvePokemonWithNotification(pokemonId, evolutionId) {
  const oldName = pkmnDictionary[pokemonId].name.fr || pkmnDictionary[pokemonId].name.en;
  const newName = pkmnDictionary[evolutionId].name.fr || pkmnDictionary[evolutionId].name.en;
  
  // Transférer les données vers l'évolution
  const oldData = { ...pkmn[pokemonId] };
  pkmn[evolutionId] = {
    ...oldData,
    id: evolutionId
  };
  
  // NOUVEAU : Notification d'évolution
  if (window.notify) {
    window.notify.achievement(
      '🌟 Évolution!',
      `${oldName} a évolué en ${newName}!`
    );
  }
  
  updatePokedex();
  updatePreviewTeam();
  saveGame();
}


// ===================================================================
// 6. WRAPPER POUR ÉVÉNEMENTS SPÉCIAUX
// ===================================================================

// Gestionnaire d'événements spéciaux avec notifications
const gameEvents = {
  // Événement: Pokémon légendaire trouvé
  onLegendaryFound(pokemonId) {
    if (window.notify) {
      window.notify.achievement(
        '⭐ Pokémon Légendaire!',
        `Un ${format(pokemonId)} sauvage apparaît!`
      );
    }
  },
  
  // Événement: Objet rare trouvé
  onRareItemFound(itemId) {
    if (window.notify) {
      window.notify.item(itemId, 1);
      window.notify.achievement(
        '💎 Objet Rare!',
        'Un objet rare a été découvert!'
      );
    }
  },
  
  // Événement: Série de victoires
  onWinStreak(count) {
    if (window.notify) {
      window.notify.achievement(
        `🔥 Série de ${count}!`,
        `${count} victoires consécutives!`
      );
    }
  },
  
  // Événement: Pokedex complet pour une région
  onRegionComplete(regionName) {
    if (window.notify) {
      window.notify.achievement(
        '📖 Région Complétée!',
        `Tous les Pokémon de ${regionName} capturés!`
      );
    }
  },
  
  // Événement: Premier shiny
  onFirstShiny(pokemonId) {
    if (window.notify) {
      window.notify.achievement(
        '✨ Premier Shiny!',
        'Félicitations pour votre premier shiny!'
      );
      window.notify.shiny(pokemonId);
    }
  }
};


// ===================================================================
// 7. UTILITAIRES DE NOTIFICATION
// ===================================================================

// Wrapper avec vérification de sécurité
const safeNotify = {
  shiny: (pokemonId) => {
    try {
      if (window.notify && window.notify.shiny) {
        window.notify.shiny(pokemonId);
      }
    } catch (e) {
      console.warn('Notification error:', e);
    }
  },
  
  newPokemon: (pokemonId) => {
    try {
      if (window.notify && window.notify.newPokemon) {
        window.notify.newPokemon(pokemonId);
      }
    } catch (e) {
      console.warn('Notification error:', e);
    }
  },
  
  item: (itemId, quantity) => {
    try {
      if (window.notify && window.notify.item) {
        window.notify.item(itemId, quantity);
      }
    } catch (e) {
      console.warn('Notification error:', e);
    }
  },
  
  achievement: (title, message) => {
    try {
      if (window.notify && window.notify.achievement) {
        window.notify.achievement(title, message);
      }
    } catch (e) {
      console.warn('Notification error:', e);
    }
  },
  
  info: (title, message, duration) => {
    try {
      if (window.notify && window.notify.info) {
        window.notify.info(title, message, duration);
      }
    } catch (e) {
      console.warn('Notification error:', e);
    }
  }
};


// ===================================================================
// 8. EXEMPLE D'UTILISATION COMPLÈTE
// ===================================================================

// Scénario complet: Exploration avec toutes les notifications
function completeExplorationScenario() {
  // 1. Générer un Pokémon sauvage
  const wildPokemon = generateWildPokemonWithNotification('route-1');
  
  // 2. Combat
  const battleResult = startBattle(wildPokemon);
  
  // 3. Si victoire, tenter de capturer
  if (battleResult.won) {
    onBattleVictoryWithNotification(battleResult.enemy, battleResult.rewards);
    
    // 4. Tentative de capture
    const captured = attemptCapture(wildPokemon);
    
    if (captured) {
      catchPokemonWithNotification(wildPokemon);
      
      // 5. Vérifier achievements
      checkAchievements();
      
      // 6. Si c'est un shiny et le premier
      if (wildPokemon.shiny) {
        const shinyCount = Object.values(pkmn).filter(p => p.caught && p.shiny).length;
        if (shinyCount === 1) {
          gameEvents.onFirstShiny(wildPokemon.id);
        }
      }
    }
  }
}


// ===================================================================
// NOTES D'IMPLÉMENTATION
// ===================================================================

/*
POUR INTÉGRER DANS VOTRE CODE:

1. Copiez les fonctions dont vous avez besoin
2. Remplacez vos fonctions existantes par les versions avec notification
3. Assurez-vous que debugMode-console.js est chargé
4. Testez chaque notification individuellement
5. Ajustez les durées et messages selon vos préférences

BONNES PRATIQUES:

- Toujours vérifier si window.notify existe avant de l'utiliser
- Utiliser try-catch pour éviter les erreurs si le système n'est pas chargé
- Ne pas abuser des notifications (max 1-2 par action)
- Prioriser les événements importants (shiny, nouveaux pokémon, achievements)
- Utiliser des durées appropriées (3-8 secondes selon l'importance)

PERSONNALISATION:

- Les icônes sont automatiquement chargées depuis img/pkmn/ et img/items/
- Les couleurs s'adaptent au thème actif du jeu
- Les animations sont configurables dans le CSS
*/
