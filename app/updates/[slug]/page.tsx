import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteFooter } from "../../components/SiteFooter";
import { SiteHeader } from "../../components/SiteHeader";
import { getNewsItem, getNewsItems, getSiteLinks } from "../../directus";

type ArticlePageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const updates = await getNewsItems();
  return updates
    .filter((update) => update.slug)
    .map((update) => ({ slug: update.slug as string }));
}

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getNewsItem(slug);

  if (!article) return {};

  return {
    title: `${article.title} | Stardust-3`,
    description: article.excerpt,
    openGraph: article.featured_image
      ? { images: [article.featured_image] }
      : undefined,
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const [article, siteLinks] = await Promise.all([
    getNewsItem(slug),
    getSiteLinks(),
  ]);

  if (!article) notFound();

  return (
    <main>
      <SiteHeader solid />
      <article className="article-page">
        <header className="article-header">
          <Link className="article-back" href="/updates">← All updates</Link>
          <p className="eyebrow"><span /> {article.tag}</p>
          <h1>{article.title}</h1>
          <p className="article-date">{article.date}</p>
        </header>

        {article.featured_image && (
          <figure className="article-image">
            <img
              src={article.featured_image}
              alt={article.image_alt_text || ""}
            />
          </figure>
        )}

        <div
          className="article-content"
          dangerouslySetInnerHTML={{ __html: article.content || article.excerpt }}
        />
      </article>
      <SiteFooter links={siteLinks} />
    </main>
  );
}
