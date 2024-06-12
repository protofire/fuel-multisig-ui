"use client";

import { CircularProgress } from "@mui/material";
import Link from "next/link";

import { ROUTES } from "@/config/routes";
import { useFormatAccountWalletItem } from "@/context/FormatAccountWalletItem/useFormatAccountWalletItem";
import { useGetTransactionQueue } from "@/hooks/multisigContract/transactions/useGetTransactionQueue";
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
  const { isB256Activated } = useFormatAccountWalletItem();

  return (
    <TxQueueWidgetStyled border={false}>
      {unavailableData ? (
        <StyledList>
          <NoItems>
            {isLoading ? (
              <CircularProgress />
            ) : (
              error || "There are no transactions in this account"
            )}
          </NoItems>
        </StyledList>
      ) : (
        <>
          {multisigSelected && (
            <StyledList>
              {transactionData.map((_data) => (
                <TxQueueWidgetItem
                  key={_data.id}
                  isB256Activated={isB256Activated}
                  data={_data}
                  owners={multisigSelected.owners.length}
                />
              ))}
            </StyledList>
          )}
          <StyledButton LinkComponent={Link} href={ROUTES.Transactions}>
            View All
          </StyledButton>
        </>
      )}
    </TxQueueWidgetStyled>
  );
}
