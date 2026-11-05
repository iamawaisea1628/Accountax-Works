import { S } from "../data";

// The six service words. Desktop: one centred line. Phones and small tablets: 3 + 3 in two lines.
export default function SixWords({ variant = "line" }: { variant?: "line" | "pill" }) {
  return (
    <ul className={`six ${variant}`} aria-label="Our six service areas">
      {S.map((x) => <li key={x[0]}><a href={`/services/${x[0].toLowerCase()}/`}>{x[0]}</a></li>)}
    </ul>
  );
}
