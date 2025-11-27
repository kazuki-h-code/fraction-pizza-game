import { Graphics } from "pixi.js";
import { useCallback } from "react";
import { useLayout } from "../../contexts/layoutContext";

export const Overlay = () => {
  const { screen } = useLayout();
  const drawOverlay = useCallback(
    (g: Graphics) => {
      g.clear();
      g.filletRect(0, 0, screen.width, screen.height, 0).fill({
        color: 0x000000,
        alpha: 0.5,
      });
    },
    [screen.width, screen.height],
  );

  return <pixiGraphics draw={drawOverlay} interactive={true} />;
};
