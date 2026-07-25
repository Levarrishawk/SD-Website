import type { Metadata } from "next";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";
import { getPlaySteps, getSiteLinks } from "../directus";

export const metadata: Metadata = {
  title: "Getting Started | Stardust-3",
  description: "Prepare to enter the Stardust-3 galaxy.",
};

export default async function PlayPage() {
  const [playSteps, siteLinks] = await Promise.all([
    getPlaySteps(),
    getSiteLinks(),
  ]);
  return (
    <main>
      <SiteHeader solid />
      <section className="page-hero play-hero">
        <p className="eyebrow"><span /> GETTING STARTED</p>
        <h1>YOUR JOURNEY<br /><span>STARTS HERE.</span></h1>
        <p>
          This page is ready for your final registration, download, and
          installation instructions.
        </p>
        <div className="hero-actions">
          <a className="button button-primary" href={siteLinks.discord}>Join Discord <span>↗</span></a>
          <a className="button button-secondary disabled-button" aria-disabled="true">Launcher coming soon</a>
        </div>
      </section>
      <section className="steps-section">
        {playSteps.map((step) => (
          <article className="step-row" key={step.number}>
            <span>{step.number}</span>
            <h2>{step.title}</h2>
            <p>{step.text}</p>
          </article>
        ))}
      </section>
      <aside className="requirements">
        <p className="section-index">CLIENT REQUIREMENTS</p>
        <h2>BEFORE YOU<br /><em>BEGIN.</em></h2>
        <p>
          Add supported operating systems, required game files, storage space,
          launcher notes, and troubleshooting links here.
        </p>
      </aside>
      <SiteFooter links={siteLinks} />
    </main>
  );
}
