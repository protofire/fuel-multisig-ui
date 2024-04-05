import { useRouter } from "next/navigation";

import { ROUTES } from "@/config/routes";
import { useNetworkConnection } from "@/context/NetworkConnectionConfig/useNetworkConnection";
import { MultisignatureAccount } from "@/domain/MultisignatureAccount";
import { useSaveMultisignatureSelected } from "@/hooks/multisignatureSelected/useSaveMultisignatureSelected";

import { MultisignatureAccountsTableUI } from "./MultisignatureAccountsTableUI";

interface Props {
  multisigs: Array<MultisignatureAccount> | null;
}

export function MultisignatureAccountsTable({ multisigs }: Props) {
  const { chainInfo } = useNetworkConnection();
  const { save } = useSaveMultisignatureSelected();
  const router = useRouter();

  const handleMultisigRedirect = async (account: MultisignatureAccount) => {
    save(account);
    router.replace(ROUTES.App);
  };

  if (multisigs === null) return null;

  return (
    <MultisignatureAccountsTableUI
      multisigs={multisigs}
      chainName={chainInfo?.name || ""}
      clickAction={handleMultisigRedirect}
    />
  );
}
