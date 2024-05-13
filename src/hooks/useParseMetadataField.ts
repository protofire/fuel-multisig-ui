import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";

import { MetadataManager } from "@/services/fuel/MetadataManager";
import { readerAsFileState } from "@/utils/fileReader";

type OnChange = Dispatch<SetStateAction<File | null>>;
type OnRemove = () => void;

interface Options {
  isWasmRequired?: boolean;
}

interface Callbacks {
  onChange?: OnChange;
  onRemove?: OnRemove;
}

export type MetadataState = Record<string, unknown>;

export interface UseMetadata {
  metadata: MetadataState;
  onRemove: () => void;
  metadataFile: File | undefined;
  onChange: (_file: File) => void;
}

export const metadataManager = new MetadataManager();

export function useParseMetadataField(
  initialValue?: Record<string, unknown>,
  options: Options & Callbacks = {}
): UseMetadata {
  const [metadataFile, setMetadataFile] = useState<File | undefined>();
  //   const apiPromise = useMemo(() => apiProvider?.api, [apiProvider?.api]);
  //   const { isWasmRequired = false } = options;
  const [metadata, setMetadata] = useState<MetadataState>();

  const onChange = useCallback(async (file: File) => {
    setMetadataFile(file);
    const fileState = await readerAsFileState(file);
    const abiJson = metadataManager.parseFile(fileState);

    debugger;
    // setMetadata(newState);
    setMetadata(fileState);
  }, []);

  const onRemove = useCallback(() => {
    setMetadataFile(undefined);
    // setMetadata(metadataManager.EMPTY);
    setMetadata(undefined);
  }, [setMetadataFile]);

  useEffect(() => {
    metadataFile && onChange(metadataFile);
  }, [metadataFile, onChange]);

  return {
    metadata,
    metadataFile,
    onChange: setMetadataFile,
    onRemove,
  };
}
