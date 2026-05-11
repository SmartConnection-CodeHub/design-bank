// SMC Design System · Theme Switcher · 8 themes por proyecto
(function(){
  const THEMES = [
    {
      id: 'apple-premium',
      name: 'Apple Premium',
      emoji: '🍏',
      desc: 'Cream warm · Apple blue · canon DS v15',
      vars: { '--bg':'#FFFFFF', '--bg-soft':'#F5F5F7', '--bg-warm':'#FAF7F4', '--text':'#1D1D1F', '--text-muted':'#6E6E73', '--accent':'#0066CC', '--border-soft':'#E5E5E7', '--smc-accent':'#00E5B0', '--smc-gold':'#C49A3A', '--smc-navy':'#1B2F4E' }
    },
    {
      id: 'kanki-surf',
      name: 'Kanki Surf',
      emoji: '🏄',
      desc: 'Streetwear · gold + navy + cream surf',
      vars: { '--bg':'#FAF7F2', '--bg-soft':'#F4ECD8', '--bg-warm':'#FFF8E8', '--text':'#1B2F4E', '--text-muted':'#5C4716', '--accent':'#C49A3A', '--border-soft':'#E8DCB8', '--smc-accent':'#C49A3A', '--smc-gold':'#8A6B23', '--smc-navy':'#0A1322' }
    },
    {
      id: 'infopet',
      name: 'InfoPet · Tsukai',
      emoji: '🐾',
      desc: 'Bsale + Jumpseller · navy + accent IA',
      vars: { '--bg':'#FFFFFF', '--bg-soft':'#EEF7F4', '--bg-warm':'#F0FAF7', '--text':'#0A1322', '--text-muted':'#3F557A', '--accent':'#00B4D8', '--border-soft':'#D6EDE5', '--smc-accent':'#00E5B0', '--smc-gold':'#0066CC', '--smc-navy':'#1B2F4E' }
    },
    {
      id: 'smc-marketing',
      name: 'SMC Marketing',
      emoji: '💡',
      desc: 'Light · smconnection.cl · navy + accent green',
      vars: { '--bg':'#FFFFFF', '--bg-soft':'#F5F5F7', '--bg-warm':'#EEF7F4', '--text':'#1B2F4E', '--text-muted':'#6B7E9C', '--accent':'#00E5B0', '--border-soft':'#D6DEEA', '--smc-accent':'#00E5B0', '--smc-gold':'#C49A3A', '--smc-navy':'#1B2F4E' }
    },
    {
      id: 'marketplace',
      name: 'Marketplace MeLi',
      emoji: '🛒',
      desc: 'Multi-canal B2C/B2G/B2B · navy + gold',
      vars: { '--bg':'#FFFFFF', '--bg-soft':'#FBF6E8', '--bg-warm':'#FFF8E8', '--text':'#1B2F4E', '--text-muted':'#6B7E9C', '--accent':'#FFE600', '--border-soft':'#E8DCB8', '--smc-accent':'#0066CC', '--smc-gold':'#FFE600', '--smc-navy':'#1B2F4E' }
    },
    {
      id: 'discovery',
      name: 'Discovery Cliente',
      emoji: '🔍',
      desc: 'Lab · transcript → SPIN · cream + accent',
      vars: { '--bg':'#FAFAFA', '--bg-soft':'#F0F4F8', '--bg-warm':'#F5F0E8', '--text':'#1B2F4E', '--text-muted':'#6B7E9C', '--accent':'#9333EA', '--border-soft':'#D6DEEA', '--smc-accent':'#00E5B0', '--smc-gold':'#C49A3A', '--smc-navy':'#1B2F4E' }
    },
    {
      id: 'intranet-dark',
      name: 'Intranet Dark',
      emoji: '🖥️',
      desc: 'Dark premium · 24 agentes · accent green',
      vars: { '--bg':'#0A1322', '--bg-soft':'#131F35', '--bg-warm':'#1B2F4E', '--text':'#F5F5F7', '--text-muted':'#9AA9C2', '--accent':'#00E5B0', '--border-soft':'rgba(255,255,255,0.08)', '--smc-accent':'#00E5B0', '--smc-gold':'#C49A3A', '--smc-navy':'#0A1322' }
    },
    {
      id: 'cerebro-ai',
      name: 'Cerebro · IA mode',
      emoji: '🧠',
      desc: 'Purple gradient · mentor IA · Opus 4.7',
      vars: { '--bg':'#FAFAFA', '--bg-soft':'#F5F0FA', '--bg-warm':'#FAF5FF', '--text':'#2D1B4E', '--text-muted':'#7B6B9C', '--accent':'#9333EA', '--border-soft':'#E0D6F0', '--smc-accent':'#A78BFA', '--smc-gold':'#C49A3A', '--smc-navy':'#2D1B4E' }
    }
  ];

  const FONT = '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif';
  const LS_KEY = 'smc-theme-v15';
  let current = localStorage.getItem(LS_KEY) || 'apple-premium';

  function applyTheme(id) {
    const t = THEMES.find(x => x.id === id);
    if (!t) return;
    Object.entries(t.vars).forEach(([k,v]) => document.documentElement.style.setProperty(k, v));
    document.body.dataset.theme = id;
    current = id;
    localStorage.setItem(LS_KEY, id);
    // Update badge
    const badge = document.getElementById('_themeBadge');
    if (badge) badge.textContent = t.emoji + ' ' + t.name;
  }

  // Floating button
  const btn = document.createElement('button');
  btn.id = '_themeBtn';
  btn.style.cssText = `position:fixed;bottom:24px;right:24px;z-index:998;background:#FFFFFF;color:#1D1D1F;border:1px solid #E5E5E7;padding:10px 18px;border-radius:980px;font:600 11px ${FONT};letter-spacing:0.02em;cursor:pointer;box-shadow:0 8px 24px rgba(0,0,0,0.12);transition:transform 220ms cubic-bezier(.22,1,.36,1);display:flex;align-items:center;gap:6px`;
  btn.innerHTML = '🎨 <span id="_themeBadge">Apple Premium</span>';
  btn.onmouseenter = () => btn.style.transform = 'translateY(-2px) scale(1.04)';
  btn.onmouseleave = () => btn.style.transform = 'translateY(0) scale(1)';
  document.body.appendChild(btn);

  // Popover
  const pop = document.createElement('div');
  pop.id = '_themePop';
  pop.style.cssText = `position:fixed;bottom:80px;right:24px;width:340px;background:#FFFFFF;border:1px solid #E5E5E7;border-radius:18px;box-shadow:0 24px 64px rgba(0,0,0,0.2);z-index:999;opacity:0;pointer-events:none;transform:translateY(8px) scale(0.96);transform-origin:bottom right;transition:all 240ms cubic-bezier(.22,1,.36,1);overflow:hidden;font-family:${FONT}`;
  pop.innerHTML = `
    <div style="padding:18px 20px;border-bottom:1px solid #E5E5E7">
      <div style="font:600 11px 'SF Mono',monospace;letter-spacing:0.08em;text-transform:uppercase;color:#6E6E73;margin-bottom:2px">Theme Switcher</div>
      <div style="font:14px ${FONT};color:#1D1D1F;letter-spacing:-0.012em">8 themes · cambia el brand del playground</div>
    </div>
    <div id="_themeList" style="padding:8px;max-height:420px;overflow-y:auto"></div>
    <div style="padding:12px 20px;border-top:1px solid #E5E5E7;background:#FAFAFA;font:10px 'SF Mono',monospace;color:#6E6E73;letter-spacing:0.04em">⌘T toggle · localStorage persist</div>
  `;
  document.body.appendChild(pop);

  function renderList() {
    document.getElementById('_themeList').innerHTML = THEMES.map(t => {
      const active = t.id === current;
      const swatch = `<div style="display:flex;gap:3px"><div style="width:14px;height:14px;border-radius:4px;background:${t.vars['--smc-navy']}"></div><div style="width:14px;height:14px;border-radius:4px;background:${t.vars['--accent']}"></div><div style="width:14px;height:14px;border-radius:4px;background:${t.vars['--smc-accent']}"></div></div>`;
      return `<div onclick="_setTheme('${t.id}')" style="padding:12px 14px;border-radius:10px;cursor:pointer;display:flex;align-items:center;gap:12px;transition:140ms;${active?'background:rgba(0,102,204,0.08);':''}" onmouseover="this.style.background='${active?'rgba(0,102,204,0.12)':'#F5F5F7'}'" onmouseout="this.style.background='${active?'rgba(0,102,204,0.08)':'transparent'}'">
        <span style="font-size:24px;width:32px;text-align:center">${t.emoji}</span>
        <div style="flex:1;min-width:0">
          <div style="font:600 14px ${FONT};color:${active?'#0066CC':'#1D1D1F'};letter-spacing:-0.012em">${t.name}${active?' · activo':''}</div>
          <div style="font:11.5px ${FONT};color:#6E6E73;letter-spacing:-0.012em;margin-top:1px">${t.desc}</div>
        </div>
        ${swatch}
      </div>`;
    }).join('');
  }

  function togglePop() {
    const open = pop.style.pointerEvents !== 'auto';
    if (open) {
      pop.style.opacity = '1'; pop.style.pointerEvents = 'auto';
      pop.style.transform = 'translateY(0) scale(1)';
      renderList();
    } else {
      pop.style.opacity = '0'; pop.style.pointerEvents = 'none';
      pop.style.transform = 'translateY(8px) scale(0.96)';
    }
  }

  window._setTheme = function(id) {
    applyTheme(id);
    renderList();
    setTimeout(togglePop, 200);
  };

  btn.onclick = togglePop;
  document.addEventListener('click', e => {
    if (pop.style.pointerEvents !== 'auto') return;
    if (e.target.closest('#_themePop') || e.target.closest('#_themeBtn')) return;
    togglePop();
  });
  window.addEventListener('keydown', e => {
    if ((e.metaKey || e.ctrlKey) && e.key === 't') { e.preventDefault(); togglePop(); }
    if (e.key === 'Escape' && pop.style.pointerEvents === 'auto') togglePop();
  });

  // Apply saved theme on load
  applyTheme(current);
})();
