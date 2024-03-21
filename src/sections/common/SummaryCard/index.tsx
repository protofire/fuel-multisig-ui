"use client";

import { Box, CardHeader, SxProps, Typography } from "@mui/material";

import { SummaryCardStyled, TextSummary } from "./styled";

export interface SummaryCardProps {
  captionTitle: string;
  caption?: string;
  captionComponent?: React.ReactNode;
  isLoading?: boolean;
  widthSkeleton?: string;
  styles?: SxProps;
}

export const SummaryCard = ({
  captionTitle,
  caption,
  captionComponent,
  isLoading,
  styles,
}: SummaryCardProps) => {
  const _captionComponent = isLoading ? <p>Loading</p> : captionComponent;

  return (
    <SummaryCardStyled border={false} sx={styles}>
      {_captionComponent && !caption ? (
        _captionComponent
      ) : (
        <Box justifyContent="center">
          <TextSummary>{caption}</TextSummary>
        </Box>
      )}
      {captionTitle && (
        <CardHeader
          sx={{ paddingBottom: 0 }}
          title={
            <Typography
              sx={{ typography: { lg: "h5", xl: "h4" } }}
              color="white"
            >
              {captionTitle}
            </Typography>
          }
        />
      )}
    </SummaryCardStyled>
  );
};
