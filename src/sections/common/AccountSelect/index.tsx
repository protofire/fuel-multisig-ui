import PowerOffIcon from "@mui/icons-material/PowerOff";
import { Avatar, Box, SelectChangeEvent, Stack } from "@mui/material";
import { useMemo } from "react";

import { AccountWalletItem } from "@/domain/ui/AccountSelectItem";
import { getConnectorImage } from "@/services/fuel/connectors";
import { shortNameLonger, truncateAddress } from "@/utils/formatString";

import { EmojiAvatarIcon } from "../EmojiAvatar/EmojiAvatarIcon";
import { StyledMenuItem, StyledSelect, StyledTypography } from "./styled";

const OPTION_FOR_DISCONNECTING = "disconnect";

export function AccountSelect({
  accounts,
  accountConnected,
  setAccount,
  disconnectWallet,
}: {
  accounts: AccountWalletItem[];
  accountConnected: AccountWalletItem["address"]["formatted"];
  setAccount?: (account: AccountWalletItem) => void;
  disconnectWallet: () => void;
}) {
  const currentAccount = useMemo(() => {
    return accounts.find((a) => a.address.formatted === accountConnected);
  }, [accounts, accountConnected]);

  const _handleChange = (event: SelectChangeEvent<unknown>) => {
    const address = event.target.value as string;

    if (address === OPTION_FOR_DISCONNECTING) {
      disconnectWallet();
      return;
    }
    const newAccount = accounts?.find((element) => element.address === address);
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
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            {currentAccount && (
              <Avatar>
                <EmojiAvatarIcon address={currentAccount?.address.hex} />
              </Avatar>
            )}
            <Avatar
              sx={{
                position: "absolute",
                width: "21px",
                height: "21px",
                marginTop: "1.2rem",
                marginLeft: "1.7rem",
                backgroundColor: "black",
                overflow: "hidden",
              }}
            >
              {getConnectorImage(currentAccount?.walletLogoUrl)}
            </Avatar>
            <Stack>
              <p>{truncateAddress(value as string)}</p>
              <span>0.1234 ETH</span>
            </Stack>
          </Box>
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
