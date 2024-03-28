import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { Avatar, Stack, Tooltip, Typography } from "@mui/material";
import * as React from "react";

import { StyledStack } from "./styled";

const TOOLTIP_INFO =
  "This network is the one that has been selected in the wallet chain selector";

interface Props extends React.PropsWithChildren {
  name: string;
  logo?: string;
  description?: string;
  logoSize?: { width: number; height: number };
  showTooltip?: boolean;
  tooltipInfo?: string;
}

function MinimalLogoChain({
  children,
  logo,
  description,
}: Pick<Props, "children" | "logo" | "description">) {
  return (
    <Avatar
      sx={{
        justifyContent: "end",
        marginRight: ".5rem",
        width: "auto",
        height: "auto",
      }}
      {...(logo ? { src: logo } : null)}
      alt={description}
    >
      {children ?? null}
    </Avatar>
  );
}

export default function NetworkBadge({
  name,
  logo,
  description,
  logoSize,
  showTooltip = true,
  children,
}: Props) {
  return (
    <StyledStack logosize={logoSize}>
      <Stack flexDirection="row" alignItems="center">
        <MinimalLogoChain logo={logo} description={description}>
          {children}
        </MinimalLogoChain>
        <Stack>
          <Typography fontWeight={700} variant="body1">
            {name}
          </Typography>
        </Stack>
      </Stack>
      <Stack>
        {showTooltip && (
          <Tooltip placement="right" title={TOOLTIP_INFO}>
            <HelpOutlineIcon fontSize="small" />
          </Tooltip>
        )}
      </Stack>
    </StyledStack>
  );
}
