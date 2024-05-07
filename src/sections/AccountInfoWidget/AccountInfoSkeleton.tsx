import {
  Avatar,
  Box,
  Skeleton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import * as React from "react";

import { MultisignatureAccount } from "@/domain/MultisignatureAccount";
import CopyButton from "@/sections/common/CopyButton";

import { AccountInfoWrapper } from "./styled";

type Props = Partial<MultisignatureAccount> & {
  networkName: string;
  networkColor: string | undefined;
};

export function AccountInfoSkeleton({
  name,
  networkName,
  networkColor,
}: Props) {
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
            <Skeleton variant="circular">
              <Avatar></Avatar>
            </Skeleton>
            <Tooltip title="Threshold" arrow>
              <Box display="flex" flexDirection="column">
                <Typography variant="caption" color="primary">
                  <Skeleton width={"20px"} />
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
              <Skeleton width={"80%"} />
            </Typography>
            <Stack direction={"row"}>
              <Skeleton width={"40%"} />
              <CopyButton text={""} />
            </Stack>
          </Box>
        </Box>
        <Box>
          <Typography variant="caption" color="white">
            {networkName}
          </Typography>
        </Box>
      </Box>
    </AccountInfoWrapper>
  );
}
