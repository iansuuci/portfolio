import { injectSpeedInsights } from "@vercel/speed-insights";
import initScrollReveal from "./scripts/scrollReveal";
import initTiltEffect from "./scripts/tiltAnimation";
import initThemeToggle from "./scripts/themeToggle";
import initNowPlaying from "./scripts/nowPlaying";
import initPaperPreviews from "./scripts/paperPreview";
import { targetElements, defaultProps } from "./data/scrollRevealConfig";

injectSpeedInsights();
initScrollReveal(targetElements, defaultProps);
initTiltEffect();
initThemeToggle();
initNowPlaying();
initPaperPreviews();
