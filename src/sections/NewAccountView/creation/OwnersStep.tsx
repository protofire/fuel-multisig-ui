import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import {
  Box,
  Button,
  IconButton,
  MenuItem,
  Select,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";

import { APP_NAME } from "@/config/app";
import { useNetworkConnection } from "@/context/NetworkConnectionConfig/useNetworkConnection";
import { useEffectOnceIf } from "@/hooks/common/useEffectOnceIf";
import { FuelExplorerLink } from "@/sections/common/ExplorerLink/FuelExplorerLink";
import { MonoTypography } from "@/sections/common/MonoTypography";
import { StyledBox } from "@/sections/shared/BaseStepper/styled";
import { truncateAddress } from "@/utils/formatString";

import { useCreateAccountContext } from "../CreateAccountContext";

export function OwnersStep() {
  const { accountConnected } = useNetworkConnection();
  const { inputFormManager, managerStep } = useCreateAccountContext();
  const {
    activeStep,
    stepsLength,
    downStep: handleBack,
    upStep: handleNext,
  } = managerStep;
  const { register, errors, setValue, values } = inputFormManager;
  const { owners, threshold } = values;

  useEffectOnceIf(() => {
    setValue("owners", [
      {
        address: accountConnected as string,
        name: `Creator_${accountConnected?.slice(-4)}`,
      },
    ]);
  }, owners.length === 0 && accountConnected !== undefined);

  return (
    <Box>
      <Typography variant="h6" component="div" mt={1}>
        Set the owner wallets of your {APP_NAME} Account{" "}
        {
          <MonoTypography variant="caption" sx={{ mr: "0.3rem" }}>
            {truncateAddress(values.deployedMultisigAddress, 6, 4)}
            <FuelExplorerLink hash={values.deployedMultisigAddress} />
          </MonoTypography>
        }
        and how many need to confirm to execute a valid transaction.
      </Typography>
      <StyledBox
        mt={2}
        sx={{
          maxHeight: 300,
          overflowY: "auto",
        }}
        mb={5}
      >
        {owners.map((owner, index) => (
          <Box key={`Signer-${index}`} mb={1} mt={2}>
            <Box display="flex" gap={1} alignItems="center" mb={1}>
              <TextField
                label="Owner name"
                value={owner.name}
                // onChange={(e) =>
                //   handleOwnerChange(index, e.target.value, "name")
                // }
              />

              <TextField
                fullWidth
                label="Owner address"
                value={owner.address}
                // onChange={(e) =>
                //   handleOwnerChange(index, e.target.value, "address")
                // }
              />

              <IconButton
                disabled={index === 0}
                // onClick={() => removeOwner(index)}
              >
                <DeleteOutlineOutlinedIcon />
              </IconButton>
            </Box>
            {/* {errors[step][index]?.error && (
              <Typography variant="caption" color="red">
                {errors[step][index]?.message}
              </Typography>
            )} */}
          </Box>
        ))}
        <Button
          variant="text"
          sx={{ justifyContent: "flex-start", width: "150px", fontSize: 14 }}
          // onClick={addOwner}
        >
          + Add new owner
        </Button>
      </StyledBox>
      <StyledBox>
        <Box mb={1}>
          <Typography
            fontWeight="bold"
            display="flex"
            alignItems="center"
            gap={0.5}
            component="div"
          >
            Threshold
            <Tooltip
              placement="right"
              title="Signatures required to execute a transaction"
            >
              <HelpOutlineIcon fontSize="small" />
            </Tooltip>
          </Typography>
          <Typography variant="h6">
            Any transaction requires the confirmation of:
          </Typography>
        </Box>
        <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
          <Select
            value={threshold}
            onChange={(e) => setValue("threshold", Number(e.target.value))}
          >
            {owners.map((owner, index) => (
              <MenuItem key={owner.name} value={index + 1}>
                {index + 1}
              </MenuItem>
            ))}
          </Select>
          <Typography variant="body1">
            out of {owners.length} owner(s)
          </Typography>
        </Box>
      </StyledBox>
    </Box>
  );
}
