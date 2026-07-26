import Link from "next/link";
import { getSiteBranding, getSiteLinks } from "../directus";

export async function SiteHeader({ solid = false }: { solid?: boolean }) {
  const [{ brand_logo }, siteLinks] = await Promise.all([
    getSiteBranding(),
    getSiteLinks(),
  ]);

  return (
    <header className={`site-header${solid ? " site-header-solid" : ""}`}>
      <Link className="wordmark" href="/" aria-label="Stardust-3 home">
        <img src={brand_logo} alt="Stardust-3" width={82} height={78} />
        <span className="brand-edition">III</span>
      </Link>
      <nav className="desktop-nav" aria-label="Primary navigation">
        <Link href="/#about">About</Link>
        <Link href="/features">Features</Link>
        <Link href="/updates">Updates</Link>
        <a href={siteLinks.github} target="_blank" rel="noreferrer">
          GitHub
        </a>
        <a href={siteLinks.discord} target="_blank" rel="noreferrer">
          Discord
        </a>
      </nav>
      <Link className="nav-cta" href="/play">
        Join the galaxy <span aria-hidden="true">↗</span>
      </Link>
    </header>
  );
}
