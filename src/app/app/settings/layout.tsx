"use client";
import { Box } from "@mui/material";
import { useForm } from "react-hook-form";

import { useFormatAccountWalletItem } from "@/context/FormatAccountWalletItem/useFormatAccountWalletItem";
import { useManagerActiveStep } from "@/hooks/common/useManagerActiveStep";
import { useMultisignatureAccountSelected } from "@/hooks/multisignatureSelected/useMultisignatureAccountSelected";
import Breadcrumbs from "@/sections/NewTxView/Breadcrumbs";
import {
  SettingsMultisigContext,
  SettingsMultisigForm,
} from "@/sections/SettingsView/SettingsStepperContext/AddOwnerStepperContext";
import { FallbackSpinner } from "@/sections/shared/common/FallbackSpinner";

export default function SettingsPageLayout({
  children,
}: React.PropsWithChildren) {
  const { multisigSelected } = useMultisignatureAccountSelected();
  const { isB256Activated } = useFormatAccountWalletItem();
  const managerStep = useManagerActiveStep();
  const inputFormManager = useForm<SettingsMultisigForm>({
    mode: "all",
    defaultValues: {
      owners: [],
    },
  });

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
    <SettingsMultisigContext.Provider
      value={{
        managerStep,
        inputFormManager,
        threshold: 3,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          marginTop: "2rem",
          marginBottom: "2rem",
          width: "80%",
        }}
      >
        <Breadcrumbs path="Settings" />
        {children}
      </Box>
    </SettingsMultisigContext.Provider>
  );
}
