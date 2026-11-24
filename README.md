# TaponTama: AI Waste-Sorting Helper

ELECT IT-E1 Applied Machine Learning · Final Project · PUP Santa Rosa Campus

TaponTama is a web app. You take a photo of one piece of trash, and it tells you
which bin the item goes in (Biodegradable, Recyclable or Residual), with a tip
on how to throw it away. The image-classification model was trained in Google
Teachable Machine and runs on the phone with TensorFlow.js. Photos are never
uploaded.

## Files
| File | What it is |
| --- | --- |
| `index.html` | The app (scan, result, not sure, about screens) |
| `evaluate.html` | Testing page: confusion matrix, accuracy, precision and recall on unseen photos |
| `config.js` | Settings: model location, 70% threshold, bin names, colours, tips |
| `tapontama.js` | Shared code that loads the model and runs predictions |
| `model/` | The exported Teachable Machine model (model.json, metadata.json, weights.bin) |

## Run it
- Live: `https://<your-github-username>.github.io/tapontama/`
- Demo without a model: add `?demo` to the link (fake results, only for trying the screens).
- Locally: run `python -m http.server` in this folder and open `http://localhost:8000`.
  Opening the HTML file by double-clicking will NOT work, because browsers block the model files.

## Group
MANALO, Kevin Brian A. · SANTOS, Justin Gian R. · OLICIA, Josiah David ·
DELFINO, Jose Manuel D. · ANCHETA, Nico Angelo S.

## AI tool disclosure
Claude (Anthropic) was used to help write the code in this repository. The
group reviewed it, tested it and can explain every part.
