const colors = [
  "F87171",
  "FBBF24",
  "34D399",
  "60A5FA",
  "818CF8",
  "F472B6",
  "F59E0B",
  "10B981",
  "3B82F6",
  "6366F1",
];

export const getRandomColor = () => {
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
};
