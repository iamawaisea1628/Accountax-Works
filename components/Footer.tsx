import { S } from "./data";
import { SITE } from "../content/site";
import SixWords from "./site/SixWords";

export default function Footer() {
  const email = SITE.email;
  return (
    <footer><div className="w">
      <div className="fg">
        <div><a className="logo" href="/"><span>ACCOUNT<b>AX</b></span></a><p className="mu" style={{ marginTop: 14 }}>Accounting, taxation, advisory, finance, analytics and fintech for businesses that want clearer numbers.</p></div>
        <div><h4>Company</h4><a href="/about/">About</a><a href="/industries/">Industries</a><a href="/insights/">Insights</a><a href="/careers/">Careers</a><a href="/contact/">Contact</a></div>
        <div><h4>Services</h4>{S.map((x) => <a key={x[0]} href={`/services/${x[0].toLowerCase()}/`}>{x[0]}</a>)}</div>
        <div><h4>Legal</h4><a href="/privacy-policy/">Privacy Policy</a><a href="/terms-of-use/">Terms of Use</a><a href="/cookie-policy/">Cookie Policy</a><a href="/disclaimer/">Disclaimer</a>
          {email && <a href={`mailto:${email}`}>{email}</a>}</div>
      </div>
      <div className="fb"><SixWords /><span>&copy; {SITE.name}. All rights reserved.</span></div>
    </div></footer>
  );
}
