// NOTE: needs the "sharp" package (npm i sharp, not part of the website itself). Run: W=720 SPP=12 EXPO=1.05 node scripts/render-products.mjs <scene> <out.jpg>
// Scenes: kadhai, handipatila, lotajug, thalibowl, degchi, kansa, steelthali
// Tiny path-style renderer: builds 3D models of utensils from signed-distance shapes and renders studio product shots.
// Usage: node render.mjs <scene> [out.jpg]     env: W=720 SPP=6
import sharp from 'sharp'

const W = +process.env.W || 720
const SPP = +process.env.SPP || 6
const sceneName = process.argv[2] || 'kadhai'
const outFile = process.argv[3] || `out-${sceneName}.jpg`

// ---------- maths ----------
const hyp = (a, b) => Math.sqrt(a * a + b * b)
const clamp = (x, a, b) => (x < a ? a : x > b ? b : x)
const sm = (e0, e1, x) => { const t = clamp((x - e0) / (e1 - e0), 0, 1); return t * t * (3 - 2 * t) }
const smin = (a, b, k) => { const h = Math.max(k - Math.abs(a - b), 0) / k; return Math.min(a, b) - h * h * k * 0.25 }
let seed = 12345
const rnd = () => { seed = (seed * 1664525 + 1013904223) >>> 0; return seed / 4294967296 }

// ---------- shapes ----------
// A thin-walled body of revolution described by a (radius, height) polyline.
function smoothPts(pts, sub = 7) {
  const P = (i) => pts[clamp(i, 0, pts.length - 1)], out = []
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = P(i - 1), p1 = P(i), p2 = P(i + 1), p3 = P(i + 2)
    for (let s = 0; s < sub; s++) {
      const t = s / sub, t2 = t * t, t3 = t2 * t
      out.push([0, 1].map((k) => 0.5 * (2 * p1[k] + (-p0[k] + p2[k]) * t + (2 * p0[k] - 5 * p1[k] + 4 * p2[k] - p3[k]) * t2 + (-p0[k] + 3 * p1[k] - 3 * p2[k] + p3[k]) * t3)))
    }
  }
  out.push(pts[pts.length - 1])
  return out
}
function lathe(pts, t, smooth = true) {
  if (smooth) pts = smoothPts(pts)
  const n = pts.length - 1
  return (x, y, z) => {
    const r = Math.sqrt(x * x + z * z)
    let best = 1e9
    for (let i = 0; i < n; i++) {
      const ax = pts[i][0], ay = pts[i][1], ex = pts[i + 1][0] - ax, ey = pts[i + 1][1] - ay
      const px = r - ax, py = y - ay
      let h = (px * ex + py * ey) / (ex * ex + ey * ey)
      h = h < 0 ? 0 : h > 1 ? 1 : h
      const dx = px - ex * h, dy = py - ey * h
      const d = dx * dx + dy * dy
      if (d < best) best = d
    }
    return Math.sqrt(best) - t
  }
}
const torusXZ = (x, y, z, R, r) => hyp(hyp(x, z) - R, y) - r // ring lying flat
const torusXY = (x, y, z, R, r) => hyp(hyp(x, y) - R, z) - r // ring standing, facing the camera
const sphere = (x, y, z, r) => Math.sqrt(x * x + y * y + z * z) - r

const arc = (cx, cy, R, a0, a1, n) =>
  Array.from({ length: n + 1 }, (_, i) => { const a = a0 + ((a1 - a0) * i) / n; return [R * Math.sin(a), cy - R * Math.cos(a)] })

// ---------- materials ----------
const MAT = {
  brass: { f0: [0.98, 0.64, 0.2], rough: 0.05, hammer: 0.5, diff: 0, alb: [0.8, 0.5, 0.15] },
  kansa: { f0: [0.80, 0.54, 0.27], rough: 0.14, hammer: 0.3, diff: 0.14, alb: [0.55, 0.36, 0.18] },
  steel: { f0: [0.84, 0.86, 0.89], rough: 0.04, hammer: 0, diff: 0.42, alb: [0.78, 0.8, 0.83] },
}

// ---------- objects: each has a bound (cx,cy,cz,r), a distance function in world space and a material ----------
const objs = []
function add(mat, bound, f, ox = 0, oz = 0, s = 1, oy = 0) {
  const [bx, by, bz, br] = bound
  objs.push({
    mat,
    b: [ox + bx * s, oy + by * s, oz + bz * s, br * s],
    f: (x, y, z) => f((x - ox) / s, (y - oy) / s, (z - oz) / s) * s,
  })
}

