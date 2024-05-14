import { JsonAbi } from "fuels";

import { FileState } from "@/domain/FileState";
import { MetadataState } from "@/hooks/useParseMetadataField";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isJsonAbi(obj: any): obj is JsonAbi {
  return (
    "types" in obj &&
    "loggedTypes" in obj &&
    "functions" in obj &&
    "configurables" in obj &&
    Array.isArray(obj.types) &&
    Array.isArray(obj.loggedTypes) &&
    Array.isArray(obj.functions) &&
    Array.isArray(obj.configurables)
  );
}

export class MetadataManager {
  public EMPTY: MetadataState = {
    error: null,
    isValid: false,
    isSupplied: false,
    name: "",
    message: null,
  };

  private utf8decoder = new TextDecoder();

  parseFile(file: FileState) {
    try {
      const sourceJson = JSON.parse(
        this.utf8decoder.decode(file.data)
      ) as Record<string, unknown>;
      const name = file.name.replace(".json", "");

      return {
        ...this.EMPTY,
        name,
        source: sourceJson,
        isSupplied: true,
        isValid: isJsonAbi(sourceJson),
      };
    } catch (error) {
      console.error(error);

      return {
        ...this.EMPTY,
        message: "This contract file is not in a valid format.",
        isError: true,
        isSupplied: true,
        isValid: false,
      };
    }
  }
}
