"use client";
import { Box, Button, Typography } from "@mui/material";
import BigNumber from "bignumber.js";

import { BASE_ASSET_ID } from "@/config/assetsMap";
import { useGetMultisigContract } from "@/hooks/multisigContract/useGetMultisigContract";
import { useMultisignatureAccountSelected } from "@/hooks/multisignatureSelected/useMultisignatureAccountSelected";
import { SetUpMultisigStepper } from "@/sections/SettingsView/SetUpMultisigStepper";
import { ContractCallParamsInput } from "@/services/contracts/multisig/contracts/FuelMultisigAbi";
import { toIdentityInput } from "@/services/contracts/transformers/toInputIdentity";
import { getHexFromAddress } from "@/services/fuel/connectors/transformer";
import { hex_to_bytes } from "@/utils/formatString";
import { getCurrentDatePlusTenDays } from "@/utils/getCurrentDatePlusTenDays";

export default function SettingsPage() {
  const { multisigSelected } = useMultisignatureAccountSelected();
  const { contract } = useGetMultisigContract({
    contractId: multisigSelected?.address,
  });

  async function addOwner() {
    const method_selector = contract!.interface.functions.add_owner.selector;

    const new_owner_address =
      "fuel1hzncvt3xl9tz6zpdy6zy7p9up94ft0rkpfshq3dml8h7kc092dyqy6gkh2";
    const hex_owner = getHexFromAddress(new_owner_address);
    const hex_owner_bytes = hex_to_bytes(hex_owner);

    const callParams: ContractCallParamsInput = {
      calldata: [0, 0, 0, 0, 0, 0, 0, 0].concat(hex_owner_bytes), // [0,0,0,0,0,0,0,0] representa que este owner va a ser del tipo Identity::Address. Si fuera Identity::ContractId sería [0,0,0,0,0,0,0,1]
      forwarded_gas: 0, // Deberiamos revisar si esta bien en 0 o si deberiamos poner un valor.
      function_selector: hex_to_bytes(method_selector),
      single_value_type_arg: false, // Si recibe un solo parametro y es primitivo va en true, en cualquier otro caso va en false (AFAIK)
      transfer_params: {
        asset_id: { value: BASE_ASSET_ID },
        value: new BigNumber(0).toString(),
      },
    };

    try {
      const res = await contract?.functions
        .propose_tx(
          toIdentityInput(multisigSelected!.address),
          getCurrentDatePlusTenDays(),
          { Call: callParams }
        )
        //.dryRun();
        .call();
      console.log(res);
      console.log(res?.value.toString());
    } catch (e) {
      console.log(e);
    }
  }

  async function changeThreshold() {
    const new_threshold = 1; // Este tipo de dato va entre 1 y 255 // A nivel logico deberiamos validar que vaya entre 1 y owners.len()

    const callParams: ContractCallParamsInput = {
      calldata: [0, 0, 0, 0, 0, 0, 0, new_threshold], // Directamente podemos poner el numero del new threshold en el ultimo byte y tiene que funcionar.
      forwarded_gas: 0,
      function_selector: hex_to_bytes(
        contract!.interface.functions.change_threshold.selector
      ),
      single_value_type_arg: true,
      transfer_params: {
        asset_id: { value: BASE_ASSET_ID },
        value: new BigNumber(0).toString(),
      },
    };

    try {
      const res = await contract?.functions
        .propose_tx(
          toIdentityInput(multisigSelected!.address),
          getCurrentDatePlusTenDays(),
          { Call: callParams }
        )
        .call();
      console.dir(res, { depth: null });
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <Box pt={4}>
      <Typography variant="h3" color="primary">
        Settings
      </Typography>

      <SetUpMultisigStepper />
      <Button
        variant="contained"
        onClick={() => {
          addOwner();
          //console.log("Add Owner");
        }}
      >
        Add Owner
      </Button>
      <Button
        variant="contained"
        onClick={() => {
          console.log("Remove Owner");
        }}
      >
        Remove owner
      </Button>
      <Button
        variant="contained"
        onClick={() => {
          changeThreshold();
        }}
      >
        Change threshold
      </Button>
    </Box>
  );
}
