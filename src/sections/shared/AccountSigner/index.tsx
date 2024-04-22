import { Avatar, Box, Typography } from "@mui/material";

import { AccountWalletItem } from "@/domain/ui/AccountSelectItem";
import CopyButton from "@/sections/common/CopyButton";
import { EmojiAvatarIcon } from "@/sections/common/EmojiAvatar/EmojiAvatarIcon";
import { FuelExplorerLink } from "@/sections/common/ExplorerLink/FuelExplorerLink";
import { truncateAddress } from "@/utils/formatString";

interface Props {
  owner: AccountWalletItem;
  showCopy?: boolean;
  showLink?: boolean;
  truncateAmount?: number;
}

export function AccountSigner({
  owner,
  showCopy = true,
  truncateAmount = 4,
  showLink = true,
}: Props) {
  const { address, name } = owner;

  return (
    <Box pb={1} display="flex" alignItems="center">
      <Avatar>
        <EmojiAvatarIcon address={address.b256} />
      </Avatar>

      <Box marginLeft={1}>
        <Typography fontSize={14}>{name}</Typography>
        <Typography display="flex" alignItems="center" component="div">
          <Typography fontSize={12}>
            {truncateAddress(address.bech32, truncateAmount)}
          </Typography>
          {showCopy && <CopyButton text={address.bech32} />}
          {showLink && <FuelExplorerLink hash={address.b256} path="account" />}
        </Typography>
      </Box>
    </Box>
  );
}
