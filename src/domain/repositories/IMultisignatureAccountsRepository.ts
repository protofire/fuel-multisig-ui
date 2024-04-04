import { ChainId } from "@/domain/ChainInfo";
import { MultisignatureAccount } from "@/domain/MultisignatureAccount";

export interface IMultisignatureAccountsRepository {
  addSignatoryAccount(account: MultisignatureAccount): Promise<string>;
  getSignatoryAccount(
    networkId: ChainId,
    address: string
  ): Promise<MultisignatureAccount | undefined>;
  updateSignatoryAccount(
    account: MultisignatureAccount,
    changes: Partial<MultisignatureAccount>
  ): Promise<number>;
  findSignatoriesByOwner(
    walletAddress: string,
    networkId?: ChainId
  ): Promise<MultisignatureAccount[]>;
  listXsignersAccount(networkId?: ChainId): Promise<MultisignatureAccount[]>;
  updateSignatoriesAccountsInBatch(
    accounts: MultisignatureAccount[]
  ): Promise<void>;
}
