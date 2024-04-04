import { createContext, PropsWithChildren } from "react";

import { IMultisignatureAccountsRepository } from "@/domain/repositories/IMultisignatureAccountsRepository";
import { IMultisignatureSelectedRepository } from "@/domain/repositories/IMultisignatureSelectedRepository";
import { MyDatabase } from "@/services/dexieLocalDb";
import { MultisignaturesAccountsDatabase } from "@/services/dexieLocalDb/MultisignatureAccountsRepository";
import { MultisignatureSelectedRepository } from "@/services/dexieLocalDb/MultisignatureSelectedRepository";

interface IDbContext {
  multisignatureAccountsRepository: IMultisignatureAccountsRepository;
  multisignatureSelectedRepository: IMultisignatureSelectedRepository;
}

const multisignatureAccountsRepository = new MultisignaturesAccountsDatabase(
  new MyDatabase()
);
const multisignatureSelectedRepository = new MultisignatureSelectedRepository();

export const DbContext = createContext<IDbContext>({
  multisignatureAccountsRepository,
  multisignatureSelectedRepository,
});

export function LocalDbProvider({ children }: PropsWithChildren) {
  return (
    <DbContext.Provider
      value={{
        multisignatureAccountsRepository,
        multisignatureSelectedRepository,
      }}
    >
      {children}
    </DbContext.Provider>
  );
}
