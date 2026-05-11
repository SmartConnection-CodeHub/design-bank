// SMC Design System · drawer global · auto-inject en cada playground
(function(){
  const INDEX_DATA = [
    { t: 'Foundations · 6 LIVE', items: [
      { ic:'🎨', nm:'Color Tokens', href:'color-tokens.html' },
      { ic:'✍️', nm:'Typography', href:'typography.html' },
      { ic:'📏', nm:'Spacing', href:'spacing.html' },
      { ic:'⌒',  nm:'Radius', href:'radius.html' },
      { ic:'🌫️', nm:'Shadow', href:'shadow.html' },
      { ic:'⚡', nm:'Motion', href:'motion.html' },
    ]},
    { t: 'Components · 6 LIVE', items: [
      { ic:'🔘', nm:'Button Kit', href:'button-kit.html' },
      { ic:'🏷️', nm:'Badges', href:'badges.html' },
      { ic:'📝', nm:'Input Form', href:'input-form.html' },
      { ic:'🃏', nm:'Cards', href:'cards.html' },
      { ic:'🧭', nm:'Sidebar', href:'sidebar.html' },
      { ic:'🔔', nm:'Toast', href:'toast.html' },
    ]},
    { t: 'Brand · 3 LIVE', items: [
      { ic:'🎨', nm:'Shader Mesh', href:'shader-mesh.html' },
      { ic:'🔣', nm:'Iconography', href:'iconography.html' },
      { ic:'🏷️', nm:'Logo System', href:'logo-system.html' },
    ]},
    { t: 'Patterns · 4 LIVE', items: [
      { ic:'🎬', nm:'Hero Reveals', href:'hero-reveals.html' },
      { ic:'📜', nm:'Scroll Stories', href:'scroll-stories.html' },
      { ic:'✨', nm:'Hover Magic', href:'hover-magic.html' },
      { ic:'🟦', nm:'Bento Grids', href:'bento-grids.html' },
    ]},
    { t: 'RADAR + Chat · 2 LIVE', items: [
      { ic:'📡', nm:'RADAR Brief · 11 feeds', href:'radar-brief.html' },
      { ic:'💬', nm:'Chat Streaming', href:'chat-streaming.html' },
    ]},
  ];

  const cur = location.pathname.split('/').pop();
  const FONT = '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif';

  // Floating button
  const btn = document.createElement('button');
  btn.innerHTML = '📑 21 LIVE';
  btn.style.cssText = `position:fixed;bottom:24px;left:24px;z-index:998;background:#1D1D1F;color:white;border:none;padding:10px 18px;border-radius:980px;font:600 11px ${FONT};letter-spacing:0.04em;cursor:pointer;box-shadow:0 8px 24px rgba(0,0,0,0.25);transition:transform 220ms cubic-bezier(.22,1,.36,1)`;
  btn.onmouseenter = () => btn.style.transform = 'translateY(-2px) scale(1.04)';
  btn.onmouseleave = () => btn.style.transform = 'translateY(0) scale(1)';
  document.body.appendChild(btn);

  // Overlay
  const ov = document.createElement('div');
  ov.style.cssText = 'position:fixed;inset:0;background:rgba(10,19,34,0.6);backdrop-filter:blur(8px);z-index:999;opacity:0;pointer-events:none;transition:opacity 280ms';
  document.body.appendChild(ov);

  // Drawer
  const dr = document.createElement('aside');
  dr.style.cssText = `position:fixed;left:0;top:0;bottom:0;width:480px;max-width:90vw;background:#FFFFFF;box-shadow:12px 0 48px rgba(0,0,0,0.2);overflow-y:auto;transform:translateX(-100%);transition:transform 320ms cubic-bezier(.22,1,.36,1);z-index:1000;font-family:${FONT}`;
  dr.innerHTML = `
    <div style="position:sticky;top:0;background:#fff;padding:20px 24px;border-bottom:1px solid #E5E5E7;z-index:2">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px">
        <h2 style="font-family:'Instrument Serif',Georgia,serif;font-size:22px;font-weight:600;margin:0;letter-spacing:-0.012em;color:#1D1D1F">21 Playgrounds LIVE</h2>
        <button id="_navClose" style="background:transparent;border:none;font-size:22px;cursor:pointer;color:#6E6E73;padding:0 6px">×</button>
      </div>
      <a href="../index.html" style="display:inline-flex;align-items:center;gap:6px;padding:6px 12px;background:rgba(0,102,204,0.08);color:#0066CC;border-radius:980px;font:500 12px ${FONT};text-decoration:none;letter-spacing:-0.012em">← Volver al banco completo</a>
      <input type="text" id="_navSearch" placeholder="Buscar playground..." style="width:100%;padding:8px 14px;margin-top:10px;border:1px solid #E5E5E7;border-radius:980px;font:13px ${FONT};background:#F5F5F7;outline:none;color:#1D1D1F">
    </div>
    <div id="_navContent" style="padding:18px 24px 60px"></div>
  `;
  document.body.appendChild(dr);

  function renderList(filter='') {
    const f = filter.toLowerCase().trim();
    let html = '';
    INDEX_DATA.forEach(sec => {
      const items = sec.items.filter(i => !f || i.nm.toLowerCase().includes(f));
      if (!items.length) return;
      html += `<div style="margin-bottom:22px"><h3 style="font:600 11px 'SF Mono',monospace;letter-spacing:0.08em;text-transform:uppercase;color:#6E6E73;margin:0 0 10px">${sec.t}</h3>`;
      items.forEach(i => {
        const isCurrent = i.href === cur;
        html += `<a href="${i.href}" style="display:flex;align-items:center;gap:10px;padding:9px 12px;border-radius:8px;text-decoration:none;color:${isCurrent?'#0066CC':'#1D1D1F'};font:14px ${FONT};letter-spacing:-0.012em;transition:140ms;${isCurrent?'background:rgba(0,102,204,0.08);font-weight:600':''}" onmouseover="this.style.background='${isCurrent?'rgba(0,102,204,0.12)':'#F5F5F7'}'" onmouseout="this.style.background='${isCurrent?'rgba(0,102,204,0.08)':'transparent'}'"><span style="font-size:16px;width:22px;text-align:center">${i.ic}</span><span style="flex:1">${i.nm}${isCurrent?' · acá estás':''}</span><span style="font:9px 'SF Mono',monospace;padding:2px 7px;border-radius:980px;background:rgba(255,59,48,0.15);color:#FF3B30;letter-spacing:0.04em">● LIVE</span></a>`;
      });
      html += '</div>';
    });
    document.getElementById('_navContent').innerHTML = html;
  }

  function open() {
    ov.style.opacity = '1'; ov.style.pointerEvents = 'auto';
    dr.style.transform = 'translateX(0)';
    renderList();
    setTimeout(() => document.getElementById('_navSearch').focus(), 320);
  }
  function close() {
    ov.style.opacity = '0'; ov.style.pointerEvents = 'none';
    dr.style.transform = 'translateX(-100%)';
  }

  btn.onclick = open;
  ov.onclick = close;
  document.getElementById('_navClose').onclick = close;
  document.getElementById('_navSearch').addEventListener('input', e => renderList(e.target.value));
  window.addEventListener('keydown', e => {
    if (e.key === 'Escape') close();
    if ((e.metaKey || e.ctrlKey) && e.key === 'i') { e.preventDefault(); open(); }
  });
})();
