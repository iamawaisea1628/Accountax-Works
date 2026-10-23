import Image from "next/image";
import fs from "fs";
import path from "path";

// Drop a file into public/images/ with the expected name and it appears automatically.
// Until then a labelled placeholder is shown. Parent must be position:relative.
export default function Photo({ file, alt = "", label, sizes = "100vw", priority = false }: { file: string; alt?: string; label: string; sizes?: string; priority?: boolean }) {
  const src = `/images/${file}`;
  const ok = fs.existsSync(path.join(process.cwd(), "public", "images", file));
  if (ok) return <Image src={src} alt={alt} fill sizes={sizes} priority={priority} style={{ objectFit: "cover" }} />;
  return <div className="ph"><span>{label}<br /><small>public/images/{file}</small></span></div>;
}
