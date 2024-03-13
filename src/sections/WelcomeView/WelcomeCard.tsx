"use client";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Box, Button, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Link from "next/link";

import { APP_NAME } from "@/config/app";
import { ROUTES } from "@/config/routes";
import { MainContentCard } from "@/sections/shared/MainContentCard";

export function WelcomeCard() {
  const theme = useTheme();
  return (
    <MainContentCard
      stylesContainer={{
        alignItems: "center",
        sx: {
          backgroundColor: theme.palette.background.paper,
          padding: { xs: 1, sm: 2, md: 3, lg: 3, xl: 3 },
        },
      }}
    >
      <Typography variant="h1" color="white">
        Welcome to {APP_NAME}
      </Typography>
      <Typography variant="h5" color="grey">
        The most trusted decentralized multisig platform on fuel ecosystem.
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
          width: "80%",
          mt: "4rem",
          gap: "3rem",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "0.5rem",
          }}
        >
          <Typography variant="h3" color="white">
            Create a new Multisig
          </Typography>
          <Typography variant="body1" color="grey">
            A new Account that is controlled by one or multiple owners.
          </Typography>
          <Link href={ROUTES.New} passHref>
            <Button
              variant="contained"
              sx={{ color: theme.palette.common.black }}
            >
              <AddCircleIcon />
              Create new Account
            </Button>
          </Link>
        </Box>
      </Box>
    </MainContentCard>
  );
}
