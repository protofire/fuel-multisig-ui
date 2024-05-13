import { Box, Typography } from "@mui/material";

import { useFormatAccountWalletItem } from "@/context/FormatAccountWalletItem/useFormatAccountWalletItem";
import { TransactionDisplayInfo } from "@/domain/TransactionProposed";

import { AccountWithExplorer } from "./AccountWithExplorer";

interface Props {
  txData: TransactionDisplayInfo;
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
        {typeName === "Transfer" ? (
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
        ) : (
          <>Call</>
        )}
      </Box>
    </Box>
  );
}
