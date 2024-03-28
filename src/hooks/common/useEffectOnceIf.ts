import { EffectCallback, useEffect, useRef } from "react";

/**
 * Executes a side effect once if a specific condition is met.
 *
 * @param effect The side effect to be executed.
 * @param condition The condition that must be true to execute the effect.
 */
export const useEffectOnceIf = (effect: EffectCallback, condition: boolean) => {
  const hasRun = useRef<boolean>(false);

  useEffect(() => {
    if (condition && !hasRun.current) {
      const cleanup = effect();
      hasRun.current = true; // Mark that the effect has been executed

      return cleanup;
    }
  }, [condition, effect]); // Dependencies: effect and condition
};
