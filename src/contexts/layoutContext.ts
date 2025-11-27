import { createContext, useContext } from "react";

type Size = { width: number; height: number };
type Virtual = { width: number; height: number };
const LayoutContext = createContext<{
  screen: Size;
  virtual: Virtual;
  isPortrait: boolean;
} | null>(null);
export default LayoutContext;

export const useLayout = () => {
  const layout = useContext(LayoutContext);
  if (!layout) throw new Error("useLayout must be used within LayoutProvider");
  return layout;
};
