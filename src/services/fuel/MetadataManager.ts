import { FileState } from "@/domain/FileState";
import { MetadataState } from "@/hooks/useParseMetadataField";

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
      const json = JSON.parse(this.utf8decoder.decode(file.data)) as Record<
        string,
        unknown
      >;

      return json;
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
