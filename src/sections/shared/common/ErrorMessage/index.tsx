import Box from "@mui/material/Box";
import { useState } from "react";

import { InteractionError } from "@/context/InteractionErrorContext/types";

interface ErrorMessageProps {
  error: InteractionError;
  clearError?: () => void;
}

export default function ErrorMessage({ error }: ErrorMessageProps) {
  const [showError, setShowError] = useState(true);
  const { msg: errorMsg, onRetry, type } = error;

  return (
    <Box
      sx={{
        border: "1px solid",
        borderColor: "error.main",
        color: "error.main",
        padding: 1,
        borderRadius: 1,
        marginBottom: 2,
      }}
    >
      {errorMsg}
    </Box>
  );
}
