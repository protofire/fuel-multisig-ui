import { Box } from "@mui/material";

import Breadcrumbs from "@/sections/NewTxView/Breadcrumbs";

export default function NewTransactionLayout({
  children,
}: React.PropsWithChildren) {
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
      <Breadcrumbs path="New Transaction" />
      {children}
    </Box>
  );
}
