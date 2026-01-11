import { MetadataRoute } from "next";
import { createClient } from "@supabase/supabase-js";

/**
 * Sitemap optimized for B2B discovery
 * Priority hierarchy:
 * 1.0 - Homepage
 * 0.95 - Key B2B landing pages (rederi, havbruk, bemanning)
 * 0.9 - B2C landing & secondary B2B
 * 0.85 - Job listings (high conversion)
 * 0.8 - Content pages (lønn, karriere, turnus)
 * 0.7 - Contact & lead pages
 * 0.6 - Case studies & crew stories
 * 0.3 - Legal pages
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://bluecrew.no";

  // Static pages - ordered by B2B priority
  const staticPages = [
    // Core pages
    "",
    // B2B priority pages - Rederier & Bemanningsbyrå
    "/rederi",
    "/rederi/havbruk",
    "/rederi/bemanning",
    "/rederi/rekruttering",
    "/rederi/behov",
    "/rederi/kontakt-oss",
    "/rederi/partner",
    "/rederi/bli-med",
    // B2C pages - Sjøfolk
    "/sjofolk",
    "/stillinger",
    "/meld-interesse",
    // Content & SEO pages
    "/lonn",
    "/lonn/kaptein",
    "/lonn/styrmann",
    "/lonn/maskinist",
    "/lonn/eto",
    "/lonn/matros",
    "/lonn/kokk",
    "/lonn/kalkulator",
    // Note: /lonn/oversikt excluded - redirects to /lonn
    "/karriere",
    "/karriere/kaptein",
    "/karriere/styrmann",
    "/karriere/maskinist",
    "/karriere/eto",
    "/karriere/matros",
    "/karriere/kokk",
    "/turnus",
    "/faq",
    "/ordbok",
    // Brand pages
    "/om-oss",
    "/kontakt",
    "/crew",
    "/trygghet",
    "/tjenester",
    // Case studies
    "/crew/zeonaqua",
    // Legal (note: /slett-data excluded - marked as noindex)
    "/personvern",
    "/vilkar",
  ];

  // Crew articles - case studies for B2B credibility
  // Note: zeonaqua has dedicated static page at /crew/zeonaqua, so excluded from dynamic list
  const crewArticles = [
    "fra-kadett-til-kaptein",
    "min-forste-offshore-tur",
    "livet-som-matros-pa-bronnbat",
    "hvordan-jeg-ble-maskinist",
    "kvinne-i-maritim-sektor",
    "offshore-vs-havbruk-min-erfaring",
  ];

  // Fetch active job postings
  let jobPostings: { slug: string; updated_at: string | null }[] = [];
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (supabaseUrl && supabaseAnonKey) {
      const supabase = createClient(supabaseUrl, supabaseAnonKey, {
        auth: { persistSession: false },
      });
      const { data } = await supabase
        .from("job_postings")
        .select("slug, updated_at")
        .eq("status", "active");
      jobPostings = data || [];
    }
  } catch {
    // Silently fail - sitemap will still include static pages
  }

  const staticEntries: MetadataRoute.Sitemap = staticPages.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: getChangeFrequency(path),
    priority: getPriority(path),
  }));

  const crewEntries: MetadataRoute.Sitemap = crewArticles.map((slug) => ({
    url: `${baseUrl}/crew/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const jobEntries: MetadataRoute.Sitemap = jobPostings.map((job) => ({
    url: `${baseUrl}/stillinger/${job.slug}`,
    lastModified: job.updated_at ? new Date(job.updated_at) : new Date(),
    changeFrequency: "daily",
    priority: 0.8,
  }));

  return [...staticEntries, ...crewEntries, ...jobEntries];
}

function getChangeFrequency(path: string): "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never" {
  if (path === "") return "weekly";
  if (path === "/stillinger") return "daily";
  if (path.startsWith("/rederi/")) return "weekly";
  if (path.startsWith("/lonn") || path.startsWith("/karriere")) return "monthly";
  return "monthly";
}

function getPriority(path: string): number {
  // Homepage
  if (path === "") return 1.0;

  // B2B priority pages - Bemanningsbyrå & Vikarbyrå keywords
  if (path === "/rederi") return 0.95;
  if (path === "/rederi/havbruk") return 0.95; // Key B2B - havbruk bemanning
  if (path === "/rederi/bemanning") return 0.95; // Key B2B - maritim bemanning
  if (path === "/rederi/rekruttering") return 0.9;
  if (path === "/rederi/behov") return 0.9; // Lead generation
  if (path === "/rederi/kontakt-oss") return 0.85;
  if (path.startsWith("/rederi/")) return 0.8;

  // B2C priority
  if (path === "/sjofolk") return 0.9;
  if (path === "/stillinger") return 0.85;
  if (path === "/meld-interesse") return 0.8;

  // Content pages - HIGH SEO value (drives organic traffic!)
  if (path === "/lonn") return 0.9; // Top organic landing page
  if (path.startsWith("/lonn/")) return 0.9; // Individual salary pages = money keywords
  if (path === "/karriere") return 0.85;
  if (path.startsWith("/karriere/")) return 0.85;
  if (path === "/turnus") return 0.85; // High search volume
  if (path === "/faq") return 0.7;
  if (path === "/ordbok") return 0.7; // Long-tail keywords

  // Brand pages
  if (path === "/om-oss" || path === "/kontakt") return 0.7;
  if (path === "/trygghet") return 0.65;
  if (path === "/crew") return 0.6;

  // Case studies (B2B credibility)
  if (path === "/crew/zeonaqua") return 0.7;

  // Legal pages
  if (path === "/personvern" || path === "/vilkar") return 0.3;

  return 0.5;
}
