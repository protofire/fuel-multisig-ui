import { useContext } from "react";

import { DbContext } from ".";

export const useLocalDbContext = () => {
  const context = useContext(DbContext);

  if (context === undefined) {
    throw new Error("useLocalDbContext must be used within a LocalDbProvider");
  }
  return context;
};
