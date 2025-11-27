import { Graphics } from "pixi.js";
import { useState } from "react";
import { useLayout } from "../../contexts/layoutContext";
import { Overlay } from "./Overlay";
import { Button } from "./Button";
import { ResizeContainer } from "../core/ResizeContainer";

export const HowToOverlay = () => {
  const [showHowTo, setShowHowTo] = useState(false);
  const [page, setPage] = useState(1);

  const { virtual, isPortrait } = useLayout();

  return (
    <>
      <ResizeContainer
        virtualWidth={virtual.width}
        virtualHeight={virtual.height}
      >
        <Button
          text={"？"}
          x={virtual.width * 0.9}
          y={virtual.height * 0.05}
          onClick={() => {
            setShowHowTo(true);
          }}
          width={50}
          height={50}
          radius={25}
        />
      </ResizeContainer>
      {showHowTo && (
        <>
          <Overlay />
          <ResizeContainer
            virtualWidth={virtual.width}
            virtualHeight={virtual.height}
          >
            <pixiGraphics
              draw={(g: Graphics) => {
                g.clear();
                g.filletRect(
                  virtual.width * 0.05,
                  isPortrait ? virtual.height * 0.15 : virtual.height * 0.1,
                  virtual.width * 0.9,
                  isPortrait ? virtual.height * 0.7 : virtual.height * 0.8,
                  20,
                ).fill({ color: 0xffffff });
              }}
            />
            <Button
              text={"×"}
              x={virtual.width * 0.85}
              y={virtual.height * 0.2}
              onClick={() => {
                setShowHowTo(false);
                setPage(1);
              }}
              fontsize={50}
              width={50}
              height={50}
              radius={25}
            />
            {page === 1 && (
              <>
                <pixiText
                  text={"あそび方"}
                  x={virtual.width * 0.1}
                  y={isPortrait ? virtual.height * 0.2 : virtual.height * 0.15}
                  style={{
                    fill: "black",
                    fontSize: isPortrait
                      ? virtual.width * 0.06
                      : virtual.width * 0.05,
                    fontWeight: "bold",
                  }}
                />
                <pixiText
                  text={`おだいの分数に合わせてピザを分けてみよう`}
                  x={virtual.width * 0.1}
                  y={isPortrait ? virtual.height * 0.27 : virtual.height * 0.25}
                  style={{
                    fill: "black",
                    fontSize: isPortrait
                      ? virtual.width * 0.04
                      : virtual.width * 0.035,
                  }}
                />
                <pixiText
                  text={`1. まずは分母に合うようにピザを切ろう`}
                  x={virtual.width * 0.1}
                  y={isPortrait ? virtual.height * 0.33 : virtual.height * 0.37}
                  style={{
                    fill: "black",
                    fontSize: virtual.width * 0.03,
                  }}
                />
                <pixiText
                  text={`2. つぎは分子に合うように切れはしをえらぼう `}
                  x={virtual.width * 0.1}
                  y={isPortrait ? virtual.height * 0.39 : virtual.height * 0.49}
                  style={{
                    fill: "black",
                    fontSize: virtual.width * 0.03,
                  }}
                />
                <Button
                  text={">"}
                  x={virtual.width * 0.7}
                  y={virtual.height * 0.8}
                  onClick={() => setPage(2)}
                  width={80}
                />
              </>
            )}
            {page === 2 && (
              <>
                <pixiText
                  text={"ヒント"}
                  x={virtual.width * 0.1}
                  y={isPortrait ? virtual.height * 0.2 : virtual.height * 0.15}
                  style={{
                    fill: "black",
                    fontSize: isPortrait
                      ? virtual.width * 0.06
                      : virtual.width * 0.05,
                    fontWeight: "bold",
                  }}
                />
                <pixiText
                  text={`分母とは？`}
                  x={virtual.width * 0.1}
                  y={isPortrait ? virtual.height * 0.29 : virtual.height * 0.28}
                  style={{
                    fill: "black",
                    fontSize: isPortrait
                      ? virtual.width * 0.04
                      : virtual.width * 0.035,
                    fontWeight: "bold",
                  }}
                />
                <pixiText
                  text={`分数の下の数字で、いくつに分けるかをしめす数だよ`}
                  x={virtual.width * 0.1}
                  y={isPortrait ? virtual.height * 0.33 : virtual.height * 0.35}
                  style={{
                    fill: "black",
                    fontSize: virtual.width * 0.03,
                  }}
                />
                <pixiText
                  text={`分子とは？`}
                  x={virtual.width * 0.1}
                  y={isPortrait ? virtual.height * 0.42 : virtual.height * 0.45}
                  style={{
                    fill: "black",
                    fontSize: isPortrait
                      ? virtual.width * 0.04
                      : virtual.width * 0.035,
                    fontWeight: "bold",
                  }}
                />
                <pixiText
                  text={`分数の上の数字で、分けたものがいくつあるかを\nしめす数だよ`}
                  x={virtual.width * 0.1}
                  y={isPortrait ? virtual.height * 0.46 : virtual.height * 0.52}
                  style={{
                    fill: "black",
                    fontSize: virtual.width * 0.03,
                  }}
                />
                <Button
                  text={"<"}
                  x={virtual.width * 0.3}
                  y={virtual.height * 0.8}
                  onClick={() => setPage(1)}
                  width={80}
                />
              </>
            )}
            <pixiText
              text={`${page} / 2`}
              x={virtual.width * 0.5}
              y={virtual.height * 0.8}
              anchor={0.5}
              style={{
                fill: "black",
                fontSize: virtual.width * 0.05,
              }}
            />
          </ResizeContainer>
        </>
      )}
    </>
  );
};
