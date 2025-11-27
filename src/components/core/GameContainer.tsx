import { SceneManager } from "./SceneManager";
import { Container, Graphics, Text } from "pixi.js";
import { Application, extend } from "@pixi/react";
import { LayoutProvider } from "../../contexts/LayoutProvider";

extend({ Container, Graphics, Text });

export const GameContainer = () => {
  return (
    <>
      <Application antialias={true} background={"0x81d4fa"} resizeTo={window}>
        <LayoutProvider>
          <SceneManager />
        </LayoutProvider>
      </Application>
    </>
  );
};
