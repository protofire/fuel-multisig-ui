import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Grid,
  Typography,
} from "@mui/material";
import Image from "next/image";

import { MultisignatureAccount } from "@/domain/MultisignatureAccount";
import { TransactionDisplayInfo } from "@/domain/TransactionProposed";
import { useTxSigners } from "@/hooks/multisigContract/transactions/useTxSigners";
import { MAIN_COLOR } from "@/themes/palette";
import { formatDate, truncateAddress } from "@/utils/formatString";

import { StateMessage } from "./StateMessage";
import { StyledGrid } from "./styled";
import { TxDetails } from "./TxDetails";
import { TxExecutionHandler } from "./TxExecutionHandler";

interface Props {
  txData: TransactionDisplayInfo;
  isB256Activated: boolean;
  multisigSelected: MultisignatureAccount;
}

export function TxDetailItem({
  txData,
  isB256Activated = false,
  multisigSelected,
}: Props) {
  const { id, image, typeName, to, validUntil, status, signMathOperation } =
    txData;
  const _to = isB256Activated ? to?.b256 : to?.bech32;
  const _validUntil = formatDate(validUntil);
  const { data: signersApprovalStatus } = useTxSigners({ txId: id });

  return (
    <Accordion
      sx={{
        "&.Mui-expanded": {
          border: "1px solid",
          borderColor: MAIN_COLOR,
          borderRadius: "0.2rem",
          background: "#82ffdd26",
        },
      }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls={`${txData.id}-content`}
        id={`${txData.id}-header`}
      >
        <Grid
          sx={{
            "&.MuiGrid-root": {
              margin: "0px",
            },
            "&.MuiGrid-root .MuiGrid-item": {
              margin: "0px",
              padding: "0px",
            },
          }}
          container
        >
          <StyledGrid item xs={1} sm={1} md={1}>
            <Typography>{txData.id}</Typography>
          </StyledGrid>
          <StyledGrid item xs={1} sm={1} md={1}>
            <Image
              src={image}
              priority
              width={30}
              height={30}
              alt="image of type of Transaction"
            />
          </StyledGrid>
          <StyledGrid
            item
            xs={3}
            sm={3}
            md={3}
            style={{ justifyContent: "left" }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <span>{typeName}</span>
              <span style={{ fontSize: "0.9rem" }}>
                {txData.txMsg} : {truncateAddress(_to, 12)}
              </span>
            </Box>
          </StyledGrid>
          <StyledGrid item xs={2} sm={2} md={2}>
            <Typography>
              {signMathOperation}
              {`${txData.valueAmount}`}
            </Typography>
          </StyledGrid>
          <StyledGrid item xs={3} sm={3} md={3}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <span style={{ fontSize: "0.9rem" }}>up to:</span>
              <span style={{ fontSize: "0.9rem" }}>{_validUntil}</span>
            </Box>
          </StyledGrid>
          <StyledGrid item xs={2} sm={2} md={2}>
            <StateMessage txType={status} />
          </StyledGrid>
        </Grid>
      </AccordionSummary>
      <AccordionDetails sx={{ backgroundColor: "#201A1B", padding: "0px" }}>
        <Box sx={{ flexGrow: 1, display: "flex" }}>
          <TxDetails txData={txData} />
          {multisigSelected && (
            <TxExecutionHandler
              txData={txData}
              multisigSelected={multisigSelected}
              signersApprovalStatus={signersApprovalStatus}
            />
          )}
        </Box>
      </AccordionDetails>
    </Accordion>
  );
}
