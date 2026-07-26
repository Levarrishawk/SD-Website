import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";
import { getNewsItems, getSiteLinks, getUpdatesPage } from "../directus";

export const metadata: Metadata = {
  title: "Updates | Stardust-3",
  description: "Development news and transmissions from Stardust-3.",
};

export default async function UpdatesPage() {
  const [updatesPage, newsItems, siteLinks] = await Promise.all([
    getUpdatesPage(),
    getNewsItems(),
    getSiteLinks(),
  ]);
  return (
    <main>
      <SiteHeader solid />
      <section className="page-hero compact">
        <p className="eyebrow"><span /> {updatesPage.hero_eyebrow}</p>
        <h1>{updatesPage.hero_title}<br /><span>{updatesPage.hero_title_accent}</span></h1>
        <p>{updatesPage.hero_description}</p>
      </section>
      <section className="article-grid">
        {newsItems.map((item, index) => (
          item.slug ? (
            <Link className="news-card" href={`/updates/${item.slug}`} key={item.title}>
              <div
                className={`news-visual visual-${index + 1}${item.featured_image ? " has-image" : ""}`}
                style={item.featured_image ? {
                  "--news-image": `url("${item.featured_image}")`,
                } as React.CSSProperties : undefined}
                role="img"
                aria-label={item.image_alt_text || ""}
              >
                <span>{item.tag}</span>
              </div>
              <div className="news-card-copy">
                <span className="update-date">{item.date}</span>
                <h2>{item.title}</h2>
                <p>{item.excerpt}</p>
                <span className="coming-label">{updatesPage.article_label} <span>→</span></span>
              </div>
            </Link>
          ) : (
            <article className="news-card" key={item.title}>
              <div className={`news-visual visual-${index + 1}`}>
                <span>{item.tag}</span>
              </div>
              <div className="news-card-copy">
                <span className="update-date">{item.date}</span>
                <h2>{item.title}</h2>
                <p>{item.excerpt}</p>
              </div>
            </article>
          )
        ))}
      </section>
      <SiteFooter links={siteLinks} />
    </main>
  );
}