// vessel factories (local units, base on y=0)
const kadhaiShape = (() => {
  const body = lathe([[0, 0], ...arc(0, 0.94, 1, 0.348, 1.77, 20)], 0.022, false)
  const R = Math.sin(1.77), yt = 0.94 - Math.cos(1.77)
  return (x, y, z) => {
    let d = Math.max(body(x, y, z), y - yt - 0.04)
    d = smin(d, torusXZ(x, y - yt, z, R, 0.04), 0.03)
    for (const s of [-1, 1]) d = smin(d, torusXY(x - s * (R + 0.13), y - yt + 0.1, z, 0.14, 0.032), 0.03)
    return d
  }
})()

const handiBody = lathe([[0.22, 0], [0.5, 0.03], [0.75, 0.16], [0.92, 0.4], [0.98, 0.62], [0.94, 0.86], [0.8, 1.04], [0.66, 1.14], [0.64, 1.24], [0.7, 1.3]], 0.026)
const lidDome = lathe([[0.74, 1.3], [0.68, 1.36], [0.5, 1.45], [0.24, 1.51], [0.0, 1.53]], 0.024)
const handiShape = (x, y, z) => {
  let d = Math.min(handiBody(x, y, z), lidDome(x, y, z))
  d = smin(d, sphere(x, y - 1.6, z, 0.075), 0.04)
  d = smin(d, hyp(hyp(x, z), y - 1.56) - 0.04, 0.04)
  for (const s of [-1, 1]) d = smin(d, torusXY(x - s * 1.02, y - 0.78, z, 0.1, 0.028), 0.03)
  return d
}

const patilaBody = lathe([[0, 0], [0.74, 0], [0.8, 0.05], [0.88, 0.8], [0.9, 0.96]], 0.024)
const patilaLid = lathe([[0.93, 0.96], [0.84, 1.02], [0.56, 1.08], [0, 1.1]], 0.022)
const patilaShape = (x, y, z) => {
  let d = Math.min(patilaBody(x, y, z), patilaLid(x, y, z))
  d = smin(d, sphere(x, y - 1.17, z, 0.07), 0.04)
  d = smin(d, hyp(hyp(x, z), y - 1.13) - 0.035, 0.04)
  for (const s of [-1, 1]) d = smin(d, torusXY(x - s * 0.98, y - 0.82, z, 0.09, 0.026), 0.03)
  return d
}

const lotaShape = lathe([[0.22, 0], [0.5, 0.04], [0.72, 0.3], [0.76, 0.5], [0.62, 0.78], [0.42, 0.94], [0.4, 1.04], [0.48, 1.12]], 0.024)
const glassShape = lathe([[0, 0], [0.3, 0], [0.34, 0.05], [0.46, 0.9], [0.48, 1.0]], 0.02)
const bowlShape = lathe([[0, 0], [0.2, 0.02], [0.38, 0.1], [0.5, 0.28], [0.54, 0.42]], 0.018)
const plateShape = lathe([[0, 0.01], [0.8, 0.01], [0.92, 0.04], [1, 0.14], [1.02, 0.18]], 0.014)
const jugBody = lathe([[0, 0], [0.5, 0], [0.55, 0.05], [0.62, 1.0], [0.64, 1.5]], 0.024)
const jugShape = (x, y, z) => {
  let d = jugBody(x, y, z)
  d = smin(d, torusXZ(x, y - 1.5, z, 0.64, 0.03), 0.02)
  d = smin(d, torusXY(x - 0.86, y - 0.9, z, 0.38, 0.045), 0.05)
  return d
}
const degchiBody = lathe([[0, 0], [0.78, 0], [0.82, 0.04], [0.86, 1.0], [0.9, 1.1]], 0.026)
const degchiLid = lathe([[0.93, 1.1], [0.84, 1.17], [0.56, 1.24], [0, 1.27]], 0.024)
const degchiShape = (x, y, z) => {
  let d = Math.min(degchiBody(x, y, z), degchiLid(x, y, z))
  d = smin(d, sphere(x, y - 1.34, z, 0.075), 0.04)
  d = smin(d, hyp(hyp(x, z), y - 1.3) - 0.04, 0.04)
  for (const s of [-1, 1]) d = smin(d, torusXY(x - s * 0.96, y - 0.9, z, 0.1, 0.03), 0.03)
  return d
}

