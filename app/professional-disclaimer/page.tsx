import { permanentRedirect } from "next/navigation";

// The page was renamed to "Disclaimer". Old links keep working.
export default function Old() { permanentRedirect("/disclaimer/"); }
