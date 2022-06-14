import CustomPalette from "./CustomPalette.js";
import CustomRenderer from "./CustomRenderer.js";

export default {
  __init__: ["paletteProvider", "customRenderer"],
  paletteProvider: ["type", CustomPalette],
  customRenderer: ["type", CustomRenderer],
};
