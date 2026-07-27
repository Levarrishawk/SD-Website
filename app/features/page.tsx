import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";
import { getFeatureGroups, getSiteLinks } from "../directus";

export const metadata: Metadata = {
  title: "Features | Stardust-3",
  description: "Explore the core experience being built for Stardust-3.",
};

export default async function FeaturesPage() {
  const [featureGroups, siteLinks] = await Promise.all([
    getFeatureGroups(),
    getSiteLinks(),
  ]);
  return (
    <main>
      <SiteHeader solid />
      <section className="page-hero">
        <p className="eyebrow"><span /> CORE EXPERIENCE</p>
        <h1>BUILT BEYOND<br /><span>NOSTALGIA.</span></h1>
        <p>
          A flexible home for the systems, content, and community principles
          that define Stardust-3.
        </p>
      </section>
      <section className="detail-section">
        {featureGroups.map((group) => (
          <article className="detail-block" key={group.number}>
            <div className="detail-kicker">
              <span>{group.number}</span>
              <p>{group.label}</p>
              {group.card_image ? (
                <div className="detail-feature-image">
                  <img
                    src={group.card_image}
                    alt={group.card_image_alt || ""}
                  />
                </div>
              ) : null}
            </div>
            <div>
              <h2>{group.title}</h2>
              <p className="detail-lead">{group.short}</p>
              <ul className="topic-list">
                {group.items.map((item) => <li key={item}>{item}<span>→</span></li>)}
              </ul>
            </div>
          </article>
        ))}
      </section>
      <section className="page-cta">
        <p className="eyebrow"><span /> NEXT TRANSMISSION</p>
        <h2>MORE DETAILS<br /><em>COMING SOON.</em></h2>
        <Link className="button button-primary" href="/updates">Follow development <span>→</span></Link>
      </section>
      <SiteFooter links={siteLinks} />
    </main>
  );
}
