import { useCallback, useEffect, useState } from "react";

import { useInteractionError } from "@/context/InteractionErrorContext/useInteractionError";
import { useNetworkConnection } from "@/context/NetworkConnectionConfig/useNetworkConnection";
import { FuelMultisigAbi__factory } from "@/services/contracts/multisig/contracts/factories/FuelMultisigAbi__factory";
import bytecode from "@/services/contracts/multisig/contracts/FuelMultisigAbi.hex";
import { getErrorMessage } from "@/utils/error";

interface UseDeployMultisigContractReturn {
  deployContract: () => Promise<string | undefined>;
  error: string | undefined;
  isLoading: boolean;
}

// const fromHexString = (hexString: string) =>
//   const match = hexString.match(/.{1,2}/g
//   Uint8Array.from().map((byte) => parseInt(byte, 16)));

export function useDeployMultisigContract(): UseDeployMultisigContractReturn {
  const { wallet } = useNetworkConnection();
  const [error, setError] = useState<string | undefined>();
  const [isLoading, setLoading] = useState(false);
  const { setError: setGlobalError } = useInteractionError();

  const deployContract = useCallback(async () => {
    setError(undefined);
    if (!wallet) {
      setError("Wallet is not loaded");
      return;
    }

    setLoading(true);
    try {
      const gasPrice = wallet.provider.getGasConfig().minGasPrice;
      const gasMax = wallet.provider.getGasConfig().maxGasPerTx;
      const hex = Uint8Array.from(Buffer.from(bytecode.slice(2), "hex"));

      const factory = await FuelMultisigAbi__factory.deployContract(
        hex,
        wallet,
        {
          gasPrice,
          maxFee: gasMax,
        }
      );

      return factory.id.toAddress();
    } catch (e) {
      const msg = getErrorMessage(e);
      console.error(e);
      setError(msg);
    } finally {
      setLoading(false);
    }
  }, [wallet]);

  useEffect(() => {
    setGlobalError(error ? { msg: error, onRetry: deployContract } : null);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  return { deployContract, error, isLoading };
}
