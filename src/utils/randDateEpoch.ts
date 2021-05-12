export function randDateEpoch(
  start = new Date(1970, 0, 1),
  end = new Date()
): { randEpoch: Number; randDate: Date } {
  const randEpoch = Math.floor(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
  const randDate = new Date(randEpoch);
  return { randEpoch: randEpoch, randDate: randDate };
}
