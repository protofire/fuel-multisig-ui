"use client";
import { Box, Skeleton } from "@mui/material";
import { useState } from "react";

import { useAssetsBalance } from "@/hooks/multisignatureSelected/useAssetsBalance";
import { Column, GenericTable } from "@/sections/common/GenericTable";

import AssetTabs from "./AssetTabs";

export const assetsTypeMap = { token: "Tokens" };
export const assetsTypeKeys = Object.keys(assetsTypeMap);
export type AssetsType = (keyof typeof assetsTypeMap)[number];

const columns: Column[] = [
  { id: "name", label: "ASSET" },
  { id: "balance", label: "BALANCE", align: "left" },
];

export const AssetsTable: React.FC = () => {
  const [assetType, setAssetType] = useState<AssetsType>("token");
  const { balances, isLoading } = useAssetsBalance();

  const handleChange = (newValue: number) => {
    setAssetType(assetsTypeKeys[newValue]);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <AssetTabs options={Object.values(assetsTypeMap)} onChange={handleChange}>
        {isLoading ? (
          <GenericTable
            columns={columns}
            rows={[]}
            action={function (row: { [key: string]: string | number }): void {
              throw new Error("Function not implemented.");
            }}
          />
        ) : (
          <Box mt={2}>
            <Skeleton variant="rounded" />
          </Box>
        )}
      </AssetTabs>
    </Box>
  );
};
