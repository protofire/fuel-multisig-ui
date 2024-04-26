import Image from "next/image";

import { TransactionDisplayInfo } from "@/services/contracts/transformers/toTxQueueItem";
import { formatDate, truncateAddress } from "@/utils/formatString";

import {
  ListItemtyled,
  StyledBox,
  StyledStack,
  StyledValueBox,
} from "./styled";

interface Props {
  data: TransactionDisplayInfo;
  owners: number;
}

export const TxQueueWidgetItem = ({ data, owners }: Props) => {
  const { image, typeName, validUntil, txMsg, to, valueAmount } = data;
  return (
    <ListItemtyled>
      <StyledBox sx={{ width: "100%" }}>
        <StyledBox>
          <Image
            src={image}
            alt="Arrow receive"
            priority
            width={30}
            height={30}
          />
          <StyledStack>
            <span>{typeName}</span>
            <span>{formatDate(validUntil)}</span>
            <p>
              {txMsg}
              {": "}
              {truncateAddress(to, 12)}
            </p>
          </StyledStack>
        </StyledBox>
        <StyledValueBox>
          {typeName !== "Transfer" && typeName !== "Call" ? `+` : "-"}
          {valueAmount}
          <span>
            {"?"}/{owners}
          </span>
        </StyledValueBox>
      </StyledBox>
    </ListItemtyled>
  );
};
