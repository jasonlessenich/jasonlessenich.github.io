class ColorPalette {
  /**
   * Constructs a new ColorPalette object.
   *
   * @param {string} displayName The palette's display name.
   * @param {string} shortName The palette's short name.
   * @param {string} primaryColor The primary color.
   * @param {string} secondaryColor The secondary color.
   * @param {string} textColor The text color.
   * @param {string} highlightColor The highlight color.
   * @param {string} backgroundColor The background color.
   */
  constructor(
    displayName,
    shortName,
    primaryColor,
    secondaryColor,
    textColor,
    highlightColor,
    backgroundColor
  ) {
    this.displayName = displayName;
    this.shortName = shortName;
    this.primaryColor = primaryColor;
    this.secondaryColor = secondaryColor;
    this.textColor = textColor;
    this.highlightColor = highlightColor;
    this.backgroundColor = backgroundColor;
  }
}

/**
 * Applies the given color palette to the page.
 *
 * @param {ColorPalette} palette The color palette to apply.
 */
function applyColorPalette(palette) {
  var root = document.documentElement;
  root.style.setProperty("--primary-color", palette.primaryColor);
  root.style.setProperty("--secondary-color", palette.secondaryColor);
  root.style.setProperty("--text-color", palette.textColor);
  root.style.setProperty("--highlight-color", palette.highlightColor);
  root.style.setProperty("--background-color", palette.backgroundColor);
}

const dark = new ColorPalette(
  "Dark",
  "dark",
  "#87E882", // Primary
  "#73A9FF", // Secondary
  "#575656", // Text
  "#A3A3A3", // Highlight
  "#17191A" // Background
);

const light = new ColorPalette(
  "Light (Flashbang)",
  "light",
  "#1B8D53", // Primary
  "#2474f2", // Secondary
  "#575656", // Text
  "#3b3b3b", // Highlight
  "#FFFFFF" // Background
);

const palettes = [dark, light];

/**
 * Gets the color palette with the given short name.
 *
 * @param {string} str The string to check.
 * @returns {ColorPalette?} The color palette.
 */
function getPalette(str) {
  return (
    palettes.filter((palette) => palette.shortName === str).shift() || null
  );
}
