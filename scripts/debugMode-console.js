// ===================================================================
// POKECHILL DEBUG MODE - Console Version
// ===================================================================
// Copy and paste this entire file into the browser console
// Then press Ctrl+D to open the debug panel
// ===================================================================

(function() {
  // Inject CSS styles
  const styles = `
    #debug-panel-enhanced {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 90%;
      max-width: 800px;
      max-height: 90vh;
      background: var(--dark1);
      border: 3px solid var(--light1);
      border-radius: 15px;
      z-index: 100000;
      display: flex;
      flex-direction: column;
      box-shadow: 0 10px 50px rgba(0, 0, 0, 0.8);
      overflow: hidden;
      font-family: 'Winky Sans', sans-serif;
    }

    .debug-header {
      background: var(--dark2);
      padding: 15px 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 2px solid var(--light1);
    }

    .debug-header h2 {
      color: var(--light2);
      margin: 0;
      font-size: 1.5rem;
    }

    .debug-btn-close {
      background: #e74c3c;
      color: white;
      border: none;
      width: 35px;
      height: 35px;
      border-radius: 50%;
      font-size: 24px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      line-height: 1;
      transition: transform 0.2s;
    }

    .debug-btn-close:hover {
      transform: scale(1.1);
      background: #c0392b;
    }

    .debug-tabs {
      display: flex;
      background: var(--dark2);
      border-bottom: 2px solid var(--light1);
    }

    .debug-tab {
      flex: 1;
      padding: 12px;
      background: transparent;
      border: none;
      color: var(--light2);
      cursor: pointer;
      font-size: 14px;
      border-bottom: 3px solid transparent;
      transition: all 0.2s;
    }

    .debug-tab:hover {
      background: rgba(255, 255, 255, 0.05);
    }

    .debug-tab.active {
      border-bottom-color: var(--accent);
      background: rgba(255, 255, 255, 0.1);
      font-weight: bold;
    }

    .debug-content {
      flex: 1;
      overflow-y: auto;
      padding: 20px;
    }

    .debug-tab-content {
      display: none;
    }

    .debug-tab-content.active {
      display: block;
    }

    .debug-section {
      margin-bottom: 20px;
      padding: 15px;
      background: var(--dark2);
      border-radius: 8px;
      border: 1px solid var(--light1);
    }

    .debug-section label {
      display: block;
      color: var(--light2);
      margin-bottom: 8px;
      font-weight: bold;
    }

    .debug-section input[type="text"],
    .debug-section input[type="number"],
    .debug-section select {
      width: 100%;
      padding: 10px;
      background: var(--dark1);
      border: 2px solid var(--light1);
      border-radius: 5px;
      color: var(--light2);
      font-size: 14px;
    }

    .debug-section input[type="checkbox"] {
      width: 20px;
      height: 20px;
      margin-right: 8px;
      cursor: pointer;
    }

    .debug-section h3 {
      color: var(--light2);
      margin: 0 0 15px 0;
      font-size: 1.2rem;
    }

    .debug-search-container {
      position: relative;
    }

    .debug-list {
      max-height: 200px;
      overflow-y: auto;
      margin-top: 10px;
      border: 2px solid var(--light1);
      border-radius: 5px;
      background: var(--dark1);
    }

    .debug-list-item {
      padding: 10px;
      display: flex;
      align-items: center;
      gap: 10px;
      cursor: pointer;
      transition: background 0.2s;
      color: var(--light2);
      border-bottom: 1px solid var(--dark2);
    }

    .debug-list-item:hover {
      background: rgba(255, 255, 255, 0.1);
    }

    .debug-list-item img {
      width: 40px;
      height: 40px;
      object-fit: contain;
    }

    .debug-info {
      padding: 10px;
      text-align: center;
      color: var(--light1);
      font-style: italic;
    }

    .debug-pokemon-preview {
      text-align: center;
      padding: 20px;
      background: var(--dark1);
      border-radius: 8px;
      margin-bottom: 20px;
    }

    .debug-pokemon-preview img {
      width: 120px;
      height: 120px;
      object-fit: contain;
      image-rendering: pixelated;
    }

    .debug-pokemon-preview h3 {
      color: var(--light2);
      margin: 10px 0;
    }

    #debug-pokemon-types {
      display: flex;
      gap: 10px;
      justify-content: center;
    }

    .debug-type {
      padding: 5px 15px;
      border-radius: 15px;
      color: white;
      font-weight: bold;
      font-size: 12px;
    }

    .debug-ivs {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 10px;
      margin-bottom: 10px;
    }

    .debug-ivs div {
      display: flex;
      align-items: center;
      gap: 5px;
    }

    .debug-ivs span {
      color: var(--light2);
      font-weight: bold;
      min-width: 50px;
    }

    .debug-ivs input {
      flex: 1;
      padding: 5px;
    }

    .debug-move-power {
      margin-left: auto;
      color: var(--light1);
      font-size: 12px;
    }

    .debug-selected-moves {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      margin-top: 10px;
    }

    .debug-selected-move {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 8px 12px;
      background: var(--dark1);
      border: 2px solid var(--light1);
      border-radius: 20px;
      color: var(--light2);
    }

    .debug-btn-remove {
      background: #e74c3c;
      color: white;
      border: none;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      cursor: pointer;
      font-size: 14px;
      line-height: 1;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .debug-btn-remove:hover {
      background: #c0392b;
    }

    .debug-btn-small {
      padding: 8px 15px;
      background: var(--light1);
      color: white;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      font-size: 12px;
      margin-top: 10px;
      transition: transform 0.2s, background 0.2s;
    }

    .debug-btn-small:hover {
      transform: translateY(-2px);
      background: var(--light2);
      color: var(--dark1);
    }

    .debug-actions {
      display: flex;
      gap: 10px;
      margin-top: 20px;
    }

    .debug-btn-primary,
    .debug-btn-secondary {
      flex: 1;
      padding: 15px;
      border: none;
      border-radius: 8px;
      font-size: 16px;
      font-weight: bold;
      cursor: pointer;
      transition: transform 0.2s, box-shadow 0.2s;
    }

    .debug-btn-primary {
      background: #27ae60;
      color: white;
    }

    .debug-btn-primary:hover {
      background: #229954;
      transform: translateY(-2px);
      box-shadow: 0 5px 15px rgba(39, 174, 96, 0.4);
    }

    .debug-btn-secondary {
      background: #3498db;
      color: white;
    }

    .debug-btn-secondary:hover {
      background: #2980b9;
      transform: translateY(-2px);
      box-shadow: 0 5px 15px rgba(52, 152, 219, 0.4);
    }

    .debug-btn-action {
      width: 100%;
      padding: 12px;
      background: var(--light1);
      color: white;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      margin-bottom: 10px;
      font-size: 14px;
      transition: all 0.2s;
    }

    .debug-btn-action:hover {
      background: var(--light2);
      color: var(--dark1);
      transform: translateX(5px);
    }

    .debug-stat-row {
      display: flex;
      justify-content: space-between;
      padding: 10px;
      border-bottom: 1px solid var(--dark2);
      color: var(--light2);
    }

    .debug-stat-row:last-child {
      border-bottom: none;
    }

    .debug-stat-row strong {
      color: var(--accent);
    }

    .debug-console-help {
      background: var(--dark1);
      padding: 15px;
      border-radius: 5px;
      font-family: 'Courier New', monospace;
    }

    .debug-console-help code {
      display: block;
      color: #0f0;
      margin-bottom: 8px;
      font-size: 12px;
    }

    .debug-content::-webkit-scrollbar,
    .debug-list::-webkit-scrollbar {
      width: 8px;
    }

    .debug-content::-webkit-scrollbar-track,
    .debug-list::-webkit-scrollbar-track {
      background: var(--dark1);
    }

    .debug-content::-webkit-scrollbar-thumb,
    .debug-list::-webkit-scrollbar-thumb {
      background: var(--light1);
      border-radius: 4px;
    }

    .debug-content::-webkit-scrollbar-thumb:hover,
    .debug-list::-webkit-scrollbar-thumb:hover {
      background: var(--light2);
    }

    #debug-toggle-button {
      position: fixed;
      bottom: 20px;
      left: 20px;
      width: 60px;
      height: 60px;
      background: var(--light1);
      border: 3px solid var(--accent);
      border-radius: 50%;
      color: white;
      font-size: 24px;
      font-weight: bold;
      cursor: pointer;
      z-index: 99999;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.5);
      transition: all 0.3s;
    }

    #debug-toggle-button:hover {
      transform: scale(1.1);
      background: var(--accent);
      box-shadow: 0 6px 20px rgba(0, 0, 0, 0.7);
    }

    #debug-toggle-button:active {
      transform: scale(0.95);
    }

    @media (max-width: 768px) {
      #debug-panel-enhanced {
        width: 95%;
        max-height: 85vh;
      }
      
      .debug-ivs {
        grid-template-columns: repeat(2, 1fr);
      }
      
      .debug-actions {
        flex-direction: column;
      }
    }
  `;

  // Inject styles into page
  if (!document.getElementById('debug-mode-styles')) {
    const styleEl = document.createElement('style');
    styleEl.id = 'debug-mode-styles';
    styleEl.textContent = styles;
    document.head.appendChild(styleEl);
  }

  // Debug Mode Class
  class DebugMode {
    constructor() {
      this.isOpen = false;
      this.currentTab = 'add';
      this.selectedPokemon = null;
      this.editingPokemon = null;
      this.selectedMoves = [];
      this.autoRepeatEnabled = false;
      this.autoRepeatCount = 0;
      this.autoRepeatCurrent = 0;
      this.autoRepeatInterval = null;
      this.lastArea = null;
      this.inBattle = false;
      this.waitingToRestart = false;
      this.restartTime = 0;
      this.justRestarted = false;
      this.restartCooldown = 0;
      this.init();
    }

    init() {
      // Remove old panel if exists
      const oldPanel = document.getElementById('debug-panel-enhanced');
      if (oldPanel) oldPanel.remove();

      this.createDebugPanel();
      this.createToggleButton();
      this.registerShortcuts();
      
      console.log('%c🔧 Debug Mode Loaded!', 'color: #0f0; font-size: 16px; font-weight: bold;');
      console.log('%cPress Ctrl+D or click the button to open', 'color: #0af; font-size: 14px;');
    }

    registerShortcuts() {
      document.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key === 'd') {
          e.preventDefault();
          this.toggle();
        }
      });
    }

    createToggleButton() {
      let toggleBtn = document.getElementById('debug-toggle-button');
      if (!toggleBtn) {
        toggleBtn = document.createElement('button');
        toggleBtn.id = 'debug-toggle-button';
        toggleBtn.textContent = '🔧';
        toggleBtn.title = 'Toggle Debug Mode (Ctrl+D)';
        toggleBtn.addEventListener('click', () => this.toggle());
        document.body.appendChild(toggleBtn);
      }
    }

    createDebugPanel() {
      const panel = document.createElement('div');
      panel.id = 'debug-panel-enhanced';
      panel.style.display = 'none';
      
      // Create header
      panel.appendChild(this.createHeader());
      
      // Create tabs
      panel.appendChild(this.createTabs());
      
      // Create content container
      const contentContainer = document.createElement('div');
      contentContainer.className = 'debug-content';
      contentContainer.id = 'debug-content-container';
      panel.appendChild(contentContainer);
      
      document.body.appendChild(panel);
      this.panel = panel;
      
      // Initialize with first tab
      this.switchTab('add');
      this.attachEventListeners();
    }

    createHeader() {
      const header = document.createElement('div');
      header.className = 'debug-header';
      header.innerHTML = `
        <h2>🔧 Debug Mode</h2>
        <button id="debug-close" class="debug-btn-close">×</button>
      `;
      return header;
    }

    createTabs() {
      const tabsContainer = document.createElement('div');
      tabsContainer.className = 'debug-tabs';
      
      const tabs = [
        { id: 'add', label: 'Add New Pokemon' },
        { id: 'edit', label: 'Edit Pokemon' },
        { id: 'quick', label: 'Quick Actions' },
        { id: 'stats', label: 'Stats' }
      ];
      
      tabs.forEach(tab => {
        const button = document.createElement('button');
        button.className = `debug-tab ${tab.id === 'add' ? 'active' : ''}`;
        button.dataset.tab = tab.id;
        button.textContent = tab.label;
        button.addEventListener('click', () => this.switchTab(tab.id));
        tabsContainer.appendChild(button);
      });
      
      return tabsContainer;
    }

    switchTab(tabId) {
      // Update tab buttons
      document.querySelectorAll('.debug-tab').forEach(tab => {
        tab.classList.toggle('active', tab.dataset.tab === tabId);
      });
      
      // Update content
      this.currentTab = tabId;
      const container = document.getElementById('debug-content-container');
      container.innerHTML = '';
      
      // Render the selected tab
      switch(tabId) {
        case 'add':
          container.appendChild(this.renderAddPokemonTab());
          this.initAddPokemonTab();
          break;
        case 'edit':
          container.appendChild(this.renderEditPokemonTab());
          this.initEditPokemonTab();
          break;
        case 'quick':
          container.appendChild(this.renderQuickActionsTab());
          this.initQuickActionsTab();
          break;
        case 'stats':
          container.appendChild(this.renderStatsTab());
          this.updateStats();
          break;
      }
    }

    renderAddPokemonTab() {
      const tab = document.createElement('div');
      tab.innerHTML = `
        <div class="debug-section">
          <label>Select Pokemon</label>
          <div class="debug-search-container">
            <input type="text" id="debug-pokemon-search" placeholder="Search Pokemon..." />
            <div id="debug-pokemon-list" class="debug-list"></div>
          </div>
        </div>

        <div id="debug-pokemon-editor" style="display: none;">
          <div class="debug-pokemon-preview">
            <img id="debug-pokemon-sprite" src="" alt="Pokemon sprite" style="image-rendering: pixelated;" />
            <h3 id="debug-pokemon-name"></h3>
            <div id="debug-pokemon-types"></div>
          </div>

          <div class="debug-section">
            <label>Level (1-100)</label>
            <input type="number" id="debug-level" min="1" max="100" value="50" />
          </div>

          <div class="debug-section">
            <label><input type="checkbox" id="debug-shiny" /> Shiny</label>
          </div>

          <div class="debug-section">
            <label>Individual Values (0-6)</label>
            <div class="debug-ivs">
              <div><label>HP</label><input type="number" id="debug-iv-hp" min="0" max="6" value="0" /></div>
              <div><label>ATK</label><input type="number" id="debug-iv-atk" min="0" max="6" value="0" /></div>
              <div><label>DEF</label><input type="number" id="debug-iv-def" min="0" max="6" value="0" /></div>
              <div><label>SATK</label><input type="number" id="debug-iv-satk" min="0" max="6" value="0" /></div>
              <div><label>SDEF</label><input type="number" id="debug-iv-sdef" min="0" max="6" value="0" /></div>
              <div><label>SPE</label><input type="number" id="debug-iv-spe" min="0" max="6" value="0" /></div>
            </div>
            <button id="debug-max-ivs" class="debug-btn-small">Max All IVs</button>
          </div>

          <div class="debug-section">
            <label>Ability</label>
            <select id="debug-ability"><option value="random">Random</option></select>
          </div>

          <div class="debug-section">
            <label><input type="checkbox" id="debug-hidden-ability" /> Unlock Hidden Ability</label>
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
      `;
      return tab;
    }

    renderEditPokemonTab() {
      const tab = document.createElement('div');
      tab.innerHTML = `
        <div class="debug-section">
          <label>Select Pokemon to Edit</label>
          <select id="debug-edit-pokemon-select" style="width: 100%; padding: 10px; background: var(--dark1); border: 2px solid var(--light1); border-radius: 5px; color: var(--light2);">
            <option value="">-- Select a Pokemon --</option>
          </select>
        </div>

        <div id="debug-edit-pokemon-editor" style="display: none;">
          <div class="debug-pokemon-preview">
            <img id="debug-edit-pokemon-sprite" src="" alt="Pokemon sprite" style="image-rendering: pixelated;" />
            <h3 id="debug-edit-pokemon-name"></h3>
            <div id="debug-edit-pokemon-types"></div>
          </div>

          <div class="debug-section">
            <label>Level (1-100)</label>
            <input type="number" id="debug-edit-level" min="1" max="100" value="50" />
          </div>

          <div class="debug-section">
            <label><input type="checkbox" id="debug-edit-shiny" /> Shiny</label>
          </div>

          <div class="debug-section">
            <label>IVs (0-6)</label>
            <button id="debug-edit-max-ivs" class="debug-btn-action">Max All IVs</button>
            <div class="debug-ivs">
              <div><label>HP</label><input type="number" id="debug-edit-iv-hp" min="0" max="6" value="0" /></div>
              <div><label>ATK</label><input type="number" id="debug-edit-iv-atk" min="0" max="6" value="0" /></div>
              <div><label>DEF</label><input type="number" id="debug-edit-iv-def" min="0" max="6" value="0" /></div>
              <div><label>SATK</label><input type="number" id="debug-edit-iv-satk" min="0" max="6" value="0" /></div>
              <div><label>SDEF</label><input type="number" id="debug-edit-iv-sdef" min="0" max="6" value="0" /></div>
              <div><label>SPE</label><input type="number" id="debug-edit-iv-spe" min="0" max="6" value="0" /></div>
            </div>
          </div>

          <div class="debug-section">
            <label>Ability</label>
            <select id="debug-edit-ability"></select>
            <label><input type="checkbox" id="debug-edit-hidden-ability" /> Hidden Ability</label>
          </div>

          <div class="debug-section">
            <label>Moves Management</label>
            <div style="margin-bottom: 10px;">
              <strong>Equipped Moves (Click to unequip):</strong>
              <div id="debug-edit-equipped-moves" style="margin-top: 8px; display: flex; flex-wrap: wrap; gap: 5px;"></div>
            </div>
            <div style="margin-bottom: 10px;">
              <strong>Learned Moves (Click to equip):</strong>
              <div id="debug-edit-learned-moves" style="margin-top: 8px; display: flex; flex-wrap: wrap; gap: 5px;"></div>
            </div>
            <div style="margin-top: 15px;">
              <label>Add New Move</label>
              <div class="debug-search-container">
                <input type="text" id="debug-edit-move-search" placeholder="Search moves..." />
                <div id="debug-edit-move-list" class="debug-list"></div>
              </div>
            </div>
            <button id="debug-edit-relearn-moves" class="debug-btn-action" style="margin-top: 10px;">🔄 Re-learn All Moves</button>
          </div>

          <div class="debug-actions">
            <button id="debug-save-pokemon" class="debug-btn-action">💾 Save Changes</button>
          </div>
        </div>
      `;
      return tab;
    }

    renderQuickActionsTab() {
      const tab = document.createElement('div');
      tab.innerHTML = `
        <div class="debug-section">
          <h3>Battle Settings</h3>
          <div style="margin-bottom: 15px;">
            <label><input type="checkbox" id="debug-auto-repeat" /> Auto Repeat Battles</label>
            <div style="margin-top: 10px;">
              <label>Battle Count (0 = infinite):</label>
              <input type="number" id="debug-repeat-count" min="0" value="0" style="width: 100%; padding: 8px; background: var(--dark1); border: 2px solid var(--light1); border-radius: 5px; color: var(--light2);" />
            </div>
            <div style="margin-top: 10px; padding: 10px; background: var(--dark2); border-radius: 5px;">
              <div>Status: <span id="debug-repeat-status">Stopped</span></div>
              <div>Battles: <span id="debug-repeat-counter">0</span></div>
            </div>
          </div>
          <div style="margin-bottom: 15px;">
            <label>Battle Speed Multiplier (0.1 - 100):</label>
            <div style="display: flex; gap: 10px; align-items: center;">
              <input type="number" id="debug-battle-speed" min="0.1" max="100" step="0.1" value="1" style="flex: 1; padding: 8px; background: var(--dark1); border: 2px solid var(--light1); border-radius: 5px; color: var(--light2);" />
              <button id="debug-apply-speed" class="debug-btn-action" style="max-width: 80px; padding: 8px 20px; white-space: nowrap;">Apply</button>
            </div>
            <div style="text-align: center; color: var(--light2); margin-top: 5px;">Current: <span id="debug-speed-value">1x</span></div>
          </div>
          <button class="debug-btn-action" onclick="window.debugMode.toggleGodMode()">Toggle God Mode</button>
        </div>

        <div class="debug-section">
          <h3>Pokemon Actions</h3>
          <button class="debug-btn-action" onclick="window.debugMode.giveAllPokemon()">Give All Pokemon (Level 50)</button>
          <button class="debug-btn-action" onclick="window.debugMode.maxAllLevels()">Max All Caught Pokemon Levels</button>
          <button class="debug-btn-action" onclick="window.debugMode.shinyAllPokemon()">Make All Caught Pokemon Shiny</button>
          <button class="debug-btn-action" onclick="window.debugMode.maxAllIVs()">Max All Pokemon IVs</button>
        </div>

        <div class="debug-section">
          <h3>Items</h3>
          <button class="debug-btn-action" onclick="window.debugMode.giveAllItems()">Give All Items (x999)</button>
          <button class="debug-btn-action" onclick="window.debugMode.giveBottleCaps()">Give Bottle Caps (x100)</button>
          <button class="debug-btn-action" onclick="window.debugMode.giveGoldenBottleCaps()">Give Golden Bottle Caps (x50)</button>
        </div>

        <div class="debug-section">
          <h3>Areas</h3>
          <button class="debug-btn-action" onclick="window.debugMode.unlockAllAreas()">Unlock All Areas</button>
          <button class="debug-btn-action" onclick="window.debugMode.resetAllAreas()">Reset All Areas</button>
        </div>

        <div class="debug-section">
          <h3>Save</h3>
          <button class="debug-btn-action" onclick="window.debugMode.exportSave()">Export Save</button>
          <button class="debug-btn-action" onclick="window.debugMode.importSave()">Import Save</button>
          <button class="debug-btn-action" onclick="window.debugMode.resetSave()">Reset Save (Warning!)</button>
        </div>
      `;
      return tab;
    }

    renderStatsTab() {
      const tab = document.createElement('div');
      tab.innerHTML = `
        <div class="debug-section">
          <h3>Game Statistics</h3>
          <div id="debug-game-stats"></div>
        </div>
        
        <div class="debug-section">
          <h3>Console Commands</h3>
          <div class="debug-console-help">
            <code>debugMode.givePkmn(pkmn.NAME, level, shiny)</code>
            <code>debugMode.addMove(pokemonId, moveId)</code>
            <code>debugMode.setLevel(pokemonId, level)</code>
            <code>debugMode.setShiny(pokemonId, true/false)</code>
            <code>debugMode.setIVs(pokemonId, {hp:6, atk:6, ...})</code>
          </div>
        </div>
      `;
      return tab;
    }

    initAddPokemonTab() {
      document.getElementById('debug-pokemon-search').addEventListener('input', (e) => {
        this.searchPokemon(e.target.value);
      });

      document.getElementById('debug-move-search').addEventListener('input', (e) => {
        this.searchMoves(e.target.value);
      });

      document.getElementById('debug-max-ivs').addEventListener('click', () => {
        ['hp', 'atk', 'def', 'satk', 'sdef', 'spe'].forEach(stat => {
          document.getElementById(`debug-iv-${stat}`).value = 6;
        });
      });

      document.getElementById('debug-add-pokemon').addEventListener('click', () => this.addPokemon(false));
      document.getElementById('debug-add-to-team').addEventListener('click', () => this.addPokemon(true));

      this.searchPokemon('');
    }

    initEditPokemonTab() {
      this.populateEditPokemonList();

      document.getElementById('debug-edit-pokemon-select').addEventListener('change', (e) => {
        this.loadPokemonForEdit(e.target.value);
      });

      document.getElementById('debug-edit-move-search').addEventListener('input', (e) => {
        this.searchEditMoves(e.target.value);
      });

      document.getElementById('debug-edit-max-ivs').addEventListener('click', () => {
        ['hp', 'atk', 'def', 'satk', 'sdef', 'spe'].forEach(stat => {
          document.getElementById(`debug-edit-iv-${stat}`).value = 6;
        });
      });

      document.getElementById('debug-save-pokemon').addEventListener('click', () => this.savePokemonChanges());
      document.getElementById('debug-edit-relearn-moves').addEventListener('click', () => this.relearnMoves());
    }

    initQuickActionsTab() {
      // Auto-repeat checkbox
      const autoRepeatCheckbox = document.getElementById('debug-auto-repeat');
      if (autoRepeatCheckbox) {
        autoRepeatCheckbox.addEventListener('change', (e) => {
          this.autoRepeatEnabled = e.target.checked;
          if (this.autoRepeatEnabled) {
            this.autoRepeatCount = parseInt(document.getElementById('debug-repeat-count').value) || 0;
            this.autoRepeatCurrent = 0;
            this.startAutoRepeat();
          } else {
            this.stopAutoRepeat();
          }
        });
      }

      // Battle speed input
      const speedInput = document.getElementById('debug-battle-speed');
      const applySpeedBtn = document.getElementById('debug-apply-speed');
      if (speedInput && applySpeedBtn) {
        const applySpeed = () => {
          let speed = parseFloat(speedInput.value);
          if (isNaN(speed) || speed < 0.1) speed = 0.1;
          if (speed > 100) speed = 100;
          speedInput.value = speed.toFixed(1);
          document.getElementById('debug-speed-value').textContent = speed.toFixed(1) + 'x';
          saved.overrideBattleTimer = 2000 / speed;
        };
        applySpeedBtn.addEventListener('click', applySpeed);
        speedInput.addEventListener('keypress', (e) => {
          if (e.key === 'Enter') applySpeed();
        });
      }
    }

    attachEventListeners() {
      document.getElementById('debug-close').addEventListener('click', () => this.toggle());
    }

    toggle() {
      this.isOpen = !this.isOpen;
      this.panel.style.display = this.isOpen ? 'flex' : 'none';
      if (this.isOpen) this.switchTab(this.currentTab);
    }

    searchPokemon(query) {
      const list = document.getElementById('debug-pokemon-list');
      list.innerHTML = '';
      
      // Filter only uncaught Pokemon
      const filtered = Object.keys(pkmn).filter(id => {
        // Skip if already caught
        if (pkmn[id].caught && pkmn[id].caught > 0) return false;
        
        if (!query) return true;
        return format(id).toLowerCase().includes(query.toLowerCase()) || 
               id.toLowerCase().includes(query.toLowerCase());
      }).slice(0, 50);

      if (filtered.length === 0) {
        list.innerHTML = '<div class="debug-info">No uncaught Pokemon found. Use "Edit Pokemon" tab to modify caught ones.</div>';
        return;
      }

      filtered.forEach(id => {
        const div = document.createElement('div');
        div.className = 'debug-list-item';
        div.innerHTML = `
          <img src="img/pkmn/sprite/${id}.png" alt="${format(id)}" style="image-rendering: pixelated;" />
          <span>${format(id)}</span>
        `;
        div.addEventListener('click', () => this.selectPokemon(id));
        list.appendChild(div);
      });
    }

    selectPokemon(id) {
      this.selectedPokemon = id;
      this.selectedMoves = [];
      
      document.getElementById('debug-pokemon-editor').style.display = 'block';
      
      // Load sprite without triggering auto-trim
      const spriteImg = document.getElementById('debug-pokemon-sprite');
      const sprite = pkmn[id].shiny ? `img/pkmn/shiny/${id}.png` : `img/pkmn/sprite/${id}.png`;
      spriteImg.onerror = () => {
        // Fallback to regular sprite if shiny doesn't exist
        spriteImg.src = `img/pkmn/sprite/${id}.png`;
      };
      spriteImg.src = sprite;
      document.getElementById('debug-pokemon-name').textContent = format(id);
      
      const typesDiv = document.getElementById('debug-pokemon-types');
      typesDiv.innerHTML = pkmn[id].type.map(type => 
        `<span class="debug-type" style="background: ${returnTypeColor(type)}">${type.toUpperCase()}</span>`
      ).join('');

      this.populateAbilities(id);
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
      
      if (!this.selectedPokemon) {
        list.innerHTML = '<div class="debug-info">Please select a Pokemon first</div>';
        return;
      }
      
      const pokemonTypes = pkmn[this.selectedPokemon].type;
      
      const filtered = Object.keys(move).filter(id => {
        const moveData = move[id];
        
        // Skip if moveset is not defined
        if (!moveData.moveset || !Array.isArray(moveData.moveset)) return false;
        
        // Check if the Pokemon can learn this move based on moveset
        const canLearn = moveData.moveset.includes("all") || 
                        pokemonTypes.some(t => moveData.moveset.includes(t));
        
        if (!canLearn) return false;
        
        // Apply search filter
        if (!query) return true;
        return format(id).toLowerCase().includes(query.toLowerCase()) || 
               id.toLowerCase().includes(query.toLowerCase());
      }).slice(0, 30);

      if (filtered.length === 0) {
        list.innerHTML = '<div class="debug-info">No learnable moves found</div>';
        return;
      }

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
      if (this.selectedMoves.length >= 4 || this.selectedMoves.includes(moveId)) return;
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

      pokemon.caught = pokemon.caught ? pokemon.caught + 1 : 1;
      pokemon.level = level;
      pokemon.shiny = isShiny;
      pokemon.ivs = ivs;
      
      if (selectedAbility !== 'random') {
        pokemon.ability = selectedAbility;
      } else {
        pokemon.ability = learnPkmnAbility(this.selectedPokemon);
      }

      if (hiddenAbility && pokemon.hiddenAbility) {
        pokemon.hiddenAbilityUnlocked = true;
      }

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

      pokemon.exp = pokemon.exp || 0;

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

      alert(`${format(this.selectedPokemon)} added!\nLevel: ${level}\nShiny: ${isShiny}`);
    }

    giveAllPokemon() {
      if (!confirm('Give all Pokemon at level 50?')) return;
      Object.keys(pkmn).forEach(id => givePkmn(pkmn[id], 50));
      updatePokedex();
      saveGame();
      alert('All Pokemon added!');
    }

    maxAllLevels() {
      if (!confirm('Set all caught Pokemon to level 100?')) return;
      Object.values(pkmn).forEach(p => { if (p.caught > 0) p.level = 100; });
      updatePokedex();
      updatePreviewTeam();
      saveGame();
      alert('All caught Pokemon set to level 100!');
    }

    shinyAllPokemon() {
      if (!confirm('Make all caught Pokemon shiny?')) return;
      Object.values(pkmn).forEach(p => { if (p.caught > 0) p.shiny = true; });
      updatePokedex();
      updatePreviewTeam();
      saveGame();
      alert('All caught Pokemon are now shiny!');
    }

    maxAllIVs() {
      if (!confirm('Set all caught Pokemon IVs to 6?')) return;
      Object.values(pkmn).forEach(p => {
        if (p.caught > 0) {
          p.ivs = { hp: 6, atk: 6, def: 6, satk: 6, sdef: 6, spe: 6 };
        }
      });
      updatePokedex();
      updatePreviewTeam();
      saveGame();
      alert('All caught Pokemon IVs maxed!');
    }

    giveAllItems() {
      if (!confirm('Give all items (x999)?')) return;
      Object.values(item).forEach(itm => itm.got = 999);
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
      Object.values(areas).forEach(area => area.defeated = true);
      saveGame();
      alert('All areas unlocked!');
    }

    resetAllAreas() {
      if (!confirm('Reset all areas?')) return;
      Object.values(areas).forEach(area => area.defeated = false);
      saveGame();
      alert('All areas reset!');
    }

    setBattleSpeed() {
      const multiplier = parseFloat(document.getElementById('debug-speed').value) || 1;
      saved.overrideBattleTimer = 2000 / multiplier;
      alert(`Battle speed set to ${multiplier}x`);
    }

    toggleAutoRepeat() {
      const checkbox = document.getElementById('debug-auto-repeat');
      this.autoRepeatEnabled = checkbox.checked;
      
      if (this.autoRepeatEnabled) {
        this.autoRepeatCount = parseInt(document.getElementById('debug-repeat-count').value) || 0;
        this.autoRepeatCurrent = 0;
        this.startAutoRepeat();
        this.updateRepeatStatus('Active', 0);
      } else {
        this.stopAutoRepeat();
        this.updateRepeatStatus('Inactive', this.autoRepeatCurrent);
      }
    }

    startAutoRepeat() {
      if (!saved.currentArea) {
        alert('Please start a battle first before enabling Auto Repeat!');
        document.getElementById('debug-auto-repeat').checked = false;
        this.autoRepeatEnabled = false;
        return;
      }
      
      this.lastArea = saved.currentArea;
      this.inBattle = true;
      this.waitingToRestart = false;
      this.restartTime = 0;
      this.justRestarted = false;
      this.restartCooldown = 0;
      
      console.log('🎮 Auto Repeat started - Monitoring for battle end...');
      console.log(`📊 Target: ${this.autoRepeatCount === 0 ? 'Infinite' : this.autoRepeatCount} battles`);
      
      this.updateRepeatStatus('In Battle', this.autoRepeatCurrent);
      
      // Check battle state every 500ms
      this.autoRepeatInterval = setInterval(() => {
        if (!this.autoRepeatEnabled) {
          this.stopAutoRepeat();
          return;
        }

        // Check if we've reached the target count
        if (this.autoRepeatCount > 0 && this.autoRepeatCurrent >= this.autoRepeatCount) {
          console.log(`✅ Auto Repeat completed: ${this.autoRepeatCurrent} battles`);
          this.stopAutoRepeat();
          document.getElementById('debug-auto-repeat').checked = false;
          alert(`Auto Repeat completed!\nTotal battles: ${this.autoRepeatCurrent}`);
          return;
        }

        const rejoinBtn = document.getElementById('area-rejoin');
        const isRejoinVisible = rejoinBtn && rejoinBtn.offsetParent !== null;
        const now = Date.now();
        
        // Don't detect button for 3 seconds after clicking to restart
        if (this.justRestarted && (now - this.restartCooldown) < 3000) {
          return; // Still in cooldown period
        }
        
        // Cooldown expired, reset flag
        if (this.justRestarted && (now - this.restartCooldown) >= 3000) {
          this.justRestarted = false;
        }
        
        // Battle just ended - "Fight Again" button appeared
        if (isRejoinVisible && this.inBattle && !this.waitingToRestart && !this.justRestarted) {
          console.log('✅ Battle ended! Waiting 3 seconds before clicking "Fight Again"...');
          this.inBattle = false;
          this.waitingToRestart = true;
          this.restartTime = now;
          this.updateRepeatStatus('Waiting (3s)', this.autoRepeatCurrent);
        }
        
        // Wait 3 seconds then click "Fight Again"
        if (this.waitingToRestart && (now - this.restartTime) >= 3000) {
          this.autoRepeatCurrent++;
          console.log(`🔄 Clicking "Fight Again" (Battle #${this.autoRepeatCurrent})...`);
          
          // Reset flags BEFORE clicking to prevent multiple clicks
          this.waitingToRestart = false;
          this.inBattle = true;
          this.justRestarted = true;
          this.restartCooldown = now;
          this.updateRepeatStatus('In Battle', this.autoRepeatCurrent);
          
          // Click after resetting flags
          if (rejoinBtn) {
            rejoinBtn.click();
          }
        }
      }, 500);
    }

    isBattleActive() {
      return saved.currentArea !== undefined;
    }

    stopAutoRepeat() {
      if (this.autoRepeatInterval) {
        clearInterval(this.autoRepeatInterval);
        this.autoRepeatInterval = null;
      }
      
      this.autoRepeatEnabled = false;
      this.inBattle = false;
      this.waitingToRestart = false;
      this.restartTime = 0;
      this.justRestarted = false;
      this.restartCooldown = 0;
      this.updateRepeatStatus('Stopped', this.autoRepeatCurrent);
      console.log('🛑 Auto Repeat stopped');
    }

    updateRepeatStatus(status, count) {
      const statusEl = document.getElementById('debug-repeat-status');
      const counterEl = document.getElementById('debug-repeat-counter');
      
      if (statusEl) {
        statusEl.textContent = status;
        statusEl.style.color = status === 'Active' ? '#27ae60' : 'var(--light2)';
      }
      
      if (counterEl) {
        counterEl.textContent = count;
      }
    }

    toggleGodMode() {
      window.godMode = !window.godMode;
      alert(`God Mode: ${window.godMode ? 'ON' : 'OFF'}`);
    }

    exportSave() {
      const data = localStorage.getItem('gameData');
      if (!data) { alert('No save data found!'); return; }
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
            localStorage.setItem('gameData', event.target.result);
            alert('Save imported! Reloading...');
            location.reload();
          } catch (error) {
            alert('Error: ' + error.message);
          }
        };
        reader.readAsText(file);
      };
      input.click();
    }

    resetSave() {
      if (!confirm('WARNING: Delete ALL progress?')) return;
      if (!confirm('Last chance!')) return;
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
        <div class="debug-stat-row"><span>Pokemon Caught:</span><strong>${caughtCount} / ${totalPokemon} (${((caughtCount/totalPokemon)*100).toFixed(1)}%)</strong></div>
        <div class="debug-stat-row"><span>Shiny Pokemon:</span><strong>${shinyCount}</strong></div>
        <div class="debug-stat-row"><span>Level 100 Pokemon:</span><strong>${maxLevelCount}</strong></div>
        <div class="debug-stat-row"><span>Team Size:</span><strong>${teamSize} / 6</strong></div>
        <div class="debug-stat-row"><span>Average Team Level:</span><strong>${avgTeamLevel.toFixed(1)}</strong></div>
        <div class="debug-stat-row"><span>Areas Unlocked:</span><strong>${unlockedAreas} / ${totalAreas}</strong></div>
        <div class="debug-stat-row"><span>Bottle Caps:</span><strong>${item.bottleCap?.got || 0}</strong></div>
        <div class="debug-stat-row"><span>Golden Bottle Caps:</span><strong>${item.goldenBottleCap?.got || 0}</strong></div>
      `;
    }

    populateEditPokemonList() {
      const select = document.getElementById('debug-edit-pokemon-select');
      select.innerHTML = '<option value="">-- Select a Pokemon --</option>';
      
      Object.keys(pkmn).forEach(id => {
        if (pkmn[id].caught && pkmn[id].caught > 0) {
          const option = document.createElement('option');
          option.value = id;
          option.textContent = `${format(id)} (Lvl ${pkmn[id].level || 1}, Caught: ${pkmn[id].caught})`;
          select.appendChild(option);
        }
      });
    }

    loadPokemonForEdit(pokemonId) {
      const editor = document.getElementById('debug-edit-pokemon-editor');
      
      if (!pokemonId) {
        editor.style.display = 'none';
        return;
      }
      
      const pokemon = pkmn[pokemonId];
      this.editingPokemon = pokemonId;
      
      editor.style.display = 'block';
      
      // Update sprite and info
      document.getElementById('debug-edit-pokemon-sprite').src = `img/pkmn/sprite/${pokemonId}.png`;
      document.getElementById('debug-edit-pokemon-name').textContent = format(pokemonId);
      
      const typesDiv = document.getElementById('debug-edit-pokemon-types');
      typesDiv.innerHTML = pokemon.type.map(type => 
        `<span class="debug-type" style="background: ${returnTypeColor(type)}">${type.toUpperCase()}</span>`
      ).join('');
      
      // Load current values
      document.getElementById('debug-edit-level').value = pokemon.level || 1;
      document.getElementById('debug-edit-shiny').checked = pokemon.shiny || false;
      
      // Load IVs
      const ivs = pokemon.ivs || { hp: 0, atk: 0, def: 0, satk: 0, sdef: 0, spe: 0 };
      ['hp', 'atk', 'def', 'satk', 'sdef', 'spe'].forEach(stat => {
        document.getElementById(`debug-edit-iv-${stat}`).value = ivs[stat] || 0;
      });
      
      // Populate abilities
      const abilitySelect = document.getElementById('debug-edit-ability');
      abilitySelect.innerHTML = '<option value="random">Random</option>';
      
      Object.keys(ability).forEach(abilityId => {
        const ab = ability[abilityId];
        if (ab.type === undefined) return;
        if (!ab.type.includes("all") && !ab.type.some(t => pokemon.type.includes(t))) return;
        
        const option = document.createElement('option');
        option.value = abilityId;
        option.textContent = `${format(abilityId)} (${ab.rarity === 1 ? 'Common' : ab.rarity === 2 ? 'Uncommon' : 'Rare'})`;
        if (pokemon.ability === abilityId) option.selected = true;
        abilitySelect.appendChild(option);
      });
      
      document.getElementById('debug-edit-hidden-ability').checked = pokemon.hiddenAbilityCheck || false;
      
      // Display moves
      this.displayEditMoves(pokemonId);
      this.searchEditMoves('');
    }

    displayEditMoves(pokemonId) {
      const pokemon = pkmn[pokemonId];
      
      // Initialize moves if not exists
      pokemon.moves = pokemon.moves || { slot1: null, slot2: null, slot3: null, slot4: null };
      pokemon.movepool = pokemon.movepool || [];
      
      // Display equipped moves
      const equippedDiv = document.getElementById('debug-edit-equipped-moves');
      const equippedMoves = Object.values(pokemon.moves).filter(m => m);
      
      if (equippedMoves.length === 0) {
        equippedDiv.innerHTML = '<div class="debug-info" style="font-size: 12px;">No moves equipped</div>';
      } else {
        equippedDiv.innerHTML = equippedMoves.map(moveId => 
          `<button class="debug-move-btn" data-move="${moveId}" data-action="unequip" style="background: ${returnTypeColor(move[moveId].type)}; color: white; border: none; padding: 5px 10px; border-radius: 5px; cursor: pointer; font-size: 12px;">${format(moveId)} ×</button>`
        ).join('');
        
        equippedDiv.querySelectorAll('.debug-move-btn[data-action="unequip"]').forEach(btn => {
          btn.addEventListener('click', () => this.unequipMove(btn.dataset.move));
        });
      }
      
      // Display learned but not equipped moves
      const learnedDiv = document.getElementById('debug-edit-learned-moves');
      const unequippedMoves = pokemon.movepool.filter(m => !equippedMoves.includes(m));
      
      if (unequippedMoves.length === 0) {
        learnedDiv.innerHTML = '<div class="debug-info" style="font-size: 12px;">All learned moves are equipped</div>';
      } else {
        learnedDiv.innerHTML = unequippedMoves.map(moveId => 
          `<button class="debug-move-btn" data-move="${moveId}" data-action="equip" style="background: var(--dark1); color: ${returnTypeColor(move[moveId].type)}; border: 2px solid ${returnTypeColor(move[moveId].type)}; padding: 5px 10px; border-radius: 5px; cursor: pointer; font-size: 12px;">${format(moveId)} +</button>`
        ).join('');
        
        learnedDiv.querySelectorAll('.debug-move-btn[data-action="equip"]').forEach(btn => {
          btn.addEventListener('click', () => this.equipMove(btn.dataset.move));
        });
      }
    }

    equipMove(moveId) {
      if (!this.editingPokemon) return;
      
      const pokemon = pkmn[this.editingPokemon];
      const slots = ['slot1', 'slot2', 'slot3', 'slot4'];
      
      // Find first empty slot
      for (const slot of slots) {
        if (!pokemon.moves[slot]) {
          pokemon.moves[slot] = moveId;
          this.displayEditMoves(this.editingPokemon);
          return;
        }
      }
      
      alert('All 4 move slots are full! Unequip a move first.');
    }

    unequipMove(moveId) {
      if (!this.editingPokemon) return;
      
      const pokemon = pkmn[this.editingPokemon];
      
      // Find and remove the move from slots
      for (const slot in pokemon.moves) {
        if (pokemon.moves[slot] === moveId) {
          pokemon.moves[slot] = null;
          this.displayEditMoves(this.editingPokemon);
          return;
        }
      }
    }

    searchEditMoves(query) {
      const list = document.getElementById('debug-edit-move-list');
      list.innerHTML = '';
      
      if (!this.editingPokemon) {
        list.innerHTML = '<div class="debug-info">Please select a Pokemon first</div>';
        return;
      }
      
      const pokemon = pkmn[this.editingPokemon];
      const pokemonTypes = pokemon.type;
      
      const filtered = Object.keys(move).filter(id => {
        const moveData = move[id];
        
        // Skip if moveset is not defined
        if (!moveData.moveset || !Array.isArray(moveData.moveset)) return false;
        
        // Skip if already in movepool
        if (pokemon.movepool && pokemon.movepool.includes(id)) return false;
        
        // Check if the Pokemon can learn this move
        const canLearn = moveData.moveset.includes("all") || 
                        pokemonTypes.some(t => moveData.moveset.includes(t));
        
        if (!canLearn) return false;
        
        // Apply search filter
        if (!query) return true;
        return format(id).toLowerCase().includes(query.toLowerCase()) || 
               id.toLowerCase().includes(query.toLowerCase());
      }).slice(0, 30);

      if (filtered.length === 0) {
        list.innerHTML = '<div class="debug-info">No new learnable moves found</div>';
        return;
      }

      filtered.forEach(id => {
        const div = document.createElement('div');
        div.className = 'debug-list-item';
        div.innerHTML = `
          <span style="color: ${returnTypeColor(move[id].type)}">${format(id)}</span>
          <span class="debug-move-power">${move[id].power > 0 ? move[id].power : '-'}</span>
        `;
        div.addEventListener('click', () => this.addMoveToPool(id));
        list.appendChild(div);
      });
    }

    addMoveToPool(moveId) {
      if (!this.editingPokemon) return;
      
      const pokemon = pkmn[this.editingPokemon];
      pokemon.movepool = pokemon.movepool || [];
      
      if (!pokemon.movepool.includes(moveId)) {
        pokemon.movepool.push(moveId);
        this.displayEditMoves(this.editingPokemon);
        this.searchEditMoves(document.getElementById('debug-edit-move-search').value);
        console.log(`✅ Added ${format(moveId)} to ${format(this.editingPokemon)}'s movepool`);
      }
    }

    displayCurrentMoves(pokemonId) {
      // This function is deprecated, kept for compatibility
      this.displayEditMoves(pokemonId);
    }

    savePokemonChanges() {
      if (!this.editingPokemon) return;
      
      const pokemon = pkmn[this.editingPokemon];
      
      // Save all changes
      pokemon.level = parseInt(document.getElementById('debug-edit-level').value) || 1;
      pokemon.shiny = document.getElementById('debug-edit-shiny').checked;
      
      pokemon.ivs = {
        hp: parseFloat(document.getElementById('debug-edit-iv-hp').value) || 0,
        atk: parseFloat(document.getElementById('debug-edit-iv-atk').value) || 0,
        def: parseFloat(document.getElementById('debug-edit-iv-def').value) || 0,
        satk: parseFloat(document.getElementById('debug-edit-iv-satk').value) || 0,
        sdef: parseFloat(document.getElementById('debug-edit-iv-sdef').value) || 0,
        spe: parseFloat(document.getElementById('debug-edit-iv-spe').value) || 0
      };
      
      const selectedAbility = document.getElementById('debug-edit-ability').value;
      if (selectedAbility !== 'random') {
        pokemon.ability = selectedAbility;
      }
      
      pokemon.hiddenAbilityCheck = document.getElementById('debug-edit-hidden-ability').checked;
      
      saveGame();
      alert(`${format(this.editingPokemon)} has been updated!`);
      console.log(`✅ Updated ${format(this.editingPokemon)}`);
    }

    relearnMoves() {
      if (!this.editingPokemon) return;
      
      const pokemon = pkmn[this.editingPokemon];
      const level = pokemon.level || 1;
      
      // Clear movepool
      pokemon.movepool = [];
      pokemon.moves = { slot1: null, slot2: null, slot3: null, slot4: null };
      
      // Re-learn moves based on level
      for (let lvl = 1; lvl <= level; lvl++) {
        if (lvl === 1 || lvl % 7 === 0) {
          const learntMove = learnPkmnMove(pokemon.id, lvl);
          if (learntMove && !pokemon.movepool.includes(learntMove)) {
            pokemon.movepool.push(learntMove);
          }
        }
      }
      
      // Auto-equip first 4 moves
      const slots = ["slot1", "slot2", "slot3", "slot4"];
      pokemon.movepool.slice(0, 4).forEach((moveId, i) => {
        pokemon.moves[slots[i]] = moveId;
      });
      
      saveGame();
      this.displayEditMoves(this.editingPokemon);
      this.searchEditMoves('');
      alert(`${format(this.editingPokemon)} has re-learned ${pokemon.movepool.length} moves!`);
      console.log(`✅ Re-learned moves for ${format(this.editingPokemon)}: ${pokemon.movepool.length} total`);
    }

    givePkmn(pokemon, level = 50, isShiny = false) {
      pokemon.caught = (pokemon.caught || 0) + 1;
      pokemon.level = level;
      pokemon.shiny = isShiny;
      pokemon.ability = pokemon.ability || learnPkmnAbility(pokemon.id);
      pokemon.ivs = pokemon.ivs || { hp: 0, atk: 0, def: 0, satk: 0, sdef: 0, spe: 0 };
      pokemon.movepool = pokemon.movepool || [];
      pokemon.moves = pokemon.moves || { slot1: null, slot2: null, slot3: null, slot4: null };
      
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
      if (!pokemon) { console.error('Pokemon not found:', pokemonId); return; }
      pokemon.movepool = pokemon.movepool || [];
      if (!pokemon.movepool.includes(moveId)) pokemon.movepool.push(moveId);
      saveGame();
      console.log(`${format(moveId)} added to ${format(pokemonId)}`);
    }

    setLevel(pokemonId, level) {
      const pokemon = pkmn[pokemonId];
      if (!pokemon) { console.error('Pokemon not found:', pokemonId); return; }
      pokemon.level = Math.max(1, Math.min(100, level));
      updatePokedex();
      updatePreviewTeam();
      saveGame();
      console.log(`${format(pokemonId)} level set to ${pokemon.level}`);
    }

    setShiny(pokemonId, isShiny) {
      const pokemon = pkmn[pokemonId];
      if (!pokemon) { console.error('Pokemon not found:', pokemonId); return; }
      pokemon.shiny = isShiny;
      updatePokedex();
      updatePreviewTeam();
      saveGame();
      console.log(`${format(pokemonId)} shiny set to ${isShiny}`);
    }

    setIVs(pokemonId, ivs) {
      const pokemon = pkmn[pokemonId];
      if (!pokemon) { console.error('Pokemon not found:', pokemonId); return; }
      pokemon.ivs = pokemon.ivs || {};
      Object.assign(pokemon.ivs, ivs);
      updatePokedex();
      updatePreviewTeam();
      saveGame();
      console.log(`${format(pokemonId)} IVs updated:`, ivs);
    }
  }

  // Initialize and expose globally
  window.debugMode = new DebugMode();
  
  console.log('%c═══════════════════════════════════════', 'color: #0af;');
  console.log('%c  🎮 POKECHILL DEBUG MODE ACTIVATED  ', 'color: #0f0; font-size: 16px; font-weight: bold;');
  console.log('%c═══════════════════════════════════════', 'color: #0af;');
  console.log('%c  Press Ctrl+D to open debug panel', 'color: #fff;');
  console.log('%c  Type debugMode for API access', 'color: #fff;');
  console.log('%c═══════════════════════════════════════', 'color: #0af;');
})();
