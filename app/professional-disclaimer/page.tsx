import type { Metadata } from "next";
import { Shell, PageHero } from "../../components/site/Parts";
import { LEGAL } from "../../content/pages";

const page = LEGAL["professional-disclaimer"];
export const metadata: Metadata = { title: `${page.title} | Accountax Consultants`, description: page.intro };

export default function Legal() {
  return (
    <Shell>
      <PageHero crumbs={[["Home", "/"], [page.title, "/professional-disclaimer/"]]} title={page.title} />
      <section><div className="w narrow prose">
        <p className="note">{page.intro}</p>
        {page.sections.map((s) => <div key={s.h}><h2>{s.h}</h2>{s.p?.map((t) => <p key={t}>{t}</p>)}{s.ul && <ul>{s.ul.map((t) => <li key={t}>{t}</li>)}</ul>}</div>)}
      </div></section>
    </Shell>
  );
}
