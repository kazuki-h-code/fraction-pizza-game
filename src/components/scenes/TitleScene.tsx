import { TextStyle } from "pixi.js";
import { Button } from "../ui/Button";
import { useLayout } from "../../contexts/layoutContext";
import { ResizeContainer } from "../core/ResizeContainer";
import { HowToOverlay } from "../ui/HowToOverlay";

type Props = {
  onStart: () => void;
};

export const TitleScene = ({ onStart }: Props) => {
  const { virtual } = useLayout();
  return (
    <>
      <ResizeContainer
        virtualWidth={virtual.width}
        virtualHeight={virtual.height}
      >
        <pixiText
          text="分数ピザゲーム"
          anchor={0.5}
          x={virtual.width * 0.5}
          y={virtual.height * 0.35}
          style={new TextStyle({ fontSize: 60, fill: "white" })}
        />
        <Button
          text="START"
          x={virtual.width * 0.5}
          y={virtual.height * 0.6}
          onClick={onStart}
        />
      </ResizeContainer>
      <HowToOverlay />
    </>
  );
};
