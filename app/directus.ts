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

export type HomepageContent = {
  hero_eyebrow: string;
  hero_title_line_1: string;
  hero_title_accent: string;
  hero_title_line_3: string;
  hero_subtitle: string;
  primary_button_text: string;
  primary_button_url: string;
  secondary_button_text: string;
  secondary_button_url: string;
  status_label: string;
  status_value: string;
  status_detail: string;
  project_eyebrow: string;
  project_title: string;
  project_title_accent: string;
  project_body_left: string;
  project_body_right: string;
};

export type SiteMetadata = {
  site_title: string;
  site_description: string;
};

const fallbackHomepage: HomepageContent = {
  hero_eyebrow: "A STAR WARS GALAXIES EMULATOR",
  hero_title_line_1: "YOUR STORY.",
  hero_title_accent: "REBORN",
  hero_title_line_3: "AMONG THE STARS.",
  hero_subtitle:
    "Stardust-3 is a reimagined Pre-NGE experience built for those who still believe the galaxy should feel vast, dangerous, and alive.",
  primary_button_text: "Begin your journey",
  primary_button_url: "/play",
  secondary_button_text: "Discover Stardust",
  secondary_button_url: "#about",
  status_label: "GALAXY STATUS",
  status_value: "IN DEVELOPMENT",
  status_detail: "Launch information coming soon",
  project_eyebrow: "A NEW ERA BEGINS",
  project_title: "THE GALAXY YOU REMEMBER.",
  project_title_accent: "NOT AS YOU LEFT IT.",
  project_body_left:
    "Stardust-3 carries forward the sandbox spirit of Star Wars Galaxies with a renewed focus on combat, discovery, and community-built stories.",
  project_body_right:
    "This is the foundation. Replace this copy with the story of your server, its timeline, and what makes this new chapter different.",
};

const fallbackMetadata: SiteMetadata = {
  site_title: "Stardust-3 | A Galaxy Reimagined",
  site_description:
    "Stardust-3 is a reimagined Star Wars Galaxies experience built around combat, discovery, and community.",
};

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

export async function getHomepage(): Promise<HomepageContent> {
  const homepage = await readDirectus<Partial<HomepageContent>>(
    "/items/homepage",
  );

  if (!homepage) return fallbackHomepage;

  return Object.fromEntries(
    Object.entries(fallbackHomepage).map(([key, fallback]) => [
      key,
      homepage[key as keyof HomepageContent] || fallback,
    ]),
  ) as HomepageContent;
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

export async function getSiteMetadata(): Promise<SiteMetadata> {
  const settings = await readDirectus<Partial<SiteMetadata>>(
    "/items/site_settings?fields=site_title,site_description",
  );

  return {
    site_title: settings?.site_title || fallbackMetadata.site_title,
    site_description:
      settings?.site_description || fallbackMetadata.site_description,
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
