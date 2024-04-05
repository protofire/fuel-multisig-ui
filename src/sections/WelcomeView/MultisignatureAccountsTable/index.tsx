import { useNetworkConnection } from "@/context/NetworkConnectionConfig/useNetworkConnection";
import { MultisignatureAccount } from "@/domain/MultisignatureAccount";

import { MultisignatureAccountsTableUI } from "./MultisignatureAccountsTableUI";

interface Props {
  multisigs: Array<MultisignatureAccount> | null;
  //   onClick: (
  //     account: MultisignatureAccount
  //   ) => Promise<void | MultisignatureAccount>;
}

export function MultisignatureAccountsTable({ multisigs }: Props) {
  const { chainInfo } = useNetworkConnection();
  //   const { logo, name: networkName } = getChain(network);
  //   const theme = useTheme();
  //   const { signatoriesAccountRepository } = useLocalDbContext();

  //   const handleMultisigRedirect = async (address: string) => {
  //     const selectedMultisig = multisigs?.find(
  //       (multisig) => multisig.address === address
  //     );

  //     if (!selectedMultisig) {
  //       return;
  //     }
  //     const savedMultisig =
  //       await signatoriesAccountRepository.getSignatoryAccount(
  //         selectedMultisig.networkId,
  //         selectedMultisig.address
  //       );
  //     const updatedMultisigWithOwners = {
  //       ...selectedMultisig,
  //       owners: selectedMultisig.owners.map((owner) => {
  //         const savedOwner = savedMultisig?.owners.find(
  //           (savedOwner) => savedOwner.address === owner.address
  //         );
  //         return {
  //           ...owner,
  //           name: savedOwner?.name || owner.name,
  //         };
  //       }),
  //     };
  //     await setXsigner(updatedMultisigWithOwners as SignatoriesAccount);
  //     router.replace(ROUTES.App);
  //   };

  //   if (multisigs === null || !accountConnected) return null;

  return (
    <MultisignatureAccountsTableUI
      multisigs={multisigs}
      chainName={chainInfo?.name || ""}
    />
  );
}
