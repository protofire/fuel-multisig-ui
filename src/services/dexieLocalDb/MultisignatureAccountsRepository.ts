import { ChainId } from "@/domain/ChainInfo";
import { MultisignatureAccount } from "@/domain/MultisignatureAccount";
import { IMultisignatureAccountsRepository } from "@/domain/repositories/IMultisignatureAccountsRepository";

import { MyDatabase } from ".";

export class MultisignaturesAccountsDatabase
  implements IMultisignatureAccountsRepository
{
  private db: MyDatabase;

  constructor(db: MyDatabase) {
    this.db = db;
  }
  async listXsignersAccount(
    networkId?: ChainId
  ): Promise<MultisignatureAccount[]> {
    if (networkId) {
      return await this.db.signatoriesAccounts.where({ networkId }).toArray();
    }

    return await this.db.signatoriesAccounts.toArray();
  }

  async addSignatoryAccount(account: MultisignatureAccount): Promise<string> {
    return this.db.signatoriesAccounts.add(account) as Promise<string>;
  }

  async getSignatoryAccount(
    networkId: ChainId,
    address: string
  ): Promise<MultisignatureAccount | undefined> {
    return await this.db.signatoriesAccounts.get([networkId, address]);
  }

  async updateSignatoryAccount(
    account: MultisignatureAccount,
    changes: Partial<MultisignatureAccount>
  ): Promise<number> {
    return await this.db.signatoriesAccounts.update(account, changes);
  }

  async deleteSignatoryAccount(
    address: string,
    networkId: ChainId
  ): Promise<void> {
    const deleteKey = [networkId as unknown as string, address];
    return this.db.signatoriesAccounts.delete(deleteKey);
  }

  async findSignatoriesByOwner(
    walletAddress: string,
    networkId?: ChainId
  ): Promise<MultisignatureAccount[]> {
    if (networkId) {
      return await this.db.signatoriesAccounts
        .where({ networkId })
        .filter((signatory) =>
          signatory.owners.map((owner) => owner.address).includes(walletAddress)
        )
        .toArray();
    } else {
      return await this.db.signatoriesAccounts
        .filter((signatory) =>
          signatory.owners.map((owner) => owner.address).includes(walletAddress)
        )
        .toArray();
    }
  }

  async updateSignatoriesAccountsInBatch(
    accounts: MultisignatureAccount[]
  ): Promise<void> {
    try {
      await this.db.signatoriesAccounts.bulkPut(accounts);
      console.debug("Signatories accounts updated successfully");
    } catch (error) {
      console.error("Error updating signatories accounts:", error);
    }
  }
}
