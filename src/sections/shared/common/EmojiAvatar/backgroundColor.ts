export interface SeedColors {
  backgroundColor: string;
  color1: string;
  color2: string;
}

const initSeedValues = (seed: string) => {
  const seedValues = new Array(4).fill(0);

  for (let i = 0; i < seed.length; i++) {
    seedValues[i % 4] =
      (seedValues[i % 4] << 5) - seedValues[i % 4] + seed.charCodeAt(i);
  }

  return { seedValues };
};

export const seedRandom = (seed: string) => {
  const { seedValues } = initSeedValues(seed);

  const shift = () => {
    const t = seedValues[0] ^ (seedValues[0] << 11);

    seedValues[0] = seedValues[1];
    seedValues[1] = seedValues[2];
    seedValues[2] = seedValues[3];
    seedValues[3] = seedValues[3] ^ (seedValues[3] >> 19) ^ t ^ (t >> 8);

    return (seedValues[3] >>> 0) / ((1 << 31) >>> 0);
  };

  return { shift };
};

export const generateSeedColors = (seed: string): SeedColors => {
  const { shift } = seedRandom(seed);

  const createColor = () => {
    const h = Math.floor(shift() * 360) + "deg";
    const s = (shift() * 60 + 40).toFixed(1) + "%";
    const l = ((shift() + shift() + shift() + shift()) * 25).toFixed(1) + "%";

    return `hsl(${h}, ${s}, ${l})`;
  };

  return {
    backgroundColor: createColor(),
    color1: createColor(),
    color2: createColor(),
  };
};
