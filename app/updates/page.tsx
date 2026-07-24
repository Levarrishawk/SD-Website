import type { Metadata } from "next";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";
import { newsItems } from "../site-content";

export const metadata: Metadata = {
  title: "Updates | Stardust-3",
  description: "Development news and transmissions from Stardust-3.",
};

export default function UpdatesPage() {
  return (
    <main>
      <SiteHeader solid />
      <section className="page-hero compact">
        <p className="eyebrow"><span /> TRANSMISSIONS</p>
        <h1>FROM THE<br /><span>FRONTIER.</span></h1>
        <p>Development reports, feature reveals, and player guides will live here.</p>
      </section>
      <section className="article-grid">
        {newsItems.map((item, index) => (
          <article className="news-card" key={item.title}>
            <div className={`news-visual visual-${index + 1}`}>
              <span>{item.tag}</span>
            </div>
            <div className="news-card-copy">
              <span className="update-date">{item.date}</span>
              <h2>{item.title}</h2>
              <p>{item.excerpt}</p>
              <span className="coming-label">ARTICLE PLACEHOLDER</span>
            </div>
          </article>
        ))}
      </section>
      <SiteFooter />
    </main>
  );
}
