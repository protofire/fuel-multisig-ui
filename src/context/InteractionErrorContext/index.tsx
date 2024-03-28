import React, { createContext, ReactNode, useState } from "react";

import { InteractionError } from "./types";

export interface InteractionErrorState {
  error: InteractionError | null;
  setError: (
    error:
      | ({ msg: InteractionError["msg"] } & Partial<
          Omit<InteractionError, "msg">
        >)
      | null
  ) => void;
}

export const InteractionErrorContext = createContext<
  InteractionErrorState | undefined
>(undefined);

interface ErrorProviderProps {
  children: ReactNode;
}

export const InteractionErrorProvider: React.FC<ErrorProviderProps> = ({
  children,
}) => {
  const [interactionError, setInteractionError] =
    useState<InteractionError | null>(null);

  const setError = (
    error:
      | ({ msg: InteractionError["msg"] } & Partial<
          Omit<InteractionError, "msg">
        >)
      | null
  ) => {
    if (error === null) {
      setInteractionError(null);
    } else {
      setInteractionError({
        ...error,
        type: error.type || "error",
      });
    }
  };

  return (
    <InteractionErrorContext.Provider
      value={{ error: interactionError, setError }}
    >
      {children}
    </InteractionErrorContext.Provider>
  );
};
