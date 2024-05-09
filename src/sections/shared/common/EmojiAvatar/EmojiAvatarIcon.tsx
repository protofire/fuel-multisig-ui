import SvgIcon, { SvgIconProps } from "@mui/material/SvgIcon";
import { lighten } from "polished";
import React, { useMemo } from "react";

import { addressToEmoji } from "./addressToEmoji";
import { generateSeedColors, seedRandom } from "./backgroundColor";

interface EmojiAvatarIconProps extends SvgIconProps {
  address: string;
  size?: number;
}

export const EmojiAvatarIcon: React.FC<EmojiAvatarIconProps> = ({
  address,
  size = 44,
  ...props
}) => {
  const disableBlur = false;
  const blurId = `${address.slice(2, 12)}-blur`;
  const memoizedValues = useMemo(() => {
    const transformedSeed = address.toLowerCase();
    const emoji = addressToEmoji(transformedSeed);
    const { shift } = seedRandom(transformedSeed);
    const { backgroundColor, color1, color2 } =
      generateSeedColors(transformedSeed);

    return { shift, emoji, backgroundColor, color1, color2 };
  }, [address]);

  const { shape1, shape2 } = useMemo(() => {
    const shape1 = memoizedValues.shift();
    const shape2 = memoizedValues.shift();

    const boundingBox = 200 / Math.sqrt(2);

    const shape1CenterX =
      (boundingBox / 2) * (1 + Math.cos(shape1 * 2 * Math.PI));
    const shape1CenterY =
      (boundingBox / 2) * (1 + Math.sin(shape1 * 2 * Math.PI));
    const shape1Radius = 80 + 20 * memoizedValues.shift();

    const shape2CenterX =
      (boundingBox / 2) * (1 + Math.cos(shape2 * 2 * Math.PI));
    const shape2CenterY =
      (boundingBox / 2) * (1 + Math.sin(shape2 * 2 * Math.PI));
    const shape2Radius = 80 + 20 * memoizedValues.shift();

    return {
      shape1: (
        <circle
          cx={shape1CenterX}
          cy={shape1CenterY}
          r={shape1Radius}
          fill={lighten(0.1, memoizedValues.color1)}
        />
      ),
      shape2: (
        <circle
          cx={shape2CenterX}
          cy={shape2CenterY}
          r={shape2Radius}
          fill={lighten(0.1, memoizedValues.color2)}
        />
      ),
    };
  }, [memoizedValues]);

  const iconSize = size + "px";

  return (
    <SvgIcon {...props} style={{ fontSize: iconSize }} viewBox="0 0 100 100">
      <defs>
        <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={memoizedValues.color1} />
          <stop offset="100%" stopColor={memoizedValues.color2} />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill={memoizedValues.backgroundColor} />
      <g filter={!disableBlur ? `url(#${blurId})` : undefined}>
        <rect width="100%" height="100%" fillOpacity="0" />
        {shape1}
        {shape2}
      </g>
      <text
        x="50%"
        y="50%"
        fontSize="48"
        textAnchor="middle"
        dominantBaseline="central"
        fill="url(#gradient1)"
        filter="drop-shadow(3px 5px 2px rgb(0 0 0 / 0.4))"
      >
        {memoizedValues.emoji}
      </text>
    </SvgIcon>
  );
};
