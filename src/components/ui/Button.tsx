import { Graphics, TextStyle } from "pixi.js";
import { useState, useCallback } from "react";

type ButtonProps = {
  text: string;
  x: number;
  y: number;
  fontsize?: number;
  width?: number;
  height?: number;
  radius?: number;
  onClick: () => void;
};

export const Button = ({
  text,
  x,
  y,
  onClick,
  fontsize = 24,
  width = 150,
  height = 50,
  radius = 10,
}: ButtonProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  const draw = useCallback(
    (g: Graphics) => {
      const color = isPressed ? 0x1565c0 : isHovered ? 0x42a5f5 : 0x1976d2;
      g.clear();
      g.filletRect(-width / 2, -height / 2, width, height, radius)
        .stroke({
          color: color,
          width: 1,
        })
        .fill(color);
    },
    [height, isHovered, isPressed, radius, width],
  );

  const scale = isPressed ? 0.95 : 1;

  return (
    <pixiContainer
      x={x}
      y={y}
      scale={scale}
      interactive={true}
      onPointerOver={() => setIsHovered(true)}
      onPointerOut={() => {
        setIsHovered(false);
        setIsPressed(false);
      }}
      onPointerDown={() => setIsPressed(true)}
      onPointerUp={() => {
        setIsPressed(false);
        onClick();
      }}
      onPointerUpOutside={() => setIsHovered(false)}
    >
      <pixiGraphics draw={draw} />
      <pixiText
        text={text}
        anchor={0.5}
        x={0}
        y={0}
        style={
          new TextStyle({
            fill: "white",
            fontSize: fontsize,
          })
        }
      />
    </pixiContainer>
  );
};
