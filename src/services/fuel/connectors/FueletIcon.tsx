import React from "react";

interface Props extends React.SVGProps<SVGSVGElement> {
  theme?: "dark" | "light";
  size?: string | number;
}

export function FueletIcon({ theme = "dark", size = 20, ...props }: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M20 40C14.9355 40 10.3145 38.114 6.7905 35.0105L18.146 26.907C18.845 26.4085 19.8065 26.9645 19.722 27.8195L19.2745 32.3605C19.182 33.295 20.3125 33.8295 20.9765 33.1655L27.071 27.071C31.062 23.08 30.9745 16.5555 26.8085 12.6755C22.8405 8.98 16.5935 9.264 12.7595 13.0985L6.853 19.0045C6.187 19.671 6.7275 20.8045 7.6645 20.7065L12.209 20.231C13.0655 20.1415 13.6275 21.105 13.127 21.8065L4.9895 33.2095C1.886 29.6855 0 25.0645 0 20C0 8.9545 8.9545 0 20 0C31.0455 0 40 8.9545 40 20C40 31.0455 31.0455 40 20 40Z"
        fill={theme === "dark" ? "white" : "#28282F"}
      />
    </svg>
  );
}
