"use client";

import { Box, CardHeader, Skeleton, SxProps, Typography } from "@mui/material";

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
  widthSkeleton,
  styles,
}: SummaryCardProps) => {
  const _captionComponent =
    isLoading || (caption === undefined && !captionComponent) ? (
      <Skeleton
        animation="wave"
        variant="rectangular"
        width={120}
        height={"2rem"}
      />
    ) : (
      captionComponent
    );

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
