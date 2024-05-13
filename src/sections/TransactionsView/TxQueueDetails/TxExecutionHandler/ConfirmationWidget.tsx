import { Box } from "@mui/material";
import { Dispatch, SetStateAction } from "react";

import { useNetworkConnection } from "@/context/NetworkConnectionConfig/useNetworkConnection";
import { MultisignatureAccount } from "@/domain/MultisignatureAccount";
import { useApproveTx } from "@/hooks/multisigContract/transactions/useApproveTx";
import { useRejectTx } from "@/hooks/multisigContract/transactions/useRejectTx";
import { UseGetMultisigContractResult } from "@/hooks/multisigContract/useGetMultisigContract";
import { LoadingButton } from "@/sections/shared/common/LoadingButton";
import { DryRunMessage } from "@/sections/shared/DryRunMessage";

interface Props {
  multisigSelected: MultisignatureAccount;
  multisigContract: UseGetMultisigContractResult["contract"];
  expanded: boolean;
  proposedTxId: string;
  setSignerExecuting: Dispatch<SetStateAction<string[]>>;
}

export function ConfirmationWidget({
  multisigSelected,
  multisigContract,
  expanded,
  proposedTxId,
  setSignerExecuting,
}: Props) {
  const { accountConnected } = useNetworkConnection();
  const {
    approve,
    dryRunHandler: dryRunApprove,
    isPending: isPendingApprove,
  } = useApproveTx({
    accountConnected,
    multisigContract,
    proposedTxId,
    // onSuccess: () => setSignerExecuting([accountConnected || ""]),
  });
  const { reject, dryRunHandler: dryRunReject } = useRejectTx({
    accountConnected,
    multisigContract,
    proposedTxId,
    // onSuccess: () => setSignerExecuting([accountConnected || ""]),
  });
  const rejectDisabled =
    dryRunReject.isRunning ||
    Boolean(dryRunReject.error) ||
    dryRunApprove.isRunning;
  const approveDisabled =
    dryRunApprove.isRunning ||
    Boolean(dryRunApprove.error) ||
    dryRunReject.isRunning;

  return (
    <>
      <Box display="flex" flex={1} width="100%" mt={0} flexDirection="column">
        <DryRunMessage
          outcome={dryRunApprove.outcome}
          error={dryRunApprove.error}
          isRunning={dryRunApprove.isRunning}
        />
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          bgcolor={(theme) => theme.palette.grey.A100}
          p={3}
        >
          <LoadingButton
            sx={{
              borderColor: (theme) =>
                rejectDisabled
                  ? theme.palette.background.default
                  : theme.palette.grey[400],
            }}
            disabled={rejectDisabled}
            isLoading={dryRunReject.isRunning}
            onClick={reject}
          >
            Reject
          </LoadingButton>
          <LoadingButton
            variant="contained"
            disabled={approveDisabled}
            isLoading={dryRunApprove.isRunning || isPendingApprove}
            onClick={approve}
          >
            Confirm
          </LoadingButton>
        </Box>
      </Box>
    </>
  );
}
