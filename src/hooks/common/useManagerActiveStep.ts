import { useCallback, useState } from "react";

export interface ManagerActiveStep {
  activeStep: number;
  upStep: () => void;
  downStep: () => void;
  resetSteps: () => void;
  stepsLength: number;
}

const INITIAL_STEP = 0;

export function useManagerActiveStep(stepsLength = 0): ManagerActiveStep {
  const [activeStep, setActiveStep] = useState<number>(INITIAL_STEP);

  const upStep = useCallback(
    () => setActiveStep((prevActiveStep) => prevActiveStep + 1),
    [setActiveStep]
  );

  const downStep = useCallback(
    () => setActiveStep((prevActiveStep) => prevActiveStep - 1),
    [setActiveStep]
  );

  const resetSteps = useCallback(() => {
    setActiveStep(INITIAL_STEP);
  }, [setActiveStep]);

  return {
    activeStep,
    upStep,
    downStep,
    resetSteps,
    stepsLength,
  };
}
