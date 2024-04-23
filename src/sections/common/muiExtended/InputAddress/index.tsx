import { Avatar, TextField, TextFieldProps } from "@mui/material";
import React from "react";

import { EmojiAvatarIcon } from "@/sections/common/EmojiAvatar/EmojiAvatarIcon";
import { getHexFromAddress } from "@/services/fuel/connectors/transformer";
import { validateAddress } from "@/validations/blockchain";

type Props = TextFieldProps<"outlined">;

function AddressAvatar({ value }: Pick<Props, "value">) {
  if (!value || typeof value !== "string" || validateAddress(value)) {
    return null;
  }

  const hex = getHexFromAddress(value);

  return (
    <Avatar sx={{ marginRight: 1 }}>
      <EmojiAvatarIcon address={hex} />
    </Avatar>
  );
}

export const InputAddress = React.forwardRef<HTMLDivElement, Props>(
  function RefInputAddres({ value, ...rest }, ref) {
    return (
      <TextField
        ref={ref}
        {...rest}
        InputProps={{
          startAdornment: <AddressAvatar value={value} />,
        }}
        value={value}
      />
    );
  }
);
