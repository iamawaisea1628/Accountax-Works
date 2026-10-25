"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabaseBrowser } from "../../lib/supabase/browser";

const MAX = 20 * 1024 * 1024;
const OK = /\.(pdf|csv|xlsx|xls|docx|png|jpe?g)$/i;

export default function UploadForm({ userId, clients }: { userId: string; clients?: { id: string; label: string }[] }) {
  const router = useRouter();
  const [msg, setMsg] = useState<{ t: string; ok: boolean }>({ t: "", ok: false });
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const d = new FormData(form);
    const file = d.get("file") as File | null;
    const target = clients ? String(d.get("client") || "") : userId;
    if (!target) return setMsg({ t: "Choose a client.", ok: false });
    if (!file || !file.size) return setMsg({ t: "Choose a file.", ok: false });
    if (file.size > MAX) return setMsg({ t: "File is larger than 20 MB.", ok: false });
    if (!OK.test(file.name)) return setMsg({ t: "Allowed: PDF, CSV, XLSX, XLS, DOCX, PNG, JPG.", ok: false });

    setBusy(true); setMsg({ t: "", ok: false });
    const sb = supabaseBrowser();
    const safe = file.name.replace(/[^a-zA-Z0-9._-]/g, "_").slice(-100);
    const path = `${target}/${crypto.randomUUID()}-${safe}`;
    const up = await sb.storage.from("client-docs").upload(path, file, { contentType: file.type || undefined, upsert: false });
    if (up.error) { setBusy(false); return setMsg({ t: "Upload failed. Please try again.", ok: false }); }
    const ins = await sb.from("documents").insert({ client_id: target, uploaded_by: userId, name: file.name.slice(0, 200), path, size_bytes: file.size });
    if (ins.error) {
      await sb.storage.from("client-docs").remove([path]);
      setBusy(false); return setMsg({ t: "Upload failed. Please try again.", ok: false });
    }
    form.reset(); setBusy(false);
    setMsg({ t: "File uploaded.", ok: true });
    router.refresh();
  }

  return (
    <form className="pf" onSubmit={onSubmit} style={{ gridTemplateColumns: "1fr" }}>
      {clients && (
        <div><label htmlFor="uc">Client</label>
          <select id="uc" name="client" defaultValue=""><option value="" disabled>Select a client</option>{clients.map((c) => <option key={c.id} value={c.id}>{c.label}</option>)}</select></div>
      )}
      <div><label htmlFor="uf">File (PDF, CSV, Excel, Word, PNG, JPG; max 20 MB)</label><input id="uf" name="file" type="file" required /></div>
      <div><button className="btn" type="submit" disabled={busy}>{busy ? "Uploading..." : "Upload"}</button></div>
      <p className="pmsg" role="status" style={{ color: msg.ok ? "var(--g)" : "#e08a7d" }}>{msg.t}</p>
    </form>
  );
}
