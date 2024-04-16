import { Box, Typography } from "@mui/material";

export default function NewTransaction() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        marginTop: "2rem",
        marginBottom: "2rem",
        width: "80%",
      }}
    >
      <Box display="flex" alignItems="center" mb={2}>
        <Box display="flex" alignItems="center" gap={2} width="100%">
          <Typography variant="h3" color="primary">
            New transaction
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
