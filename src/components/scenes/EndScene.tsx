import { TextStyle } from "pixi.js";
import { Button } from "../ui/Button";
import { useLayout } from "../../contexts/layoutContext";
import { ResizeContainer } from "../core/ResizeContainer";

export const EndScene = ({ onBackTotitle }: { onBackTotitle: () => void }) => {
  const { virtual } = useLayout();
  return (
    <>
      <ResizeContainer
        virtualWidth={virtual.width}
        virtualHeight={virtual.height}
      >
        <pixiText
          text="がんばったね！"
          anchor={0.5}
          x={virtual.width * 0.5}
          y={virtual.height * 0.35}
          style={new TextStyle({ fontSize: 60, fill: "white" })}
        />
        <Button
          text="タイトルへ"
          x={virtual.width * 0.5}
          y={virtual.height * 0.6}
          onClick={onBackTotitle}
        />
      </ResizeContainer>
    </>
  );
};
