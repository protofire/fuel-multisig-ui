import { Box, Tooltip, Typography } from "@mui/material";

import { useFormatAccountWalletItem } from "@/context/FormatAccountWalletItem/useFormatAccountWalletItem";
import {
  CallDisplayInfo,
  isCallDisplayInfo,
  TransferDisplayInfo,
} from "@/domain/TransactionProposed";
import CopyButton from "@/sections/shared/common/CopyButton";
import { MonoTypography } from "@/sections/shared/common/MonoTypography";
import { truncateAddress } from "@/utils/formatString";

import { AccountWithExplorer } from "./AccountWithExplorer";

interface Props {
  txData: TransferDisplayInfo | CallDisplayInfo;
}
export function TxDetails({ txData }: Props) {
  const { typeName, status, valueAmount, txMsg } = txData;
  const { isB256Activated } = useFormatAccountWalletItem();

  return (
    <Box
      sx={{
        backgroundColor: "#201A1B",
        width: "72%",
      }}
    >
      <Box p={4}>
        {isCallDisplayInfo(txData) ? (
          <>
            <Typography color="white" mb={1}>
              <span style={{ fontWeight: "bold" }}>{` Call contract: `}</span>{" "}
            </Typography>
            {txData.to && (
              <AccountWithExplorer
                account={txData.to}
                isB256Activated={isB256Activated}
              />
            )}
            <Typography>Selector: {txData.selector}</Typography>
            <Typography>
              Calldata (raw):
              <Tooltip placement="bottom-end" title={txData.callData}>
                <MonoTypography variant="caption" sx={{ mr: "0.3rem" }}>
                  {truncateAddress(txData.callData, 12, 12)}
                </MonoTypography>
              </Tooltip>
              <CopyButton
                text={txData.callData}
                initialToolTipText="Copy the whole Call data"
              />
            </Typography>
          </>
        ) : (
          <>
            <Typography color="white" mb={1}>
              {status === "EXECUTED_SUCCESS" ? "Sent" : "Send"}
              <span
                style={{ fontWeight: "bold" }}
              >{` ${valueAmount}`}</span>{" "}
              {txMsg}
            </Typography>
            {txData.to && (
              <AccountWithExplorer
                account={txData.to}
                isB256Activated={isB256Activated}
              />
            )}
          </>
        )}
      </Box>
    </Box>
  );
}
