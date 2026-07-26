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
  project_section_label: string;
  features_section_label: string;
  features_title: string;
  features_title_accent: string;
  features_intro: string;
  features_link_text: string;
  updates_section_label: string;
  updates_title: string;
  updates_title_accent: string;
  updates_link_text: string;
  hero_background: string;
};

export type SiteMetadata = {
  site_title: string;
  site_description: string;
};

export type SiteBranding = {
  brand_logo: string;
  site_background: string;
  social_image: string;
  favicon: string;
};

export type PlayPageContent = {
  hero_eyebrow: string;
  hero_title: string;
  hero_title_accent: string;
  hero_description: string;
  discord_button_text: string;
  launcher_button_text: string;
  launcher_button_url: string;
  requirements_label: string;
  requirements_title: string;
  requirements_title_accent: string;
  requirements_description: string;
  launcher_enabled: boolean;
};

export type UpdatesPageContent = {
  hero_eyebrow: string;
  hero_title: string;
  hero_title_accent: string;
  hero_description: string;
  article_label: string;
};

type DirectusFile = string | { id?: string } | null;

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
  project_section_label: "01 / THE PROJECT",
  features_section_label: "02 / CORE EXPERIENCE",
  features_title: "BUILT TO FEEL",
  features_title_accent: "DIFFERENT.",
  features_intro:
    "Use these pillars to introduce the three ideas at the heart of Stardust-3.",
  features_link_text: "EXPLORE FEATURE",
  updates_section_label: "03 / TRANSMISSIONS",
  updates_title: "LATEST FROM",
  updates_title_accent: "THE FRONTIER.",
  updates_link_text: "VIEW ALL UPDATES",
  hero_background: "/stardust-wallpaper.jpg",
};

const fallbackMetadata: SiteMetadata = {
  site_title: "Stardust-3 | A Galaxy Reimagined",
  site_description:
    "Stardust-3 is a reimagined Star Wars Galaxies experience built around combat, discovery, and community.",
};

const fallbackBranding: SiteBranding = {
  brand_logo: "/stardust-logo.png",
  site_background: "/stardust-wallpaper.jpg",
  social_image: "/og.png",
  favicon: "/favicon.svg",
};

const fallbackPlayPage: PlayPageContent = {
  hero_eyebrow: "GETTING STARTED",
  hero_title: "YOUR JOURNEY",
  hero_title_accent: "STARTS HERE.",
  hero_description:
    "This page is ready for your final registration, download, and installation instructions.",
  discord_button_text: "Join Discord",
  launcher_button_text: "Launcher coming soon",
  launcher_button_url: "",
  requirements_label: "CLIENT REQUIREMENTS",
  requirements_title: "BEFORE YOU",
  requirements_title_accent: "BEGIN.",
  requirements_description:
    "Add supported operating systems, required game files, storage space, launcher notes, and troubleshooting links here.",
  launcher_enabled: false,
};

