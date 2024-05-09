import { SeedColors } from "./backgroundColor";

interface Props extends SeedColors {
  emoji: string;
  size: number;
}

export function generateEmojiAvatarSVG({
  emoji,
  backgroundColor,
  color1,
  color2,
  size,
}: Props): SVGElement {
  const svgNS = "http://www.w3.org/2000/svg";

  const svg: SVGElement = document.createElementNS(svgNS, "svg");
  svg.setAttribute("width", size.toString());
  svg.setAttribute("height", size.toString());
  svg.setAttribute("viewBox", "0 0 100 100");

  const backgroundRect: SVGRectElement = document.createElementNS(
    svgNS,
    "rect"
  );
  backgroundRect.setAttribute("width", "100");
  backgroundRect.setAttribute("height", "100");
  backgroundRect.setAttribute("fill", backgroundColor);
  svg.appendChild(backgroundRect);

  const defs: SVGDefsElement = document.createElementNS(svgNS, "defs");
  const linearGradient: SVGLinearGradientElement = document.createElementNS(
    svgNS,
    "linearGradient"
  );
  linearGradient.setAttribute("id", "emojiGradient");
  linearGradient.setAttribute("x1", "0%");
  linearGradient.setAttribute("y1", "0%");
  linearGradient.setAttribute("x2", "100%");
  linearGradient.setAttribute("y2", "100%");

  const stop1: SVGStopElement = document.createElementNS(svgNS, "stop");
  stop1.setAttribute("offset", "0%");
  stop1.setAttribute("stop-color", color1);

  const stop2: SVGStopElement = document.createElementNS(svgNS, "stop");
  stop2.setAttribute("offset", "100%");
  stop2.setAttribute("stop-color", color2);

  linearGradient.appendChild(stop1);
  linearGradient.appendChild(stop2);
  defs.appendChild(linearGradient);
  svg.appendChild(defs);

  const text: SVGTextElement = document.createElementNS(svgNS, "text");
  text.setAttribute("x", "50");
  text.setAttribute("y", "60");
  text.setAttribute("text-anchor", "middle");
  text.setAttribute("font-size", "50");
  text.setAttribute("dominant-baseline", "middle");
  text.setAttribute("fill", "url(#emojiGradient)");
  text.textContent = emoji;
  svg.appendChild(text);

  return svg;
}
