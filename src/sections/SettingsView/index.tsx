"use client";
import { Box, Typography } from "@mui/material";

import { useFormatAccountWalletItem } from "@/context/FormatAccountWalletItem/useFormatAccountWalletItem";
import { toAccountWalletItem } from "@/services/fuel/connectors/transformer";

import { AccountSigner } from "../shared/AccountSigner";
import { FallbackSpinner } from "../shared/common/FallbackSpinner";
import { ManageOwners } from "./ManageOwners";
import { useSettingsMultisigContext } from "./SettingsStepperContext/useSettingsMultisigContext";

export function SettingsView() {
  const { multisigSelected } = useSettingsMultisigContext();
  const { isB256Activated } = useFormatAccountWalletItem();

  if (!multisigSelected) {
    return (
      <FallbackSpinner
        sx={{
          justifyContent: "start",
          height: "auto",
        }}
        text="Select a multisig..."
      />
    );
  }

  return (
    <>
      <Box
        display="flex"
        flex={1}
        width="100%"
        mt={2}
        alignItems="center"
        justifyContent="space-between"
        bgcolor={(theme) => theme.palette.grey.A100}
        p={3}
      >
        <Box>
          <AccountSigner
            owner={toAccountWalletItem(
              multisigSelected.address,
              multisigSelected.name
            )}
            isB256Activated={isB256Activated}
            startlength={6}
            endlength={8}
          />
        </Box>
        <Box>
          <Typography>Contract version: 0.1.0</Typography>
        </Box>
      </Box>
      <Box mt={2} bgcolor={(theme) => theme.palette.grey.A100} p={3}>
        <ManageOwners
          isB256Activated={isB256Activated}
          multisigSelected={multisigSelected}
        />
      </Box>
      <Box mt={4} bgcolor={(theme) => theme.palette.grey.A100} p={3}>
        {/* <RequiredConfirmations
          owners={selectedMultisig?.owners}
          threshold={selectedMultisig?.threshold}
          handleAddThreshold={handleAddThreshold}
        /> */}
      </Box>
    </>
  );
}
