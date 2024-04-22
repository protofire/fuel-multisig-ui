import { FormControlLabel, Tooltip } from "@mui/material";

import { useFormatAccountWalletItem } from "@/context/FormatAccountWalletItem/useFormatAccountWalletItem";

import { StyledSwitch } from "./styled";

export function AddressFormatSwitch() {
  const { isB256Activated, toggleAddressFormat } = useFormatAccountWalletItem();
  return (
    <Tooltip
      title={
        isB256Activated
          ? "Display address in fuel bech32 format"
          : "Display address in b256 format"
      }
      placement="bottom"
    >
      <FormControlLabel
        control={
          <StyledSwitch
            onClick={toggleAddressFormat}
            sx={{ m: 1 }}
            checked={isB256Activated}
          />
        }
        label="B256"
      />
    </Tooltip>
  );
}
