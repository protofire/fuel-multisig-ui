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
  isB256Activated?: boolean;
}

export const TxQueueWidgetItem = ({
  data,
  owners,
  isB256Activated = false,
}: Props) => {
  const {
    image,
    typeName,
    validUntil,
    txMsg,
    to,
    valueAmount,
    approvalCount,
    signMathOperation,
  } = data;
  const _to = isB256Activated ? to?.b256 : to?.bech32;

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
              {truncateAddress(_to, 12)}
            </p>
          </StyledStack>
        </StyledBox>
        <StyledValueBox>
          {signMathOperation}
          {valueAmount}
          <span>
            {approvalCount}/{owners}
          </span>
        </StyledValueBox>
      </StyledBox>
    </ListItemtyled>
  );
};
