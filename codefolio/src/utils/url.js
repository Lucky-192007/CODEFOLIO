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
