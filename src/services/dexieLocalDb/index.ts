import Dexie from "dexie";

import { MultisignatureAccount } from "@/domain/MultisignatureAccount";

export class MyDatabase extends Dexie {
  public signatoriesAccounts: Dexie.Table<
    MultisignatureAccount,
    string | string[]
  >;

  constructor() {
    super("MyDatabase");

    this.version(1).stores({
      signatoriesAccounts: "[networkId+address],networkId",
    });

    this.signatoriesAccounts = this.table("signatoriesAccounts");
  }
}
