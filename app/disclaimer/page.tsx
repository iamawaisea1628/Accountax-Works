import type { Metadata } from "next";
import { pageMeta } from "../../lib/seo";
import { Shell, PageHero } from "../../components/site/Parts";
import { LEGAL } from "../../content/pages";

const page = LEGAL["disclaimer"];
export const metadata: Metadata = pageMeta(`${page.title} | Accountax`, "Important information about the scope and limits of the information on this website.", "/disclaimer/", { index: false }); // not indexed until the placeholders are completed and reviewed

export default function Legal() {
  return (
    <Shell>
      <PageHero crumbs={[["Home", "/"], [page.title, "/disclaimer/"]]} title={page.title} />
      <section><div className="w narrow prose">
        <p className="note">{page.intro}</p>
        {page.sections.map((s) => <div key={s.h}><h2>{s.h}</h2>{s.p?.map((t) => <p key={t}>{t}</p>)}{s.ul && <ul>{s.ul.map((t) => <li key={t}>{t}</li>)}</ul>}</div>)}
      </div></section>
    </Shell>
  );
}
