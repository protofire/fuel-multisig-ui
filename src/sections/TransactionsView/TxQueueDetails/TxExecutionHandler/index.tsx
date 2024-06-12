import {
  Box,
  Skeleton,
  StepConnector,
  StepContent,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";
import { alpha } from "@mui/system";
import { useState } from "react";

import { MultisignatureAccount } from "@/domain/MultisignatureAccount";
import {
  OwnerWithAction,
  TransferDisplayInfo,
  TX_OWNER_STATUS_TYPE,
  TX_STATUS_TYPE,
} from "@/domain/TransactionProposed";
import { useGetMultisigContract } from "@/hooks/multisigContract/useGetMultisigContract";
import { AccountSigner } from "@/sections/shared/AccountSigner";
import { toAccountWalletItem } from "@/services/fuel/connectors/transformer";

import { ConfirmationWidget } from "./ConfirmationWidget";
import { ExecutionWidget } from "./ExecutionWidget";
import { CircleStepIcon, ColorlibStepIcon, StyledStep } from "./styled";
import { TxExecutionSkeleton } from "./TxExecutionSkeleton";

interface Props {
  txData: TransferDisplayInfo;
  multisigSelected: MultisignatureAccount;
  signersApprovalStatus: OwnerWithAction[] | undefined;
  isB256Activated: boolean;
  expanded: boolean;
}

export function TxExecutionHandler({
  txData,
  multisigSelected,
  signersApprovalStatus: owners,
  expanded,
}: Props) {
  const { status, approvalCount, id: proposedTxId } = txData;
  const isProposed = status === TX_STATUS_TYPE.PROPOSED;
  const isReady = status === TX_STATUS_TYPE.READY_TO_EXECUTE;
  const isCancelled = status === TX_STATUS_TYPE.CANCELLED;
  const [signerExecuting, setSignerExecuting] = useState<string[]>([]);
  const [showOwners, setShowOwners] = useState(true);
  const { contract: multisigContract } = useGetMultisigContract({
    contractId: multisigSelected.address,
  });

  if (!owners || !owners.length) return <TxExecutionSkeleton />;

  return (
    <Box
      sx={{ maxWidth: 400, padding: "20px", borderLeft: "3px solid #120D0E" }}
    >
      <Stepper
        connector={
          <StepConnector
            sx={{
              span: {
                minHeight: "19px",
              },
            }}
          ></StepConnector>
        }
        orientation="vertical"
      >
        <StyledStep>
          <StepLabel
            StepIconComponent={ColorlibStepIcon}
            sx={{
              color: (theme) => theme.palette.primary.main,
            }}
          >
            <Typography>Created</Typography>
          </StepLabel>
        </StyledStep>
        {/* Confirmations Section*/}
        <StyledStep>
          <StepLabel
            StepIconComponent={(e) => ColorlibStepIcon(e, undefined, status)}
            sx={{
              color: (theme) => theme.palette.primary.main,
              display: "flex",
            }}
          >
            <Typography>
              Confirmations{" "}
              {isProposed ? (
                <span
                  style={{ color: "#636669", marginLeft: "1rem" }}
                >{`(${approvalCount} / ${multisigSelected.threshold})`}</span>
              ) : null}
            </Typography>
          </StepLabel>
        </StyledStep>
        {showOwners
          ? owners.map((owner) => {
              const _owner = toAccountWalletItem(owner.address, owner.name);

              if (signerExecuting.includes(owner.address)) {
                return (
                  <StyledStep active={true} key={owner.address}>
                    <StepLabel
                      StepIconComponent={() =>
                        CircleStepIcon(TX_OWNER_STATUS_TYPE.PENDING)
                      }
                    >
                      <Box
                        sx={{
                          marginLeft: "15px",
                          display: "flex",
                        }}
                      >
                        <Skeleton
                          variant="text"
                          height={30}
                          width={"80%"}
                          sx={{
                            bgcolor: (theme) =>
                              alpha(theme.palette.primary.main, 0.4),
                          }}
                        />
                      </Box>
                    </StepLabel>
                  </StyledStep>
                );
              }

              return (
                <StyledStep active={true} key={owner.address}>
                  <StepLabel
                    StepIconComponent={() => CircleStepIcon(owner.status)}
                  >
                    <Box sx={{ display: "flex" }}>
                      <AccountSigner
                        key={owner.address}
                        owner={_owner}
                        endlength={8}
                      />
                    </Box>
                  </StepLabel>
                </StyledStep>
              );
            })
          : null}
        {/* Button Display owners */}
        <StyledStep>
          <StepLabel
            StepIconComponent={(e) => ColorlibStepIcon(e, owners!.length + 1)}
          >
            <Typography
              sx={{
                fontWeight: "bold",
                cursor: "pointer",
                color: "#82ffdd",
                textDecoration: "underline",
              }}
              onClick={() => setShowOwners(!showOwners)}
            >
              {showOwners ? "Hide all" : "Show all"}
            </Typography>
          </StepLabel>
        </StyledStep>

        {/* Executed section */}
        {expanded && (
          <StyledStep active={true}>
            <StepLabel
              sx={{ mt: 1.5 }}
              StepIconComponent={() =>
                CircleStepIcon(
                  status,
                  approvalCount,
                  multisigSelected.threshold
                )
              }
            >
              <Typography>
                {isReady ? "Ready to execute" : "Can be executed"}
              </Typography>
            </StepLabel>
            <StepContent sx={{ mt: "0.4rem", padding: "0px" }}>
              <Box sx={{ ml: 2 }}>
                <>
                  {isProposed ? (
                    <Typography sx={{ fontSize: "0.8rem", mb: 3, mr: 3 }}>
                      This transaction can be executed once the threshold is
                      reached
                    </Typography>
                  ) : null}
                  {isReady
                    ? multisigContract && (
                        <ExecutionWidget
                          multisigSelected={multisigSelected}
                          multisigContract={multisigContract}
                          setSignerExecuting={setSignerExecuting}
                          expanded={expanded}
                          proposedTxId={proposedTxId}
                        />
                      )
                    : multisigContract && (
                        <ConfirmationWidget
                          multisigSelected={multisigSelected}
                          multisigContract={multisigContract}
                          setSignerExecuting={setSignerExecuting}
                          expanded={expanded}
                          proposedTxId={proposedTxId}
                        />
                      )}
                </>
              </Box>
            </StepContent>
          </StyledStep>
        )}
      </Stepper>
    </Box>
  );
}