// ---------- scenes ----------
const B = { kadhai: [0, 0.6, 0, 1.35], handi: [0, 0.8, 0, 1.25], patila: [0, 0.55, 0, 1.2], lota: [0, 0.55, 0, 0.9], glass: [0, 0.5, 0, 0.62], bowl: [0, 0.2, 0, 0.7], plate: [0, 0.1, 0, 1.1], jug: [0, 0.8, 0, 1.5], degchi: [0, 0.7, 0, 1.2] }
// a thali with three bowls resting on it, and a glass beside it
const thali = (mat, cam, look, fov) => ({ cam, look, fov, build() {
  add(mat, B.plate, plateShape, 0, 0, 1.45)
  add(mat, B.bowl, bowlShape, -0.72, 0.42, 0.62, 0.02)
  add(mat, B.bowl, bowlShape, 0.5, 0.7, 0.6, 0.02)
  add(mat, B.bowl, bowlShape, 0.12, -0.55, 0.62, 0.02)
  add(mat, B.glass, glassShape, 2.0, 0.2, 0.62)
} })
const scenes = {
  kadhai: { cam: [0, 3.2, 5.6], look: [0, 0.52, 0], fov: 0.255, build() { add('brass', B.kadhai, kadhaiShape) } },
  handipatila: { cam: [0, 3.0, 7.2], look: [0, 0.65, 0], fov: 0.3, build() {
    add('brass', B.patila, patilaShape, -1.25, 0.3, 0.9)
    add('brass', B.handi, handiShape, 0.95, -0.1, 0.95)
  } },
  lotajug: { cam: [0.2, 3.0, 7.4], look: [0.3, 0.6, 0], fov: 0.37, build() {
    add('brass', B.jug, jugShape, -1.4, 0, 1.0)
    add('brass', B.lota, lotaShape, 0.4, 0.4, 0.7)
    add('brass', B.glass, glassShape, 1.4, -0.2, 0.85)
    add('brass', B.glass, glassShape, 2.05, 0.25, 0.72)
  } },
  thalibowl: thali('brass', [0, 4.6, 4.7], [0.55, 0.05, 0], 0.36),
  degchi: { cam: [0, 3.2, 7.6], look: [0, 0.75, 0], fov: 0.32, build() {
    add('brass', B.degchi, degchiShape, 0.75, -0.1, 1.15)
    add('brass', B.degchi, degchiShape, -1.35, 0.35, 0.85)
  } },
  kansa: thali('kansa', [0, 4.6, 4.7], [0.55, 0.05, 0], 0.36),
  steelthali: thali('steel', [0, 4.6, 4.7], [0.55, 0.05, 0], 0.36),
}

// ---------- scene evaluation ----------
let bestObj = -1
function map(x, y, z) {
  let best = y // floor
  for (let i = 0; i < objs.length; i++) {
    const o = objs[i]
    const db = Math.sqrt((x - o.b[0]) ** 2 + (y - o.b[1]) ** 2 + (z - o.b[2]) ** 2) - o.b[3]
    if (db >= best) continue
    const d = o.f(x, y, z)
    if (d < best) best = d
  }
  return best
}
function whichMat(x, y, z) {
  let best = y, id = -1
  for (let i = 0; i < objs.length; i++) {
    const d = objs[i].f(x, y, z)
    if (d < best) { best = d; id = i }
  }
  return id
}
function normal(x, y, z) {
  const e = 0.0012
  const a = map(x + e, y - e, z - e), b = map(x - e, y - e, z + e), c = map(x - e, y + e, z - e), d = map(x + e, y + e, z + e)
  let nx = a - b - c + d, ny = -a - b + c + d, nz = -a + b - c + d
  const l = Math.sqrt(nx * nx + ny * ny + nz * nz) || 1
  return [nx / l, ny / l, nz / l]
}
function march(ox, oy, oz, dx, dy, dz, tmax) {
  let t = 0.01
  for (let i = 0; i < 140; i++) {
    const d = map(ox + dx * t, oy + dy * t, oz + dz * t)
    if (d < 0.0004 + 0.0002 * t) return t
    t += d * 0.85
    if (t > tmax) break
  }
  return -1
}
function softShadow(px, py, pz, lx, ly, lz) {
  let res = 1, t = 0.03
  for (let i = 0; i < 48; i++) {
    const h = map(px + lx * t, py + ly * t, pz + lz * t)
    if (h < 0.0005) return 0
    res = Math.min(res, 9 * h / t)
    t += clamp(h, 0.02, 0.4)
    if (t > 8) break
  }
  return res * res * (3 - 2 * res) // smooth
}
function ao(px, py, pz, nx, ny, nz) {
  let occ = 0, sc = 1
  for (let i = 1; i <= 5; i++) {
    const h = 0.03 + 0.12 * i
    occ += (h - map(px + nx * h, py + ny * h, pz + nz * h)) * sc
    sc *= 0.75
  }
  return clamp(1 - 1.6 * occ, 0, 1)
}

