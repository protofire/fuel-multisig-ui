import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import { Avatar, Box, SelectChangeEvent, Stack } from "@mui/material";

import { AccountWalletItem } from "@/domain/ui/AccountSelectItem";
import { WalletProviderItem } from "@/domain/ui/WalletProviderItem";
import { useAddressInFormatPicked } from "@/hooks/useAddressInFormatPicked";
import { useAccountWalletItem } from "@/hooks/useGetProviderrWalletSelected";
import CopyButton from "@/sections/common/CopyButton";
import { EmojiAvatarIcon } from "@/sections/common/EmojiAvatar/EmojiAvatarIcon";
import { getConnectorImage } from "@/services/fuel/connectors/icons";
import { truncateAddress } from "@/utils/formatString";

import { AccountSelectSkeleton } from "./AccountSelectSkeleton";
import { StyledMenuItem, StyledSelect, StyledTypography } from "./styled";

const OPTION_FOR_DISCONNECTING = "disconnect";

interface Props {
  accounts: AccountWalletItem[];
  accountConnected: AccountWalletItem["address"]["bech32"];
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

  const { addressFormatted, isB256Activated } = useAddressInFormatPicked({
    accountWallet: accountSelected,
  });

  const _handleChange = (event: SelectChangeEvent<unknown>) => {
    const address = event.target.value as string;

    if (address === OPTION_FOR_DISCONNECTING) {
      disconnectWallet();
      return;
    }

    const newAccount = accounts?.find(
      (element) => element.address.bech32 === address
    );
    if (!newAccount) {
      console.error(
        `Theres not an account with this address ${event.target.value}`
      );
      return;
    }
    setAccount?.(newAccount);
  };
  const selectedValue = accountSelected ? accountSelected.address.bech32 : "";

  if (isLoading || !accountSelected || !accounts) {
    return <AccountSelectSkeleton />;
  }

  return (
    <StyledSelect
      value={selectedValue}
      onChange={_handleChange}
      id="account-selected"
      renderValue={(_value) => {
        return (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              minWidth: "11.5rem",
            }}
          >
            {accountSelected && (
              <Avatar>
                <EmojiAvatarIcon address={accountSelected?.address.b256} />
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
              <p>{truncateAddress(addressFormatted as string)}</p>

              <span>{balance}</span>
            </Stack>
            <Box></Box>
          </Box>
        );
      }}
    >
      {accounts.map((a) => {
        const addressInFormat = isB256Activated
          ? a.address.b256
          : a.address.bech32;
        return (
          <Box key={a.address.bech32}>
            <StyledMenuItem
              selected={accountSelected.address.bech32 === a.address.bech32}
              disabled={true}
              value={a.address.bech32}
            >
              <Stack
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Avatar>
                  <EmojiAvatarIcon address={a.address.b256} />
                </Avatar>
                <p>{truncateAddress(addressInFormat)}</p>
              </Stack>
            </StyledMenuItem>
            <Box
              sx={{
                position: "absolute",
                right: "0",
                margin: "-2.7rem 0.3rem 0 0",
              }}
            >
              <CopyButton text={addressInFormat} />
            </Box>
          </Box>
        );
      })}
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
