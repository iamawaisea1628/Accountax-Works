import { Suspense } from "react";
import { notFound } from "next/navigation";
import Shell from "../../../../components/portal/Shell";
import PrintButton from "../../../../components/portal/PrintButton";
import { needAny } from "../../../../lib/portal/session";
import { fmtDate, money, who, pill, type Inv, type Prof } from "../../../../lib/portal/format";

async function Content({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { sb, me } = await needAny();
  if (!/^[0-9a-f-]{36}$/i.test(id)) notFound();
  const { data: inv } = await sb.from("invoices").select("id,client_id,number,description,amount,currency,due_date,status,created_at").eq("id", id).maybeSingle<Inv & { created_at: string }>();
  if (!inv) notFound();
  const { data: c } = await sb.from("profiles").select("id,email,full_name,company,phone,country").eq("id", inv.client_id).maybeSingle<Prof>();
  const staff = me.role === "staff";
  return (
    <Shell me={me} active={staff ? "/portal/admin/clients" : "/portal/invoices"} title={`Invoice ${inv.number}`}>
      <div className="pcard invoice">
        <div className="prow">
          <div><p className="mu">From</p><p><strong>Accountax Consultants</strong></p></div>
          <div><p className="mu">Bill to</p><p><strong>{who(c)}</strong><br />{c?.full_name}<br />{c?.email}{c?.country ? <><br />{c.country}</> : null}</p></div>
        </div>
        <div className="scroll"><table className="pt"><thead><tr><th>Invoice</th><th>Issued</th><th>Due</th><th>Status</th></tr></thead><tbody>
          <tr><td>{inv.number}</td><td>{fmtDate(inv.created_at)}</td><td>{fmtDate(inv.due_date) || "On receipt"}</td><td><span className={`pill ${pill(inv.status)}`}>{inv.status}</span></td></tr></tbody></table></div>
        <p style={{ marginTop: 20 }}>{inv.description || "Professional services"}</p>
        <h2 style={{ textAlign: "right" }}>{money(inv.amount, inv.currency)}</h2>
        <p className="mu">Payment details are provided by your Accountax contact.</p>
      </div>
      <PrintButton />{" "}<a className="noprint" href={staff ? `/portal/admin/clients/${inv.client_id}?tab=invoices` : "/portal/invoices"}>Back to invoices</a>
    </Shell>
  );
}
export default function Page({ params }: { params: Promise<{ id: string }> }) { return <Suspense fallback={<p className="mu" style={{ padding: 40 }}>Loading...</p>}><Content params={params} /></Suspense>; }
