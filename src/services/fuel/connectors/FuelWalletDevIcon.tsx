import React from "react";

interface Props extends React.SVGProps<SVGSVGElement> {
  theme?: "dark" | "light";
  size?: string | number;
}

export function FuelWalletDevIcon({
  theme = "dark",
  size = 20,
  ...props
}: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 490 496"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M32.5836 0C14.5545 0 0 14.7327 0 32.9826V496H405.427C419.129 496 432.307 490.492 442.01 480.67L474.856 447.422C484.559 437.6 490 424.261 490 410.391V0H32.5836ZM319.936 63.7752L160.558 225.105C156.624 229.086 151.248 231.343 145.676 231.343C137.546 231.343 130.072 226.565 126.598 219.132L64.8394 87.0024C59.7913 76.1852 67.593 63.7752 79.3939 63.7752H319.936ZM63.0037 432.225V275.275C63.0037 266.914 69.6909 260.145 77.9516 260.145H233.002L63.0037 432.225ZM245.852 231.343H194.518L348.979 74.9906C356.06 67.8234 365.697 63.7752 375.728 63.7752H427.062L272.601 220.127C265.521 227.295 255.883 231.343 245.852 231.343Z"
        fill={theme === "dark" ? "white" : "#080808"}
      />
    </svg>
  );
}
