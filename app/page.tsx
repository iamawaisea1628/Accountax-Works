import Header from "../components/Header";
import ContactForm from "../components/ContactForm";
import Photo from "../components/Photo";
import { S, ABOUT, WHY, IND, STEPS, TOOLS, INSIGHTS } from "../components/data";

const Head = ({ eb, h, p, c = true }: { eb: string; h: string; p?: string; c?: boolean }) => (
  <div className={c ? "sh c" : "sh"}><span className="eb">{eb}</span><h2>{h}</h2>{p && <p>{p}</p>}</div>
);

export default function Home() {
  const email = process.env.NEXT_PUBLIC_CONTACT_EMAIL;
  const wa = process.env.NEXT_PUBLIC_WHATSAPP;
  return (
    <>
      <Header />
      <main id="top">
        <div className="hero">
          <div className="im"><Photo file="hero.webp" label="Hero background image (1920x1080)" alt="City skyline" priority /></div>
          <div className="veil" />
          <div className="w hc">
            <span className="k">✦ Accounting · Taxation · Advisory · Finance · Analytics</span>
            <h1>Clarity in Your Numbers.<br /><span className="gd">Confidence in Your Decisions.</span></h1>
            <p className="lead">Accounting, taxation support, financial advisory and business intelligence for companies ready to operate with greater clarity and control.</p>
            <div className="cta"><a className="btn" href="#contact">Discuss Your Requirements ✦</a><a className="btn o" href="#services">Explore Our Services</a></div>
            <div className="stats">
              <div><b>6</b><span>Service divisions</span></div><div><b>5</b><span>Core disciplines</span></div>
              <div><b>100%</b><span>Remote delivery</span></div><div><b>6</b><span>Step engagement process</span></div>
            </div>
          </div>
        </div>

        <section id="about"><div className="w two al">
          <div className="im tall"><Photo file="about.webp" label="About image (900x1100)" alt="Finance team reviewing reports" sizes="(max-width:860px) 100vw, 560px" /></div>
          <div>
            <span className="eb line">Who We Are</span>
            <h2>A modern accounting and analytics consultancy built for growing businesses.</h2>
            <p className="mu">Accountax Consultants helps businesses make better financial decisions through reliable accounting, compliant taxation, strategic financial advisory and data-driven business intelligence.</p>
            <p className="mu">We combine accounting discipline with modern data tools, so your reports rest on clean books and your decisions rest on clear reports.</p>
            <ul className="ft">{ABOUT.map(([t, d], i) => <li key={t}><i>{String(i + 1).padStart(2, "0")}</i><div><h3>{t}</h3><p>{d}</p></div></li>)}</ul>
            <div className="cta"><a className="btn" href="#contact">Work With Us</a><a className="btn o" href="#services">Our Services</a></div>
          </div>
        </div></section>

        <section id="services" className="alt"><div className="w">
          <Head eb="What We Do" h="Our Core Services" p="Six service divisions built on accounting expertise, modern data tools and smart automation. Scope and fees are agreed after we understand your needs." />
          <div className="g3">{S.map(([t, d, tag, img]) => (
            <a className="sc" href="#contact" key={t}>
              <div className="im"><Photo file={img} label={t} alt={t} sizes="(max-width:860px) 100vw, 380px" /></div><div className="ov" />
              <div className="sb"><h3>{t}</h3><span className="ar" aria-hidden="true">→</span><div><p>{d}</p><span className="tag">{tag}</span></div></div>
            </a>))}</div>
        </div></section>

        <section><div className="w">
          <Head eb="Why Accountax" h="Why Businesses Choose an Integrated Finance Team" />
          <div className="g4">{WHY.map(([t, d], i) => <div className="card" key={t}><i className="num">{String(i + 1).padStart(2, "0")}</i><h3>{t}</h3><p>{d}</p></div>)}</div>
        </div></section>

        <section id="industries" className="alt"><div className="w">
          <Head eb="Industries" h="Support Across Key Business Sectors" p="Each service combination is a starting point, tailored during scoping." />
          <div className="g4 ind">{IND.map(([t, d, img]) => (
            <div className="ic" key={t} tabIndex={0}>
              <div className="im"><Photo file={img} label={t} alt={t} sizes="(max-width:860px) 50vw, 280px" /></div><div className="ov" />
              <div className="sb"><span /><div><h3>{t}</h3><p>{d}</p></div></div>
            </div>))}</div>
        </div></section>

        <section><div className="w">
          <Head eb="Integrated Proposition" h="Books, Advice and Analytics in One Connected Team" />
          <div className="trio">
            <div><h3>Accounting</h3><p>Accurate records and reporting you can rely on.</p></div>
            <div><h3>Advisory</h3><p>Forecasts, budgets and guidance built on those records.</p></div>
            <div><h3>Analytics</h3><p>Dashboards and automation that keep decisions current.</p></div>
          </div>
        </div></section>

        <section className="alt"><div className="w">
          <Head eb="Our Toolkit" h="Tools We Work With" p="Industry-standard platforms used by finance and data professionals." />
          <div className="tools">{TOOLS.map((x) => <div key={x}>{x}</div>)}</div>
        </div></section>

        <section id="how"><div className="w">
          <Head eb="How We Work" h="A Clear Process, No Surprises" p="Agreed scope, defined client responsibilities and reviewed deliverables keep every engagement predictable." />
          <ol className="st">{STEPS.map(([t, d]) => <li key={t}><h3>{t}</h3><p>{d}</p></li>)}</ol>
        </div></section>

        <section id="insights" className="alt"><div className="w">
          <Head eb="Insights" h="Practical Finance Resources" p="Educational articles are in preparation. Jurisdiction-specific taxation content will state the jurisdiction it applies to." />
          <div className="g3">{INSIGHTS.map(([t, tag, img]) => (
            <article className="ac" key={t}>
              <div className="im"><Photo file={img} label="Article image (1200x700)" alt={t} sizes="(max-width:860px) 100vw, 380px" /></div>
              <div className="ab"><span className="tag">{tag}</span><h3>{t}</h3><span className="soon">Article in preparation</span></div>
            </article>))}</div>
        </div></section>

        <section id="contact"><div className="w two al">
          <div>
            <span className="eb line">Get In Touch</span>
            <h2>Ready to Bring Clarity to Your Financials?</h2>
            <p className="mu">Tell us what you need and where your business operates. Please do not send bank credentials, taxation-portal passwords, identity documents or financial records through this form.</p>
            {email && <p className="mu">Email: <a href={`mailto:${email}`}>{email}</a></p>}
          </div>
          <div className="cbox"><ContactForm /></div>
        </div></section>
      </main>

      <footer><div className="w">
        <div className="fg">
          <div><a className="logo" href="#top"><span>ACCOUNT<b>AX</b></span></a><p className="mu" style={{ marginTop: 14 }}>Accounting, taxation, advisory, finance and analytics for businesses that want clearer numbers.</p></div>
          <div><h4>Company</h4><a href="#about">About</a><a href="#industries">Industries</a><a href="#how">How We Work</a><a href="#insights">Insights</a><a href="#contact">Contact</a></div>
          <div><h4>Services</h4>{S.map((x) => <a key={x[0]} href="#services">{x[0]}</a>)}</div>
          <div><h4>Contact</h4>{email ? <a href={`mailto:${email}`}>{email}</a> : <span className="mu">Contact details to be added</span>}</div>
        </div>
        <p className="dis">Accountax Consultants is a working brand name pending legal, trademark and domain clearance. Content is general information and not individual taxation, legal or investment advice. Services depend on applicable qualifications and authorisations in each jurisdiction. Privacy policy, terms of use and professional disclaimer pages are in preparation.</p>
        <div className="fb"><span>&copy; Accountax Consultants. All rights reserved.</span><span>Accounting · Taxation · Advisory · Finance · Analytics</span></div>
      </div></footer>
      {wa && <a id="wa" style={{ display: "block" }} href={`https://wa.me/${wa}`}>Chat on WhatsApp</a>}
    </>
  );
}
