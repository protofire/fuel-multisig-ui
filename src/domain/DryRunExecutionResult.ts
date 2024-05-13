export interface DryRunExecutionResult {
  outcome: string | undefined;
  error: string | undefined;
  isRunning: boolean;
  isFetched: boolean;
  executeDryRun: () => void;
}
