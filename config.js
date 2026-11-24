// =============================================================
//  TaponTama settings — this is the ONLY file you usually edit.
// =============================================================
const TAPONTAMA_CONFIG = {
  // Where the Teachable Machine model is.
  //  - Downloaded model (recommended): put model.json, metadata.json
  //    and weights.bin inside the "model" folder and keep "./model/".
  //  - Or paste your Teachable Machine shareable link, e.g.
  //    "https://teachablemachine.withgoogle.com/models/AbC123xyz/"
  //  - Leave it as "" to run DEMO mode (fake results, for trying the screens).
  MODEL_URL: "./model/",

  // Below this confidence the app says "Not sure" instead of showing a bin.
  // 0.70 = 70%. Change it only if your Phase 3 testing shows a better value.
  THRESHOLD: 0.70,

  // One entry per class. The key must match the class name you typed in
  // Teachable Machine (capital letters do not matter).
  // Bin names and colours below follow the PUP Santa Rosa campus bins
  // (confirmed with campus staff): Blue = Biodegradable, Green = Recyclable,
  // Red = Residual. Tissue and styro go to Recyclable on campus.
  CLASSES: {
    "biodegradable": {
      label: "Biodegradable",
      bin: "Blue bin",             // confirmed with campus staff
      color: "#1565c0",
      tip: "Food scraps, peels, leaves and eggshells only. Shake out any plastic or sachet first."
    },
    "recyclable": {
      label: "Recyclable",
      bin: "Green bin",            // confirmed with campus staff
      color: "#2e7d32",
      tip: "Bottles, cans, paper, tissue and styro go here. Empty and rinse bottles and cans first. If a container is greasy or has food stuck on it, it goes to Residual instead."
    },
    "residual": {
      label: "Residual",
      bin: "Red bin",              // confirmed with campus staff
      color: "#c62828",
      tip: "Sachets, candy and chip wrappers, and greasy food containers go here. Fold sachets small so they take less space."
    },
    "no item": {
      label: "No item",
      isEmpty: true                // the background class: never shown as a bin
    }
  }
};
