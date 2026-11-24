// =============================================================
//  TaponTama shared code: loads the model and runs predictions.
//  Used by index.html (the app) and evaluate.html (testing).
// =============================================================
const TT = (() => {
  const cfg = TAPONTAMA_CONFIG;
  const LIBS = [
    "https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@1.3.1/dist/tf.min.js",
    "https://cdn.jsdelivr.net/npm/@teachablemachine/image@0.8/dist/teachablemachine-image.min.js"
  ];
  let model = null;
  let labels = [];
  const demo = !cfg.MODEL_URL || new URLSearchParams(location.search).has("demo");

  function loadScript(src) {
    return new Promise((resolve, reject) => {
      const s = document.createElement("script");
      s.src = src;
      s.onload = resolve;
      s.onerror = () => reject(new Error("Could not load " + src + ". Check your internet connection."));
      document.head.appendChild(s);
    });
  }

  // Find the config key for a class name from the model.
  // Forgiving on purpose: ignores capital letters, extra spaces and a cut-off
  // ending such as "Biodegradabl..." (Teachable Machine can shorten long names).
  function norm(x) { return String(x).toLowerCase().replace(/[\u2026.]+$/, "").replace(/[^a-z0-9 ]/g, "").replace(/\s+/g, " ").trim(); }
  function keyOf(className) {
    const n = norm(className);
    const keys = Object.keys(cfg.CLASSES);
    return keys.find(k => norm(k) === n) ||
           keys.find(k => n.length >= 4 && (norm(k).startsWith(n) || n.startsWith(norm(k)))) ||
           n;
  }

  // Look up the display info for a class name from the model.
  function info(className) {
    return cfg.CLASSES[keyOf(className)] || { label: className, bin: className, color: "#555", tip: "" };
  }

  async function load() {
    if (demo) {
      labels = Object.values(cfg.CLASSES).map(c => c.label);
      return { demo: true, labels };
    }
    for (const src of LIBS) await loadScript(src);
    let base = cfg.MODEL_URL;
    if (!base.endsWith("/")) base += "/";
    model = await tmImage.load(base + "model.json", base + "metadata.json");
    labels = model.getClassLabels();
    const unknown = labels.filter(l => !cfg.CLASSES[keyOf(l)]);
    return { demo: false, labels, unknown };
  }

  // Returns [{className, probability}] sorted from highest to lowest.
  // In demo mode the result is fake; "hint" (a true class) makes it lean
  // toward that class so the evaluate page can be tried without a model.
  async function predict(el, hint) {
    let out;
    if (demo) {
      await new Promise(r => setTimeout(r, 120));
      // the app has no true class, so pick one at random; sometimes weak, to show "Not sure"
      const pick = () => labels[Math.floor(Math.random() * labels.length)];
      const h = hint && Math.random() < 0.8 ? hint : pick();
      const boost = Math.random() < 0.75 ? 6 : 0.8;
      const raw = labels.map(l => Math.random() + (l.toLowerCase() === h.toLowerCase() ? boost : 0));
      const sum = raw.reduce((a, b) => a + b, 0);
      out = labels.map((l, i) => ({ className: l, probability: raw[i] / sum }));
    } else {
      out = await model.predict(el);
    }
    return out.slice().sort((a, b) => b.probability - a.probability);
  }

  // Decide what the app should show for a prediction.
  function decide(preds) {
    const top = preds[0];
    const i = info(top.className);
    if (i.isEmpty) return { kind: "noitem", top, info: i };
    if (top.probability < cfg.THRESHOLD) return { kind: "notsure", top, info: i };
    return { kind: "bin", top, info: i };
  }

  // Draw any image/video into a canvas (max 1024 px on the long side).
  function toCanvas(src, w, h) {
    const scale = Math.min(1, 1024 / Math.max(w, h));
    const c = document.createElement("canvas");
    c.width = Math.round(w * scale);
    c.height = Math.round(h * scale);
    c.getContext("2d").drawImage(src, 0, 0, c.width, c.height);
    return c;
  }

  function fileToImage(file) {
    return new Promise((resolve, reject) => {
      const url = URL.createObjectURL(file);
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = () => reject(new Error("Could not open " + file.name));
      img.src = url;
    });
  }

  return { cfg, demo, load, predict, decide, info, keyOf, toCanvas, fileToImage, get labels() { return labels; } };
})();
