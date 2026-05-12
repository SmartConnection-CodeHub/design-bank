// SMC Design System · auth gate · 3 roles
(function(){
  const ROLES = {
    'kanki': {
      user: 'Martín',
      emoji: '🏄',
      project: 'kanki',
      seeProjects: ['kanki'],
      canClickProjects: false,
      welcome: 'Welcome Martín · Kanki Street · ve los efectos del DS pero los otros proyectos están bloqueados'
    },
    'infopet': {
      user: 'Javier',
      emoji: '🐾',
      project: 'infopet',
      seeProjects: ['infopet'],
      canClickProjects: false,
      welcome: 'Welcome Javier · InfoPet · ve los efectos del DS pero los otros proyectos están bloqueados'
    },
    'smc.ui': {
      user: 'Guillermo & Sebastián',
      emoji: '🧠',
      project: 'all',
      seeProjects: 'all',
      canClickProjects: true,
      welcome: 'Welcome owner · acceso total'
    }
  };

  const LS_KEY = 'smc-auth-v15';
  const FONT = '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif';

  function getRole() {
    const k = localStorage.getItem(LS_KEY);
    if (!k) return null;
    const kLower = k.toLowerCase();
    return ROLES[kLower] ? { key: kLower, ...ROLES[kLower] } : null;
  }

  function logout() {
    localStorage.removeItem(LS_KEY);
    location.reload();
  }
  window._logout = logout;

  function applyFilter(role) {
    // Mark body with role
    document.body.dataset.role = role.key;
    document.body.dataset.user = role.user;

    if (role.seeProjects === 'all') return; // owner sees all

    // Hide unauthorized project cards
    const projectKeywords = {
      kanki: ['kanki', 'kanki-street', 'kanki street', 'streetwear'],
      infopet: ['infopet', 'bsale', 'jumpseller', 'tsukai'],
      voy: ['voy', 'cotizador'],
      intranet: ['intranet', 'smc os'],
      marketing: ['marketing', 'smconnection.cl'],
      marketplace: ['marketplace', 'meli'],
      alpaso: ['alpaso', 'dance'],
      cencosud: ['cencosud', 'cem'],
      valmer: ['valmer', 'murex'],
      sap: ['sap cpi', 'parque arauco'],
      duoc: ['duoc'],
      discovery: ['discovery'],
      cerebro: ['cerebro']
    };
    const allowed = role.seeProjects;

    document.querySelectorAll('.tile, .proj-card, .pg-card, .pg-tile, .pg-feature, a').forEach(el => {
      const txt = el.innerText.toLowerCase();
      if (!txt) return;
      // Detect project mentions
      let foundProject = null;
      for (const [proj, kws] of Object.entries(projectKeywords)) {
        if (kws.some(kw => txt.includes(kw))) {
          foundProject = proj;
          break;
        }
      }
      if (!foundProject) return;
      // If project found and NOT allowed → block
      if (!allowed.includes(foundProject)) {
        // Make non-clickable
        if (el.tagName === 'A') {
          el.style.pointerEvents = 'none';
          el.style.opacity = '0.32';
          el.style.cursor = 'not-allowed';
          el.style.filter = 'grayscale(80%)';
          // Add lock badge
          if (!el.querySelector('.locked-badge')) {
            const lock = document.createElement('div');
            lock.className = 'locked-badge';
            lock.innerHTML = '🔒';
            lock.style.cssText = 'position:absolute;top:14px;right:14px;font-size:18px;z-index:5;background:rgba(0,0,0,0.6);width:32px;height:32px;border-radius:50%;display:flex;align-items:center;justify-content:center;backdrop-filter:blur(8px)';
            if (getComputedStyle(el).position === 'static') el.style.position = 'relative';
            el.appendChild(lock);
          }
        }
      }
    });
  }

  function renderWelcome(role) {
    const banner = document.createElement('div');
    banner.id = '_authBanner';
    banner.style.cssText = `position:fixed;top:0;left:0;right:0;z-index:200;background:#1D1D1F;color:white;padding:8px 22px;display:flex;align-items:center;gap:12px;font:500 13px ${FONT};letter-spacing:-0.012em`;
    banner.innerHTML = `
      <span style="font-size:18px">${role.emoji}</span>
      <span><strong>${role.user}</strong> · ${role.welcome}</span>
      <button onclick="_logout()" style="margin-left:auto;background:transparent;border:1px solid rgba(255,255,255,0.2);color:white;padding:4px 12px;border-radius:980px;font:500 11px ${FONT};cursor:pointer;letter-spacing:-0.012em">Cerrar sesión</button>
    `;
    document.body.appendChild(banner);
    // Push down nav
    document.body.style.paddingTop = '40px';
    const nav = document.querySelector('.nav');
    if (nav) nav.style.top = '40px';
  }

  function showGate() {
    const gate = document.createElement('div');
    gate.id = '_authGate';
    gate.style.cssText = `position:fixed;inset:0;background:#FAF7F4;z-index:99999;display:flex;align-items:center;justify-content:center;font-family:${FONT}`;
    gate.innerHTML = `
      <div style="background:white;padding:48px 56px;border-radius:22px;box-shadow:0 24px 64px rgba(0,0,0,0.12);max-width:440px;width:90%;text-align:center;border:1px solid #E5E5E7">
        <div style="font-size:48px;margin-bottom:12px">🔐</div>
        <h1 style="font-family:'Instrument Serif',Georgia,serif;font-size:36px;font-weight:600;letter-spacing:-0.022em;color:#1D1D1F;margin:0 0 8px;line-height:1.05">SMC Design System</h1>
        <p style="font:15px ${FONT};color:#6E6E73;letter-spacing:-0.012em;margin:0 0 24px;line-height:1.4">Ingresa tu clave para acceder al banco.<br>v15 · 21 playgrounds · 8 themes</p>
        <input type="password" id="_authInput" placeholder="Clave" autofocus style="width:100%;padding:14px 18px;border:1px solid #E5E5E7;border-radius:980px;font:17px ${FONT};letter-spacing:-0.022em;background:#FAF7F4;outline:none;color:#1D1D1F;text-align:center;margin-bottom:12px" autocomplete="off">
        <div id="_authErr" style="font:13px ${FONT};color:#FF3B30;letter-spacing:-0.012em;margin-bottom:12px;min-height:18px"></div>
        <button id="_authBtn" style="width:100%;padding:14px;background:#0066CC;color:white;border:none;border-radius:980px;font:600 15px ${FONT};letter-spacing:-0.022em;cursor:pointer;transition:180ms">Entrar →</button>
        <div style="margin-top:20px;padding-top:18px;border-top:1px solid #E5E5E7;font:11px 'SF Mono',monospace;color:#6E6E73;letter-spacing:0.04em">SMC OS · acceso controlado · 2026</div>
      </div>
    `;
    document.body.appendChild(gate);

    const input = document.getElementById('_authInput');
    const btn = document.getElementById('_authBtn');
    const err = document.getElementById('_authErr');

    function tryLogin() {
      const v = input.value.trim().toLowerCase();
      if (ROLES[v]) {
        localStorage.setItem(LS_KEY, v);
        gate.style.opacity = '0';
        gate.style.transition = 'opacity 360ms';
        setTimeout(() => { gate.remove(); init(); }, 360);
      } else {
        err.textContent = '✗ Clave inválida';
        input.style.borderColor = '#FF3B30';
        input.style.background = 'rgba(255,59,48,0.04)';
        input.value = '';
        setTimeout(() => {
          input.style.borderColor = '#E5E5E7';
          input.style.background = '#FAF7F4';
          err.textContent = '';
        }, 1800);
      }
    }
    btn.onclick = tryLogin;
    input.addEventListener('keydown', e => { if (e.key === 'Enter') tryLogin(); });
  }

  function init() {
    const role = getRole();
    if (!role) {
      showGate();
      return;
    }
    renderWelcome(role);
    applyFilter(role);
  }

  init();
})();
