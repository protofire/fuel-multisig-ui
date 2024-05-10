import { Avatar, Box, BoxProps, Stack } from "@mui/material";

import { AccountAddress } from "@/domain/ui/AccountSelectItem";
import CopyButton from "@/sections/shared/common/CopyButton";
import { EmojiAvatarIcon } from "@/sections/shared/common/EmojiAvatar/EmojiAvatarIcon";
import { FuelExplorerLink } from "@/sections/shared/common/ExplorerLink/FuelExplorerLink";
import { truncateAddress } from "@/utils/formatString";

interface TxInfoType {
  account: AccountAddress;
  // network: ChainId;
  containerProps?: BoxProps;
  boxActionsProps?: BoxProps;
  isB256Activated: boolean;
}

export function AccountWithExplorer({
  account,
  isB256Activated,
  containerProps = {
    display: "flex",
    position: "relative",
  },
  boxActionsProps = {
    marginTop: "4px",
    marginLeft: "15px",
    display: "flex",
  },
}: TxInfoType) {
  const _address = isB256Activated ? account.b256 : account.bech32;

  return (
    <Box sx={containerProps}>
      <Stack direction="row" mr={2}>
        <Avatar>
          <EmojiAvatarIcon address={account.b256} />
        </Avatar>
      </Stack>
      {truncateAddress(_address, 3)}
      <Box sx={boxActionsProps}>
        <CopyButton text={_address} />
        <FuelExplorerLink hash={_address} />
      </Box>
    </Box>
  );
}
