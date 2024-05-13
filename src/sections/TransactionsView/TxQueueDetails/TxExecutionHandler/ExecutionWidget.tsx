import { Box } from "@mui/material";
import { Dispatch, SetStateAction } from "react";

import { useNetworkConnection } from "@/context/NetworkConnectionConfig/useNetworkConnection";
import { MultisignatureAccount } from "@/domain/MultisignatureAccount";
import { useExecuteTx } from "@/hooks/multisigContract/transactions/useExecuteTx";
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

export function ExecutionWidget({
  multisigSelected,
  multisigContract,
  expanded,
  proposedTxId,
  setSignerExecuting,
}: Props) {
  const { accountConnected } = useNetworkConnection();
  const { execute, dryRunHandler } = useExecuteTx({
    multisigSelected,
    multisigContract,
    proposedTxId,
  });

  return (
    <>
      <Box display="flex" flex={1} width="100%" mt={0} flexDirection="column">
        <DryRunMessage
          outcome={dryRunHandler.outcome}
          error={dryRunHandler.error}
          isRunning={dryRunHandler.isRunning}
        />
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          bgcolor={(theme) => theme.palette.grey.A100}
          p={3}
        >
          <LoadingButton
            variant="contained"
            disabled={dryRunHandler.isRunning || Boolean(dryRunHandler.error)}
            isLoading={dryRunHandler.isRunning}
            onClick={() => {
              setSignerExecuting([accountConnected || ""]);
            }}
          >
            Sign and Execute
          </LoadingButton>
        </Box>
      </Box>
    </>
  );
}
