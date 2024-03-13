"use client";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Box, Button, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Image from "next/image";
import Link from "next/link";

import { APP_NAME } from "@/config/app";
import { LOGO_APP, LOGO_NETWORK } from "@/config/images";
import { ROUTES } from "@/config/routes";
import { MainContentCard } from "@/sections/shared/MainContentCard";

export function WelcomeCard() {
  const theme = useTheme();
  return (
    <MainContentCard
      stylesContainer={{
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
          width: "80%",
          mt: "4rem",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "left",
            gap: "0.5rem",
            backgroundColor: theme.palette.primary.main,
            padding: { xs: 1, sm: 2, md: 4, lg: 6, xl: 6 },
            borderRadius: "0.8rem 0 0 0.8rem",
          }}
        >
          <Typography variant="h1" color="black">
            Welcome to {APP_NAME}
          </Typography>
          <Typography variant="h5" color="black">
            The most trusted decentralized multisig platform on Fuel ecosystem.
          </Typography>
          <Image
            src={LOGO_NETWORK}
            alt={`${APP_NAME} Network`}
            priority
            width={96}
            height={22}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "left",
            gap: "0.5rem",
            backgroundColor: theme.palette.background.paper,
            padding: { xs: 1, sm: 2, md: 4, lg: 6, xl: 6 },
            borderRadius: "0 0.8rem 0.8rem 0",
          }}
        >
          <Image
            src={LOGO_APP}
            alt={`${APP_NAME} Wallet`}
            priority
            width={150}
            height={60}
          />
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
