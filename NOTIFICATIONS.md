# Système de Notifications PokeChill 🔔

## Aperçu
Le système de notifications affiche des messages en bas à droite de la page pour informer le joueur des événements importants : shiny trouvés et nouveaux pokémons capturés.

Les notifications persistent jusqu'à ce qu'elles soient fermées manuellement ou que plus de 8 notifications soient affichées (la plus ancienne est alors supprimée automatiquement).

## Utilisation

### Depuis debugMode-console.js
Après avoir chargé le script debugMode-console.js, les notifications sont automatiquement disponibles via l'API globale `window.notify`.

### API Disponible

```javascript
// Notification pour un shiny trouvé
notify.shiny(pokemonId);
// Exemple: notify.shiny('pikachu');

// Notification pour un nouveau pokémon capturé
notify.newPokemon(pokemonId);
// Exemple: notify.newPokemon('charizard');
```

### Types de Notifications

1. **Shiny** (`notification-shiny`) - Bordure dorée, pour les pokémon shiny
2. **Nouveau** (`notification-new`) - Bordure bleue, pour les nouveaux pokémons

### Caractéristiques

- ✨ Animations fluides (slide-in/out)
- 🖱️ Clic pour fermer
- 📦 Maximum 8 notifications visibles simultanément
- ⏱️ Persistance : les notifications restent jusqu'à fermeture manuelle
- 🎨 Adapté au thème du jeu (variables CSS)
- 🖼️ Support des icônes (sprites pokémon)

### Test des Notifications

Dans le Debug Mode (Ctrl+D), onglet "Quick Actions", une section "Test Notifications" permet de tester les notifications.

### Intégration dans d'autres scripts

Pour utiliser les notifications dans vos propres scripts, assurez-vous que debugMode-console.js est chargé, puis utilisez simplement :

```javascript
// Vérifier que l'API est disponible
if (window.notify) {
  window.notify.newPokemon('mew');
}
```

### Exemple d'intégration dans explore.js

```javascript
// Après avoir trouvé un shiny
if (rng(1/400)) {
  poke.shiny = true;
  // Notification
  if (window.notify) {
    window.notify.shiny(poke.id);
  }
}

// Après avoir capturé un nouveau pokémon
if (!pkmn[poke.id].caught) {
  // Notification
  if (window.notify) {
    window.notify.newPokemon(poke.id);
  }
}
```

## Personnalisation CSS

Les styles des notifications utilisent les variables CSS du thème :
- `--dark1` : Fond principal
- `--dark2` : Fond secondaire
- `--light1` : Bordures et texte secondaire
- `--light2` : Texte principal

Pour personnaliser, modifiez les classes dans debugMode-console.js :
- `.notification`
- `.notification-shiny`
- `.notification-new`
