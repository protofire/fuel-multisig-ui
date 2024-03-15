import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import { Avatar, Box, SelectChangeEvent, Stack } from "@mui/material";
import { useMemo } from "react";

import { AccountWalletItem } from "@/domain/ui/AccountSelectItem";
import { getConnectorImage } from "@/services/fuel/connectors";
import { truncateAddress } from "@/utils/formatString";

import { EmojiAvatarIcon } from "../EmojiAvatar/EmojiAvatarIcon";
import { AccountSelectSkeleton } from "./AccountSelectSkeleton";
import { StyledMenuItem, StyledSelect, StyledTypography } from "./styled";

const OPTION_FOR_DISCONNECTING = "disconnect";

interface Props {
  accounts: AccountWalletItem[];
  accountConnected: AccountWalletItem["address"]["formatted"];
  setAccount?: (account: AccountWalletItem) => void;
  disconnectWallet: () => void;
  balance?: string;
  isLoading: boolean;
  isLoadingBalance: boolean;
}

export function AccountSelect({
  accounts,
  accountConnected,
  setAccount,
  disconnectWallet,
  balance,
  isLoading = false,
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

  if (isLoading || !currentAccount || !accounts)
    return <AccountSelectSkeleton />;

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
                width: "19px",
                height: "19px",
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
              <span>{balance}</span>
            </Stack>
          </Box>
        );
      }}
    >
      {accounts.map((a) => (
        <StyledMenuItem
          selected={currentAccount.address.formatted === a.address.formatted}
          disabled={true}
          key={a.address.formatted}
          value={a.address.formatted}
        >
          <Stack
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Avatar>
              <EmojiAvatarIcon address={a.address.hex} />
            </Avatar>
            <p>{truncateAddress(a.address.formatted)}</p>
          </Stack>
        </StyledMenuItem>
      ))}
      <StyledMenuItem value={OPTION_FOR_DISCONNECTING}>
        <Stack
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <PowerSettingsNewIcon sx={{ fontSize: "1.6rem" }} />
          <StyledTypography>Disconnect Wallet</StyledTypography>
        </Stack>
      </StyledMenuItem>
    </StyledSelect>
  );
}
