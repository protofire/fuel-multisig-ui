"use client";

import { Skeleton, Typography } from "@mui/material";

import { useGetTransactionQueue } from "@/hooks/multisigContract/useGetTxIdList";

import { NoItems, StyledList, TxQueueWidgetStyled } from "./styled";

export function TxQueueWidget() {
  const { transactionData, isLoading, error } = useGetTransactionQueue();
  const unavailableData = !transactionData || transactionData.length === 0;

  return (
    <TxQueueWidgetStyled border={false}>
      {unavailableData ? (
        <StyledList>
          <NoItems>
            {isLoading ? (
              <Skeleton />
            ) : (
              error || "There are no transactions in this account"
            )}
          </NoItems>
        </StyledList>
      ) : (
        <StyledList>
          {transactionData.map((t, i) => (
            <Typography key={t.tx_id.toString()}>{i}</Typography>
          ))}
        </StyledList>
      )}
    </TxQueueWidgetStyled>
  );
}
