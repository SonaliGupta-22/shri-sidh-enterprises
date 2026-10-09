// Draws original product illustrations (SVG) for the shop's products.
// Run:  node scripts/generate-product-art.mjs
// Output: public/images/products/<product-slug>.svg   (a real photo named <slug>.jpg always wins over these)
import { mkdirSync, writeFileSync } from 'node:fs'
import { products } from '../src/data/siteData.js'

const slug = (p) => p.name.en.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

// ---------- shared paint ----------
const lin = (id, stops, vertical = false) =>
  `<linearGradient id="${id}" x1="0" y1="0" x2="${vertical ? 0 : 1}" y2="${vertical ? 1 : 0}">${stops
    .map(([o, c]) => `<stop offset="${o}" stop-color="${c}"/>`)
    .join('')}</linearGradient>`

const DEFS = `<defs>
${lin('gBrass', [[0, '#8a5510'], [0.2, '#d9a441'], [0.42, '#fff0b3'], [0.65, '#e0a937'], [1, '#7a470b']])}
${lin('gBrassD', [[0, '#6b3f0a'], [0.4, '#b98122'], [1, '#5c3407']])}
${lin('gSteel', [[0, '#7d8794'], [0.2, '#cfd6de'], [0.42, '#ffffff'], [0.65, '#b4bdc8'], [1, '#6b7480']])}
${lin('gSteelD', [[0, '#5f6874'], [0.5, '#9aa4b0'], [1, '#515a66']])}
${lin('gCopper', [[0, '#7a2e12'], [0.22, '#c8683b'], [0.42, '#f6b48a'], [0.65, '#c4623a'], [1, '#6a2410']])}
${lin('gKansa', [[0, '#4a2f12'], [0.25, '#9a6a2c'], [0.45, '#d9a85a'], [0.7, '#8a5a22'], [1, '#3f270e']])}
${lin('gDark', [[0, '#15171c'], [0.3, '#3a3f48'], [0.5, '#5b6270'], [0.75, '#2a2e36'], [1, '#101216']])}
${lin('gRed', [[0, '#7f1020'], [0.4, '#e0344c'], [0.6, '#ff6b81'], [1, '#7f1020']])}
${lin('gBlue', [[0, '#14305a'], [0.4, '#2f63b5'], [0.6, '#5b8fe0'], [1, '#14305a']])}
${lin('gTeal', [[0, '#0b4a47'], [0.4, '#1a8a85'], [0.6, '#4cc2bb'], [1, '#0b4a47']])}
${lin('gWhite', [[0, '#c9cfd6'], [0.4, '#ffffff'], [1, '#aab2bc']])}
${lin('gGlass', [[0, '#9fc9e4'], [0.3, '#e9f6ff'], [0.55, '#bfe0f3'], [1, '#86b6d2']])}
${lin('gTop', [[0, '#3b414c'], [1, '#14171c']], true)}
<radialGradient id="gShadow"><stop offset="0" stop-color="#000" stop-opacity=".3"/><stop offset="1" stop-color="#000" stop-opacity="0"/></radialGradient>
</defs>`

const wrap = (body) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300">${DEFS}${body}</svg>\n`

// ---------- shape helpers ----------
const shadow = (cx, cy, rx, ry = 11) => `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="url(#gShadow)"/>`
const ell = (cx, cy, rx, ry, fill, extra = '') => `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="${fill}" ${extra}/>`
const path = (d, fill, extra = '') => `<path d="${d}" fill="${fill}" ${extra}/>`
const line = (d, stroke, w, extra = '') => `<path d="${d}" fill="none" stroke="${stroke}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round" ${extra}/>`
const rect = (x, y, w, h, r, fill, extra = '') => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${fill}" ${extra}/>`
const shine = (d, o = 0.5, w = 5) => line(d, '#ffffff', w, `stroke-opacity="${o}"`)

