import { Box, Button } from "@mui/material";
import NextLink from "next/link";

import { ROUTES } from "@/config/routes";

interface Props {
  icon: React.ReactNode;
  textButton: string;
  href?: string;
}

export function CaptionComponent({ icon, textButton, href }: Props) {
  const _href = href ?? ROUTES.App;

  return (
    <Box
      display="flex"
      alignItems="center"
      flexDirection="column"
      gap={1}
      justifyContent="space-evenly"
      height={200}
    >
      {icon}
      <Button
        href={_href}
        LinkComponent={NextLink}
        sx={{ width: 180 }}
        color="primary"
        variant="contained"
      >
        {textButton}
      </Button>
    </Box>
  );
}
