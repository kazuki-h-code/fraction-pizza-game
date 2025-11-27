import { useEffect, useState } from "react";
import { Application } from "pixi.js";

export function useScreenSize(app: Application) {
  const [screenSize, setScreenSize] = useState({
    width: app.screen.width,
    height: app.screen.height,
  });

  useEffect(() => {
    const handleResize = () => {
      setScreenSize({ width: app.screen.width, height: app.screen.height });
    };
    app.renderer.on("resize", handleResize);
    return () => {
      app.renderer.off("resize", handleResize);
    };
  }, [app]);

  return screenSize;
}
