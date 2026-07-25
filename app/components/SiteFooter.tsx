import Link from "next/link";
import { getSiteBranding } from "../directus";
import { siteLinks as fallbackSiteLinks, type SiteLinks } from "../site-content";

export async function SiteFooter({
  links = fallbackSiteLinks,
}: {
  links?: SiteLinks;
}) {
  const { brand_logo } = await getSiteBranding();

  return (
    <footer>
      <Link className="wordmark" href="/">
        <img src={brand_logo} alt="Stardust-3" width={82} height={78} />
        <span className="brand-edition">III</span>
      </Link>
      <p>
        Stardust-3 is a fan-made project and is not affiliated with Lucasfilm,
        Disney, or Sony Online Entertainment.
      </p>
      <div className="footer-links">
        <Link href="/updates">News</Link>
        <a href={links.discord}>Discord</a>
        <a href={links.github}>GitHub</a>
      </div>
    </footer>
  );
}
