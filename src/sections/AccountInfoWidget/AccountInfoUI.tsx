import { Avatar, Box, Tooltip, Typography } from "@mui/material";
import * as React from "react";

import { MultisignatureAccount } from "@/domain/MultisignatureAccount";
import { useModalBehaviour } from "@/hooks/common/useModalBehaviour";
import { useAddressInFormatPicked } from "@/hooks/useAddressInFormatPicked";
import CopyButton from "@/sections/shared/common/CopyButton";
import { EmojiAvatarIcon } from "@/sections/shared/common/EmojiAvatar/EmojiAvatarIcon";
import { toAccountWalletItem } from "@/services/fuel/connectors/transformer";
import { formatThreshold, truncateAddress } from "@/utils/formatString";

import { AccountInfoWrapper } from "./styled";
import { SwitchUserAccount } from "./SwitchUserAccount";

type Props = Partial<MultisignatureAccount> & {
  networkName: string;
  ownersCount: number | undefined;
  networkColor: string | undefined;
  multisigAccounts?: MultisignatureAccount[];
};

export function AccountInfoUI({
  address,
  name,
  networkName,
  threshold,
  ownersCount,
  networkColor,
  multisigAccounts,
}: Props) {
  const { isOpen, closeModal, openModal } = useModalBehaviour();
  const walletItem = toAccountWalletItem(address as `fuel${string}`);

  const { addressFormatted } = useAddressInFormatPicked({
    accountWallet: walletItem,
  });

  return (
    <AccountInfoWrapper networkcolor={networkColor}>
      <Box
        display="flex"
        alignItems="center"
        flexDirection={"column"}
        height="100%"
        justifyContent="space-between"
      >
        <Box display="flex" alignItems="center">
          <Box
            display="flex"
            gap="0.2rem"
            flexDirection="column"
            alignItems="center"
          >
            <Avatar>
              <EmojiAvatarIcon address={walletItem.address.b256} />
            </Avatar>
            <Tooltip title="Threshold" arrow>
              <Box display="flex" flexDirection="column">
                <Typography variant="caption" color="primary">
                  {formatThreshold({ threshold, owners: ownersCount })}
                </Typography>
              </Box>
            </Tooltip>
          </Box>
          <Box marginLeft={1}>
            <Tooltip title={name} placement="top" arrow>
              <Box
                sx={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  width: "10rem",
                }}
              >
                <Typography variant="subtitle1" color="white" noWrap>
                  {name}
                </Typography>
              </Box>
            </Tooltip>
            <Typography color="white" variant="caption">
              {truncateAddress(addressFormatted, 4)}
            </Typography>
            <CopyButton text={addressFormatted} />
          </Box>
        </Box>
        {multisigAccounts && (
          <Box sx={{ right: "0", position: "absolute", top: "3rem" }}>
            <SwitchUserAccount
              isOpen={isOpen}
              closeModal={closeModal}
              openModal={openModal}
            />
            {/* TODO Select Items */}
          </Box>
        )}
        <Box>
          <Typography variant="caption" color="white">
            {networkName}
          </Typography>
        </Box>
      </Box>
    </AccountInfoWrapper>
  );
}
