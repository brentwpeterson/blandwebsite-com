/**
 * The ad in the middle of every blog post (Brent, 2026-11-18: "We need to place an ad mid
 * stream on the bland site. But the ad needs to be something I create"). Brent writes every
 * word and picks the image; no AI post writer touches this file.
 *
 * `midAd = null` means the slot is off and nothing renders. To run an ad, fill in the object:
 *   - put the image in public/sponsor/ and set `image` to its path, e.g. '/sponsor/my-ad.jpg'
 *   - `href` gets UTM tags added by MidPostAd (utm_content = id)
 */
export interface MidAd {
  /** Short and stable; used in utm_content and the GA4 events. */
  id: string;
  /** The small label above the ad, e.g. "Ad from Brent". */
  label: string;
  headline: string;
  body: string;
  cta: string;
  href: string;
  /** Optional, a path under public/, e.g. '/sponsor/my-ad.jpg'. */
  image?: string;
  imageAlt?: string;
  imageWidth?: number;
  imageHeight?: number;
}

export const midAd: MidAd | null = null;
