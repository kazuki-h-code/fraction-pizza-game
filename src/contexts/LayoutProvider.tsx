import { useApplication } from "@pixi/react";
import { useScreenSize } from "../hooks/useScreenSize";
import { useMemo } from "react";
import LayoutContext from "./layoutContext";

type Props = { children?: React.ReactNode };

export const LayoutProvider = ({ children }: Props) => {
  const { app } = useApplication();
  const screen = useScreenSize(app);
  const isPortrait = screen.height > screen.width;

  const value = useMemo(
    () => ({
      screen: { width: screen.width, height: screen.height },
      isPortrait,
      virtual: isPortrait
        ? { width: 600, height: 900 }
        : { width: 800, height: 600 },
    }),
    [isPortrait, screen.height, screen.width],
  );

  return <LayoutContext value={value}>{children}</LayoutContext>;
};
