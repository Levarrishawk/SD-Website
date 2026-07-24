import Image from "next/image";
import Link from "next/link";

export function SiteHeader({ solid = false }: { solid?: boolean }) {
  return (
    <header className={`site-header${solid ? " site-header-solid" : ""}`}>
      <Link className="wordmark" href="/" aria-label="Stardust-3 home">
        <Image src="/stardust-logo.png" alt="" width={82} height={78} priority />
        <span className="brand-edition">III</span>
      </Link>
      <nav className="desktop-nav" aria-label="Primary navigation">
        <Link href="/#about">About</Link>
        <Link href="/features">Features</Link>
        <Link href="/updates">Updates</Link>
      </nav>
      <Link className="nav-cta" href="/play">
        Join the galaxy <span aria-hidden="true">↗</span>
      </Link>
    </header>
  );
}
