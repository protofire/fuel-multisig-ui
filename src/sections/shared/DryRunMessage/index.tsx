import InfoIcon from "@mui/icons-material/Info";
import { Skeleton, Stack, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { alpha } from "@mui/system";

interface Props {
  outcome: string | undefined;
  error: string | undefined;
  isRunning: boolean;
}

export function DryRunMessage({ error, outcome, isRunning }: Props) {
  const isError = !!error;
  const color = isError ? "#ff4d4f" : "#52c41a";
  const theme = useTheme();

  if (!isError && !outcome && !isRunning) {
    return null;
  }

  if (isRunning) {
    return (
      <Skeleton
        variant="text"
        height={30}
        width={"80%"}
        sx={{ bgcolor: alpha(theme.palette.primary.main, 0.4) }}
      />
    );
  }

  return (
    <Stack direction="row" gap={1}>
      <InfoIcon fontSize="small" color={isError ? "error" : "success"} />
      <Typography variant="body1" color={color}>
        {outcome}
      </Typography>
    </Stack>
  );
}