// Tapered vessel, top-left (x,y), width w, height h, side taper t.
const vessel = (x, y, w, h, t, fill) =>
  path(`M${x} ${y}L${x + t} ${y + h - 14}Q${x + t} ${y + h} ${x + t + 14} ${y + h}H${x + w - t - 14}Q${x + w - t} ${y + h} ${x + w - t} ${y + h - 14}L${x + w} ${y}Z`, fill)

// Open top: rim ring with dark inside.
const mouth = (cx, y, rx, ry, rim, inner = '#2b1a08') => ell(cx, y, rx, ry, rim) + ell(cx, y + 1.5, rx - 5, Math.max(ry - 3, 2), inner)

// Bowl (katori): rim centre (cx, rimY), width w, depth d.
const bowl = (cx, rimY, w, d, g, inner = '#3a2408') =>
  path(`M${cx - w / 2} ${rimY}C${cx - w / 2} ${rimY + d * 1.35} ${cx + w / 2} ${rimY + d * 1.35} ${cx + w / 2} ${rimY}Z`, g) +
  mouth(cx, rimY, w / 2, w * 0.1, g, inner) +
  shine(`M${cx - w * 0.36} ${rimY + d * 0.35}Q${cx - w * 0.28} ${rimY + d * 0.8} ${cx - w * 0.1} ${rimY + d * 0.92}`, 0.45, 3)

// Round pot (handi / lota): base centre (cx, by), radius R, optional lid.
const handi = (cx, by, R, g, gd, lid = false, tall = 1.35) => {
  const ty = by - tall * R
  const body = path(
    `M${cx - 0.52 * R} ${ty}L${cx - 0.52 * R} ${ty + 0.14 * R}C${cx - 1.12 * R} ${ty + 0.22 * R} ${cx - 1.12 * R} ${by - 0.12 * R} ${cx - 0.5 * R} ${by}L${cx + 0.5 * R} ${by}C${cx + 1.12 * R} ${by - 0.12 * R} ${cx + 1.12 * R} ${ty + 0.22 * R} ${cx + 0.52 * R} ${ty + 0.14 * R}L${cx + 0.52 * R} ${ty}Z`,
    g
  )
  const ears = line(`M${cx - 0.9 * R} ${ty + 0.5 * R}q${-0.2 * R} ${0.06 * R} ${-0.12 * R} ${0.24 * R}`, gd, Math.max(R * 0.07, 3)) +
    line(`M${cx + 0.9 * R} ${ty + 0.5 * R}q${0.2 * R} ${0.06 * R} ${0.12 * R} ${0.24 * R}`, gd, Math.max(R * 0.07, 3))
  const sh = shine(`M${cx - 0.78 * R} ${ty + 0.55 * R}Q${cx - 0.82 * R} ${by - 0.4 * R} ${cx - 0.5 * R} ${by - 0.1 * R}`, 0.5, Math.max(R * 0.07, 3))
  if (!lid) return body + ears + mouth(cx, ty, 0.6 * R, 0.12 * R, g) + sh
  return (
    body + ears +
    path(`M${cx - 0.62 * R} ${ty + 0.02 * R}C${cx - 0.62 * R} ${ty - 0.42 * R} ${cx + 0.62 * R} ${ty - 0.42 * R} ${cx + 0.62 * R} ${ty + 0.02 * R}Z`, g) +
    ell(cx, ty + 0.02 * R, 0.63 * R, 0.07 * R, gd) +
    `<circle cx="${cx}" cy="${ty - 0.3 * R}" r="${0.08 * R}" fill="${gd}"/>` + ell(cx, ty - 0.23 * R, 0.04 * R, 0.06 * R, gd) + sh
  )
}

