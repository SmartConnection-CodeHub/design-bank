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
    gate.style.cssText = `position:fixed;inset:0;z-index:99999;display:flex;align-items:center;justify-content:center;font-family:${FONT};overflow:hidden;background:#0A0A0B`;
    gate.innerHTML = `
      <!-- Apple-style soft monochrome ambient · UN solo gradient muy sutil -->
      <div aria-hidden="true" style="position:absolute;inset:0;background:
        radial-gradient(ellipse 80% 60% at 50% 0%, rgba(255,255,255,0.06) 0%, transparent 60%),
        radial-gradient(ellipse 60% 50% at 50% 100%, rgba(0,229,176,0.04) 0%, transparent 60%);
        pointer-events:none"></div>

      <!-- Apple SF Pro card · minimal · sin glass loco -->
      <div style="position:relative;z-index:2;width:min(420px, 88vw);padding:48px 44px 36px;
                  background:rgba(28,28,30,0.72);
                  backdrop-filter:saturate(140%) blur(28px);
                  -webkit-backdrop-filter:saturate(140%) blur(28px);
                  border:0.5px solid rgba(255,255,255,0.1);
                  border-radius:20px;
                  box-shadow:0 0 0 0.5px rgba(255,255,255,0.06) inset,
                             0 24px 56px -8px rgba(0,0,0,0.6),
                             0 8px 16px -4px rgba(0,0,0,0.3);
                  color:#F5F5F7;
                  animation:_gateFadeUp 600ms cubic-bezier(0.16,1,0.3,1) both">

        <!-- SMC mark · Apple style monocromático -->
        <div style="display:flex;align-items:center;justify-content:center;margin-bottom:32px">
          <div style="width:44px;height:44px;border-radius:12px;background:linear-gradient(180deg,#2C2C2E 0%,#1C1C1E 100%);border:0.5px solid rgba(255,255,255,0.12);display:flex;align-items:center;justify-content:center;box-shadow:0 4px 12px rgba(0,0,0,0.3)">
            <span style="font:600 17px ${FONT};letter-spacing:-0.022em;color:#F5F5F7">S</span>
          </div>
        </div>

        <!-- Title · SF Pro Display tight · sin gradient -->
        <h1 style="font:600 26px ${FONT};letter-spacing:-0.022em;line-height:1.15;margin:0 0 6px;color:#F5F5F7;text-align:center">
          Iniciar sesión
        </h1>

        <!-- Subtitle simple -->
        <p style="font:13px ${FONT};color:rgba(235,235,245,0.6);letter-spacing:-0.012em;line-height:1.4;margin:0 0 28px;text-align:center">
          SMC Design System · v15
        </p>

        <!-- Input · Apple form style -->
        <label style="display:block;font:500 12px ${FONT};color:rgba(235,235,245,0.6);letter-spacing:-0.012em;margin-bottom:8px">Clave</label>
        <input type="password" id="_authInput" placeholder="••••••" autofocus
          style="width:100%;padding:11px 14px;border:0.5px solid rgba(255,255,255,0.18);border-radius:10px;
                 font:14px ${FONT};letter-spacing:-0.012em;
                 background:rgba(0,0,0,0.3);outline:none;color:#F5F5F7;
                 margin-bottom:8px;transition:200ms cubic-bezier(0.4,0,0.2,1);box-sizing:border-box"
          autocomplete="off" autocapitalize="off" spellcheck="false">

        <!-- Error message -->
        <div id="_authErr" style="font:12px ${FONT};color:#FF453A;letter-spacing:-0.012em;min-height:16px;opacity:0;transition:opacity 200ms;margin-bottom:8px"></div>

        <!-- Submit · Apple blue style pero sutil -->
        <button id="_authBtn"
          style="width:100%;padding:11px;background:#0A84FF;color:#FFFFFF;border:none;border-radius:10px;
                 font:600 14px ${FONT};letter-spacing:-0.012em;cursor:pointer;
                 transition:200ms cubic-bezier(0.4,0,0.2,1);
                 margin-top:8px">
          Continuar
        </button>

        <!-- Help row · Apple style -->
        <div style="margin-top:24px;padding-top:18px;border-top:0.5px solid rgba(255,255,255,0.08);
                    display:flex;align-items:center;justify-content:center;gap:6px;
                    font:11px ${FONT};color:rgba(235,235,245,0.4);letter-spacing:-0.012em">
          <span>SMC OS</span>
          <span style="opacity:0.5">·</span>
          <span>v15.2</span>
        </div>
      </div>

      <style>
        @keyframes _gateFadeUp { from { opacity:0; transform:translateY(8px); } to { opacity:1; transform:translateY(0); } }
        #_authInput:focus {
          border-color:#0A84FF !important;
          box-shadow:0 0 0 3px rgba(10,132,255,0.25);
        }
        #_authInput::placeholder { color:rgba(235,235,245,0.25); letter-spacing:0.16em; }
        #_authBtn:hover { background:#0974E0; }
        #_authBtn:active { background:#0860C0; transform:scale(0.995); }
        #_authGate.err #_authErr { opacity:1; }
        #_authGate.err #_authInput { border-color:#FF453A !important; box-shadow:0 0 0 3px rgba(255,69,58,0.2); animation:_gateShake 320ms cubic-bezier(0.36,0.07,0.19,0.97); }
        @keyframes _gateShake { 0%,100% { transform:translateX(0); } 25% { transform:translateX(-4px); } 75% { transform:translateX(4px); } }
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
