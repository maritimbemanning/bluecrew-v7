/**
 * Image helpers
 * Images are served locally from public/images
 */

const BASE_URL = 'https://bluecrew.no';

/**
 * Get public URL for an image
 * @param path - Path to image (e.g., 'team/isak.webp')
 * @returns Full public URL (relative path)
 */
export function getImageUrl(path: string): string {
  // If path already starts with /, return it as is
  if (path.startsWith('/')) {
    return path;
  }
  // Otherwise prepend /images/
  return `/images/${path}`;
}

/**
 * Get absolute URL for OG images (required for social sharing)
 * @param path - Path to image (e.g., 'og/default.webp')
 * @returns Absolute URL with domain
 */
export function getOgImageUrl(path: string): string {
  const relativePath = getImageUrl(path);
  return `${BASE_URL}${relativePath}`;
}

/**
 * Common image paths
 */
export const IMAGE_PATHS = {
  // Team photos
  team: {
    isak: 'team/01_suit_blue_bg_bw.webp',
    tor: 'team/tor.webp',
  },
  // OG images for social sharing
  og: {
    default: 'og/default.webp',
    sjofolk: 'og/default.webp',
    rederi: 'og/default.webp',
    lonn: 'og/default.webp',
  },
  // Hero images
  hero: {
    background: 'hero/background.webp',
    offshore: 'hero/offshore.webp',
    shipping: 'sectors/shipping.webp',
    havbruk: 'hero/havbruk.webp',
    sjofolk: 'hero/sjofolk.webp',
    rederi: 'hero/rederi.webp',
    stillinger: 'hero/stillinger.webp',
    karriere: 'hero/karriere.webp',
  },
  // Sector images
  sectors: {
    offshore: 'sectors/offshore.webp',
    havbruk: 'sectors/havbruk.webp',
    shipping: 'sectors/shipping.webp',
  },
  // Career images
  careers: {
    kaptein: 'careers/kaptein.webp',
    styrmann: 'careers/kaptein.webp', // Reusing kaptein image
    maskinist: 'careers/maskinist.webp',
    eto: 'careers/maskinist.webp', // Reusing maskinist image
    matros: 'careers/matros.webp',
    kokk: 'hero/background.webp', // General maritime
  },
  // Lønn images
  lonn: {
    hero2: 'lonn/hero-2.webp',
  },
  // About images
  about: {
    handshake: 'about/handshake.webp',
  },
};
