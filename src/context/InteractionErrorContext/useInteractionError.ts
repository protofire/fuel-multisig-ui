import { useContext } from "react";
import { InteractionErrorContext } from ".";

export const useInteractionError = () => {
    const context = useContext(InteractionErrorContext);
    if (context === undefined) {
      throw new Error('useErrorContext must be used within an InteractionErrorProvider');
    }
    return context;
  };
  
  