// Wide pot with two side ears (patila / degchi / bhagona).
const patila = (x, by, w, h, g, gd, lid = false) => {
  const y = by - h
  const t = w * 0.04
  const cx = x + w / 2
  let s = vessel(x, y, w, h, t, g)
  s += line(`M${x + 2} ${y + h * 0.22}q-16 2 -14 16`, gd, 6) + line(`M${x + w - 2} ${y + h * 0.22}q16 2 14 16`, gd, 6)
  s += shine(`M${x + w * 0.12} ${y + h * 0.25}L${x + w * 0.16} ${by - 14}`, 0.45, 4)
  if (lid) {
    s += ell(cx, y, w / 2 + 4, 8, gd)
    s += path(`M${x + 6} ${y}C${x + 6} ${y - h * 0.4} ${x + w - 6} ${y - h * 0.4} ${x + w - 6} ${y}Z`, g)
    s += `<circle cx="${cx}" cy="${y - h * 0.3}" r="6" fill="${gd}"/>`
  } else {
    s += mouth(cx, y, w / 2, 9, g)
  }
  return s
}

const tumbler = (cx, by, w, h, g, gd = '#3a2408') =>
  vessel(cx - w / 2, by - h, w, h, 6, g) + mouth(cx, by - h, w / 2, w * 0.1, g, gd) + shine(`M${cx - w * 0.3} ${by - h + 12}L${cx - w * 0.25} ${by - 10}`, 0.5, 3)

const jug = (cx, by, w, h, g, gd) => {
  const x = cx - w / 2, y = by - h
  return (
    line(`M${x + w - 2} ${y + 18}C${x + w + 46} ${y + 10} ${x + w + 46} ${y + h * 0.7} ${x + w - 8} ${y + h * 0.72}`, gd, 11) +
    vessel(x, y, w, h, 9, g) +
    mouth(cx, y, w / 2, w * 0.11, g) +
    shine(`M${x + w * 0.16} ${y + 20}L${x + w * 0.2} ${by - 14}`, 0.5, 5)
  )
}

const diya = (cx, by, w) =>
  path(`M${cx - w / 2} ${by - 14}C${cx - w / 2} ${by + 6} ${cx + w / 2} ${by + 6} ${cx + w / 2} ${by - 14}Z`, 'url(#gBrass)') +
  mouth(cx, by - 14, w / 2, w * 0.09, 'url(#gBrass)', '#6b3f0a') +
  path(`M${cx} ${by - 48}C${cx - 8} ${by - 34} ${cx - 9} ${by - 24} ${cx} ${by - 17}C${cx + 9} ${by - 24} ${cx + 8} ${by - 34} ${cx} ${by - 48}Z`, '#ff9a1f') +
  path(`M${cx} ${by - 36}C${cx - 4} ${by - 30} ${cx - 4} ${by - 25} ${cx} ${by - 21}C${cx + 4} ${by - 25} ${cx + 4} ${by - 30} ${cx} ${by - 36}Z`, '#fff3c4')

const plate = (cx, cy, rx, ry, g, gd) =>
  ell(cx, cy + 5, rx, ry, gd) + ell(cx, cy, rx, ry, g) + ell(cx, cy + 3, rx * 0.8, ry * 0.76, gd, 'opacity=".5"') + ell(cx, cy + 1, rx * 0.8, ry * 0.76, g) +
  line(`M${cx - rx * 0.86} ${cy - ry * 0.1}Q${cx - rx * 0.5} ${cy - ry * 0.9} ${cx} ${cy - ry * 0.95}`, '#fff', 3, 'stroke-opacity=".45"')

const giftBox = (x, y, w, h, color = 'url(#gRed)') => {
  const cx = x + w / 2
  return (
    rect(x, y + h * 0.26, w, h * 0.74, 6, color) +
    rect(x - 6, y, w + 12, h * 0.28, 6, color) +
    rect(cx - 9, y, 18, h, 0, '#ffe08a') +
    path(`M${cx} ${y}C${cx - 36} ${y - 34} ${cx - 44} ${y - 4} ${cx} ${y}Z`, '#ffe08a') +
    path(`M${cx} ${y}C${cx + 36} ${y - 34} ${cx + 44} ${y - 4} ${cx} ${y}Z`, '#ffd166') +
    `<circle cx="${cx}" cy="${y}" r="7" fill="#f0a82e"/>`
  )
}

