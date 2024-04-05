import { Box, Typography, useTheme } from "@mui/material";

import { APP_NAME } from "@/config/app";
import { MultisignatureAccount } from "@/domain/MultisignatureAccount";
import NetworkBadge from "@/sections/shared/NetworkBadge";
import { FuelWalletIcon } from "@/services/fuel/connectors/icons/FuelWalletIcon";

interface Props {
  multisigs: Array<MultisignatureAccount> | null;
  chainName: string;
}

export function MultisignatureAccountsTableUI({ multisigs, chainName }: Props) {
  const theme = useTheme();

  if (!multisigs) return null;

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
              //   onClick={() => handleMultisigRedirect(multisig.address)}
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
                {/* <AccountSigner
                  owner={multisig}
                  truncateAmount={16}
                  showLink={false}
                /> */}
              </Box>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
