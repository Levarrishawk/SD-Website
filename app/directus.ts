import {
  featureGroups as fallbackFeatures,
  newsItems as fallbackNews,
  playSteps as fallbackPlaySteps,
  siteLinks as fallbackSiteLinks,
  type FeatureGroup,
  type NewsItem,
  type PlayStep,
  type SiteLinks,
} from "./site-content";

const directusUrl = (
  process.env.DIRECTUS_URL ?? "https://cms.stardust-swg.com"
).replace(/\/$/, "");

type DirectusResponse<T> = { data: T };

async function readDirectus<T>(path: string): Promise<T | null> {
  try {
    const response = await fetch(`${directusUrl}${path}`, {
      headers: { Accept: "application/json" },
    });

    if (!response.ok) return null;
    return ((await response.json()) as DirectusResponse<T>).data;
  } catch {
    return null;
  }
}

function nonEmpty<T>(value: T[] | null): value is T[] {
  return Array.isArray(value) && value.length > 0;
}

export async function getSiteLinks(): Promise<SiteLinks> {
  const settings = await readDirectus<
    Partial<SiteLinks> & {
      discord_url?: string;
      github_url?: string;
      launcher_download_url?: string;
    }
  >("/items/site_settings");

  return {
    discord:
      settings?.discord_url || settings?.discord || fallbackSiteLinks.discord,
    github: settings?.github_url || settings?.github || fallbackSiteLinks.github,
    download:
      settings?.launcher_download_url ||
      settings?.download ||
      fallbackSiteLinks.download,
  };
}

export async function getFeatureGroups(): Promise<FeatureGroup[]> {
  const features = await readDirectus<FeatureGroup[]>(
    "/items/features?fields=number,title,short,label,items&filter[status][_eq]=published&sort=sort",
  );
  return nonEmpty(features) ? features : fallbackFeatures;
}

export async function getNewsItems(): Promise<NewsItem[]> {
  const updates = await readDirectus<NewsItem[]>(
    "/items/updates?fields=date,title,tag,excerpt&filter[status][_eq]=published&sort=-date_created",
  );
  return nonEmpty(updates) ? updates : fallbackNews;
}

export async function getPlaySteps(): Promise<PlayStep[]> {
  const steps = await readDirectus<PlayStep[]>(
    "/items/play_steps?fields=number,title,text&filter[status][_eq]=published&sort=sort",
  );
  return nonEmpty(steps) ? steps : fallbackPlaySteps;
}
