import { Box, Skeleton } from "@mui/material";

import { useFormatAccountWalletItem } from "@/context/FormatAccountWalletItem/useFormatAccountWalletItem";
import { useGetTransactionQueue } from "@/hooks/multisigContract/transactions/useGetTransactionQueue";
import { useMultisignatureAccountSelected } from "@/hooks/multisignatureSelected/useMultisignatureAccountSelected";

import { TxDetailItem } from "./TxDetailItem";

export function TxQueueDetails() {
  const { transactionData, isLoading, error } = useGetTransactionQueue();
  const unavailableData = !transactionData || transactionData.length === 0;
  const { multisigSelected } = useMultisignatureAccountSelected();
  const { isB256Activated } = useFormatAccountWalletItem();

  if (isLoading) {
    return (
      <Box mt={2}>
        <Skeleton height={"3rem"} variant="rounded" />
      </Box>
    );
  }

  return (
    <>
      {transactionData.map((txData) => {
        return (
          <TxDetailItem
            key={txData.id}
            txData={txData}
            isB256Activated={isB256Activated}
          />
        );
      })}
    </>
  );
}
