// Generadores de las piezas por clase. Uso: en run_script,
// const T = new Function(await readFile('_plantillas.js') + ';return {web,tablero,ficha,casaBloque,casaDoc,indice};')();
const F = "'Fredoka',sans-serif", N = "'Nunito',sans-serif";
const HEAD = (title, thumbColor, thumbEmoji, extraStyle) => `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<script src="./support.js"></script>
</head>
<body>
<x-dc>
<helmet>
<meta name="description" content="${title}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Fredoka:wght@500;600;700&family=Nunito:wght@700;800;900&display=swap" rel="stylesheet">
<style>
body { margin:0; background:#FFF9EF; }
a { color:#1982C4; } a:hover { color:#FF595E; }${extraStyle || ""}
</style>
<template id="__bundler_thumbnail" data-bg-color="#FFF9EF"><svg viewBox="0 0 120 80" xmlns="http://www.w3.org/2000/svg"><rect x="14" y="12" width="92" height="56" rx="8" fill="${thumbColor}"></rect><text x="60" y="52" text-anchor="middle" font-size="30">${thumbEmoji}</text></svg></template>
</helmet>`;

function web(c) {
  const w = c.web;
  const btn = (h, t, bg, col) => `<button onClick="{{ ${h} }}" style="min-width:210px; background:${bg}; color:${col || "#fff"}; border:none; border-radius:20px; padding:16px 28px; font-family:${F}; font-size:25px; font-weight:600; cursor:pointer;" style-hover="transform:scale(1.06);">{{ ${t} }}</button>`;
  return HEAD("Web interactiva: " + c.tema + " - Grado 2", c.color, c.icono,
    "\n@keyframes pop { 0% { transform:scale(.6); opacity:0; } 100% { transform:scale(1); opacity:1; } }") + `
<div style="min-height:100vh; display:flex; flex-direction:column; font-family:${N}; color:#2A2A40;">

  <header style="display:flex; align-items:center; gap:16px; padding:14px 28px; background:#fff; box-shadow:0 4px 0 rgba(42,42,64,.08);">
    <span style="width:44px; height:44px; border-radius:14px; background:${c.color}; display:flex; align-items:center; justify-content:center; font-size:22px; flex:none;">${c.icono}</span>
    <div style="display:flex; flex-direction:column;">
      <span style="font-family:${F}; font-size:22px; font-weight:600;">${c.tema}</span>
      <span style="font-size:13px; font-weight:900; color:#6A4C93; letter-spacing:1px;">${c.area.toUpperCase()} · GRADO 2°</span>
    </div>
    <div style="flex:1;"></div>
    <button onClick="{{ startH }}" style="display:flex; align-items:center; gap:12px; background:#2A2A40; color:#fff; border:none; border-radius:40px; padding:8px 20px; cursor:pointer; font-family:${N};" style-hover="background:#6A4C93;">
      <span style="font-size:13px; font-weight:900; letter-spacing:1px;">TEMPORIZADOR &#9654;</span>
      <span style="font-family:${F}; font-size:24px; font-weight:600; color:#FFCA3A;">{{ tH }}</span>
    </button>
    <span style="background:#FFCA3A; border-radius:40px; padding:10px 20px; font-family:${F}; font-size:20px; font-weight:600;">{{ num }}</span>
  </header>

  <main style="flex:1; display:flex; flex-direction:column; align-items:center; justify-content:center; padding:32px 24px; overflow:hidden;">

    <sc-if value="{{ s1 }}" hint-placeholder-val="{{ true }}">
      <div style="display:flex; flex-direction:column; align-items:center; gap:26px; text-align:center; max-width:940px; animation:pop .4s ease;">
        <span style="background:#8AC926; color:#fff; border-radius:30px; padding:10px 26px; font-size:16px; font-weight:900; letter-spacing:2px;">${w.badge}</span>
        <h1 style="margin:0; font-family:${F}; font-size:50px; font-weight:700; line-height:1.1;">${w.titulo}</h1>
        <div style="background:#fff; border-radius:28px; padding:30px 40px; box-shadow:0 8px 0 rgba(42,42,64,.1);">
          <p style="margin:0; font-size:50px; line-height:1.25;">${w.visual}</p>
          <p style="margin:18px 0 0; font-family:${F}; font-size:27px; font-weight:600; color:#6A4C93;">${w.pregunta}</p>
        </div>
        <p style="margin:0; font-size:22px; font-weight:800; color:#6A4C93;">${w.instruccion}</p>
      </div>
    </sc-if>

    <sc-if value="{{ s2 }}" hint-placeholder-val="{{ false }}">
      <div style="display:flex; flex-direction:column; align-items:center; gap:24px; text-align:center; max-width:1000px; animation:pop .4s ease;">
        <span style="background:#1982C4; color:#fff; border-radius:30px; padding:10px 26px; font-size:16px; font-weight:900; letter-spacing:2px;">${w.exBadge}</span>
        <div style="display:flex; gap:12px; flex-wrap:wrap; justify-content:center;">
          <sc-for list="{{ exs }}" as="o" hint-placeholder-count="4">
            <button onClick="{{ o.pick }}" style="border:none; border-radius:18px; background:{{ o.bg }}; color:#fff; cursor:pointer; padding:14px 24px; font-family:${F}; font-size:21px; font-weight:600;" style-hover="transform:scale(1.06);">{{ o.name }}</button>
          </sc-for>
        </div>
        <div style="background:#fff; border-radius:28px; padding:30px 44px; box-shadow:0 8px 0 rgba(42,42,64,.1); min-width:560px;">
          <p style="margin:0; font-family:${F}; font-size:40px; font-weight:600; line-height:1.3;">{{ exBig }}</p>
          <p style="margin:16px 0 0; font-size:23px; font-weight:800; color:#6A4C93;">{{ exTxt }}</p>
        </div>
      </div>
    </sc-if>

    <sc-if value="{{ s3 }}" hint-placeholder-val="{{ false }}">
      <div style="display:flex; flex-direction:column; align-items:center; gap:22px; text-align:center; animation:pop .4s ease;">
        <span style="background:#FFCA3A; color:#2A2A40; border-radius:30px; padding:10px 26px; font-size:16px; font-weight:900; letter-spacing:2px;">${w.qaBadge} · {{ aNum }}</span>
        <sc-if value="{{ aPlaying }}" hint-placeholder-val="{{ true }}">
          <div style="background:#fff; border-radius:28px; padding:26px 50px; box-shadow:0 8px 0 rgba(42,42,64,.1); max-width:900px;">
            <p style="margin:0; font-family:${F}; font-size:32px; font-weight:600; line-height:1.3;">{{ aQ }}</p>
          </div>
          <div style="display:flex; gap:14px; flex-wrap:wrap; justify-content:center;">
            ${btn("ap1", "ao1", "#6A4C93")}
            ${btn("ap2", "ao2", "#1982C4")}
            ${btn("ap3", "ao3", "#8AC926")}
          </div>
          <sc-if value="{{ aok }}" hint-placeholder-val="{{ false }}">
            <div style="display:flex; align-items:center; gap:16px; animation:pop .3s ease;">
              <span style="background:#8AC926; color:#fff; border-radius:30px; padding:12px 30px; font-family:${F}; font-size:24px; font-weight:600;">¡Correcto! ★</span>
              <button onClick="{{ aNext }}" style="background:#2A2A40; color:#fff; border:none; border-radius:30px; padding:12px 30px; font-size:18px; font-weight:900; cursor:pointer; font-family:${N};">Siguiente &#9654;</button>
            </div>
          </sc-if>
          <sc-if value="{{ abad }}" hint-placeholder-val="{{ false }}">
            <span style="background:#FF595E; color:#fff; border-radius:30px; padding:12px 30px; font-family:${F}; font-size:23px; font-weight:600; animation:pop .3s ease;">${w.hintA}</span>
          </sc-if>
        </sc-if>
        <sc-if value="{{ aDone }}" hint-placeholder-val="{{ false }}">
          <div style="display:flex; flex-direction:column; align-items:center; gap:20px; animation:pop .4s ease;">
            <span style="font-size:80px; font-family:${F}; color:#FFCA3A;">★ ★ ★ ★</span>
            <p style="margin:0; font-family:${F}; font-size:36px; font-weight:600; color:#8AC926;">¡Muy bien! Lo lograste.</p>
            <button onClick="{{ aReset }}" style="background:#fff; color:#6A4C93; border:3px solid #6A4C93; border-radius:40px; padding:14px 30px; font-size:18px; font-weight:900; cursor:pointer; font-family:${N};">Jugar otra vez</button>
          </div>
        </sc-if>
      </div>
    </sc-if>

    <sc-if value="{{ s4 }}" hint-placeholder-val="{{ false }}">
      <div style="display:flex; flex-direction:column; align-items:center; gap:24px; text-align:center; animation:pop .4s ease;">
        <span style="background:#8AC926; color:#fff; border-radius:30px; padding:10px 26px; font-size:16px; font-weight:900; letter-spacing:2px;">PAUSA ACTIVA</span>
        <sc-if value="{{ paIdle }}" hint-placeholder-val="{{ true }}">
          <h1 style="margin:0; font-family:${F}; font-size:50px; font-weight:700;">4 movimientos, 20 segundos cada uno</h1>
          <p style="margin:0; font-size:24px; font-weight:800; color:#6A4C93; max-width:700px;">Todos de pie, junto a su puesto.</p>
          <button onClick="{{ paStart }}" style="background:#FF595E; color:#fff; border:none; border-radius:50px; padding:22px 56px; font-family:${F}; font-size:34px; font-weight:600; cursor:pointer;" style-hover="transform:scale(1.05);">¡Comenzar! &#9654;</button>
        </sc-if>
        <sc-if value="{{ paRunning }}" hint-placeholder-val="{{ false }}">
          <span style="background:#fff; border-radius:30px; padding:10px 26px; font-size:18px; font-weight:900; color:#6A4C93;">Movimiento {{ paNum }} de 4</span>
          <div style="width:210px; height:210px; border-radius:50%; background:{{ paColor }}; display:flex; align-items:center; justify-content:center; box-shadow:0 10px 0 rgba(42,42,64,.12);">
            <span style="font-family:${F}; font-size:104px; font-weight:600; color:#fff;">{{ paTime }}</span>
          </div>
          <h1 style="margin:0; font-family:${F}; font-size:52px; font-weight:700;">{{ paName }}</h1>
          <p style="margin:0; font-size:26px; font-weight:800; color:#6A4C93; max-width:760px;">{{ paDesc }}</p>
        </sc-if>
        <sc-if value="{{ paDone }}" hint-placeholder-val="{{ false }}">
          <h1 style="margin:0; font-family:${F}; font-size:58px; font-weight:700; color:#8AC926;">¡Excelente trabajo!</h1>
          <p style="margin:0; font-size:26px; font-weight:800; color:#6A4C93;">Respira profundo tres veces y vuelve a tu puesto en silencio.</p>
          <button onClick="{{ paStart }}" style="background:#fff; color:#6A4C93; border:3px solid #6A4C93; border-radius:40px; padding:14px 30px; font-size:18px; font-weight:900; cursor:pointer; font-family:${N};">Repetir la pausa</button>
        </sc-if>
      </div>
    </sc-if>

    <sc-if value="{{ s5 }}" hint-placeholder-val="{{ false }}">
      <div style="display:flex; flex-direction:column; align-items:center; gap:22px; text-align:center; animation:pop .4s ease;">
        <span style="background:#6A4C93; color:#fff; border-radius:30px; padding:10px 26px; font-size:16px; font-weight:900; letter-spacing:2px;">${w.qbBadge} · {{ bNum }}</span>
        <sc-if value="{{ bPlaying }}" hint-placeholder-val="{{ true }}">
          <h1 style="margin:0; font-family:${F}; font-size:34px; font-weight:700; max-width:900px; line-height:1.25;">{{ bQ }}</h1>
          <div style="display:flex; gap:14px; flex-wrap:wrap; justify-content:center; max-width:1000px;">
            ${btn("bp1", "bo1", "#FF595E")}
            ${btn("bp2", "bo2", "#1982C4")}
            ${btn("bp3", "bo3", "#8AC926")}
          </div>
          <sc-if value="{{ bok }}" hint-placeholder-val="{{ false }}">
            <div style="display:flex; align-items:center; gap:16px; animation:pop .3s ease;">
              <span style="background:#8AC926; color:#fff; border-radius:30px; padding:12px 30px; font-family:${F}; font-size:24px; font-weight:600;">¡Correcto! ★</span>
              <button onClick="{{ bNext }}" style="background:#2A2A40; color:#fff; border:none; border-radius:30px; padding:12px 30px; font-size:18px; font-weight:900; cursor:pointer; font-family:${N};">Siguiente &#9654;</button>
            </div>
          </sc-if>
          <sc-if value="{{ bbad }}" hint-placeholder-val="{{ false }}">
            <span style="background:#FF595E; color:#fff; border-radius:30px; padding:12px 30px; font-family:${F}; font-size:23px; font-weight:600; animation:pop .3s ease;">${w.hintB}</span>
          </sc-if>
        </sc-if>
        <sc-if value="{{ bDone }}" hint-placeholder-val="{{ false }}">
          <div style="display:flex; flex-direction:column; align-items:center; gap:20px; animation:pop .4s ease;">
            <span style="font-size:80px; font-family:${F}; color:#FFCA3A;">★ ★ ★</span>
            <p style="margin:0; font-family:${F}; font-size:36px; font-weight:600; color:#8AC926;">¡Lo hiciste muy bien!</p>
            <button onClick="{{ bReset }}" style="background:#fff; color:#6A4C93; border:3px solid #6A4C93; border-radius:40px; padding:14px 30px; font-size:18px; font-weight:900; cursor:pointer; font-family:${N};">Jugar otra vez</button>
          </div>
        </sc-if>
      </div>
    </sc-if>

    <sc-if value="{{ s6 }}" hint-placeholder-val="{{ false }}">
      <div style="display:flex; flex-direction:column; align-items:center; gap:24px; text-align:center; max-width:960px; animation:pop .4s ease;">
        <span style="background:#FFCA3A; color:#2A2A40; border-radius:30px; padding:10px 26px; font-size:16px; font-weight:900; letter-spacing:2px;">RETO FINAL</span>
        <h1 style="margin:0; font-family:${F}; font-size:38px; font-weight:700; line-height:1.2;">${c.web.reto.q}</h1>
        <div style="display:flex; gap:18px; flex-wrap:wrap; justify-content:center;">
          ${c.web.reto.opts.map((o, i) => `<button onClick="{{ rp${i + 1} }}" style="min-width:230px; background:#fff; border:none; border-radius:24px; padding:24px 30px; font-family:${F}; font-size:25px; font-weight:600; color:#2A2A40; cursor:pointer; box-shadow:0 6px 0 rgba(42,42,64,.1);" style-hover="transform:scale(1.05);">${o}</button>`).join("\n          ")}
        </div>
        <sc-if value="{{ rok }}" hint-placeholder-val="{{ false }}">
          <div style="display:flex; flex-direction:column; align-items:center; gap:12px; animation:pop .3s ease;">
            <span style="background:#8AC926; color:#fff; border-radius:30px; padding:14px 34px; font-family:${F}; font-size:27px; font-weight:600;">${c.web.reto.ok}</span>
            <p style="margin:0; font-size:22px; font-weight:800; color:#6A4C93;">${c.web.reto.cierre}</p>
          </div>
        </sc-if>
        <sc-if value="{{ rbad }}" hint-placeholder-val="{{ false }}">
          <span style="background:#FF595E; color:#fff; border-radius:30px; padding:12px 30px; font-family:${F}; font-size:23px; font-weight:600; animation:pop .3s ease;">${c.web.reto.bad}</span>
        </sc-if>
      </div>
    </sc-if>

  </main>

  <footer style="display:flex; align-items:center; justify-content:space-between; padding:16px 28px; background:#fff; box-shadow:0 -4px 0 rgba(42,42,64,.08);">
    <button onClick="{{ prev }}" style="background:#fff; color:#6A4C93; border:3px solid #6A4C93; border-radius:40px; padding:14px 34px; font-size:18px; font-weight:900; cursor:pointer; font-family:${N};" style-hover="background:#F1EAFB;">&#9664; Anterior</button>
    <span style="font-size:16px; font-weight:900; color:#6A4C93; letter-spacing:1px;">{{ titulo }}</span>
    <button onClick="{{ next }}" style="background:#1982C4; color:#fff; border:none; border-radius:40px; padding:14px 34px; font-size:18px; font-weight:900; cursor:pointer; font-family:${N};" style-hover="background:#136394;">Siguiente &#9654;</button>
  </footer>
</div>
</x-dc>
<script type="text/x-dc" data-dc-script data-props="${esc(JSON.stringify({ timerMinutes: { editor: "int", default: 5, min: 1, max: 20, unit: "min", tsType: "number", section: "Temporizador" }, pausaSegundos: { editor: "int", default: 20, min: 10, max: 60, unit: "s", tsType: "number", section: "Pausa activa" } }))}">
class Component extends DCLogic {
  state = { screen:0, hLeft:undefined, hRun:false, ex:0, aq:0, aa:0, aDone:false, paPhase:"idle", paIdx:0, paLeft:20, bq:0, ba:0, bDone:false, r:0 };
  EX = ${JSON.stringify(w.exs)};
  QA = ${JSON.stringify(w.qa)};
  QB = ${JSON.stringify(w.qb)};
  PA = ${JSON.stringify(w.pa)};
  RETO_OK = ${JSON.stringify(w.reto.okIndex)};
  TITLES = ${JSON.stringify([w.titulo, w.exBadge, w.qaBadge, "Pausa activa", w.qbBadge, "Reto final"])};
  componentDidMount() {
    this._iv = setInterval(() => {
      this.setState(s => {
        const n = {};
        if (s.hRun && s.hLeft > 0) { n.hLeft = s.hLeft - 1; if (n.hLeft === 0) n.hRun = false; }
        if (s.paPhase === "run") {
          const dur = this.props.pausaSegundos ?? 20;
          if (s.paLeft > 1) n.paLeft = s.paLeft - 1;
          else if (s.paIdx < this.PA.length - 1) { n.paIdx = s.paIdx + 1; n.paLeft = dur; }
          else n.paPhase = "done";
        }
        return Object.keys(n).length ? n : null;
      });
    }, 1000);
  }
  componentWillUnmount() { clearInterval(this._iv); }
  renderVals() {
    const s = this.state;
    const go = d => this.setState(st => ({ screen: Math.max(0, Math.min(5, st.screen + d)) }));
    const hMin = this.props.timerMinutes ?? 5;
    const dur = this.props.pausaSegundos ?? 20;
    const tH = s.hLeft === undefined ? hMin + ":00" : (s.hLeft === 0 ? "¡TIEMPO!" : Math.floor(s.hLeft / 60) + ":" + String(s.hLeft % 60).padStart(2, "0"));
    const e = this.EX[s.ex];
    const qa = this.QA[Math.min(s.aq, this.QA.length - 1)];
    const qb = this.QB[Math.min(s.bq, this.QB.length - 1)];
    const pa = this.PA[s.paIdx];
    const pickA = i => () => this.setState({ aa: i === qa.ok ? 1 : 2 });
    const pickB = i => () => this.setState({ ba: i === qb.ok ? 1 : 2 });
    const pickR = i => () => this.setState({ r: i === this.RETO_OK ? 1 : 2 });
    return {
      titulo: this.TITLES[s.screen].toUpperCase(), num: (s.screen + 1) + " / 6",
      prev: () => go(-1), next: () => go(1),
      s1: s.screen === 0, s2: s.screen === 1, s3: s.screen === 2, s4: s.screen === 3, s5: s.screen === 4, s6: s.screen === 5,
      tH, startH: () => this.setState({ hLeft: hMin * 60, hRun: true }),
      exs: this.EX.map((x, i) => ({ name: x.name, bg: x.bg, pick: () => this.setState({ ex: i }) })),
      exBig: e.big, exTxt: e.txt,
      aNum: "PREGUNTA " + (Math.min(s.aq, this.QA.length - 1) + 1) + " DE " + this.QA.length,
      aPlaying: !s.aDone, aDone: s.aDone, aQ: qa.q, ao1: qa.opts[0], ao2: qa.opts[1], ao3: qa.opts[2],
      ap1: pickA(0), ap2: pickA(1), ap3: pickA(2), aok: s.aa === 1, abad: s.aa === 2,
      aNext: () => this.setState(st => st.aq >= this.QA.length - 1 ? { aDone: true, aa: 0 } : { aq: st.aq + 1, aa: 0 }),
      aReset: () => this.setState({ aq: 0, aa: 0, aDone: false }),
      paIdle: s.paPhase === "idle", paRunning: s.paPhase === "run", paDone: s.paPhase === "done",
      paStart: () => this.setState({ paPhase: "run", paIdx: 0, paLeft: dur }),
      paNum: String(s.paIdx + 1), paName: pa.name, paDesc: pa.desc, paColor: pa.color, paTime: String(s.paLeft),
      bNum: "PREGUNTA " + (Math.min(s.bq, this.QB.length - 1) + 1) + " DE " + this.QB.length,
      bPlaying: !s.bDone, bDone: s.bDone, bQ: qb.q, bo1: qb.opts[0], bo2: qb.opts[1], bo3: qb.opts[2],
      bp1: pickB(0), bp2: pickB(1), bp3: pickB(2), bok: s.ba === 1, bbad: s.ba === 2,
      bNext: () => this.setState(st => st.bq >= this.QB.length - 1 ? { bDone: true, ba: 0 } : { bq: st.bq + 1, ba: 0 }),
      bReset: () => this.setState({ bq: 0, ba: 0, bDone: false }),
      rp1: pickR(0), rp2: pickR(1), rp3: pickR(2), rok: s.r === 1, rbad: s.r === 2
    };
  }
}
</script>
</body>
</html>
`;
}

