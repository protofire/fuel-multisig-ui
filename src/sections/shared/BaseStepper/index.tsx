import { Step, Stepper, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import React from "react";

import { ManagerActiveStep } from "@/hooks/common/useManagerActiveStep";

import { StyledStepLabel } from "./styled";

export type StepType = {
  id: number;
  name: string;
  label?: string;
  Component: React.ReactNode;
};

export type BaseStepperProps = {
  isExecuting?: boolean;
  managerStep: ManagerActiveStep;
  steps: StepType[];
};

export const transformSteps = (
  steps: Array<
    Omit<StepType, "Component"> & {
      Component: React.FC<unknown>;
    }
  >
): StepType[] => {
  return steps.map((step) => ({
    id: step.id,
    name: step.name,
    label: step.label,
    Component: React.createElement(step.Component),
  }));
};

export function BaseStepper({
  isExecuting = false,
  managerStep,
  steps,
}: BaseStepperProps) {
  const theme = useTheme();
  const { activeStep } = managerStep;

  return (
    <Box display="flex" flexDirection="row">
      <Box
        p={5}
        sx={{
          background: isExecuting
            ? theme.palette.grey.A100
            : theme.palette.grey.A200,
        }}
        width={1 / 3}
      >
        <Stepper activeStep={activeStep} orientation="vertical">
          {steps.map((step) => {
            return (
              <Step key={step.id}>
                <StyledStepLabel
                  active={activeStep === step.id ? 1 : 0}
                  completed={activeStep > step.id ? 1 : 0}
                >
                  <Typography>{step.name}</Typography>
                </StyledStepLabel>
              </Step>
            );
          })}
        </Stepper>
      </Box>
      <Box sx={{ background: theme.palette.grey.A100 }} width={2 / 3}>
        <Box>
          <Box p={5} mr={8}>
            {steps[activeStep].label && (
              <Typography variant="h4">{steps[activeStep].label}</Typography>
            )}
            {steps[activeStep].Component}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
