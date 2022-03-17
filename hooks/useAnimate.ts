import { useEffect, useCallback, DependencyList } from "react";
import animateCSS from "../helpers/animateCSS";

const useAnimate = (
  element: string,
  animation: string,
  dependencies: DependencyList,
  exit: boolean = false
) => {
  const changeEffect = useCallback(async () => {
    await animateCSS(element, animation);
  }, [animation, element]);

  useEffect(() => {
    if (!exit) changeEffect();
    return () => {
      if (exit) changeEffect();
    };
  }, [changeEffect, exit, ...dependencies]);
};

export default useAnimate;
