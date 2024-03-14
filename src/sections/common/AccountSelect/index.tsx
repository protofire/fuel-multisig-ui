import PowerOffIcon from "@mui/icons-material/PowerOff";
import { Avatar, Box, SelectChangeEvent, Stack } from "@mui/material";
import { useMemo } from "react";

import { AccountWalletItem } from "@/domain/ui/AccountSelectItem";
import { getConnectorImage } from "@/services/fuel/connectors";
import { shortNameLonger, truncateAddress } from "@/utils/formatString";

import { EmojiAvatarIcon } from "../EmojiAvatar/EmojiAvatarIcon";
import { StyledMenuItem, StyledSelect, StyledTypography } from "./styled";

const OPTION_FOR_DISCONNECTING = "disconnect";

interface Props {
  accounts: AccountWalletItem[];
  accountConnected: AccountWalletItem["address"]["formatted"];
  setAccount?: (account: AccountWalletItem) => void;
  disconnectWallet: () => void;
  balance?: string;
}

export function AccountSelect({
  accounts,
  accountConnected,
  setAccount,
  disconnectWallet,
  balance,
}: Props) {
  const currentAccount = useMemo(() => {
    return accounts.find((a) => a.address.formatted === accountConnected);
  }, [accounts, accountConnected]);

  const _handleChange = (event: SelectChangeEvent<unknown>) => {
    const address = event.target.value as string;

    if (address === OPTION_FOR_DISCONNECTING) {
      disconnectWallet();
      return;
    }
    const newAccount = accounts?.find(
      (element) => element.address.formatted === address
    );
    if (!newAccount) {
      console.error(
        `Theres not an account with this address ${event.target.value}`
      );
      return;
    }
    setAccount?.(newAccount);
  };

  if (!accounts)
    return (
      <StyledSelect value={""} placeholder="Select Account..."></StyledSelect>
    );

  if (!accountConnected)
    return (
      <StyledSelect
        value={"No Account"}
        placeholder="No account"
      ></StyledSelect>
    );

  return (
    <StyledSelect
      value={accountConnected}
      placeholder="Select Account..."
      onChange={_handleChange}
      renderValue={(value) => {
        return (
          <>
            <Box
              sx={{
                display: "flex",
              }}
            >
              {currentAccount && (
                <Avatar>
                  <EmojiAvatarIcon address={currentAccount?.address.hex} />
                </Avatar>
              )}
              <Avatar
                sx={{
                  width: "30px",
                  height: "30px",
                  marginTop: "2px",
                  marginLeft: "5px",
                }}
              >
                {getConnectorImage(currentAccount?.walletLogoUrl)}
              </Avatar>
              <Stack>
                <p>{truncateAddress(value as string)}</p>
                <span>{balance}</span>
              </Stack>
            </Box>
          </>
        );
      }}
    >
      {accounts.map((a) => (
        <StyledMenuItem key={a.address.formatted} value={a.address.formatted}>
          <>
            <Stack sx={{ display: "flex", flexDirection: "row" }}>
              <Stack>
                <span>{shortNameLonger(a.name as string)}</span>
                <p>{truncateAddress(a.address.formatted)}</p>
              </Stack>
            </Stack>
          </>
        </StyledMenuItem>
      ))}
      <StyledMenuItem value={OPTION_FOR_DISCONNECTING}>
        <>
          <PowerOffIcon sx={{ fontSize: "2rem" }} />
          <Stack>
            <Stack>
              <StyledTypography>Disconect Wallet</StyledTypography>
            </Stack>
          </Stack>
        </>
      </StyledMenuItem>
    </StyledSelect>
  );
}
