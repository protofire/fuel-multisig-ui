"use client";
import { Box } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { ROUTES } from "@/config/routes";
import { capitalizeFirstLetter } from "@/utils/formatString";

import { TxQueueDetails } from "../TxQueueDetails";
import TxTabs from "./TxTabs";

export const TAB_TX = ["queue"] as const;
export type TxTabType = (typeof TAB_TX)[number];
export const DEFAULT_TAB = 0; // Initial tab index "queue"

export function TxTable() {
  const [tabSelectedIndex, setTabSelectedIndex] = useState(DEFAULT_TAB);
  const params = useSearchParams();
  const router = useRouter();
  const tab = params.get("tab");

  const handleChange = (_: React.SyntheticEvent | null, newValue: number) => {
    setTabSelectedIndex(newValue);
    router.replace(`${ROUTES.Transactions}?tab=${TAB_TX[newValue]}`);
  };

  useEffect(() => {
    const _setTab = () => {
      let tabIndex = DEFAULT_TAB;

      if (tab && TAB_TX.includes(tab as TxTabType)) {
        tabIndex = TAB_TX.indexOf(tab as TxTabType);
      }

      handleChange(null, tabIndex);
    };

    _setTab();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box sx={{ width: "100%" }}>
      <TxTabs
        tabSelectedIndex={tabSelectedIndex}
        options={TAB_TX.map((t) => capitalizeFirstLetter(t))}
        onChange={handleChange}
      >
        {tabSelectedIndex === DEFAULT_TAB ? <TxQueueDetails /> : null}
      </TxTabs>
    </Box>
  );
}
