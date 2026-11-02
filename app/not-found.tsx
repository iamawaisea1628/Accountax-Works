import { Shell, PageHero } from "../components/site/Parts";

export default function NotFound() {
  return <Shell><PageHero eyebrow="404" title="That page could not be found" lead="The page may have moved. Try the links below."><div className="cta"><a className="btn" href="/">Go to the homepage</a><a className="btn o" href="/services/">See our services</a></div></PageHero></Shell>;
}