// studio environment: soft boxes over a neutral dome
const L1 = (() => { const v = [-0.55, 0.85, 0.6]; const l = Math.hypot(...v); return v.map((c) => c / l) })()
function box(a, b, ca, cb, wa, wb) {
  return sm(0, 0.18, wa - Math.abs(a - ca)) * sm(0, 0.18, wb - Math.abs(b - cb))
}
function env(dx, dy, dz) {
  const az = Math.atan2(dx, dz), el = Math.asin(clamp(dy, -1, 1))
  const up = sm(-0.35, 0.9, dy)
  let v = 0.08 + 0.2 * up
  v += 5.0 * box(az, el, -0.8, 0.85, 0.5, 0.42) // key softbox, front left
  v += 2.2 * box(az, el, 1.1, 0.45, 0.36, 0.55) // fill softbox, right
  v += 2.6 * box(az, el, 2.5, 0.35, 0.12, 0.6) + 2.6 * box(az, el, -2.5, 0.35, 0.12, 0.6) // narrow back strips
  v += 1.4 * sm(1.2, 1.5, el) // overhead panel
  const floorTone = 1 - sm(-0.05, -0.5, dy) * 0.0
  return [v * 1.0 * floorTone, v * 0.98 * floorTone, v * 0.95 * floorTone]
}

// floor reflectivity and background
const FLOOR = [1.18, 1.14, 1.07]
const BG = [1.18, 1.14, 1.07]
function hash3(x, y, z) { const s = Math.sin(x * 127.1 + y * 311.7 + z * 74.7) * 43758.5453; return s - Math.floor(s) }
function vnoise(x, y, z) {
  const ix = Math.floor(x), iy = Math.floor(y), iz = Math.floor(z)
  const fx = x - ix, fy = y - iy, fz = z - iz
  const ux = fx * fx * (3 - 2 * fx), uy = fy * fy * (3 - 2 * fy), uz = fz * fz * (3 - 2 * fz)
  const h = (a, b, c) => hash3(ix + a, iy + b, iz + c)
  const l = (a, b, t) => a + (b - a) * t
  return l(
    l(l(h(0, 0, 0), h(1, 0, 0), ux), l(h(0, 1, 0), h(1, 1, 0), ux), uy),
    l(l(h(0, 0, 1), h(1, 0, 1), ux), l(h(0, 1, 1), h(1, 1, 1), ux), uy), uz)
}

