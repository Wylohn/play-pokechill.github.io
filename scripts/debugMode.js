// Debug Mode - Enhanced Pokemon Editor
// Press Ctrl+D to toggle debug panel

class DebugMode {
  constructor() {
    this.isOpen = false;
    this.selectedPokemon = null;
    this.selectedMoves = [];
    this.init();
  }

  init() {
    this.createDebugPanel();
    this.registerShortcuts();
    
    // Auto-open if debug flag is set
    if (localStorage.getItem('debug_mode') === 'true') {
      this.toggle();
    }
  }

  registerShortcuts() {
    document.addEventListener('keydown', (e) => {
      // Ctrl+D or Cmd+D to toggle
      if ((e.ctrlKey || e.metaKey) && e.key === 'd') {
        e.preventDefault();
        this.toggle();
      }
      
      // Ctrl+Shift+D for quick commands
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'D') {
        e.preventDefault();
        this.showQuickCommands();
      }
    });
  }

  createDebugPanel() {
    const panel = document.createElement('div');
    panel.id = 'debug-panel-enhanced';
    panel.style.display = 'none';
    panel.innerHTML = `
      <div class="debug-header">
        <h2>🔧 Debug Mode</h2>
        <button id="debug-close" class="debug-btn-close">×</button>
      </div>
      
      <div class="debug-tabs">
        <button class="debug-tab active" data-tab="pokemon">Add Pokemon</button>
        <button class="debug-tab" data-tab="quick">Quick Actions</button>
        <button class="debug-tab" data-tab="stats">Game Stats</button>
      </div>

      <div class="debug-content">
        
        <!-- Add Pokemon Tab -->
        <div class="debug-tab-content active" id="debug-pokemon-tab">
          
          <div class="debug-section">
            <label>Select Pokemon</label>
            <div class="debug-search-container">
              <input type="text" id="debug-pokemon-search" placeholder="Search Pokemon..." />
              <div id="debug-pokemon-list" class="debug-list"></div>
            </div>
          </div>

          <div id="debug-pokemon-editor" style="display: none;">
            
            <div class="debug-pokemon-preview">
              <img id="debug-pokemon-sprite" class="sprite-trim" src="" alt="Pokemon sprite" />
              <h3 id="debug-pokemon-name"></h3>
              <div id="debug-pokemon-types"></div>
            </div>

            <div class="debug-section">
              <label>Level (1-100)</label>
              <input type="number" id="debug-level" min="1" max="100" value="50" />
            </div>

            <div class="debug-section">
              <label>
                <input type="checkbox" id="debug-shiny" />
                Shiny
              </label>
            </div>

            <div class="debug-section">
              <label>Individual Values (0-6)</label>
              <div class="debug-ivs">
                <div>
                  <span>HP:</span>
                  <input type="number" id="debug-iv-hp" min="0" max="6" value="0" step="0.1" />
                </div>
                <div>
                  <span>ATK:</span>
                  <input type="number" id="debug-iv-atk" min="0" max="6" value="0" step="0.1" />
                </div>
                <div>
                  <span>DEF:</span>
                  <input type="number" id="debug-iv-def" min="0" max="6" value="0" step="0.1" />
                </div>
                <div>
                  <span>SATK:</span>
                  <input type="number" id="debug-iv-satk" min="0" max="6" value="0" step="0.1" />
                </div>
                <div>
                  <span>SDEF:</span>
                  <input type="number" id="debug-iv-sdef" min="0" max="6" value="0" step="0.1" />
                </div>
                <div>
                  <span>SPE:</span>
                  <input type="number" id="debug-iv-spe" min="0" max="6" value="0" step="0.1" />
                </div>
              </div>
              <button id="debug-max-ivs" class="debug-btn-small">Max All IVs</button>
            </div>

            <div class="debug-section">
              <label>Ability</label>
              <select id="debug-ability">
                <option value="random">Random</option>
              </select>
            </div>

            <div class="debug-section">
              <label>
                <input type="checkbox" id="debug-hidden-ability" />
                Unlock Hidden Ability
              </label>
            </div>

            <div class="debug-section">
              <label>Moves (Select up to 4)</label>
              <div class="debug-search-container">
                <input type="text" id="debug-move-search" placeholder="Search moves..." />
                <div id="debug-move-list" class="debug-list"></div>
              </div>
              <div id="debug-selected-moves" class="debug-selected-moves"></div>
            </div>

            <div class="debug-actions">
              <button id="debug-add-pokemon" class="debug-btn-primary">Add to Pokedex</button>
              <button id="debug-add-to-team" class="debug-btn-secondary">Add to Current Team</button>
            </div>

          </div>
        </div>

        <!-- Quick Actions Tab -->
        <div class="debug-tab-content" id="debug-quick-tab">
          <div class="debug-section">
            <h3>Pokemon Actions</h3>
            <button class="debug-btn-action" onclick="debugMode.giveAllPokemon()">Give All Pokemon (Level 50)</button>
            <button class="debug-btn-action" onclick="debugMode.maxAllLevels()">Max All Caught Pokemon Levels</button>
            <button class="debug-btn-action" onclick="debugMode.shinyAllPokemon()">Make All Caught Pokemon Shiny</button>
            <button class="debug-btn-action" onclick="debugMode.maxAllIVs()">Max All Pokemon IVs</button>
          </div>

          <div class="debug-section">
            <h3>Items</h3>
            <button class="debug-btn-action" onclick="debugMode.giveAllItems()">Give All Items (x999)</button>
            <button class="debug-btn-action" onclick="debugMode.giveBottleCaps()">Give Bottle Caps (x100)</button>
            <button class="debug-btn-action" onclick="debugMode.giveGoldenBottleCaps()">Give Golden Bottle Caps (x50)</button>
          </div>

          <div class="debug-section">
            <h3>Areas</h3>
            <button class="debug-btn-action" onclick="debugMode.unlockAllAreas()">Unlock All Areas</button>
            <button class="debug-btn-action" onclick="debugMode.resetAllAreas()">Reset All Areas</button>
          </div>

          <div class="debug-section">
            <h3>Battle</h3>
            <label>Battle Speed Multiplier</label>
            <input type="number" id="debug-speed" min="0.1" max="100" value="1" step="0.5" />
            <button class="debug-btn-action" onclick="debugMode.setBattleSpeed()">Apply Speed</button>
            <button class="debug-btn-action" onclick="debugMode.toggleGodMode()">Toggle God Mode</button>
          </div>

          <div class="debug-section">
            <h3>Save</h3>
            <button class="debug-btn-action" onclick="debugMode.exportSave()">Export Save</button>
            <button class="debug-btn-action" onclick="debugMode.importSave()">Import Save</button>
            <button class="debug-btn-action" onclick="debugMode.resetSave()">Reset Save (Warning!)</button>
          </div>
        </div>

        <!-- Stats Tab -->
        <div class="debug-tab-content" id="debug-stats-tab">
          <div class="debug-section">
            <h3>Game Statistics</h3>
            <div id="debug-game-stats"></div>
          </div>
          
          <div class="debug-section">
            <h3>Console Commands</h3>
            <div class="debug-console-help">
              <code>debugMode.givePkmn(pkmn.NAME, level, shiny, ivs)</code>
              <code>debugMode.addMove(pokemonId, moveId)</code>
              <code>debugMode.setLevel(pokemonId, level)</code>
              <code>debugMode.setShiny(pokemonId, true/false)</code>
              <code>debugMode.setIVs(pokemonId, {hp:6, atk:6, ...})</code>
            </div>
          </div>
        </div>

      </div>
    `;

    document.body.appendChild(panel);
    this.panel = panel;
    this.attachEventListeners();
  }

  attachEventListeners() {
    // Close button
    document.getElementById('debug-close').addEventListener('click', () => this.toggle());

    // Tab switching
    document.querySelectorAll('.debug-tab').forEach(tab => {
      tab.addEventListener('click', (e) => {
        document.querySelectorAll('.debug-tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.debug-tab-content').forEach(c => c.classList.remove('active'));
        
        e.target.classList.add('active');
        const tabName = e.target.dataset.tab;
        document.getElementById(`debug-${tabName}-tab`).classList.add('active');
        
        if (tabName === 'stats') {
          this.updateStats();
        }
      });
    });

    // Pokemon search
    document.getElementById('debug-pokemon-search').addEventListener('input', (e) => {
      this.searchPokemon(e.target.value);
    });

    // Move search
    document.getElementById('debug-move-search').addEventListener('input', (e) => {
      this.searchMoves(e.target.value);
    });

    // Max IVs button
    document.getElementById('debug-max-ivs').addEventListener('click', () => {
      document.getElementById('debug-iv-hp').value = 6;
      document.getElementById('debug-iv-atk').value = 6;
      document.getElementById('debug-iv-def').value = 6;
      document.getElementById('debug-iv-satk').value = 6;
      document.getElementById('debug-iv-sdef').value = 6;
      document.getElementById('debug-iv-spe').value = 6;
    });

    // Add pokemon button
    document.getElementById('debug-add-pokemon').addEventListener('click', () => {
      this.addPokemon(false);
    });

    // Add to team button
    document.getElementById('debug-add-to-team').addEventListener('click', () => {
      this.addPokemon(true);
    });

    // Initialize lists
    this.searchPokemon('');
  }

  toggle() {
    this.isOpen = !this.isOpen;
    this.panel.style.display = this.isOpen ? 'flex' : 'none';
    
    if (this.isOpen) {
      localStorage.setItem('debug_mode', 'true');
      this.searchPokemon('');
    } else {
      localStorage.setItem('debug_mode', 'false');
    }
  }

  searchPokemon(query) {
    const list = document.getElementById('debug-pokemon-list');
    list.innerHTML = '';
    
    const filtered = Object.keys(pkmn).filter(id => {
      if (!query) return true;
      return format(id).toLowerCase().includes(query.toLowerCase()) || 
             id.toLowerCase().includes(query.toLowerCase());
    }).slice(0, 50); // Limit to 50 results

    filtered.forEach(id => {
      const div = document.createElement('div');
      div.className = 'debug-list-item';
      div.innerHTML = `
        <img src="img/pkmn/sprite/${id}.png" alt="${format(id)}" />
        <span>${format(id)}</span>
      `;
      div.addEventListener('click', () => this.selectPokemon(id));
      list.appendChild(div);
    });
  }

  selectPokemon(id) {
    this.selectedPokemon = id;
    this.selectedMoves = [];
    
    // Show editor
    document.getElementById('debug-pokemon-editor').style.display = 'block';
    
    // Update preview
    const sprite = pkmn[id].shiny ? `img/pkmn/shiny/${id}.png` : `img/pkmn/sprite/${id}.png`;
    document.getElementById('debug-pokemon-sprite').src = sprite;
    document.getElementById('debug-pokemon-name').textContent = format(id);
    
    // Update types
    const typesDiv = document.getElementById('debug-pokemon-types');
    typesDiv.innerHTML = pkmn[id].type.map(type => 
      `<span class="debug-type" style="background: ${returnTypeColor(type)}">${type.toUpperCase()}</span>`
    ).join('');

    // Populate abilities
    this.populateAbilities(id);
    
    // Clear move selection
    this.searchMoves('');
    this.updateSelectedMoves();
  }

  populateAbilities(pokemonId) {
    const select = document.getElementById('debug-ability');
    select.innerHTML = '<option value="random">Random</option>';
    
    const types = pkmn[pokemonId].type;
    
    Object.keys(ability).forEach(abilityId => {
      const ab = ability[abilityId];
      if (ab.type === undefined) return;
      if (!ab.type.includes("all") && !ab.type.some(t => types.includes(t))) return;
      
      const option = document.createElement('option');
      option.value = abilityId;
      option.textContent = `${format(abilityId)} (${ab.rarity === 1 ? 'Common' : ab.rarity === 2 ? 'Uncommon' : 'Rare'})`;
      select.appendChild(option);
    });
  }

  searchMoves(query) {
    const list = document.getElementById('debug-move-list');
    list.innerHTML = '';
    
    if (this.selectedMoves.length >= 4) {
      list.innerHTML = '<div class="debug-info">Maximum 4 moves selected</div>';
      return;
    }
    
    const filtered = Object.keys(move).filter(id => {
      if (!query) return true;
      return format(id).toLowerCase().includes(query.toLowerCase()) || 
             id.toLowerCase().includes(query.toLowerCase());
    }).slice(0, 30);

    filtered.forEach(id => {
      const div = document.createElement('div');
      div.className = 'debug-list-item';
      div.innerHTML = `
        <span style="color: ${returnTypeColor(move[id].type)}">${format(id)}</span>
        <span class="debug-move-power">${move[id].power > 0 ? move[id].power : '-'}</span>
      `;
      div.addEventListener('click', () => this.addMoveToSelection(id));
      list.appendChild(div);
    });
  }

  addMoveToSelection(moveId) {
    if (this.selectedMoves.length >= 4) return;
    if (this.selectedMoves.includes(moveId)) return;
    
    this.selectedMoves.push(moveId);
    this.updateSelectedMoves();
    this.searchMoves(document.getElementById('debug-move-search').value);
  }

  removeMoveFromSelection(moveId) {
    this.selectedMoves = this.selectedMoves.filter(m => m !== moveId);
    this.updateSelectedMoves();
    this.searchMoves(document.getElementById('debug-move-search').value);
  }

  updateSelectedMoves() {
    const container = document.getElementById('debug-selected-moves');
    container.innerHTML = '';
    
    this.selectedMoves.forEach(moveId => {
      const div = document.createElement('div');
      div.className = 'debug-selected-move';
      div.innerHTML = `
        <span style="color: ${returnTypeColor(move[moveId].type)}">${format(moveId)}</span>
        <button class="debug-btn-remove" data-move="${moveId}">×</button>
      `;
      div.querySelector('.debug-btn-remove').addEventListener('click', () => this.removeMoveFromSelection(moveId));
      container.appendChild(div);
    });
  }

  addPokemon(addToTeam = false) {
    if (!this.selectedPokemon) {
      alert('Please select a Pokemon first!');
      return;
    }

    const pokemon = pkmn[this.selectedPokemon];
    const level = parseInt(document.getElementById('debug-level').value) || 50;
    const isShiny = document.getElementById('debug-shiny').checked;
    const hiddenAbility = document.getElementById('debug-hidden-ability').checked;
    
    const ivs = {
      hp: parseFloat(document.getElementById('debug-iv-hp').value) || 0,
      atk: parseFloat(document.getElementById('debug-iv-atk').value) || 0,
      def: parseFloat(document.getElementById('debug-iv-def').value) || 0,
      satk: parseFloat(document.getElementById('debug-iv-satk').value) || 0,
      sdef: parseFloat(document.getElementById('debug-iv-sdef').value) || 0,
      spe: parseFloat(document.getElementById('debug-iv-spe').value) || 0
    };

    const selectedAbility = document.getElementById('debug-ability').value;

    // Set base values
    pokemon.caught = pokemon.caught ? pokemon.caught + 1 : 1;
    pokemon.level = level;
    pokemon.shiny = isShiny;
    pokemon.ivs = ivs;
    
    // Set ability
    if (selectedAbility !== 'random') {
      pokemon.ability = selectedAbility;
    } else {
      pokemon.ability = learnPkmnAbility(this.selectedPokemon);
    }

    // Hidden ability
    if (hiddenAbility && pokemon.hiddenAbility) {
      pokemon.hiddenAbilityUnlocked = true;
    }

    // Set moves
    if (this.selectedMoves.length > 0) {
      pokemon.movepool = pokemon.movepool || [];
      pokemon.moves = pokemon.moves || { slot1: null, slot2: null, slot3: null, slot4: null };
      
      this.selectedMoves.forEach((moveId, index) => {
        if (!pokemon.movepool.includes(moveId)) {
          pokemon.movepool.push(moveId);
        }
        pokemon.moves[`slot${index + 1}`] = moveId;
      });
    } else {
      // Generate random moves
      pokemon.movepool = pokemon.movepool || [];
      pokemon.moves = pokemon.moves || { slot1: null, slot2: null, slot3: null, slot4: null };
      
      for (let i = 0; i < 4; i++) {
        const moveKey = learnPkmnMove(this.selectedPokemon, level);
        if (moveKey && !pokemon.movepool.includes(moveKey)) {
          pokemon.movepool.push(moveKey);
          pokemon.moves[`slot${i + 1}`] = moveKey;
        }
      }
    }

    // Initialize exp
    pokemon.exp = pokemon.exp || 0;

    // Add to team if requested
    if (addToTeam) {
      for (let i = 1; i <= 6; i++) {
        const slot = `slot${i}`;
        if (!team[slot].pkmn) {
          team[slot].pkmn = pokemon;
          break;
        }
      }
    }

    updatePokedex();
    updatePreviewTeam();
    saveGame();

    alert(`${format(this.selectedPokemon)} added successfully!\nLevel: ${level}\nShiny: ${isShiny}\nMoves: ${this.selectedMoves.length || 'Random'}`);
  }

  // Quick Actions
  giveAllPokemon() {
    if (!confirm('Give all Pokemon at level 50?')) return;
    
    Object.keys(pkmn).forEach(id => {
      givePkmn(pkmn[id], 50);
    });
    
    updatePokedex();
    saveGame();
    alert('All Pokemon added!');
  }

  maxAllLevels() {
    if (!confirm('Set all caught Pokemon to level 100?')) return;
    
    Object.values(pkmn).forEach(pokemon => {
      if (pokemon.caught > 0) {
        pokemon.level = 100;
      }
    });
    
    updatePokedex();
    updatePreviewTeam();
    saveGame();
    alert('All caught Pokemon set to level 100!');
  }

  shinyAllPokemon() {
    if (!confirm('Make all caught Pokemon shiny?')) return;
    
    Object.values(pkmn).forEach(pokemon => {
      if (pokemon.caught > 0) {
        pokemon.shiny = true;
      }
    });
    
    updatePokedex();
    updatePreviewTeam();
    saveGame();
    alert('All caught Pokemon are now shiny!');
  }

  maxAllIVs() {
    if (!confirm('Set all caught Pokemon IVs to 6?')) return;
    
    Object.values(pkmn).forEach(pokemon => {
      if (pokemon.caught > 0) {
        pokemon.ivs = pokemon.ivs || {};
        pokemon.ivs.hp = 6;
        pokemon.ivs.atk = 6;
        pokemon.ivs.def = 6;
        pokemon.ivs.satk = 6;
        pokemon.ivs.sdef = 6;
        pokemon.ivs.spe = 6;
      }
    });
    
    updatePokedex();
    updatePreviewTeam();
    saveGame();
    alert('All caught Pokemon IVs maxed!');
  }

  giveAllItems() {
    if (!confirm('Give all items (x999)?')) return;
    
    Object.values(item).forEach(itm => {
      itm.got = 999;
    });
    
    saveGame();
    alert('All items given!');
  }

  giveBottleCaps() {
    item.bottleCap.got += 100;
    saveGame();
    alert('100 Bottle Caps added!');
  }

  giveGoldenBottleCaps() {
    item.goldenBottleCap.got += 50;
    saveGame();
    alert('50 Golden Bottle Caps added!');
  }

  unlockAllAreas() {
    if (!confirm('Unlock all areas?')) return;
    
    Object.values(areas).forEach(area => {
      area.defeated = true;
    });
    
    saveGame();
    alert('All areas unlocked!');
  }

  resetAllAreas() {
    if (!confirm('Reset all areas? This will lock them again.')) return;
    
    Object.values(areas).forEach(area => {
      area.defeated = false;
    });
    
    saveGame();
    alert('All areas reset!');
  }

  setBattleSpeed() {
    const multiplier = parseFloat(document.getElementById('debug-speed').value) || 1;
    saved.overrideBattleTimer = 2000 / multiplier;
    alert(`Battle speed set to ${multiplier}x`);
  }

  toggleGodMode() {
    window.godMode = !window.godMode;
    alert(`God Mode: ${window.godMode ? 'ON' : 'OFF'}\n${window.godMode ? 'Your Pokemon are invincible!' : 'Normal damage restored.'}`);
  }

  exportSave() {
    const data = localStorage.getItem('gameData');
    if (!data) {
      alert('No save data found!');
      return;
    }
    
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `pokechill_save_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  importSave() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e) => {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const data = event.target.result;
          localStorage.setItem('gameData', data);
          alert('Save imported! Reloading...');
          location.reload();
        } catch (error) {
          alert('Error importing save: ' + error.message);
        }
      };
      reader.readAsText(file);
    };
    input.click();
  }

  resetSave() {
    if (!confirm('WARNING: This will delete ALL your progress!\nAre you absolutely sure?')) return;
    if (!confirm('Last chance! This action cannot be undone!')) return;
    
    localStorage.removeItem('gameData');
    alert('Save deleted. Reloading...');
    location.reload();
  }

  updateStats() {
    const statsDiv = document.getElementById('debug-game-stats');
    
    const caughtCount = Object.values(pkmn).filter(p => p.caught > 0).length;
    const totalPokemon = Object.keys(pkmn).length;
    const shinyCount = Object.values(pkmn).filter(p => p.caught > 0 && p.shiny).length;
    const maxLevelCount = Object.values(pkmn).filter(p => p.level === 100).length;
    
    const teamSize = Object.values(team).filter(s => s.pkmn).length;
    const avgTeamLevel = teamSize > 0 
      ? Object.values(team).filter(s => s.pkmn).reduce((sum, s) => sum + s.pkmn.level, 0) / teamSize 
      : 0;
    
    const unlockedAreas = Object.values(areas).filter(a => a.defeated).length;
    const totalAreas = Object.values(areas).filter(a => a.type).length;
    
    statsDiv.innerHTML = `
      <div class="debug-stat-row">
        <span>Pokemon Caught:</span>
        <strong>${caughtCount} / ${totalPokemon} (${((caughtCount/totalPokemon)*100).toFixed(1)}%)</strong>
      </div>
      <div class="debug-stat-row">
        <span>Shiny Pokemon:</span>
        <strong>${shinyCount}</strong>
      </div>
      <div class="debug-stat-row">
        <span>Level 100 Pokemon:</span>
        <strong>${maxLevelCount}</strong>
      </div>
      <div class="debug-stat-row">
        <span>Team Size:</span>
        <strong>${teamSize} / 6</strong>
      </div>
      <div class="debug-stat-row">
        <span>Average Team Level:</span>
        <strong>${avgTeamLevel.toFixed(1)}</strong>
      </div>
      <div class="debug-stat-row">
        <span>Areas Unlocked:</span>
        <strong>${unlockedAreas} / ${totalAreas}</strong>
      </div>
      <div class="debug-stat-row">
        <span>Bottle Caps:</span>
        <strong>${item.bottleCap?.got || 0}</strong>
      </div>
      <div class="debug-stat-row">
        <span>Golden Bottle Caps:</span>
        <strong>${item.goldenBottleCap?.got || 0}</strong>
      </div>
    `;
  }

  showQuickCommands() {
    const commands = `
=== DEBUG QUICK COMMANDS ===

Ctrl+D: Toggle Debug Panel
Ctrl+Shift+D: Show this help

Console Commands:
- debugMode.givePkmn(pkmn.NAME, level, isShiny)
- debugMode.addMove(pokemonId, moveId)
- debugMode.setLevel(pokemonId, level)
- debugMode.setShiny(pokemonId, true/false)
- debugMode.setIVs(pokemonId, {hp:6, atk:6, def:6, satk:6, sdef:6, spe:6})

Quick Actions (available in Quick Actions tab):
- Give all Pokemon
- Max all levels
- Max all IVs
- Give all items
- Unlock all areas

Example:
debugMode.givePkmn(pkmn.pikachu, 100, true)
    `.trim();
    
    console.log(commands);
    alert(commands);
  }

  // Console API
  givePkmn(pokemon, level = 50, isShiny = false) {
    pokemon.caught = (pokemon.caught || 0) + 1;
    pokemon.level = level;
    pokemon.shiny = isShiny;
    pokemon.ability = pokemon.ability || learnPkmnAbility(pokemon.id);
    pokemon.ivs = pokemon.ivs || { hp: 0, atk: 0, def: 0, satk: 0, sdef: 0, spe: 0 };
    pokemon.movepool = pokemon.movepool || [];
    pokemon.moves = pokemon.moves || { slot1: null, slot2: null, slot3: null, slot4: null };
    
    // Give some moves
    for (let i = 0; i < 4; i++) {
      const moveKey = learnPkmnMove(pokemon.id, level);
      if (moveKey && !pokemon.movepool.includes(moveKey)) {
        pokemon.movepool.push(moveKey);
        pokemon.moves[`slot${i + 1}`] = moveKey;
      }
    }
    
    updatePokedex();
    saveGame();
    console.log(`${format(pokemon.id)} added at level ${level}${isShiny ? ' (Shiny)' : ''}`);
  }

  addMove(pokemonId, moveId) {
    const pokemon = pkmn[pokemonId];
    if (!pokemon) {
      console.error('Pokemon not found:', pokemonId);
      return;
    }
    
    pokemon.movepool = pokemon.movepool || [];
    if (!pokemon.movepool.includes(moveId)) {
      pokemon.movepool.push(moveId);
    }
    
    saveGame();
    console.log(`${format(moveId)} added to ${format(pokemonId)}'s movepool`);
  }

  setLevel(pokemonId, level) {
    const pokemon = pkmn[pokemonId];
    if (!pokemon) {
      console.error('Pokemon not found:', pokemonId);
      return;
    }
    
    pokemon.level = Math.max(1, Math.min(100, level));
    updatePokedex();
    updatePreviewTeam();
    saveGame();
    console.log(`${format(pokemonId)} level set to ${pokemon.level}`);
  }

  setShiny(pokemonId, isShiny) {
    const pokemon = pkmn[pokemonId];
    if (!pokemon) {
      console.error('Pokemon not found:', pokemonId);
      return;
    }
    
    pokemon.shiny = isShiny;
    updatePokedex();
    updatePreviewTeam();
    saveGame();
    console.log(`${format(pokemonId)} shiny set to ${isShiny}`);
  }

  setIVs(pokemonId, ivs) {
    const pokemon = pkmn[pokemonId];
    if (!pokemon) {
      console.error('Pokemon not found:', pokemonId);
      return;
    }
    
    pokemon.ivs = pokemon.ivs || {};
    Object.assign(pokemon.ivs, ivs);
    updatePokedex();
    updatePreviewTeam();
    saveGame();
    console.log(`${format(pokemonId)} IVs updated:`, ivs);
  }
}

// Initialize debug mode
const debugMode = new DebugMode();

// Make it globally accessible
window.debugMode = debugMode;

console.log('%c🔧 Debug Mode Loaded!', 'color: #0f0; font-size: 16px; font-weight: bold;');
console.log('%cPress Ctrl+D to open the debug panel', 'color: #0af; font-size: 14px;');
console.log('%cType "debugMode" in console for API access', 'color: #0af; font-size: 14px;');
