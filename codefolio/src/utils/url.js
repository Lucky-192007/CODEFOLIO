/**
 * Helper to ensure user input URLs are treated as absolute external paths.
 * If the link does not start with http:// or https://, prepend https://.
 */
export const ensureAbsoluteUrl = (url) => {
  if (!url) return "";
  const trimmed = url.trim();
  if (/^(f|ht)tps?:\/\//i.test(trimmed)) {
    return trimmed;
  }
  return `https://${trimmed}`;
};

/**
 * Single source of truth for "is this hostname the CodeFolio app itself
 * (vs. someone's custom portfolio domain)?" Used to decide whether to show
 * the landing/dashboard UI or treat the path as a public portfolio lookup.
 *
 * Covers local dev, the fixed production domain, AND any Vercel
 * preview/branch deployment (e.g. codefolio-git-main-xyz.vercel.app,
 * codefolio-5f3a2b1.vercel.app) automatically, so this never needs to be
 * manually updated again when the domain changes or a new preview spins up.
 */
const FIXED_APP_HOSTS = ["localhost", "127.0.0.1", "10.211.239.174"];

export const isAppHost = (hostname) => {
  if (!hostname) return true;
  if (FIXED_APP_HOSTS.includes(hostname)) return true;
  // Any *.vercel.app subdomain that starts with "codefolio" is one of our
  // own deployments (production or preview), never a customer's domain.
  return /^codefolio[\w-]*\.vercel\.app$/.test(hostname);
};