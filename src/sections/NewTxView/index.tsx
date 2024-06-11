import { Toll } from "@mui/icons-material";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import { Box, Typography } from "@mui/material";

import { ROUTES } from "@/config/routes";

import { SummaryCard } from "../shared/common/SummaryCard";
import { CaptionComponent } from "./CaptionComponent";

export function NewTxView() {
  return (
    <>
      <Box>
        <Typography variant="h6">
          What transaction would you like to create?
        </Typography>
        <Box display="flex" mt={2}>
          <SummaryCard
            styles={{ width: "200px", height: "200px" }}
            captionTitle=""
            captionComponent={
              <CaptionComponent
                icon={<Toll color="primary" sx={{ fontSize: "3rem" }} />}
                textButton="Send asset"
                href={ROUTES.SendAsset}
              />
            }
          />
        </Box>
        <Box display="flex" mt={2}>
          <SummaryCard
            styles={{ width: "200px", height: "200px" }}
            captionTitle=""
            captionComponent={
              <CaptionComponent
                icon={
                  <AccountBalanceWalletIcon
                    color="primary"
                    sx={{ fontSize: "3rem" }}
                  />
                }
                textButton="Fund multisig"
                href={ROUTES.FromWallet}
              />
            }
          />
        </Box>
      </Box>
    </>
  );
}
