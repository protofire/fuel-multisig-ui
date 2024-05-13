import {
  Box,
  Skeleton,
  Stack,
  StepConnector,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";

import { ColorlibStepIcon, StyledStep } from "./styled";

export function TxExecutionSkeleton() {
  return (
    <Box
      sx={{ minWidth: 390, padding: "20px", borderLeft: "3px solid #120D0E" }}
    >
      <Stepper
        connector={
          <StepConnector
            sx={{
              span: {
                minHeight: "19px",
              },
            }}
          ></StepConnector>
        }
        orientation="vertical"
      >
        <StyledStep>
          <StepLabel
            StepIconComponent={ColorlibStepIcon}
            sx={{
              color: (theme) => theme.palette.primary.main,
            }}
          >
            <Typography>Created</Typography>
          </StepLabel>
        </StyledStep>
        {/* Confirmations Section*/}
        <StyledStep>
          <StepLabel
            StepIconComponent={(e) => ColorlibStepIcon(e, undefined, status)}
            sx={{
              color: (theme) => theme.palette.primary.main,
              display: "flex",
            }}
          >
            <Stack direction={"row"} gap={2}>
              <Typography>Confirmations</Typography>
              <Skeleton width={"10%"} />
            </Stack>
          </StepLabel>
        </StyledStep>
        <StyledStep>
          <Skeleton />
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </StyledStep>
      </Stepper>
    </Box>
  );
}
