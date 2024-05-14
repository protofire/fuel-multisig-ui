import { JsonAbi } from "fuels";
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

interface Callbacks {
  onChange?: OnChange;
  onRemove?: OnRemove;
}

export type MetadataState = {
  source?: JsonAbi;
  name: string;
  isSupplied: boolean;
  error: null | string;
  isValid: boolean;
  message?: string | null;
};

export interface UseMetadata {
  metadata: MetadataState;
  onRemove: () => void;
  metadataFile: File | undefined;
  onChange: (_file: File) => void;
}

export const metadataManager = new MetadataManager();

export function useParseMetadataField(): UseMetadata {
  const [metadataFile, setMetadataFile] = useState<File | undefined>();
  const [metadata, setMetadata] = useState<MetadataState>(
    metadataManager.EMPTY
  );

  const onChange = useCallback(async (file: File) => {
    setMetadataFile(file);
    const fileState = await readerAsFileState(file);
    const metadataJson: MetadataState = metadataManager.parseFile(fileState);

    setMetadata(metadataJson);
  }, []);

  const onRemove = useCallback(() => {
    setMetadataFile(undefined);
    setMetadata(metadataManager.EMPTY);
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
