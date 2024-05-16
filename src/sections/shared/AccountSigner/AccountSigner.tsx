import { Avatar, Box, Typography } from "@mui/material";
import { AccountInfoSkeleton } from "@/sections/AccountInfoWidget/AccountInfoSkeleton";
import CopyButton from "@/sections/shared/common/CopyButton";
import { EmojiAvatarIcon } from "@/sections/shared/common/EmojiAvatar/EmojiAvatarIcon";
import { FuelExplorerLink } from "@/sections/shared/common/ExplorerLink/FuelExplorerLink";
import { truncateAddress } from "@/utils/formatString";
import { Props } from ".";


export function AccountSigner({
  owner, showCopy = true, startlength: startlenght = 6, endlength: endlenght = 6, showLink = true, isB256Activated = false,
}: Props) {
  const { address, name } = owner;

  if (!address) {
    return <AccountInfoSkeleton />;
  }
  return (
    <Box pb={1} display="flex" alignItems="center">
      <Avatar>
        <EmojiAvatarIcon address={address.b256} />
      </Avatar>

      <Box marginLeft={1}>
        <Typography fontSize={14}>{name}</Typography>
        <Typography display="flex" alignItems="center" component="div">
          <Typography fontSize={12}>
            {truncateAddress(
              isB256Activated ? address.b256 : address.bech32,
              startlenght,
              endlenght
            )}
          </Typography>
          {showCopy && <CopyButton text={address.bech32} />}
          {showLink && <FuelExplorerLink hash={address.b256} path="account" />}
        </Typography>
      </Box>
    </Box>
  );
}
