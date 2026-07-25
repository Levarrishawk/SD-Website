import Link from "next/link";
import { SiteFooter } from "./components/SiteFooter";
import { SiteHeader } from "./components/SiteHeader";
import { getFeatureGroups, getNewsItems, getSiteLinks } from "./directus";

export default async function Home() {
  const [featureGroups, newsItems, siteLinks] = await Promise.all([
    getFeatureGroups(),
    getNewsItems(),
    getSiteLinks(),
  ]);
  return (
    <main>
      <SiteHeader />

      <section className="hero" id="top">
        <div className="orb orb-one" />
        <div className="orb orb-two" />
        <div className="hero-grid" />
        <div className="hero-content">
          <p className="eyebrow"><span /> A STAR WARS GALAXIES EMULATOR</p>
          <h1>
            YOUR STORY.<br />
            <span>REBORN</span> AMONG<br />
            THE STARS.
          </h1>
          <p className="hero-copy">
            Stardust-3 is a reimagined Pre-NGE experience built for those who
            still believe the galaxy should feel vast, dangerous, and alive.
          </p>
          <div className="hero-actions">
            <Link className="button button-primary" href="/play">Begin your journey <span>→</span></Link>
            <a className="text-link" href="#about">Discover Stardust <span>↓</span></a>
          </div>
        </div>
        <div className="status-card" aria-label="Server status">
          <div>
            <span className="status-light" />
            <span className="status-label">GALAXY STATUS</span>
          </div>
          <strong>IN DEVELOPMENT</strong>
          <p>Launch information coming soon</p>
        </div>
        <div className="scroll-note">SCROLL TO EXPLORE <span>↓</span></div>
      </section>

      <section className="manifesto section" id="about">
        <p className="section-index">01 / THE PROJECT</p>
        <div className="manifesto-copy">
          <p className="eyebrow"><span /> A NEW ERA BEGINS</p>
          <h2>THE GALAXY YOU REMEMBER.<br /><em>NOT AS YOU LEFT IT.</em></h2>
          <div className="two-column">
            <p>
              Stardust-3 carries forward the sandbox spirit of Star Wars
              Galaxies with a renewed focus on combat, discovery, and
              community-built stories.
            </p>
            <p>
              This is the foundation. Replace this copy with the story of your
              server, its timeline, and what makes this new chapter different.
            </p>
          </div>
        </div>
      </section>

      <section className="features section" id="features">
        <div className="section-heading">
          <div>
            <p className="section-index">02 / CORE EXPERIENCE</p>
            <h2>BUILT TO FEEL<br /><em>DIFFERENT.</em></h2>
          </div>
          <p className="section-intro">
            Use these pillars to introduce the three ideas at the heart of
            Stardust-3.
          </p>
        </div>
        <div className="feature-grid">
          {featureGroups.map((feature) => (
            <article className="feature-card" key={feature.number}>
              <span className="feature-number">{feature.number}</span>
              <div className="feature-symbol" aria-hidden="true">✦</div>
              <h3>{feature.title}</h3>
              <p>{feature.short}</p>
              <Link href="/features" aria-label={`Learn more about ${feature.title}`}>Explore feature <span>↗</span></Link>
            </article>
          ))}
        </div>
      </section>

      <section className="updates section" id="updates">
        <div className="section-heading">
          <div>
            <p className="section-index">03 / TRANSMISSIONS</p>
            <h2>LATEST FROM<br /><em>THE FRONTIER.</em></h2>
          </div>
          <Link className="text-link" href="/updates">View all updates <span>→</span></Link>
        </div>
        <div className="update-list">
          {newsItems.map((update) => (
            <Link className="update-row" href="/updates" key={update.title}>
              <span className="update-date">{update.date}</span>
              <span className="update-title">{update.title}</span>
              <span className="update-tag">{update.tag}</span>
              <span className="update-arrow">↗</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="join" id="join">
        <div className="join-glow" />
        <p className="eyebrow"><span /> YOUR PLACE IS WAITING</p>
        <h2>ENTER THE<br /><em>GALAXY.</em></h2>
        <p>Follow development, meet the community, and be there when Stardust-3 goes live.</p>
        <div className="hero-actions">
          <a className="button button-primary" href={siteLinks.discord}>Join our Discord <span>↗</span></a>
          <Link className="button button-secondary" href="/play">Installation guide <span>→</span></Link>
        </div>
      </section>

      <SiteFooter links={siteLinks} />
    </main>
  );
}
