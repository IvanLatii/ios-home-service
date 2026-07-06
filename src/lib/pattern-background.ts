import type { CSSProperties } from "react";

/**
 * Shared "pattern" + brand gradient background used behind the status bar /
 * top header on every screen (Figma layer "pattern", baked to 10% opacity).
 * The pattern is pre-baked into `pattern-10.png` and combined with the blue
 * gradient as a second `background-image` layer so it always paints as the
 * bottom-most layer, regardless of sibling stacking order.
 */
export function getPatternGradientBackground(angleDeg: number): CSSProperties {
  return {
    backgroundImage: `url(/figma/pattern-10.png), linear-gradient(${angleDeg}deg, var(--color-hs-blue-500) 0%, var(--color-hs-blue-800) 47.617%)`,
    backgroundSize: "1024px 1024px, auto",
    backgroundPosition: "top left, top left",
    backgroundRepeat: "no-repeat, no-repeat",
  };
}
