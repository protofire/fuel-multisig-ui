"use client";
import { Box, Skeleton, Stack } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Image from "next/image";
import { useState } from "react";

import { useAssetsBalance } from "@/hooks/multisignatureSelected/useAssetsBalance";
import { Column, GenericTable, Row } from "@/sections/common/GenericTable";

import AssetTabs from "./AssetTabs";

export const assetsTypeMap = { token: "Tokens" };
export const assetsTypeKeys = Object.keys(assetsTypeMap);
export type AssetsType = (keyof typeof assetsTypeMap)[number];

const columns: Column[] = [
  {
    id: "name",
    label: "ASSET",
    render: (value, row) => {
      return (
        <Stack direction={"row"} spacing={2} alignItems={"center"}>
          {row.imageUrl ? (
            <Avatar>
              <Image
                alt={String(value)}
                src={row.imageUrl as string}
                width={"30"}
                height={"30"}
              />
            </Avatar>
          ) : (
            <Avatar>❓</Avatar>
          )}
          {value}
        </Stack>
      );
    },
  },
  { id: "amountFormatted", label: "BALANCE", align: "left" },
];

export const AssetsTable: React.FC = () => {
  const [assetType, setAssetType] = useState<AssetsType>("token");
  const { balances, isLoading } = useAssetsBalance();

  const handleChange = (newValue: number) => {
    setAssetType(assetsTypeKeys[newValue]);
  };

  // useCallback(() => {

  // }, [balances])

  return (
    <Box sx={{ width: "100%" }}>
      <AssetTabs options={Object.values(assetsTypeMap)} onChange={handleChange}>
        {isLoading || !balances ? (
          <Box mt={2}>
            <Skeleton height={"3rem"} variant="rounded" />
          </Box>
        ) : (
          <GenericTable
            columns={columns}
            rows={balances as unknown as Row[]}
            action={function (row: { [key: string]: string | number }): void {
              alert("This function is WIP 🚧");
            }}
          />
        )}
      </AssetTabs>
    </Box>
  );
};
