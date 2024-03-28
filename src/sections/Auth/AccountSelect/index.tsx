import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import { Avatar, Box, SelectChangeEvent, Stack } from "@mui/material";

import { AccountWalletItem } from "@/domain/ui/AccountSelectItem";
import { WalletProviderItem } from "@/domain/ui/WalletProviderItem";
import { useAccountWalletItem } from "@/hooks/useGetWalletSelectedItem";
import CopyButton from "@/sections/common/CopyButton";
import { EmojiAvatarIcon } from "@/sections/common/EmojiAvatar/EmojiAvatarIcon";
import { getConnectorImage } from "@/services/fuel/connectors/icons";
import { truncateAddress } from "@/utils/formatString";

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
  walletProvider: WalletProviderItem;
}

export function AccountSelect({
  accounts,
  setAccount,
  disconnectWallet,
  balance,
  walletProvider,
  isLoading = false,
}: Props) {
  const { accountWalletItem: accountSelected } = useAccountWalletItem();

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
  const selectedValue = accountSelected
    ? accountSelected.address.formatted
    : "";

  if (isLoading || !accountSelected || !accounts) {
    return <AccountSelectSkeleton />;
  }

  return (
    <StyledSelect
      value={selectedValue}
      onChange={_handleChange}
      renderValue={(value) => {
        return (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            {accountSelected && (
              <Avatar>
                <EmojiAvatarIcon address={accountSelected?.address.hex} />
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
              {getConnectorImage(walletProvider?.logo.src)}
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
        <Box key={a.address.formatted}>
          <StyledMenuItem
            selected={accountSelected.address.formatted === a.address.formatted}
            disabled={true}
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
          <Box
            sx={{
              position: "absolute",
              right: "0",
              margin: "-2.7rem 0.3rem 0 0",
            }}
          >
            <CopyButton text={a.address.formatted} />
          </Box>
        </Box>
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
