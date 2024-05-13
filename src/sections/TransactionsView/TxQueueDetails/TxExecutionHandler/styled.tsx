import AddCircleIcon from "@mui/icons-material/AddCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Step, StepIconProps, StepProps, styled } from "@mui/material";

import {
  TX_OWNER_STATUS_TYPE,
  TX_STATUS_TYPE,
  TxStatusType,
} from "@/domain/TransactionProposed";

export const StyledStep = styled(Step)<StepProps>(() => ({
  padding: 0,
  "& .MuiStepLabel-root": {
    padding: 0,
  },
}));

export const CircleStepIconRoot = styled("div")(() => ({
  marginLeft: "7px",
  "& .CircletepIcon": {
    width: 11,
    height: 11,
    borderRadius: "50%",
    border: "2px solid #ffff",
  },
  "& .CircletepIcon-completedIcon": {
    width: 11,
    height: 11,
    borderRadius: "50%",
    backgroundColor: "#82ffdd",
  },
  "& .CircletepIcon-rejectedIcon": {
    width: 11,
    height: 11,
    borderRadius: "50%",
    backgroundColor: "red",
  },
}));

export const ColorlibStepIconRoot = styled("div")(({ theme }) => ({
  zIndex: 1,
  marginTop: "5px",
  color: theme.palette.primary.main,
}));

export const CircleStepIcon = (
  status?: string,
  approvalCount?: number,
  threshold?: number
) => {
  let className = "";
  if (
    approvalCount === threshold ||
    status === TX_OWNER_STATUS_TYPE.APPROVED ||
    status === TX_STATUS_TYPE.EXECUTED_SUCCESS
  ) {
    className = "CircletepIcon-completedIcon";
  }

  if (
    status === TX_STATUS_TYPE.PROPOSED ||
    status === TX_OWNER_STATUS_TYPE.PENDING
  ) {
    className = "CircletepIcon";
  }

  if (
    status === TX_STATUS_TYPE.CANCELLED ||
    status === TX_OWNER_STATUS_TYPE.REJECTED ||
    status === TX_STATUS_TYPE.EXECUTED_FAILURE
  ) {
    className = "CircletepIcon-rejectedIcon";
  }
  return (
    <CircleStepIconRoot>
      <div className={className} />
    </CircleStepIconRoot>
  );
};

export function ColorlibStepIcon(
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
