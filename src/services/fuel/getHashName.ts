const adjectives = [
  "Amazing",
  "Humble",
  "Graceful",
  "Daring",
  "Unique",
  "Mysterious",
  "Elegant",
  "Charming",
  "Vivid",
  "Bold",
  "Brave",
  "Calm",
  "Delightful",
  "Energetic",
  "Fancy",
];

const colors = [
  "Red",
  "Blue",
  "Green",
  "Yellow",
  "Purple",
  "Orange",
  "Pink",
  "Cyan",
  "Magenta",
  "Lime",
  "Maroon",
  "Navy",
  "Olive",
  "Teal",
  "Violet",
];

const nouns = [
  "Journey",
  "Sunset",
  "Galaxy",
  "Ocean",
  "Mountain",
  "Forest",
  "Desert",
  "River",
  "Sky",
  "Island",
  "Eclipse",
  "Horizon",
  "Moonlight",
  "Star",
  "Comet",
];

const simpleHash = (input: string) => {
  let hash = 0;
  for (let i = 0; i < input.length; i++) {
    const char = input.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }
  return Math.abs(hash);
};

export const generateHashName = (addressWallet: string, index = 0) => {
  const hash = simpleHash(`${addressWallet}+${index}`);

  const adjective = adjectives[hash % adjectives.length];
  const color = colors[hash % colors.length];
  const noun = nouns[hash % nouns.length];

  return `${adjective}-${color}-${noun}`;
};