function esc(s) { return s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;"); }

const NUMDOT = (i, color) => `<span style="width:25px; height:25px; border-radius:50%; background:${color}; color:#fff; display:flex; align-items:center; justify-content:center; font-family:${F}; font-size:14px; font-weight:600; flex:none;">${i}</span>`;
const PASOS = ["#FF595E", "#1982C4", "#8AC926", "#6A4C93"];

function tablero(c) {
  const t = c.tablero;
  const sec = (i, titulo) => `
  <div style="display:flex; align-items:center; gap:9px; margin-top:13px;">
    ${NUMDOT(i + 1, PASOS[i])}
    <h2 style="margin:0; font-family:${F}; font-size:19px; font-weight:600; color:${PASOS[i]};">${titulo}</h2>
  </div>`;
  return HEAD("Tablero: " + c.tema, c.color, c.icono).replace("body { margin:0; background:#FFF9EF; }", "body { margin:0; }") + `<x-import component-from-global-scope="doc-page" from="./doc-page.js" size="letter" orientation="portrait" margin="0.5in" hint-size="8.5in,11in">
<div style="font-family:${N}; color:#2A2A40; font-size:13px; line-height:1.5;">

  <div style="display:flex; align-items:center; gap:14px; background:${c.color}; border-radius:16px; padding:14px 20px;">
    <span style="width:48px; height:48px; border-radius:12px; background:#fff; display:flex; align-items:center; justify-content:center; font-size:26px; flex:none;">${c.icono}</span>
    <div style="flex:1;">
      <p style="margin:0; font-family:${F}; font-size:22px; font-weight:600; color:#fff;">Contenido del tablero · ${c.tema}</p>
      <p style="margin:2px 0 0; font-size:12px; font-weight:900; color:#fff; opacity:.8; letter-spacing:1px;">${c.area.toUpperCase()} · GRADO 2° · ${c.dba} · GUÍA PARA EL DOCENTE</p>
    </div>
  </div>
  <p style="margin:10px 0 0; font-size:12px; font-weight:800; color:#6A4C93;">Copia en el tablero tal como se ve. Los títulos en color, el texto en blanco. 🖍️</p>
${sec(0, "Concepto (cópialo)")}
  <div style="border:2px solid #E9E1D2; border-radius:12px; padding:12px 16px; margin-top:6px;">
    <p style="margin:0; font-size:15px; font-weight:800; line-height:1.6;">${t.concepto}</p>
  </div>
${sec(1, t.ejemplosTitulo || "Ejemplos para dibujar")}
  <div style="display:grid; grid-template-columns:repeat(3,1fr); gap:10px; margin-top:6px; break-inside:avoid; text-align:center;">
    ${t.ejemplos.map((e, i) => `<div style="border:2px solid ${PASOS[i % 4]}; border-radius:12px; padding:10px 8px;"><p style="margin:0; font-size:22px; line-height:1.3;">${e.emoji}</p><p style="margin:4px 0 0; font-family:${F}; font-size:16px; font-weight:600; color:${PASOS[i % 4]};">${e.titulo}</p><p style="margin:0; font-size:11px; font-weight:800;">${e.pie}</p></div>`).join("\n    ")}
  </div>
${sec(2, "Lo que hay que recordar")}
  <div style="background:#FFF9EF; border:2px solid #FFCA3A; border-radius:12px; padding:12px 16px; margin-top:6px; break-inside:avoid;">
    <div style="display:flex; flex-direction:column; gap:7px;">
      ${t.recordar.map(r => `<p style="margin:0; font-size:15px; font-weight:800;">• ${r}</p>`).join("\n      ")}
    </div>
    <p style="margin:9px 0 0; font-size:13px; font-weight:900; color:#C89B1C;">Palabras clave: ${t.claves}</p>
  </div>
${sec(3, "Para copiar y resolver")}
  <div style="display:flex; gap:12px; margin-top:6px; break-inside:avoid;">
    <div style="flex:2; border:2px solid #E9E1D2; border-radius:12px; padding:12px 16px; display:flex; flex-direction:column; gap:8px;">
      ${t.resolver.map(r => `<p style="margin:0; font-size:15px; font-weight:800;">${r}</p>`).join("\n      ")}
    </div>
    <div style="flex:1; border:2px dashed #6A4C93; border-radius:12px; display:flex; align-items:center; justify-content:center; text-align:center; padding:8px;"><p style="margin:0; font-size:12px; font-weight:800; color:#6A4C93;">${t.dibuja}</p></div>
  </div>

  <div style="background:#E9F5D8; border-radius:12px; padding:10px 16px; margin-top:14px; break-inside:avoid;">
    <p style="margin:0; font-size:12px; font-weight:900; color:#6FA31E; letter-spacing:1px;">NOTA PARA EL DOCENTE</p>
    <p style="margin:4px 0 0; font-size:13px; font-weight:800;">${t.nota}</p>
  </div>
</div>
</x-import>
</x-dc>
</body>
</html>
`;
}

function fichaMitad(c) {
  const f = c.ficha;
  const dot = (i) => `<span style="width:21px; height:21px; border-radius:50%; background:${PASOS[i]}; color:#fff; display:flex; align-items:center; justify-content:center; font-family:${F}; font-size:12px; font-weight:600; flex:none;">${i + 1}</span>`;
  const head = (i, txt) => `
  <div style="display:flex; align-items:center; gap:8px; margin-top:9px;">
    ${dot(i)}
    <p style="margin:0; font-size:11.5px; font-weight:900;">${txt}</p>
  </div>`;
  return `<div style="flex:1; min-width:0; font-family:${N}; color:#2A2A40;">
  <div style="display:flex; align-items:center; gap:10px; background:${c.color}; border-radius:14px; padding:9px 13px;">
    <span style="width:36px; height:36px; border-radius:10px; background:#fff; display:flex; align-items:center; justify-content:center; font-size:20px; flex:none;">${c.icono}</span>
    <div style="flex:1; min-width:0;">
      <p style="margin:0; font-family:${F}; font-size:15px; font-weight:600; color:#fff;">Refuerzo · ${c.tema}</p>
      <p style="margin:0; font-size:9.5px; font-weight:900; color:#fff; opacity:.85; letter-spacing:1px;">${c.area.toUpperCase()} · GRADO 2° · ${c.dba}</p>
    </div>
  </div>
  <div style="display:flex; gap:10px; margin-top:7px; font-size:10.5px; font-weight:800;">
    <p style="margin:0; flex:2;">Nombre: ______________________________</p>
    <p style="margin:0; flex:1;">Fecha: ____________</p>
  </div>
${head(0, f.p1.instr)}
  <div style="display:flex; flex-direction:column; gap:5px; margin-top:5px; font-size:11.5px; font-weight:800;">
    ${f.p1.items.map(x => `<p style="margin:0; display:flex; align-items:center; gap:8px;"><span style="flex:1;">${x}</span><span style="width:92px; height:20px; border-bottom:2px solid #2A2A40; flex:none;"></span></p>`).join("\n    ")}
  </div>
${head(1, f.p2.instr)}
  <div style="display:grid; grid-template-columns:repeat(2,1fr); gap:8px; margin-top:5px;">
    ${f.p2.cajas.map(x => `<div style="border:2px solid #1982C4; border-radius:10px; padding:5px;"><p style="margin:0 0 3px; text-align:center; font-size:9.5px; font-weight:900; color:#1982C4;">${x}</p><div style="border:2px dashed #D8D2C4; border-radius:8px; height:70px;"></div></div>`).join("\n    ")}
  </div>
${head(2, f.p3.instr)}
  <div style="display:grid; grid-template-columns:repeat(2,1fr); gap:6px; margin-top:5px;">
    ${f.p3.opciones.map(x => `<div style="border:2px solid #E9E1D2; border-radius:10px; padding:5px 8px; display:flex; align-items:center; gap:7px;"><span style="width:20px; height:18px; border:2px solid #2A2A40; border-radius:5px; flex:none;"></span><p style="margin:0; font-size:10.5px; font-weight:800;">${x}</p></div>`).join("\n    ")}
  </div>
${head(3, f.p4.instr)}
  <div style="background:#FFF9EF; border:2px solid #FFCA3A; border-radius:10px; padding:8px 12px; margin-top:5px; display:flex; flex-direction:column; gap:6px;">
    ${f.p4.lineas.map(x => `<p style="margin:0; font-size:11.5px; font-weight:800;">${x}</p>`).join("\n    ")}
  </div>
  <p style="margin:9px 0 0; text-align:center; font-family:${F}; font-size:12px; font-weight:600; color:#8AC926;">${f.cierre}</p>
</div>`;
}

function ficha(c) {
  const mitad = fichaMitad(c);
  return HEAD("Ficha de refuerzo: " + c.tema, c.color, c.icono).replace("body { margin:0; background:#FFF9EF; }", "body { margin:0; }") + `<x-import component-from-global-scope="doc-page" from="./doc-page.js" size="letter" orientation="landscape" margin="0.3in" hint-size="11in,8.5in">
<div style="display:flex; align-items:stretch; gap:0; height:100%;">
${mitad}
  <div style="flex:none; width:22px; display:flex; align-items:center; justify-content:center; position:relative;">
    <div style="position:absolute; top:0; bottom:0; left:50%; border-left:2px dashed #B8B0A0;"></div>
    <span style="background:#fff; font-size:11px; color:#8A8272; z-index:1;">✂</span>
  </div>
${mitad}
</div>
</x-import>
</x-dc>
</body>
</html>
`;
}

function casaBloque(c, idx) {
  const k = c.casa;
  const dot = (i) => `<span style="width:32px; height:32px; border-radius:50%; background:${PASOS[i]}; color:#fff; display:flex; align-items:center; justify-content:center; font-family:${F}; font-size:18px; font-weight:600; flex:none;">${i + 1}</span>`;
  const head = (i, txt) => `
    <div style="display:flex; align-items:center; gap:11px; margin-top:20px;">
      ${dot(i)}
      <p style="margin:0; font-size:18px; font-weight:900; line-height:1.25;">${txt}</p>
    </div>`;
  return `  <div id="casa-${idx}" style="width:900px; box-sizing:border-box; background:#fff; padding:38px 42px 32px; display:flex; flex-direction:column; font-family:${N}; color:#2A2A40;">
    <div style="display:flex; align-items:center; gap:16px; background:${c.color}; border-radius:20px; padding:16px 20px;">
      <span style="width:62px; height:62px; border-radius:17px; background:#fff; display:flex; align-items:center; justify-content:center; font-size:32px; flex:none;">${c.icono}</span>
      <div style="flex:1; min-width:0;">
        <p style="margin:0; font-family:${F}; font-size:27px; font-weight:600; color:#fff; line-height:1.15;">Refuerzo en casa · ${c.tema}</p>
        <p style="margin:3px 0 0; font-size:13px; font-weight:900; letter-spacing:2px; color:#fff; opacity:.85;">${c.area.toUpperCase()} · GRADO 2°</p>
      </div>
    </div>

    <div style="display:flex; gap:16px; margin-top:14px; font-size:17px; font-weight:800;">
      <p style="margin:0; flex:2;">Nombre: ______________________________</p>
      <p style="margin:0; flex:1;">Fecha: ____________</p>
    </div>

    <div style="border:3px solid #E9E1D2; border-radius:16px; padding:12px 18px; margin-top:14px;">
      <p style="margin:0; font-size:12px; font-weight:900; letter-spacing:2px; color:#6A4C93;">RECUERDA</p>
      <p style="margin:5px 0 0; font-size:18px; font-weight:800; line-height:1.45;">${k.recuerda}</p>
    </div>
${head(0, k.p1.instr)}
    <div style="display:flex; flex-direction:column; gap:9px; margin-top:9px; font-size:19px; font-weight:800;">
      ${k.p1.items.map(x => `<p style="margin:0; display:flex; align-items:center; gap:12px;"><span style="flex:1;">${x}</span><span style="width:180px; height:32px; border-bottom:3px solid #2A2A40; flex:none;"></span></p>`).join("\n      ")}
    </div>
${head(1, k.p2.instr)}
    <div style="display:grid; grid-template-columns:repeat(2,1fr); gap:14px; margin-top:9px;">
      ${k.p2.cajas.map(x => `<div style="border:3px solid #1982C4; border-radius:14px; padding:9px;"><p style="margin:0 0 6px; text-align:center; font-size:15px; font-weight:900; color:#1982C4;">${x}</p><div style="border:3px dashed #D8D2C4; border-radius:11px; height:120px;"></div></div>`).join("\n      ")}
    </div>
${head(2, k.p3.instr)}
    <div style="display:grid; grid-template-columns:repeat(2,1fr); gap:11px; margin-top:9px;">
      ${k.p3.opciones.map(x => `<div style="border:3px solid #E9E1D2; border-radius:14px; padding:9px 13px; display:flex; align-items:center; gap:12px;"><span style="width:33px; height:29px; border:3px solid #2A2A40; border-radius:8px; flex:none;"></span><p style="margin:0; font-size:17px; font-weight:800;">${x}</p></div>`).join("\n      ")}
    </div>
${head(3, k.p4.instr)}
    <div style="background:#FFF6DC; border:3px solid #FFCA3A; border-radius:14px; padding:14px 18px; margin-top:9px; display:flex; flex-direction:column; gap:11px;">
      ${k.p4.lineas.map(x => `<p style="margin:0; font-size:18px; font-weight:800;">${x}</p>`).join("\n      ")}
    </div>

    <p style="margin:20px 0 0; text-align:center; font-family:${F}; font-size:22px; font-weight:600; color:#8AC926;">${k.cierre}</p>

    <div style="display:grid; grid-template-columns:1fr 1fr; gap:14px; margin-top:20px;">
      <div style="background:#F1EAFB; border-radius:14px; padding:13px 17px;">
        <p style="margin:0; font-size:12px; font-weight:900; letter-spacing:2px; color:#6A4C93;">HOY APRENDIMOS EN CLASE</p>
        <div style="display:flex; flex-direction:column; gap:4px; margin-top:6px;">
          ${k.aprendimos.map(x => `<p style="margin:0; font-size:15px; font-weight:800;">★ ${x}</p>`).join("\n          ")}
        </div>
      </div>
      <div style="background:#E9F5D8; border-radius:14px; padding:13px 17px;">
        <p style="margin:0; font-size:12px; font-weight:900; letter-spacing:2px; color:#6FA31E;">PARA EL ACOMPAÑANTE EN CASA</p>
        <p style="margin:6px 0 0; font-size:15px; font-weight:800; line-height:1.4;">${k.acompanante}</p>
        <p style="margin:6px 0 0; font-size:15px; font-weight:900; color:#6FA31E; line-height:1.4;">Además: ${k.ademas}</p>
      </div>
    </div>
  </div>`;
}

function casaDoc(clases, semana) {
  return HEAD("Fichas de casa · Semana " + semana, "#8AC926", "📩").replace("body { margin:0; background:#FFF9EF; }", "body { margin:0; background:#E7E1D5; }") + `
<div style="display:flex; flex-direction:column; align-items:center; gap:26px; padding:26px 0 40px; font-family:${N};">
  <div style="text-align:center;">
    <p style="margin:0; font-size:14px; font-weight:900; letter-spacing:2px; color:#6A4C93;">FICHAS DE CASA · SEMANA ${semana} · GRADO 2°</p>
    <p style="margin:5px 0 0; font-size:14px; font-weight:800; color:#7A7264;">10 fichas, una por clase. Envía la imagen o imprime la hoja.</p>
  </div>
${clases.map((c, i) => casaBloque(c, i + 1)).join("\n")}
</div>
</x-dc>
</body>
</html>
`;
}

function indice(clases, semana, subtitulo) {
  const DIAS = ["LUNES", "LUNES", "MARTES", "MARTES", "MIÉRCOLES", "MIÉRCOLES", "JUEVES", "JUEVES", "VIERNES", "VIERNES"];
  const enc = s => encodeURIComponent(s);
  return HEAD("Índice · Semana " + semana, "#FFCA3A", "🗓️").replace('a { color:#1982C4; } a:hover { color:#FF595E; }', 'a { color:#1982C4; } a:hover { opacity:.85; }') + `
<div style="max-width:1180px; margin:0 auto; padding:40px 28px 60px; font-family:${N}; color:#2A2A40;">
  <p style="margin:0; font-size:13px; font-weight:900; letter-spacing:3px; color:#6A4C93;">GRADO 2° · SEMANA ${semana}</p>
  <h1 style="margin:6px 0 0; font-family:${F}; font-size:46px; font-weight:700;">${subtitulo}</h1>
  <p style="margin:10px 0 0; font-size:17px; font-weight:800; color:#6A4C93; max-width:760px;">Cada clase trae cuatro piezas: la web para proyectar, el contenido del tablero, la ficha de refuerzo (dos copias por hoja, con línea de corte) y la ficha de casa para enviar por WhatsApp.</p>
  <div style="display:flex; flex-direction:column; gap:14px; margin-top:28px;">
${clases.map((c, i) => `    <div style="display:flex; align-items:center; gap:18px; background:#fff; border-radius:20px; padding:18px 22px; box-shadow:0 5px 0 rgba(42,42,64,.07);">
      <span style="width:56px; height:56px; border-radius:16px; background:${c.color}; display:flex; align-items:center; justify-content:center; font-size:28px; flex:none;">${c.icono}</span>
      <div style="flex:1; min-width:0;">
        <p style="margin:0; font-size:11px; font-weight:900; letter-spacing:2px; color:#6A4C93;">${DIAS[i]} · ${c.area.toUpperCase()} · GRADO 2°</p>
        <p style="margin:3px 0 0; font-family:${F}; font-size:23px; font-weight:600;">${c.tema}</p>
      </div>
      <div style="display:flex; gap:10px; flex-wrap:wrap; justify-content:flex-end;">
        <a href="${enc(c.slug + " - Web.dc.html")}" style="background:#1982C4; color:#fff; text-decoration:none; border-radius:12px; padding:9px 16px; font-size:14px; font-weight:900; letter-spacing:.5px;">WEB ▶</a>
        <a href="${enc(c.slug + " - Tablero.dc.html")}" style="background:#2A2A40; color:#fff; text-decoration:none; border-radius:12px; padding:9px 16px; font-size:14px; font-weight:900; letter-spacing:.5px;">TABLERO</a>
        <a href="${enc(c.slug + " - Ficha Refuerzo.dc.html")}" style="background:#8AC926; color:#fff; text-decoration:none; border-radius:12px; padding:9px 16px; font-size:14px; font-weight:900; letter-spacing:.5px;">REFUERZO ×2</a>
        <a href="Refuerzo%20en%20Casa/${enc(String(i + 1).padStart(2, "0") + " " + c.slug + ".png")}" style="background:#FFCA3A; color:#2A2A40; text-decoration:none; border-radius:12px; padding:9px 16px; font-size:14px; font-weight:900; letter-spacing:.5px;">REFUERZO EN CASA</a>
      </div>
    </div>`).join("\n")}
  </div>
</div>
</x-dc>
</body>
</html>
`;
}