// A thali with three bowls in front of it.
const thaliSet = (g, gd, extra = '', inner = '#7a5418') =>
  shadow(190, 262, 170, 12) +
  plate(190, 150, 142, 52, g, gd) +
  bowl(100, 222, 78, 24, g, inner) + bowl(190, 232, 92, 28, g, inner) + bowl(280, 222, 78, 24, g, inner) + extra

// ---------- the products ----------
const art = {}

art['peetal-pooja-thali-set'] = () =>
  shadow(200, 262, 175, 13) +
  plate(200, 178, 168, 72, 'url(#gBrass)', 'url(#gBrassD)') +
  diya(160, 192, 72) +
  bowl(262, 160, 58, 18, 'url(#gBrass)', '#8a1a1a') + bowl(250, 206, 46, 15, 'url(#gBrass)', '#c2410c') +
  [[108, 206, 7, '#ff8f00'], [124, 216, 6, '#ffb300'], [100, 222, 6, '#e91e63'], [118, 228, 5, '#ff8f00'], [316, 196, 6, '#ffb300'], [330, 186, 5, '#ff8f00']]
    .map(([x, y, r, c]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${c}"/>`).join('')

art['peetal-handi-patila'] = () =>
  shadow(200, 268, 175, 12) +
  patila(52, 262, 104, 80, 'url(#gBrass)', 'url(#gBrassD)') +
  handi(250, 262, 100, 'url(#gBrass)', 'url(#gBrassD)', true, 1.45)

art['peetal-kadhai'] = () =>
  shadow(200, 262, 160, 12) +
  line('M62 168L28 158', 'url(#gBrassD)', 12) + line('M338 168L372 158', 'url(#gBrassD)', 12) +
  path('M62 168C70 270 330 270 338 168Z', 'url(#gBrass)') +
  mouth(200, 168, 138, 22, 'url(#gBrass)', '#3a2408') +
  shine('M86 196Q100 246 150 256', 0.5, 6)

art['peetal-lota-glass-jug'] = () =>
  shadow(200, 268, 175, 12) +
  jug(100, 262, 92, 150, 'url(#gBrass)', 'url(#gBrassD)') +
  handi(238, 262, 44, 'url(#gBrass)', 'url(#gBrassD)', false, 1.45) +
  tumbler(310, 262, 50, 92, 'url(#gBrass)') + tumbler(364, 262, 44, 76, 'url(#gBrass)')

art['peetal-thali-bowl-set'] = () => thaliSet('url(#gBrass)', 'url(#gBrassD)')

art['peetal-bhagona-degchi'] = () =>
  shadow(200, 268, 170, 12) +
  patila(190, 258, 150, 150, 'url(#gBrass)', 'url(#gBrassD)', true) +
  patila(50, 264, 120, 112, 'url(#gBrass)', 'url(#gBrassD)', true)

art['brass-gift-items'] = () =>
  shadow(200, 268, 175, 12) +
  giftBox(40, 104, 160, 158) +
  handi(268, 262, 50, 'url(#gBrass)', 'url(#gBrassD)', true, 1.4) +
  diya(350, 252, 70)
art['kansa-gift-sets'] = () =>
  thaliSet('url(#gKansa)', '#3f270e', tumbler(358, 250, 40, 66, 'url(#gKansa)'), '#5a3a14')

art['copper-gift-sets'] = () =>
  shadow(200, 268, 175, 12) +
  // bottle
  rect(88, 60, 40, 22, 6, 'url(#gDark)') +
  path('M96 82H120C120 100 140 120 140 150V256Q140 266 130 266H86Q76 266 76 256V150C76 120 96 100 96 82Z', 'url(#gCopper)') +
  shine('M88 140L88 250', 0.5, 5) +
  jug(222, 262, 78, 120, 'url(#gCopper)', '#5b1d0a') +
  tumbler(318, 262, 52, 84, 'url(#gCopper)', '#4a1808') + tumbler(366, 262, 36, 62, 'url(#gCopper)', '#4a1808')

art['steel-gift-sets'] = () =>
  shadow(200, 268, 175, 12) +
  plate(190, 232, 150, 36, 'url(#gSteel)', 'url(#gSteelD)') + plate(190, 214, 138, 32, 'url(#gSteel)', 'url(#gSteelD)') + plate(190, 196, 126, 29, 'url(#gSteel)', 'url(#gSteelD)') +
  bowl(318, 256, 84, 30, 'url(#gSteel)', '#4d5560') +
  path('M190 176C160 140 130 164 190 176Z', '#e0344c') + path('M190 176C220 140 250 164 190 176Z', '#ff6b81') + `<circle cx="190" cy="176" r="7" fill="#c2185b"/>`

art['induction-cooktop'] = () =>
  shadow(200, 262, 170, 12) +
  path('M92 150L308 150L372 232L28 232Z', 'url(#gTop)') +
  path('M92 150L308 150L316 160L84 160Z', '#6b7280', 'opacity=".5"') +
  rect(28, 232, 344, 24, 6, 'url(#gDark)') +
  ell(200, 196, 92, 25, 'none', 'stroke="#aab2c0" stroke-width="3"') + ell(200, 196, 58, 15, 'none', 'stroke="#aab2c0" stroke-width="2.5"') + ell(200, 196, 24, 6, 'none', 'stroke="#aab2c0" stroke-width="2"') +
  [70, 110, 150].map((x) => `<circle cx="${x}" cy="244" r="5" fill="#9aa4b0"/>`).join('') +
  rect(238, 238, 70, 12, 3, '#0a0c10') + [248, 262, 276, 290].map((x) => `<rect x="${x}" y="241" width="8" height="6" rx="1" fill="#ff5a3c"/>`).join('') +
  `<circle cx="338" cy="244" r="5" fill="#ff5a3c"/>`

art['mixer-grinder'] = () =>
  shadow(200, 268, 170, 12) +
  // side jars
  vessel(40, 170, 76, 92, 8, 'url(#gSteel)') + rect(36, 160, 84, 14, 6, 'url(#gDark)') + line('M120 180C146 178 146 226 116 226', 'url(#gDark)', 9) +
  vessel(284, 186, 76, 76, 8, 'url(#gSteel)') + rect(280, 176, 84, 14, 6, 'url(#gDark)') + line('M360 196C386 194 386 238 356 240', 'url(#gDark)', 9) +
  // main unit
  rect(132, 178, 136, 84, 16, 'url(#gRed)') + rect(132, 244, 136, 18, 8, 'url(#gDark)') +
  `<circle cx="200" cy="214" r="17" fill="url(#gDark)"/>` + line('M200 214L200 201', '#fff', 3) + `<circle cx="200" cy="214" r="21" fill="none" stroke="#ffd166" stroke-width="2"/>` +
  vessel(150, 66, 100, 116, 12, 'url(#gSteel)') + rect(144, 54, 112, 16, 7, 'url(#gDark)') + `<circle cx="200" cy="50" r="7" fill="url(#gDark)"/>` +
  line('M250 78C288 74 288 148 246 148', 'url(#gDark)', 11) + shine('M166 84L172 168', 0.6, 5)

art['electric-kettle'] = () =>
  shadow(200, 268, 140, 12) +
  ell(200, 258, 98, 14, 'url(#gDark)') +
  line('M266 112C318 108 318 226 262 226', 'url(#gDark)', 15) +
  path('M146 124L98 92L112 82L154 112Z', 'url(#gSteel)') +
  path('M138 108C130 160 128 214 142 248H258C272 214 270 160 262 108Z', 'url(#gSteel)') +
  ell(200, 108, 62, 12, 'url(#gSteelD)') + path('M148 108C148 80 252 80 252 108Z', 'url(#gSteel)') + `<circle cx="200" cy="84" r="7" fill="url(#gDark)"/>` +
  rect(138, 244, 124, 12, 5, 'url(#gDark)') + `<circle cx="200" cy="232" r="5" fill="#4cc2ff"/>` + shine('M156 128L150 232', 0.6, 6)

art['rice-cooker'] = () =>
  shadow(200, 268, 160, 12) +
  rect(86, 170, 20, 26, 6, 'url(#gDark)') + rect(294, 170, 20, 26, 6, 'url(#gDark)') +
  path('M108 150C94 200 108 252 200 254C292 252 306 200 292 150Z', 'url(#gWhite)') +
  path('M104 152C104 82 296 82 296 152Z', 'url(#gSteel)') +
  rect(168, 86, 64, 14, 7, 'url(#gDark)') + `<circle cx="248" cy="106" r="6" fill="#aab2bc"/>` +
  rect(172, 208, 56, 20, 6, 'url(#gDark)') + `<circle cx="188" cy="218" r="4" fill="#ff8a1f"/>` + `<circle cx="206" cy="218" r="4" fill="#58d68d"/>` +
  shine('M118 178Q114 226 150 244', 0.7, 5)

art['sandwich-maker-toaster'] = () =>
  shadow(200, 262, 170, 12) +
  rect(48, 214, 304, 38, 8, 'url(#gDark)') +
  path('M92 164H308L352 214H48Z', 'url(#gSteel)') +
  [0, 1, 2, 3, 4, 5, 6].map((i) => line(`M${108 + i * 30} 168L${84 + i * 38} 212`, '#6b7480', 2)).join('') +
  rect(166, 226, 68, 14, 6, '#0a0c10') + `<circle cx="80" cy="234" r="5" fill="#ff5a3c"/>` + `<circle cx="100" cy="234" r="5" fill="#58d68d"/>` +
  path('M268 214C268 190 330 190 330 214Z', '#e8b86a') + path('M274 214C274 196 324 196 324 214Z', '#f6d89a') + `<circle cx="300" cy="203" r="4" fill="#c8402a"/>`

art['stainless-steel-thali-set'] = () => thaliSet('url(#gSteel)', 'url(#gSteelD)', tumbler(358, 250, 40, 66, 'url(#gSteel)', '#4d5560'), '#7d8794')

art['steel-tiffin-box-3-tier'] = () =>
  shadow(200, 268, 130, 12) +
  line('M124 94C124 42 276 42 276 94', 'url(#gDark)', 9) +
  rect(112, 80, 176, 56, 14, 'url(#gSteel)') + rect(112, 138, 176, 56, 14, 'url(#gSteel)') + rect(112, 196, 176, 56, 14, 'url(#gSteel)') +
  ['M112 136H288', 'M112 194H288'].map((d) => line(d, '#6b7480', 3)).join('') +
  rect(188, 92, 24, 40, 5, 'url(#gDark)') +
  rect(104, 110, 10, 100, 5, 'url(#gDark)') + rect(286, 110, 10, 100, 5, 'url(#gDark)') +
  shine('M128 96L128 236', 0.55, 5)

art['non-stick-kadhai-tawa'] = () =>
  shadow(200, 264, 170, 12) +
  // kadhai
  line('M60 162L26 150', 'url(#gDark)', 11) + line('M254 162L288 150', 'url(#gDark)', 11) +
  path('M60 162C68 258 246 258 254 162Z', 'url(#gDark)') + mouth(157, 162, 97, 19, '#5b6270', '#0d0f13') + shine('M82 190Q96 238 140 246', 0.35, 5) +
  // tawa
  ell(314, 244, 76, 20, '#1a1c22') + ell(314, 240, 76, 20, 'url(#gDark)') + ell(314, 240, 60, 14, '#15171c') +
  rect(240, 234, 22, 12, 4, 'url(#gDark)') + rect(228, 236, 22, 8, 3, '#2a2e36')

art['pressure-cooker'] = () =>
  shadow(200, 268, 150, 12) +
  rect(90, 150, 34, 15, 6, 'url(#gDark)') + rect(276, 150, 34, 15, 6, 'url(#gDark)') +
  vessel(118, 142, 164, 120, 6, 'url(#gSteel)') +
  path('M110 148C110 108 290 108 290 148Z', 'url(#gSteel)') + ell(200, 148, 90, 7, 'url(#gSteelD)') +
  rect(158, 100, 84, 14, 7, 'url(#gDark)') + rect(194, 86, 14, 18, 3, 'url(#gDark)') + `<circle cx="201" cy="84" r="8" fill="#e0344c"/>` +
  shine('M136 170L140 246', 0.6, 6) + `<circle cx="200" cy="200" r="16" fill="#aab2bc" opacity=".35"/>`

art['glassware-serving-sets'] = () => {
  return (
    shadow(200, 268, 170, 12) +
    // serving bowls
    path('M40 168C40 250 160 250 160 168Z', 'url(#gGlass)', 'opacity=".85"') + ell(100, 168, 60, 11, '#dff1fb', 'stroke="#fff" stroke-width="2"') +
    shine('M56 186Q64 232 96 240', 0.9, 5) +
    path('M168 190C168 252 258 252 258 190Z', 'url(#gGlass)', 'opacity=".85"') + ell(213, 190, 45, 9, '#dff1fb', 'stroke="#fff" stroke-width="2"') +
    shine('M180 204Q186 238 208 244', 0.9, 4) +
    // tumblers
    [[296, 106], [342, 90], [320, 140]].map(([cx, h], i) =>
      `${vessel(cx - 22, 262 - (i === 2 ? 70 : h), 44, i === 2 ? 70 : h, 5, 'url(#gGlass)').replace('/>', ' opacity=".85"/>')}` +
      ell(cx, 262 - (i === 2 ? 70 : h), 22, 5, '#dff1fb', 'stroke="#fff" stroke-width="1.5"') +
      shine(`M${cx - 12} ${262 - (i === 2 ? 70 : h) + 12}L${cx - 10} 250`, 0.9, 3)
    ).join('')
  )
}

art['airtight-container-set'] = () =>
  shadow(200, 268, 175, 12) +
  rect(36, 160, 150, 98, 14, 'url(#gSteel)') + rect(30, 142, 162, 24, 10, 'url(#gTeal)') + rect(100, 134, 34, 12, 5, 'url(#gDark)') +
  rect(204, 186, 108, 72, 12, 'url(#gSteel)') + rect(198, 170, 120, 22, 9, 'url(#gBlue)') + rect(238, 163, 40, 10, 5, 'url(#gDark)') +
  rect(326, 212, 58, 46, 10, 'url(#gSteel)') + rect(321, 199, 68, 18, 8, 'url(#gRed)') + rect(344, 193, 22, 9, 4, 'url(#gDark)') +
  shine('M52 176L52 244', 0.6, 5) + shine('M218 198L218 246', 0.6, 4)

art['insulated-flask-bottles'] = () =>
  shadow(200, 268, 150, 12) +
  line('M168 74C130 74 120 120 128 160', 'url(#gDark)', 7) +
  rect(160, 66, 82, 40, 12, 'url(#gDark)') + rect(150, 98, 102, 164, 30, 'url(#gBlue)') + rect(150, 98, 102, 12, 6, '#1b2f55') +
  shine('M166 126L166 244', 0.55, 6) +
  rect(284, 150, 70, 112, 24, 'url(#gSteel)') + rect(292, 128, 54, 28, 10, 'url(#gRed)') + rect(284, 148, 70, 8, 4, 'url(#gDark)') + shine('M298 172L298 248', 0.65, 5)

// ---------- write files ----------
const dir = new URL('../public/images/products/', import.meta.url)
mkdirSync(dir, { recursive: true })
let n = 0
const missing = []
for (const p of products) {
  const s = slug(p)
  if (!art[s]) { missing.push(s); continue }
  writeFileSync(new URL(`${s}.svg`, dir), wrap(art[s]()))
  n++
}
console.log(`wrote ${n} illustrations`, missing.length ? `| no art for: ${missing.join(', ')}` : '')
