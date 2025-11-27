import { Graphics, TextStyle } from "pixi.js";
import { useCallback } from "react";
import { Button } from "./Button";
import { Overlay } from "./Overlay";
import { ResizeContainer } from "../core/ResizeContainer";

type FeedbackDisplayProps = {
  status: "correct" | "wrong";
  history: {
    numerator: number;
    denominator: number;
    result: "pending" | "correct" | "wrong";
  }[];
  maxQuestion: number;
  virtualWidth: number;
  virtualHeight: number;
  onNextQuestion: () => void;
};

export const FeedbackDisplay = ({
  status,
  history,
  maxQuestion,
  virtualWidth,
  virtualHeight,
  onNextQuestion,
}: FeedbackDisplayProps) => {
  const correntCount = history.filter((h) => h.result === "correct").length;
  const total = history.length;

  const feedbackText = status === "correct" ? "せいかい！" : "ざんねん！";
  const textColor = status === "correct" ? "0x4caf50" : "0xf44336";

  const drawShape = useCallback(
    (g: Graphics) => {
      g.clear();
      if (status === "correct") {
        g.circle(0, 0, 100).stroke({
          color: 0x4caf50,
          width: 15,
        });
      } else {
        g.moveTo(-70, -70)
          .lineTo(70, 70)
          .moveTo(70, -70)
          .lineTo(-70, 70)
          .stroke({ color: 0xf44336, width: 15 });
      }
    },
    [status],
  );

  return (
    <>
      <Overlay />
      <ResizeContainer
        virtualWidth={virtualWidth}
        virtualHeight={virtualHeight}
      >
        <pixiContainer x={virtualWidth * 0.5} y={virtualHeight * 0.5}>
          <pixiGraphics draw={drawShape} />
          <pixiText
            text={feedbackText}
            y={140}
            anchor={0.5}
            style={
              new TextStyle({
                fontSize: 40,
                fill: textColor,
                fontWeight: "bold",
                stroke: "white",
              })
            }
          />
          <pixiText
            text={`ここまでのせいかい数: ${correntCount} / ${total}`}
            y={200}
            anchor={0.5}
            style={
              new TextStyle({
                fontSize: 24,
                fill: "white",
              })
            }
          />
          <Button
            text={history.length != maxQuestion ? "つぎのもんだいへ" : "おわる"}
            x={0}
            y={250}
            width={history.length != maxQuestion ? 220 : 150}
            onClick={onNextQuestion}
          />
        </pixiContainer>
      </ResizeContainer>
    </>
  );
};
