import { MultisignatureAccount } from "../MultisignatureAccount";

export interface IMultisignatureSelectedRepository {
  getAccount(): MultisignatureAccount["address"] | null;
  saveAccount(account: MultisignatureAccount["address"] | ""): void;
}
