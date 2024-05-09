import { addressToEmoji } from "./addressToEmoji";

interface Props {
  address: string;
  size?: number;
}

export const EmojiAvatar = ({ address, size = 40 }: Props) => (
  <div
    style={{
      fontSize: `${size * 0.7}px`,
      width: `${size}px`,
      height: `${size}px`,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: "50%",
      border: "1px solid #000",
      backgroundColor: "rgba(255, 255, 255, 0.5)",
      color: "#000",
    }}
  >
    {address && addressToEmoji(address)}
  </div>
);
