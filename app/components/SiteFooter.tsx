import Image from "next/image";
import Link from "next/link";
import { siteLinks as fallbackSiteLinks, type SiteLinks } from "../site-content";

export function SiteFooter({ links = fallbackSiteLinks }: { links?: SiteLinks }) {
  return (
    <footer>
      <Link className="wordmark" href="/">
        <Image src="/stardust-logo.png" alt="Stardust" width={82} height={78} />
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
