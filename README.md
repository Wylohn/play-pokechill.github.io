# play-pokechill.github.io
Monsters and Chill

## 🔔 Système de Notifications

Un système de notifications en bas à droite a été ajouté via `debugMode-console.js`. Il permet d'afficher les événements importants :

- ✨ Shiny trouvés
- 🆕 Nouveaux Pokémon capturés

Les notifications persistent jusqu'à ce qu'elles soient fermées manuellement ou que plus de 8 notifications soient affichées (la plus ancienne est alors supprimée automatiquement).

### Utilisation

```javascript
// API globale disponible après chargement de debugMode-console.js
notify.shiny('pikachu');
notify.newPokemon('charizard');
```

### Démonstration

Ouvrez [notification-demo.html](notification-demo.html) dans un navigateur pour voir le système en action.

Consultez [NOTIFICATIONS.md](NOTIFICATIONS.md) pour la documentation complète.
