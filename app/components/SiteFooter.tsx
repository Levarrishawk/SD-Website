import Image from "next/image";
import Link from "next/link";
import { siteLinks } from "../site-content";

export function SiteFooter() {
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
        <a href={siteLinks.discord}>Discord</a>
        <a href={siteLinks.github}>GitHub</a>
      </div>
    </footer>
  );
}
