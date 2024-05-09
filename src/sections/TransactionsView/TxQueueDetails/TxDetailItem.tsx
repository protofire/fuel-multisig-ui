import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionSummary,
  Box,
  Grid,
  Typography,
} from "@mui/material";
import Image from "next/image";

import { TransactionDisplayInfo } from "@/services/contracts/transformers/toTxQueueItem";
import { MAIN_COLOR } from "@/themes/palette";
import { formatDate, truncateAddress } from "@/utils/formatString";

import { StyledGrid } from "./styled";

interface Props {
  txData: TransactionDisplayInfo;
  isB256Activated: boolean;
}

export function TxDetailItem({ txData, isB256Activated = false }: Props) {
  const { image, typeName, to, validUntil } = txData;
  const _to = isB256Activated ? to?.b256 : to?.bech32;
  const _validUntil = formatDate(validUntil);

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
              {typeName !== "Transfer" && typeName !== "Call" ? `+` : "-"}
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
            {/* <Typography color={successTx ? "#ADD500" : "#FF9C7D"}>
              {txStateMsg}
            </Typography> */}
          </StyledGrid>
        </Grid>
      </AccordionSummary>
    </Accordion>
  );
}
