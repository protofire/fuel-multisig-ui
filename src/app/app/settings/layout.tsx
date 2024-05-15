"use client";
import { Box } from "@mui/material";
import { useForm } from "react-hook-form";

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
  const managerStep = useManagerActiveStep();
  const inputFormManager = useForm<SettingsMultisigForm>({
    mode: "all",
    defaultValues: {
      owners: [],
    },
  });

  return (
    <SettingsMultisigContext.Provider
      value={{
        managerStep,
        inputFormManager,
        multisigSelected,
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
        {multisigSelected ? (
          children
        ) : (
          <FallbackSpinner
            sx={{
              justifyContent: "start",
              height: "auto",
            }}
            text="Select a multisig..."
          />
        )}
      </Box>
    </SettingsMultisigContext.Provider>
  );
}
