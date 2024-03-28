export interface InteractionError {
  msg: string;
  onRetry?: () => void;
  type: "error" | "warning";
}

export function isWarning(type: InteractionError["type"]): boolean {
  return type === "warning" ? true : false;
}
