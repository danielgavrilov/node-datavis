const distanceBetween = 10; // pixels

const INPUT = "INPUT";
const OUTPUT = "OUTPUT";

export default function connectorLocation(
  { x: cx, y: cy, height },
  totalConnectors,
  connectorType=OUTPUT,
  index=0
) {
  const totalWidth = distanceBetween * (totalConnectors - 1);
  const offset = distanceBetween * index;
  const x = cx - (totalWidth / 2) + offset;
  const y = cy + ((connectorType === INPUT) ? -1 : 1) * height / 2;
  return { x, y };
}
