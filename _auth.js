// SMC Design System · auth gate · 5 roles
(function(){
  const ROLES = {
    'kanki': {
      user: 'Martín',
      emoji: '🏄',
      project: 'kanki',
      seeProjects: ['kanki'],
      canClickProjects: false,
      canSeeOS: false,
      welcome: 'Welcome Martín · Kanki Street · ve los efectos del DS · proyectos otros bloqueados'
    },
    'infopet': {
      user: 'Javier',
      emoji: '🐾',
      project: 'infopet',
      seeProjects: ['infopet'],
      canClickProjects: false,
      canSeeOS: false,
      welcome: 'Welcome Javier · InfoPet · ve los efectos del DS · proyectos otros bloqueados'
    },
    'joey': {
      user: 'Joey',
      emoji: '👤',
      project: 'design',
      seeProjects: [],
      canClickProjects: false,
      canSeeOS: false,
      welcome: 'Welcome Joey · solo Design System · proyectos y SO bloqueados'
    },
    'smc.ui': {
      user: 'Sebastián',
      emoji: '🎨',
      project: 'design',
      seeProjects: 'all',
      canClickProjects: true,
      canSeeOS: false,
      welcome: 'Welcome Sebastián · Design System full + proyectos · SO restringido'
    },
    'smc.os': {
      user: 'Guillermo',
      emoji: '🧠',
      project: 'all',
      seeProjects: 'all',
      canClickProjects: true,
      canSeeOS: true,
      welcome: 'Welcome owner · acceso total · Design System + Banco SO'
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
  window._getSMCRole = getRole;

  function applyFilter(role) {
    document.body.dataset.role = role.key;
    document.body.dataset.user = role.user;
    document.body.dataset.canSeeOs = role.canSeeOS ? 'yes' : 'no';

    // SO tile lock if user can't see SO
    if (!role.canSeeOS) {
      document.querySelectorAll('[data-needs-os]').forEach(el => {
        el.style.pointerEvents = 'none';
        el.style.opacity = '0.4';
        el.style.cursor = 'not-allowed';
        el.style.filter = 'grayscale(70%)';
        if (!el.querySelector('.locked-badge-os')) {
          const lock = document.createElement('div');
          lock.className = 'locked-badge-os';
          lock.innerHTML = '🔒 solo Guillermo';
          lock.style.cssText = 'position:absolute;top:14px;right:14px;z-index:5;background:rgba(0,0,0,0.7);color:white;padding:6px 12px;border-radius:980px;font:600 11px '+FONT+';letter-spacing:-0.012em;backdrop-filter:blur(8px)';
          if (getComputedStyle(el).position === 'static') el.style.position = 'relative';
          el.appendChild(lock);
        }
      });
    }

    if (role.seeProjects === 'all') return;

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
    if (!Array.isArray(allowed)) return;

    document.querySelectorAll('.tile, .proj-card, .pg-card, .pg-tile, .pg-feature, a').forEach(el => {
      if (el.dataset.needsOs) return; // ya manejado arriba
      const txt = el.innerText.toLowerCase();
      if (!txt) return;
      let foundProject = null;
      for (const [proj, kws] of Object.entries(projectKeywords)) {
        if (kws.some(kw => txt.includes(kw))) {
          foundProject = proj;
          break;
        }
      }
      if (!foundProject) return;
      if (!allowed.includes(foundProject)) {
        if (el.tagName === 'A') {
          el.style.pointerEvents = 'none';
          el.style.opacity = '0.32';
          el.style.cursor = 'not-allowed';
          el.style.filter = 'grayscale(80%)';
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
    document.body.style.paddingTop = '40px';
    const nav = document.querySelector('.nav');
    if (nav) nav.style.top = '40px';
  }

  function showGate() {
    const gate = document.createElement('div');
    gate.id = '_authGate';
    gate.style.cssText = `position:fixed;inset:0;z-index:99999;display:flex;align-items:center;justify-content:center;font-family:${FONT};overflow:hidden;background:#000`;
    gate.innerHTML = `
      <!-- Aurora ambient background -->
      <div aria-hidden="true" style="position:absolute;inset:-20%;background:
        radial-gradient(circle at 22% 32%, rgba(255,107,53,0.45) 0%, transparent 38%),
        radial-gradient(circle at 78% 28%, rgba(0,229,176,0.35) 0%, transparent 42%),
        radial-gradient(circle at 50% 80%, rgba(99,102,241,0.40) 0%, transparent 48%),
        radial-gradient(circle at 88% 78%, rgba(255,210,63,0.25) 0%, transparent 38%);
        filter:blur(60px);animation:_gateAurora 14s ease-in-out infinite alternate;pointer-events:none"></div>
      <!-- Grid pattern subtle -->
      <div aria-hidden="true" style="position:absolute;inset:0;background-image:
        linear-gradient(rgba(255,255,255,0.018) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255,255,255,0.018) 1px, transparent 1px);
        background-size:48px 48px;pointer-events:none;mask-image:radial-gradient(ellipse at center, black 30%, transparent 70%)"></div>
      <!-- Noise grain -->
      <div aria-hidden="true" style="position:absolute;inset:0;background-image:url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22200%22 height=%22200%22%3E%3Cfilter id=%22n%22%3E%3CfeTurbulence baseFrequency=%220.9%22/%3E%3C/filter%3E%3Crect width=%22200%22 height=%22200%22 filter=%22url(%23n)%22 opacity=%220.4%22/%3E%3C/svg%3E');mix-blend-mode:overlay;opacity:0.5;pointer-events:none"></div>

      <!-- Glass card -->
      <div style="position:relative;z-index:2;width:min(440px, 90vw);padding:56px 48px 44px;border-radius:24px;
                  background:rgba(20,20,22,0.55);
                  backdrop-filter:saturate(180%) blur(40px);
                  -webkit-backdrop-filter:saturate(180%) blur(40px);
                  border:1px solid rgba(255,255,255,0.08);
                  box-shadow:0 32px 64px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.04) inset;
                  color:#F5F5F7;text-align:center;
                  animation:_gateFadeUp 720ms cubic-bezier(0.4,0,0.2,1) both">

        <!-- Logo mark -->
        <div style="display:inline-flex;align-items:center;justify-content:center;gap:8px;margin-bottom:28px;font:600 12px 'JetBrains Mono', 'SF Mono', monospace;letter-spacing:0.18em;color:rgba(255,255,255,0.6)">
          <span style="display:inline-block;width:6px;height:6px;border-radius:50%;background:#00E5B0;box-shadow:0 0 12px #00E5B0;animation:_gatePulse 2s ease-in-out infinite"></span>
          SMC · DESIGN SYSTEM
        </div>

        <!-- Title -->
        <h1 style="font-family:'Instrument Serif',Georgia,serif;font-size:52px;font-weight:400;letter-spacing:-0.028em;line-height:1.02;margin:0 0 12px;color:#F5F5F7">
          Acceso<br><em style="font-style:italic;background:linear-gradient(135deg,#FF6B35 0%,#FFD23F 50%,#00E5B0 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text">controlado</em>
        </h1>

        <!-- Subtitle -->
        <p style="font:15px ${FONT};color:rgba(255,255,255,0.55);letter-spacing:-0.012em;line-height:1.5;margin:0 0 36px;max-width:320px;margin-left:auto;margin-right:auto">
          Ingresa tu clave para entrar al banco.<br>
          <span style="font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:0.08em;opacity:0.7;display:inline-block;margin-top:8px">v15.1 · 21 PLAYGROUNDS · 12 MINI-SITES · LAB ALQUIMISTA</span>
        </p>

        <!-- Input -->
        <input type="password" id="_authInput" placeholder="clave" autofocus
          style="width:100%;padding:16px 22px;border:1px solid rgba(255,255,255,0.12);border-radius:14px;
                 font:17px ${FONT};letter-spacing:-0.022em;
                 background:rgba(255,255,255,0.04);outline:none;color:#F5F5F7;text-align:center;
                 margin-bottom:14px;transition:200ms cubic-bezier(0.4,0,0.2,1)"
          autocomplete="off" autocapitalize="off" spellcheck="false">

        <!-- Error message -->
        <div id="_authErr" style="font:13px ${FONT};color:#FF6B6B;letter-spacing:-0.012em;margin-bottom:14px;min-height:18px;opacity:0;transition:opacity 200ms"></div>

        <!-- Submit -->
        <button id="_authBtn"
          style="width:100%;padding:16px;background:#F5F5F7;color:#0A0A0B;border:none;border-radius:14px;
                 font:600 15px ${FONT};letter-spacing:-0.012em;cursor:pointer;
                 transition:240ms cubic-bezier(0.4,0,0.2,1);
                 display:inline-flex;align-items:center;justify-content:center;gap:8px">
          Entrar <span style="transition:transform 240ms" id="_authArrow">→</span>
        </button>

        <!-- Footer hint -->
        <div style="margin-top:28px;padding-top:20px;border-top:1px solid rgba(255,255,255,0.06);
                    display:flex;align-items:center;justify-content:space-between;
                    font:11px 'JetBrains Mono','SF Mono',monospace;color:rgba(255,255,255,0.4);letter-spacing:0.08em">
          <span>SMC OS · 2026</span>
          <span style="display:flex;align-items:center;gap:6px">
            <span style="width:6px;height:6px;border-radius:50%;background:#00E5B0;animation:_gatePulse 2s ease-in-out infinite"></span>
            LIVE
          </span>
        </div>
      </div>

      <style>
        @keyframes _gateAurora { 0% { transform:scale(1) rotate(0deg); } 100% { transform:scale(1.4) rotate(120deg); } }
        @keyframes _gateFadeUp { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
        @keyframes _gatePulse { 0%,100% { opacity:1; } 50% { opacity:0.3; } }
        #_authInput:focus {
          border-color:rgba(0,229,176,0.6) !important;
          background:rgba(255,255,255,0.06) !important;
          box-shadow:0 0 0 4px rgba(0,229,176,0.12);
        }
        #_authInput::placeholder { color:rgba(255,255,255,0.3); font-family:'JetBrains Mono', monospace; font-size:14px; letter-spacing:0.08em; text-transform:uppercase; }
        #_authBtn:hover { transform:scale(1.02); box-shadow:0 16px 40px rgba(255,255,255,0.18); }
        #_authBtn:hover #_authArrow { transform:translateX(4px); }
        #_authBtn:active { transform:scale(0.98); }
        #_authGate.err #_authErr { opacity:1; }
        #_authGate.err #_authInput { border-color:rgba(255,107,107,0.5) !important; background:rgba(255,107,107,0.06) !important; animation:_gateShake 360ms cubic-bezier(0.4,0,0.2,1); }
        @keyframes _gateShake { 0%,100% { transform:translateX(0); } 25% { transform:translateX(-6px); } 75% { transform:translateX(6px); } }
      </style>
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
        err.textContent = '✗ Clave inválida · intentá de nuevo';
        gate.classList.add('err');
        input.value = '';
        setTimeout(() => {
          gate.classList.remove('err');
          err.textContent = '';
        }, 2400);
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

    // Block SO standalone page if user doesn't have OS access
    const isOSPage = document.body.dataset.requiresOs === 'true';
    if (isOSPage && !role.canSeeOS) {
      const block = document.createElement('div');
      block.style.cssText = `position:fixed;inset:0;background:rgba(10,10,11,0.96);z-index:99998;display:flex;align-items:center;justify-content:center;font-family:${FONT};color:white;text-align:center;padding:32px`;
      block.innerHTML = `
        <div>
          <div style="font-size:72px;margin-bottom:18px">🔒</div>
          <h1 style="font-family:'Instrument Serif',Georgia,serif;font-size:48px;font-weight:400;margin:0 0 12px">Acceso restringido</h1>
          <p style="font-size:17px;color:#86868B;max-width:480px;margin:0 auto 24px;line-height:1.5">El Banco de Sistema Operativo está reservado para owner únicamente.<br>Tu rol actual: <strong>${role.user}</strong></p>
          <a href="javascript:history.back()" style="display:inline-block;padding:12px 24px;background:white;color:#0A0A0B;border-radius:980px;font-weight:600;text-decoration:none">← Volver</a>
        </div>
      `;
      document.body.appendChild(block);
    }
  }

  init();
})();
