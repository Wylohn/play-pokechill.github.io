# Guide de Démarrage Rapide - Système de Notifications 🚀

## Installation

1. **Chargez debugMode-console.js dans votre console de navigateur**
   - Ouvrez la console (F12)
   - Copiez tout le contenu de `scripts/debugMode-console.js`
   - Collez dans la console et appuyez sur Entrée

2. **Le système est maintenant actif !**
   - Les notifications sont automatiquement initialisées
   - L'API `window.notify` est disponible globalement

## Tests Rapides

### Dans la Console du Navigateur

```javascript
// Test shiny
notify.shiny('pikachu');

// Test nouveau pokémon
notify.newPokemon('charizard');

// Test objet
notify.item('rare-candy', 5);

// Test achievement
notify.achievement('Shiny Hunter', '10 shiny trouvés!');

// Test info
notify.info('Test', 'Ceci est un test', 3000);
```

### Via le Debug Panel

1. Appuyez sur **Ctrl+D** pour ouvrir le panneau de debug
2. Allez dans l'onglet **"Quick Actions"**
3. Descendez jusqu'à **"Test Notifications"**
4. Cliquez sur les boutons pour tester chaque type de notification

## Démonstration Visuelle

Ouvrez `notification-demo.html` dans votre navigateur pour une démonstration interactive complète.

## Intégration dans Vos Scripts

### Exemple Simple

```javascript
// Vérifier si l'API est disponible
if (window.notify) {
  window.notify.newPokemon('mew');
}
```

### Exemple avec explore.js

Ajoutez ces lignes dans explore.js pour avoir des notifications lors de l'exploration :

```javascript
// Après avoir trouvé un shiny (ligne ~155)
if (rng(1/400)) {
  poke.shiny = true;
  if (window.notify) {
    window.notify.shiny(poke.id);
  }
}

// Après avoir capturé un nouveau pokémon
const isNew = !pkmn[poke.id].caught || pkmn[poke.id].caught === 0;
// ... code de capture ...
if (isNew && window.notify) {
  window.notify.newPokemon(poke.id);
}
```

### Exemple avec shop.js

```javascript
// Après un achat d'objet
if (window.notify) {
  window.notify.item(itemId, quantity);
}
```

## Personnalisation

### Durées d'Affichage

```javascript
// Durées par défaut (en millisecondes)
notify.shiny('pikachu');      // 8000ms (8s)
notify.newPokemon('mew');      // 6000ms (6s)
notify.item('potion', 1);      // 4000ms (4s)
notify.achievement('...', '...'); // 7000ms (7s)
notify.info('...', '...', 2000);  // 2000ms personnalisé
```

### Modifier les Styles

Les styles sont dans `debugMode-console.js` dans la section CSS. Recherchez :
- `.notification` : Style de base
- `.notification-shiny` : Style pour les shiny (bordure dorée)
- `.notification-new` : Style pour les nouveaux (bordure bleue)
- `.notification-item` : Style pour les objets (bordure violette)
- `.notification-achievement` : Style pour les achievements (bordure verte)

## Fonctionnalités

✅ **Animations fluides** - Slide-in et slide-out élégants  
✅ **Auto-fermeture** - Disparaissent automatiquement après la durée définie  
✅ **Clic pour fermer** - Cliquez sur une notification pour la fermer  
✅ **Limite de 5** - Maximum 5 notifications affichées en même temps  
✅ **Responsive** - S'adapte à la taille de l'écran  
✅ **Thème adaptatif** - Utilise les variables CSS du jeu  
✅ **Icônes** - Support des sprites pokémon et objets  

## Dépannage

### Les notifications ne s'affichent pas

1. Vérifiez que `debugMode-console.js` est bien chargé :
   ```javascript
   console.log(window.debugMode); // Doit afficher l'objet
   console.log(window.notify);    // Doit afficher l'objet API
   ```

2. Vérifiez la console pour les erreurs

3. Rechargez la page et réessayez

### Les icônes ne s'affichent pas

Vérifiez que les chemins d'images sont corrects :
- Pokémon sprite : `img/pkmn/sprite/{id}.png`
- Pokémon shiny : `img/pkmn/shiny/{id}.png`
- Objets : `img/items/{id}.png`

### Les notifications sont trop petites/grandes

Modifiez la largeur dans le CSS :
```css
#notification-container {
  width: 350px; /* Modifier cette valeur */
}
```

## Support

Pour plus d'informations, consultez [NOTIFICATIONS.md](NOTIFICATIONS.md)

---

**Bon jeu et bonnes notifications ! 🎮✨**
