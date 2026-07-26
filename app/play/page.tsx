import type { Metadata } from "next";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";
import { getPlayPage, getPlaySteps, getSiteLinks } from "../directus";

export const metadata: Metadata = {
  title: "Getting Started | Stardust-3",
  description: "Prepare to enter the Stardust-3 galaxy.",
};

export default async function PlayPage() {
  const [playPage, playSteps, siteLinks] = await Promise.all([
    getPlayPage(),
    getPlaySteps(),
    getSiteLinks(),
  ]);
  const launcherUrl = playPage.launcher_button_url || siteLinks.download;
  const launcherEnabled =
    playPage.launcher_enabled && Boolean(launcherUrl && launcherUrl !== "#");

  return (
    <main>
      <SiteHeader solid />
      <section className="page-hero play-hero">
        <p className="eyebrow"><span /> {playPage.hero_eyebrow}</p>
        <h1>{playPage.hero_title}<br /><span>{playPage.hero_title_accent}</span></h1>
        <p>{playPage.hero_description}</p>
        <div className="hero-actions">
          <a className="button button-primary" href={siteLinks.discord}>
            {playPage.discord_button_text} <span>↗</span>
          </a>
          {launcherEnabled ? (
            <a className="button button-secondary" href={launcherUrl}>
              {playPage.launcher_button_text} <span>→</span>
            </a>
          ) : (
            <span className="button button-secondary disabled-button" aria-disabled="true">
              {playPage.launcher_button_text}
            </span>
          )}
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
        <p className="section-index">{playPage.requirements_label}</p>
        <h2>{playPage.requirements_title}<br /><em>{playPage.requirements_title_accent}</em></h2>
        <p>{playPage.requirements_description}</p>
      </aside>
      <SiteFooter links={siteLinks} />
    </main>
  );
}
