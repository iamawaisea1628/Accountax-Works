import Header from "../components/Header";
import ContactForm from "../components/ContactForm";
import Photo from "../components/Photo";
import HeroSlideshow from "../components/HeroSlideshow";
import Footer from "../components/Footer";
import ProcessFlow from "../components/site/ProcessFlow";
import SixWords from "../components/site/SixWords";
import ServiceCards from "../components/site/ServiceCards";
import WhyCards from "../components/site/WhyCards";
import ToolsShowcase from "../components/site/ToolsShowcase";
import { ABOUT, WHY, IND, STEPS } from "../components/data";
import { ARTICLES } from "../content/pages";

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
          <HeroSlideshow slides={[
            <Photo key="1" file="hero-1.webp" label="Hero image 1 (1920x1080)" alt="City skyline" priority />,
            <Photo key="2" file="hero-2.webp" label="Hero image 2 (1920x1080)" alt="Finance team at work" />,
            <Photo key="3" file="hero-3.webp" label="Hero image 3 (1920x1080)" alt="Business analytics" />,
          ]} />
          <div className="veil" />
          <div className="w hc">
            <SixWords variant="pill" />
            <h1>Clarity in Your Numbers.<br /><span className="gd">Confidence in Your Decisions.</span></h1>
            <p className="lead">Accounting, taxation support, financial advisory and business intelligence for companies ready to operate with greater clarity and control.</p>
            <div className="cta"><a className="btn" href="#contact">Discuss Your Requirements ✦</a><a className="btn o" href="#services">Explore Our Services</a></div>
            <div className="stats">
              <div><b>6</b><span>Service pillars</span></div><div><b>1</b><span>Integrated team</span></div>
              <div><b>100%</b><span>Remote delivery</span></div><div><b>6</b><span>Step engagement process</span></div>
            </div>
          </div>
        </div>

        <section id="about"><div className="w two al">
          <div className="im tall"><Photo file="about.webp" label="About image (900x1100)" alt="Finance team reviewing reports" sizes="(max-width:860px) 100vw, 560px" /></div>
          <div>
            <span className="eb line">Who We Are</span>
            <h2>A modern accounting and analytics consultancy built for growing businesses.</h2>
            <p className="mu">Accountax helps businesses make better financial decisions through reliable accounting, compliant taxation, strategic financial advisory and data-driven business intelligence.</p>
            <p className="mu">We combine accounting discipline with modern data tools, so your reports rest on clean books and your decisions rest on clear reports.</p>
            <ul className="ft">{ABOUT.map(([t, d], i) => <li key={t}><i>{String(i + 1).padStart(2, "0")}</i><div><h3>{t}</h3><p>{d}</p></div></li>)}</ul>
            <div className="cta"><a className="btn" href="#contact">Work With Us</a><a className="btn o" href="#services">Our Services</a></div>
          </div>
        </div></section>

        <section id="services" className="alt"><div className="w">
          <Head eb="What We Do" h="Our Core Services" p="Six service pillars built on accounting expertise, modern data tools and smart automation. Scope and fees are agreed after we understand your needs." />
          <ServiceCards />
        </div></section>

        <section><div className="w">
          <Head eb="Why Accountax" h="Why Businesses Choose an Integrated Finance Team" />
          <WhyCards items={WHY} />
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
          <Head eb="Our Toolkit" h="Tools We Work With" p="The platforms and technologies we work with across all six services. Choose a service to see its tools." />
          <ToolsShowcase />
        </div></section>

        <section id="how"><div className="w">
          <Head eb="How We Work" h="A Clear Process, No Surprises" p="Agreed scope, defined client responsibilities and reviewed deliverables keep every engagement predictable." />
          <ProcessFlow steps={STEPS.map(([title, text]) => ({ title, text }))} />
          <p style={{ marginTop: 28 }}><a href="/how-we-work/">Read the full engagement process</a></p>
        </div></section>

        <section id="insights" className="alt"><div className="w">
          <Head eb="Insights" h="Practical Finance Resources" p="General educational guides on reporting, bookkeeping, forecasting and KPIs. They are not individual advice." />
          <div className="g3">{ARTICLES.slice(0, 3).map((a) => (
            <a className="ac" href={`/insights/${a.slug}/`} key={a.slug}>
              <div className="im"><Photo file={a.image} label="Article image (1200x700)" alt={a.title} sizes="(max-width:860px) 100vw, 380px" /></div>
              <div className="ab"><span className="tag">{a.category}</span><h3>{a.title}</h3><span className="soon">Read the guide</span></div>
            </a>))}</div>
          <p style={{ marginTop: 28, textAlign: "center" }}><a className="btn o" href="/insights/">All insights</a></p>
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

      <Footer />
      {wa && <a id="wa" style={{ display: "block" }} href={`https://wa.me/${wa}`}>Chat on WhatsApp</a>}
    </>
  );
}
