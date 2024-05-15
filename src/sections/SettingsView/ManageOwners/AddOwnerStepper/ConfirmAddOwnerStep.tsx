import { Box, Typography } from "@mui/material";
import { useRouter } from "next/navigation";

import { useDeleteOwner } from "@/hooks/multisigContract/settings/useDeleteOwner";
import { useAccountWalletSelected } from "@/hooks/useAccountWalletSelected";
import { ModalStyledDivider } from "@/sections/Auth/ModalWalletProvider/styled";
import { AccountSigner } from "@/sections/shared/AccountSigner";
import { NextBackButtonStepper } from "@/sections/shared/BaseStepper/NextBackButtonStepper";
import { StyledBox } from "@/sections/TxQueueWidget/styled";
import { toAccountWalletItem } from "@/services/fuel/connectors/transformer";

import { useSettingsMultisigContext } from "../../SettingsStepperContext/useSettingsMultisigContext";
import { useManageOwnersUi } from "../useManageOwnersUi";

export function ConfirmAddOwnerStep() {
  const { multisigSelected, inputFormManager, managerStep } =
    useSettingsMultisigContext();
  const _owners = multisigSelected?.owners || [];
  const { accountWalletItem } = useAccountWalletSelected();
  const { activeStep, stepsLength, downStep } = managerStep;
  const router = useRouter();
  const { control, setValue, getValues, setFocus } = inputFormManager;
  const owner = getValues("owner");
  const { ownersQuery } = useManageOwnersUi({
    owners: _owners,
    accountWalletItemConnected: accountWalletItem,
  });
  const {
    deleteOwner,
    isPending: isPendingDelete,
    ownerDeleting,
  } = useDeleteOwner({ multisigAddress: multisigSelected.address });

  return (
    <Box>
      <Box
        display="flex"
        justifyContent={{ xs: "flex-start", md: "center" }}
        flexDirection={"column"}
      >
        <StyledBox mt={3} mb={1} gap={2}>
          <Typography variant="h6">Owner to be proposed to add</Typography>
          <Typography component="div">
            <AccountSigner
              owner={toAccountWalletItem(owner.address, owner.name)}
              endlength={12}
            />
          </Typography>
        </StyledBox>
        <ModalStyledDivider variant="middle" />
        <StyledBox>
          <Typography variant="h6" width={100}>
            Owners
          </Typography>
          <Typography component="div">
            {ownersQuery?.data.map((owner) => (
              <AccountSigner
                key={owner.address.b256}
                owner={owner}
                endlength={12}
              />
            ))}
          </Typography>
        </StyledBox>
      </Box>
      <Box pt={5}>
        <NextBackButtonStepper
          activeStep={activeStep}
          stepsLength={stepsLength}
          handleBack={downStep}
          handleNext={() => console.log("confirm")}
          // nextButtonProps={{
          //   disabled: !isValid,
          //   isLoading: false,
          // }}
        />
      </Box>
    </Box>
  );
}