const fallbackUpdatesPage: UpdatesPageContent = {
  hero_eyebrow: "TRANSMISSIONS",
  hero_title: "FROM THE",
  hero_title_accent: "FRONTIER.",
  hero_description:
    "Development reports, feature reveals, and player guides will live here.",
  article_label: "READ ARTICLE",
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

function assetUrl(file: DirectusFile, fallback: string): string {
  const id = typeof file === "string" ? file : file?.id;
  return id ? `${directusUrl}/assets/${id}` : fallback;
}

export async function getHomepage(): Promise<HomepageContent> {
  const homepage = await readDirectus<
    Partial<Omit<HomepageContent, "hero_background">> & {
      hero_background?: DirectusFile;
    }
  >("/items/homepage");

  if (!homepage) return fallbackHomepage;

  const text = Object.fromEntries(
    Object.entries(fallbackHomepage)
      .filter(([key]) => key !== "hero_background")
      .map(([key, fallback]) => [
        key,
        homepage[key as keyof typeof homepage] || fallback,
      ]),
  ) as Omit<HomepageContent, "hero_background">;

  return {
    ...text,
    hero_background: assetUrl(
      homepage.hero_background ?? null,
      fallbackHomepage.hero_background,
    ),
  };
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

export async function getSiteBranding(): Promise<SiteBranding> {
  const settings = await readDirectus<{
    brand_logo?: DirectusFile;
    site_background?: DirectusFile;
    social_image?: DirectusFile;
    favicon?: DirectusFile;
  }>(
    "/items/site_settings?fields=brand_logo,site_background,social_image,favicon",
  );

  return {
    brand_logo: assetUrl(
      settings?.brand_logo ?? null,
      fallbackBranding.brand_logo,
    ),
    site_background: assetUrl(
      settings?.site_background ?? null,
      fallbackBranding.site_background,
    ),
    social_image: assetUrl(
      settings?.social_image ?? null,
      fallbackBranding.social_image,
    ),
    favicon: assetUrl(settings?.favicon ?? null, fallbackBranding.favicon),
  };
}

export async function getPlayPage(): Promise<PlayPageContent> {
  const page = await readDirectus<Partial<PlayPageContent>>(
    "/items/play_page?fields=hero_eyebrow,hero_title,hero_title_accent,hero_description,discord_button_text,launcher_button_text,launcher_button_url,requirements_label,requirements_title,requirements_title_accent,requirements_description,launcher_enabled",
  );

  if (!page) return fallbackPlayPage;

  return {
    hero_eyebrow: page.hero_eyebrow || fallbackPlayPage.hero_eyebrow,
    hero_title: page.hero_title || fallbackPlayPage.hero_title,
    hero_title_accent:
      page.hero_title_accent || fallbackPlayPage.hero_title_accent,
    hero_description:
      page.hero_description || fallbackPlayPage.hero_description,
    discord_button_text:
      page.discord_button_text || fallbackPlayPage.discord_button_text,
    launcher_button_text:
      page.launcher_button_text || fallbackPlayPage.launcher_button_text,
    launcher_button_url:
      page.launcher_button_url || fallbackPlayPage.launcher_button_url,
    requirements_label:
      page.requirements_label || fallbackPlayPage.requirements_label,
    requirements_title:
      page.requirements_title || fallbackPlayPage.requirements_title,
    requirements_title_accent:
      page.requirements_title_accent ||
      fallbackPlayPage.requirements_title_accent,
    requirements_description:
      page.requirements_description ||
      fallbackPlayPage.requirements_description,
    launcher_enabled: page.launcher_enabled ?? fallbackPlayPage.launcher_enabled,
  };
}

export async function getUpdatesPage(): Promise<UpdatesPageContent> {
  const page = await readDirectus<Partial<UpdatesPageContent>>(
    "/items/updates_page?fields=hero_eyebrow,hero_title,hero_title_accent,hero_description,article_label",
  );

  if (!page) return fallbackUpdatesPage;

  return {
    hero_eyebrow: page.hero_eyebrow || fallbackUpdatesPage.hero_eyebrow,
    hero_title: page.hero_title || fallbackUpdatesPage.hero_title,
    hero_title_accent:
      page.hero_title_accent || fallbackUpdatesPage.hero_title_accent,
    hero_description:
      page.hero_description || fallbackUpdatesPage.hero_description,
    article_label: page.article_label || fallbackUpdatesPage.article_label,
  };
}

export async function getFeatureGroups(): Promise<FeatureGroup[]> {
  const features = await readDirectus<
    (Omit<FeatureGroup, "card_image"> & {
      card_image?: DirectusFile;
    })[]
  >(
    "/items/features?fields=number,title,short,label,items,card_image,card_image_alt&filter[status][_eq]=published&sort=sort",
  );

  if (!nonEmpty(features)) return fallbackFeatures;

  return features.map((feature) => ({
    ...feature,
    card_image: assetUrl(feature.card_image ?? null, ""),
  }));
}

export async function getNewsItems(): Promise<NewsItem[]> {
  const updates = await readDirectus<
    (Omit<NewsItem, "featured_image"> & {
      featured_image?: DirectusFile;
    })[]
  >(
    "/items/updates?fields=date,title,tag,excerpt,slug,featured_image,image_alt_text,content&filter[status][_eq]=published&sort=-date_created",
  );

  if (!nonEmpty(updates)) return fallbackNews;

  return updates.map((update) => ({
    ...update,
    featured_image: assetUrl(update.featured_image ?? null, ""),
  }));
}

export async function getNewsItem(slug: string): Promise<NewsItem | null> {
  const updates = await getNewsItems();
  return updates.find((update) => update.slug === slug) ?? null;
}

export async function getPlaySteps(): Promise<PlayStep[]> {
  const steps = await readDirectus<PlayStep[]>(
    "/items/play_steps?fields=number,title,text&filter[status][_eq]=published&sort=sort",
  );
  return nonEmpty(steps) ? steps : fallbackPlaySteps;
}
