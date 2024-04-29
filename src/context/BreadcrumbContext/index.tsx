import { createContext, useCallback, useContext, useState } from "react";

import { createNotImplementedWarning } from "@/utils/error";

interface BreadCrumbTitle {
  name: string;
  href: string;
}

interface BreadCrumbTitleState {
  breadcrumbs: BreadCrumbTitle[];
  addBreadcrumb: (path: string) => void;
}

const BreadcrumbContext = createContext<BreadCrumbTitleState>({
  breadcrumbs: [],
  addBreadcrumb: (_path: string) =>
    createNotImplementedWarning("addBreadCrumb"),
});

export function BreadcrumbProvider({ children }: React.PropsWithChildren) {
  const [breadcrumbs, setBreadcrumbs] = useState<BreadCrumbTitle[]>([]);

  // Function to convert path like "app/new-transaction/asset" into breadcrumbs
  const addBreadcrumb = useCallback((path: string) => {
    const segments = path.split("/").filter(Boolean); // Remove empty segments, often the first one if path starts with "/"
    const breadcrumbList = segments.map((segment, index, array) => {
      // Create a human-readable title from the segment
      const title = segment
        .replace(/-/g, " ")
        .replace(/\b\w/g, (l) => l.toUpperCase()); // Convert "new-transaction" to "New Transaction"

      // Generate URL for the breadcrumb
      const href = "/" + array.slice(0, index + 1).join("/"); // Create path "/new-transaction/asset"

      return { name: title, href };
    });

    setBreadcrumbs(breadcrumbList);
  }, []);

  return (
    <BreadcrumbContext.Provider
      value={{
        breadcrumbs,
        addBreadcrumb,
      }}
    >
      {children}
    </BreadcrumbContext.Provider>
  );
}

export const useBreadcrumb = () => useContext(BreadcrumbContext);
