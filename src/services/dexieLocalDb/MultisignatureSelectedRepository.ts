import { MultisignatureAccount } from "@/domain/MultisignatureAccount";
import { IMultisignatureSelectedRepository } from "@/domain/repositories/IMultisignatureSelectedRepository";
import {
  getLocalStorageState,
  setLocalStorageState,
} from "@/utils/localStorage";

export class MultisignatureSelectedRepository
  implements IMultisignatureSelectedRepository
{
  private readonly storageKey = "signatoriesAccount";

  getAccount(): MultisignatureAccount["address"] | null {
    return getLocalStorageState(this.storageKey, null);
  }

  saveAccount(account: MultisignatureAccount["address"] | ""): void {
    setLocalStorageState(this.storageKey, account);
  }
}
