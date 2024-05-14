import { HowToReg } from "@mui/icons-material";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import { Box, Tooltip, Typography, useTheme } from "@mui/material";
import React from "react";

import { APP_NAME } from "@/config/app";
import { MultisignatureAccount } from "@/domain/MultisignatureAccount";
import { AccountSigner } from "@/sections/shared/AccountSigner";
import NetworkBadge from "@/sections/shared/NetworkBadge";
import { FuelWalletIcon } from "@/services/fuel/connectors/icons/FuelWalletIcon";
import { toAccountWalletItem } from "@/services/fuel/connectors/transformer";
import { formatThreshold } from "@/utils/formatString";

interface Props {
  multisigs: Array<MultisignatureAccount>;
  chainName: string;
  clickAction: (account: MultisignatureAccount) => void;
}

export function MultisignatureAccountsTableUI({
  multisigs,
  chainName,
  clickAction,
}: Props) {
  const theme = useTheme();

  return (
    <Box
      sx={{
        margin: { xs: 1, sm: 2, md: 3, lg: 4, xl: 10 },
      }}
    >
      <Box display="flex" alignItems="center" justifyContent="center" gap={1}>
        <Typography variant="h3" color="white">
          My {APP_NAME} accounts ({multisigs.length})
        </Typography>
        <Typography variant="body1" component="p">
          on
        </Typography>
        <NetworkBadge
          name={chainName}
          description={chainName}
          tooltipInfo="This network is the one that has been selected in the wallet provider"
        >
          <FuelWalletIcon />
        </NetworkBadge>
      </Box>
      <Box
        mt={3}
        width="100%"
        sx={{ backgroundColor: theme.palette.background.paper }}
        p={0}
        pt={0}
        pb={0}
      >
        {multisigs.map((multisig) => (
          <Box key={multisig.address}>
            <Box
              onClick={() => clickAction(multisig)}
              display="flex"
              gap={8}
              alignItems="center"
              justifyContent="space-between"
              sx={{
                borderBottom: "1px solid #2F2F2F",
                borderTop: "1px solid #2F2F2F",
                "&:hover": { backgroundColor: "#2F2F2F" },
              }}
              p={1}
              pl={2}
              pr={4}
            >
              <Box width={300}>
                <AccountSigner
                  owner={toAccountWalletItem(multisig.address, multisig.name)}
                  showLink={false}
                />
              </Box>
              <Box display="flex" alignItems="center" gap={1}>
                <HowToReg
                  sx={{
                    fontSize: "1.4rem",
                    color: theme.palette.primary.main,
                  }}
                />
                <Tooltip title="You are the owner of this account." arrow>
                  <Typography
                    variant="body1"
                    component="p"
                    sx={{
                      fontSize: "0.8rem",
                      color: theme.palette.primary.main,
                    }}
                  >
                    Owner
                  </Typography>
                </Tooltip>
              </Box>
              <Box>
                <Tooltip title="Threshold" arrow>
                  <Typography
                    variant="body1"
                    component="p"
                    sx={{ fontSize: "0.8rem", color: "#aaaaaa" }}
                  >
                    {formatThreshold({
                      threshold: multisig.threshold,
                      owners: multisig.owners.length,
                    })}
                  </Typography>
                </Tooltip>
              </Box>
              <Box>
                <ArrowForwardIosRoundedIcon
                  sx={{ fontSize: "1.2rem", color: "#4d4d4d" }}
                />
              </Box>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
