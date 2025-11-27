import { useScreenSize } from "../../hooks/useScreenSize";
import { useApplication } from "@pixi/react";

type Props = {
  virtualWidth: number;
  virtualHeight: number;
  children?: React.ReactNode;
};

export const ResizeContainer = ({
  virtualWidth,
  virtualHeight,
  children,
}: Props) => {
  const { app } = useApplication();
  const screenSize = useScreenSize(app);
  const scaleX = screenSize.width / virtualWidth;
  const scaleY = screenSize.height / virtualHeight;

  const scale = Math.min(scaleX, scaleY);

  const vw = virtualWidth * scale;
  const vh = virtualHeight * scale;
  const offsetX = (screenSize.width - vw) / 2;
  const offsetY = (screenSize.height - vh) / 2;

  return (
    <>
      <pixiContainer x={offsetX} y={offsetY} scale={scale}>
        {children}
      </pixiContainer>
    </>
  );
};
