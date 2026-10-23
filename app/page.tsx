import Header from "../components/Header";
import ContactForm from "../components/ContactForm";
import { S, WHY, IND, STEPS, FAQ } from "../components/data";

const Cards = ({ a }: { a: [string, string][] }) => (
  <>{a.map(([t, d]) => (<div className="card" key={t}><h3>{t}</h3><p>{d}</p></div>))}</>
);

export default function Home() {
  const wa = process.env.NEXT_PUBLIC_WHATSAPP;
  return (
    <>
      <Header />
      <main id="top">
        <div className="hero"><div className="w">
          <div className="hg">
            <div>
              <span className="k">✦ Accounting · Taxation · Advisory · Finance · Analytics</span>
              <h1>Clarity in Your Numbers. Confidence in Your Decisions.</h1>
              <p className="lead">Accounting, tax support, financial advisory and business intelligence for companies ready to operate with greater clarity and control.</p>
              <div className="cta"><a className="btn" href="#contact">Discuss Your Requirements ✦</a><a className="btn o" href="#services">Explore Our Services</a></div>
            </div>
            <div className="rep" role="img" aria-label="Illustrative financial report graphic">
              <svg viewBox="0 0 400 290">
                <g stroke="#33312C"><path d="M20 40h360M20 90h360M20 140h360M20 190h360M20 240h360" /></g>
                <g fill="#2a2823"><rect x="40" y="170" width="38" height="70" /><rect x="100" y="140" width="38" height="100" /><rect x="160" y="150" width="38" height="90" /><rect x="220" y="110" width="38" height="130" /></g>
                <rect x="280" y="70" width="38" height="170" fill="#D4AF57" /><rect x="340" y="95" width="30" height="145" fill="#9C762D" />
                <path d="M20 235Q150 190 250 120T386 28" stroke="#E7CA82" strokeWidth="2.4" fill="none" />
              </svg>
              <small>Illustrative graphic. Not client data.</small>
            </div>
          </div>
          <div className="stats">
            <div><b>6</b><span>Service divisions</span></div><div><b>5</b><span>Core disciplines</span></div>
            <div><b>100%</b><span>Remote delivery</span></div><div><b>4</b><span>Step engagement process</span></div>
          </div>
        </div></div>

        <section id="about"><div className="w">
          <div className="sh"><span className="sk">✦ Who We Are</span><h2>A modern accounting and analytics consultancy built for growing businesses.</h2></div>
          <div className="two">
            <div>
              <p>Accountax Consultants helps businesses make better financial decisions through reliable accounting, compliant taxation, strategic financial advisory and data-driven business intelligence.</p>
              <p>We combine accounting discipline with modern data tools, so your reports rest on clean books and your decisions rest on clear reports.</p>
              <p className="note">Services are delivered within the qualifications and authorisations that apply in each jurisdiction. Availability is confirmed in the initial discussion.</p>
            </div>
            <div className="grid" style={{ gridTemplateColumns: "1fr" }}><Cards a={WHY} /></div>
          </div>
        </div></section>

        <section id="services" className="alt"><div className="w">
          <div className="sh"><span className="sk">✦ What We Do</span><h2>Our Core Services</h2><p>Six service divisions built on accounting expertise, modern data tools and smart automation. Scope and fees are agreed after we understand your needs.</p></div>
          <div className="grid">{S.map(([t, d, tag]) => (
            <article className="card" key={t}><span className="tag">{tag}</span><h3 style={{ marginTop: 14 }}>{t}</h3><p>{d}</p><a className="s" href="#contact">Discuss this service</a></article>
          ))}</div>
        </div></section>

        <section id="industries"><div className="w">
          <div className="sh"><span className="sk">✦ Industries</span><h2>Support Across Key Business Sectors</h2><p>Each service combination is a starting point, tailored during scoping.</p></div>
          <div className="grid"><Cards a={IND} /></div>
        </div></section>

        <section className="alt"><div className="w">
          <div className="sh"><span className="sk">✦ Our Toolkit</span><h2>Tools We Work With</h2></div>
          <div className="chips">{["Power BI", "Looker Studio", "Python", "SQL", "Microsoft Excel", "Google Sheets", "QuickBooks", "Xero"].map((x) => <span key={x}>{x}</span>)}</div>
        </div></section>

        <section id="how"><div className="w">
          <div className="sh"><span className="sk">✦ How We Work</span><h2>A clear process, no surprises.</h2><p>Agreed scope, defined client responsibilities and reviewed deliverables keep every engagement predictable.</p></div>
          <ol className="st">{STEPS.map(([t, d]) => <li key={t}><h3>{t}</h3><p>{d}</p></li>)}</ol>
        </div></section>

        <section id="faq" className="alt"><div className="w two">
          <div><span className="sk">✦ FAQ</span><h2>Common Questions, Direct Answers</h2><p style={{ color: "var(--mu)" }}>Not finding your answer? Send an enquiry below.</p></div>
          <div>{FAQ.map(([q, a]) => <details key={q}><summary>{q}</summary><p>{a}</p></details>)}</div>
        </div></section>

        <section id="contact"><div className="w two">
          <div>
            <span className="sk">✦ Get In Touch</span><h2>Ready to Bring Clarity to Your Financials?</h2>
            <p style={{ color: "var(--mu)" }}>Tell us what you need and where your business operates. Please do not send bank credentials, tax-portal passwords, identity documents or financial records through this form.</p>
          </div>
          <ContactForm />
        </div></section>
      </main>

      <footer><div className="w">
        <div className="fg">
          <div><a className="logo" href="#top"><span>ACCOUNT<b>AX</b></span></a><p style={{ marginTop: 12 }}>Accounting, taxation, advisory, finance and analytics.</p></div>
          <div><h3>Services</h3>{S.map(([t]) => <a key={t} href="#services">{t}</a>)}</div>
          <div><h3>Company</h3><a href="#about">About</a><a href="#industries">Industries</a><a href="#how">How We Work</a><a href="#faq">FAQ</a><a href="#contact">Contact</a></div>
        </div>
        <p className="dis">Accountax Consultants is a working brand name pending legal, trademark and domain clearance. Content is general information and not individual tax, legal or investment advice. Services depend on applicable qualifications and authorisations in each jurisdiction. Privacy policy, terms of use and professional disclaimer pages are in preparation. &copy; Accountax Consultants. All rights reserved.</p>
      </div></footer>
      {wa && <a id="wa" style={{ display: "block" }} href={`https://wa.me/${wa}`}>Chat on WhatsApp</a>}
    </>
  );
}
