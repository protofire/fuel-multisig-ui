"use client";

import { Skeleton } from "@mui/material";
import Link from "next/link";

import { ROUTES } from "@/config/routes";
import { useGetTransactionQueue } from "@/hooks/multisigContract/useGetTransactionsList";
import { useMultisignatureAccountSelected } from "@/hooks/multisignatureSelected/useMultisignatureAccountSelected";

import {
  NoItems,
  StyledButton,
  StyledList,
  TxQueueWidgetStyled,
} from "./styled";
import { TxQueueWidgetItem } from "./TxQueueWidgetItem";

export function TxQueueWidget() {
  const { transactionData, isLoading, error } = useGetTransactionQueue();
  const unavailableData = !transactionData || transactionData.length === 0;
  const { multisigSelected } = useMultisignatureAccountSelected();

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
        <>
          <StyledList>
            {transactionData.map((_data, i) => (
              <TxQueueWidgetItem
                key={_data.id}
                data={_data}
                owners={multisigSelected?.owners.length || 1}
              />
            ))}
          </StyledList>
          <StyledButton LinkComponent={Link} href={ROUTES.Transactions}>
            View All
          </StyledButton>
        </>
      )}
    </TxQueueWidgetStyled>
  );
}
