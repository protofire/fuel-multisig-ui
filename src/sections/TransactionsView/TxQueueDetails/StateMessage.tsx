import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import { Box, Tooltip, Typography } from "@mui/material";
import React from "react";

import { TxStatusType } from "@/domain/TransactionProposed";

const SimpleMessage = ({
  status,
  text,
}: {
  status: TxStatusType;
  text: string;
}) => (
  <Typography color={status === "READY_TO_EXECUTE" ? "#ADD500" : "#FF9C7D"}>
    {text}
  </Typography>
);

export const StateMessage = ({
  txType,
  error = "",
}: {
  txType: TxStatusType;
  error?: string;
}) => {
  const msg: Record<TxStatusType, React.JSX.Element> = {
    PROPOSED: <SimpleMessage status={txType} text="Awaiting Confirmations" />,
    EXECUTED_SUCCESS: <SimpleMessage status={txType} text="Success" />,

    CANCELLED: <SimpleMessage status={txType} text="Cancelled" />,
    EXECUTED_FAILURE: (
      <Box
        color={(theme) => theme.palette.error.main}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Tooltip title={error} placement="top">
          <span style={{ display: "flex" }}>
            <ErrorOutlineIcon sx={{ top: "1rem", fontSize: "1.3rem" }} />
            <Typography ml={0.4}>Error</Typography>
          </span>
        </Tooltip>
      </Box>
    ),
    READY_TO_EXECUTE: (
      <Box
        color={(theme) => theme.palette.success.main}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Tooltip title={error} placement="top">
          <span style={{ display: "flex" }}>
            <RocketLaunchIcon sx={{ top: "1rem", fontSize: "1.3rem" }} />
            <Typography ml={0.4}>Ready to execute</Typography>
          </span>
        </Tooltip>
      </Box>
    ),
  };

  return msg[txType];
};