function shade(ox, oy, oz, dx, dy, dz, depth) {
  const t = march(ox, oy, oz, dx, dy, dz, 40)
  if (t < 0) return depth === 0 ? BG.map((c) => c * 1.55) : env(dx, dy, dz)
  const px = ox + dx * t, py = oy + dy * t, pz = oz + dz * t
  const id = whichMat(px, py, pz)
  if (id < 0) { // floor
    const sh = softShadow(px, 0.002, pz, L1[0], L1[1], L1[2])
    const occ = ao(px, 0.001, pz, 0, 1, 0)
    const lit = 0.58 * occ + 0.5 * sh * L1[1]
    let c = [FLOOR[0] * lit, FLOOR[1] * lit, FLOOR[2] * lit]
    if (depth === 0) {
      const f = (0.02 + 0.05 * Math.pow(1 - Math.abs(dy), 4)) * clamp(1 - (t - 6) / 6, 0, 1)
      const r = shade(px, 0.003, pz, dx, -dy, dz, 1)
      c = [c[0] * (1 - f) + r[0] * f, c[1] * (1 - f) + r[1] * f, c[2] * (1 - f) + r[2] * f]
    }
    return depth === 0 ? c.map((v) => v * 1.55) : c
  }
  const m = MAT[objs[id].mat]
  let [nx, ny, nz] = normal(px, py, pz)
  if (m.hammer) { // hand-beaten surface
    const k = 9, e = 0.05, a = 0.018 * m.hammer
    const n0 = vnoise(px * k, py * k, pz * k)
    nx += a * (vnoise(px * k + e, py * k, pz * k) - n0) / e
    ny += a * (vnoise(px * k, py * k + e, pz * k) - n0) / e
    nz += a * (vnoise(px * k, py * k, pz * k + e) - n0) / e
    const l = Math.hypot(nx, ny, nz); nx /= l; ny /= l; nz /= l
  }
  const cosT = clamp(-(dx * nx + dy * ny + dz * nz), 0.02, 1)
  const fr = Math.pow(1 - cosT, 5)
  const F = m.f0.map((f) => f + (1 - f) * fr)
  let rx = dx + 2 * cosT * nx, ry = dy + 2 * cosT * ny, rz = dz + 2 * cosT * nz
  rx += (rnd() - 0.5) * m.rough * 2; ry += (rnd() - 0.5) * m.rough * 2; rz += (rnd() - 0.5) * m.rough * 2
  const rl = Math.hypot(rx, ry, rz); rx /= rl; ry /= rl; rz /= rl
  const occ = ao(px, py, pz, nx, ny, nz)
  const refl = depth < 2 ? shade(px + nx * 0.004, py + ny * 0.004, pz + nz * 0.004, rx, ry, rz, depth + 1) : env(rx, ry, rz)
  const k = 0.55 + 0.45 * occ
  const lit = 0.6 + 0.4 * Math.max(0, nx * L1[0] + ny * L1[1] + nz * L1[2])
  const dd = m.diff * lit * occ
  return [F[0] * refl[0] * k + m.alb[0] * dd, F[1] * refl[1] * k + m.alb[1] * dd, F[2] * refl[2] * k + m.alb[2] * dd]
}

// ---------- render ----------
const S = scenes[sceneName]
if (!S) throw new Error('unknown scene ' + sceneName)
S.build()
const cam = S.cam, look = S.look
const fw = (() => { const v = [look[0] - cam[0], look[1] - cam[1], look[2] - cam[2]]; const l = Math.hypot(...v); return v.map((c) => c / l) })()
const rt = (() => { const v = [-fw[2], 0, fw[0]]; const l = Math.hypot(...v); return v.map((c) => c / l) })()
const up = [rt[1] * fw[2] - rt[2] * fw[1], rt[2] * fw[0] - rt[0] * fw[2], rt[0] * fw[1] - rt[1] * fw[0]]

const buf = Buffer.alloc(W * W * 3)
const EXPO = +process.env.EXPO || 1.0
const t0 = Date.now()
for (let j = 0; j < W; j++) {
  for (let i = 0; i < W; i++) {
    let r = 0, g = 0, b = 0
    for (let s = 0; s < SPP; s++) {
      const u = ((i + rnd()) / W - 0.5) * 2 * S.fov, v = (0.5 - (j + rnd()) / W) * 2 * S.fov
      let dx = fw[0] + rt[0] * u + up[0] * v, dy = fw[1] + rt[1] * u + up[1] * v, dz = fw[2] + rt[2] * u + up[2] * v
      const l = Math.hypot(dx, dy, dz); dx /= l; dy /= l; dz /= l
      const c = shade(cam[0], cam[1], cam[2], dx, dy, dz, 0)
      r += c[0]; g += c[1]; b += c[2]
    }
    const px = [r / SPP, g / SPP, b / SPP].map((c) => {
      c *= EXPO
      c = (c * (1 + c / 6)) / (1 + c) // soft highlight roll-off
      return Math.round(255 * Math.pow(clamp(c, 0, 1), 1 / 2.2))
    })
    // gentle vignette
    const vx = (i / W - 0.5) * 2, vy = (j / W - 0.5) * 2, vg = 1 - 0.1 * (vx * vx + vy * vy)
    const o = (j * W + i) * 3
    buf[o] = clamp(px[0] * vg, 0, 255); buf[o + 1] = clamp(px[1] * vg, 0, 255); buf[o + 2] = clamp(px[2] * vg, 0, 255)
  }
}
await sharp(buf, { raw: { width: W, height: W, channels: 3 } }).resize(900, 900, { kernel: 'lanczos3' }).jpeg({ quality: 90 }).toFile(outFile)
console.log('rendered', sceneName, W + 'px', SPP + 'spp', ((Date.now() - t0) / 1000).toFixed(1) + 's')
