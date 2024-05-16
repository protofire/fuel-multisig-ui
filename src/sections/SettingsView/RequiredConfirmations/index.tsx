import { Box, Button, Typography } from "@mui/material";

import { MultisignatureAccount } from "@/domain/MultisignatureAccount";

interface Props {
  handleAddThreshold: () => void;
  multisignatureAccount: MultisignatureAccount;
}

export function RequiredConfirmations({
  handleAddThreshold,
  multisignatureAccount,
}: Props) {
  const { threshold, owners } = multisignatureAccount;

  return (
    <Box display="flex">
      <Box minWidth={300}>
        <Typography variant="h5">Required confirmations</Typography>
      </Box>
      <Box>
        <Typography variant="body2">
          Any transaction requires the confirmation of:
        </Typography>
        <Box mt={2} display="flex" flexDirection="column" gap={3}>
          <Typography variant="body1">
            {threshold ?? 0} out of {owners?.length ?? 0} owner(s).
          </Typography>
          <Button
            sx={{ width: 134 }}
            onClick={handleAddThreshold}
            variant="contained"
          >
            Change
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
