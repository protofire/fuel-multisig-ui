import AddCircleIcon from "@mui/icons-material/AddCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import {
  Box,
  Step,
  StepConnector,
  StepIconProps,
  StepLabel,
  Stepper,
  StepProps,
  styled,
  Typography,
} from "@mui/material";
import { useState } from "react";

import { MultisignatureAccount } from "@/domain/MultisignatureAccount";
import {
  OwnerWithAction,
  TransactionDisplayInfo,
  TX_STATUS_TYPE,
  TxStatusType,
} from "@/domain/TransactionProposed";

export const StyledStep = styled(Step)<StepProps>(() => ({
  padding: 0,
  "& .MuiStepLabel-root": {
    padding: 0,
  },
}));

const ColorlibStepIconRoot = styled("div")(({ theme }) => ({
  zIndex: 1,
  marginTop: "5px",
  color: theme.palette.primary.main,
}));

function ColorlibStepIcon(
  props: StepIconProps,
  ownersLength?: number,
  status?: TxStatusType
) {
  let lastIndex = "";
  if (ownersLength) {
    lastIndex = (ownersLength + 2).toString();
  }
  const icons: { [index: string]: React.ReactElement } = {
    1: <AddCircleIcon />,
    2:
      status === TX_STATUS_TYPE.CANCELLED ||
      status === TX_STATUS_TYPE.EXECUTED_FAILURE ? (
        <CancelIcon sx={{ color: "red" }} />
      ) : (
        <CheckCircleIcon />
      ),
    3: <VisibilityIcon sx={{ color: "#ffff" }} />,
    [lastIndex]: <VisibilityOffIcon sx={{ color: "#ffff" }} />,
  };

  return (
    <ColorlibStepIconRoot>{icons[String(props.icon)]}</ColorlibStepIconRoot>
  );
}

interface Props {
  txData: TransactionDisplayInfo;
  multisigSelected: MultisignatureAccount;
  signersApprovalStatus: OwnerWithAction[] | undefined;
}

export function TxExecutionHandler({
  txData,
  multisigSelected,
  signersApprovalStatus: owners,
}: Props) {
  const { status, approvalCount } = txData;
  const isProposed = status === TX_STATUS_TYPE.PROPOSED;
  const isCancelled = status === TX_STATUS_TYPE.CANCELLED;
  const [signerExecuting, setSignerExecuting] = useState<string[]>([]);
  const [showOwners, setShowOwners] = useState(true);

  if (!owners || !owners.length) return "loading";

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
      </Stepper>
    </Box>
  );
}
