"use client";
import { Box } from "@mui/material";
import { useForm } from "react-hook-form";

import { useManagerActiveStep } from "@/hooks/common/useManagerActiveStep";
import { useMultisignatureAccountSelected } from "@/hooks/multisignatureSelected/useMultisignatureAccountSelected";
import Breadcrumbs from "@/sections/NewTxView/Breadcrumbs";
import { ADD_OWNER_STEPS } from "@/sections/SettingsView/ManageOwners/AddOwnerStepper";
import {
  SettingsMultisigContext,
  SettingsMultisigForm,
} from "@/sections/SettingsView/SettingsStepperContext";
import { FallbackSpinner } from "@/sections/shared/common/FallbackSpinner";

export default function SettingsPageLayout({
  children,
}: React.PropsWithChildren) {
  const { multisigSelected } = useMultisignatureAccountSelected();
  const managerStep = useManagerActiveStep(ADD_OWNER_STEPS.length);
  const inputFormManager = useForm<SettingsMultisigForm>({
    mode: "all",
    defaultValues: {
      owner: { address: "", name: "" },
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
