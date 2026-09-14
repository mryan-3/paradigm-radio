export function sanitizeStreamTitle(raw: string | null | undefined): string | null {
  if (!raw || typeof raw !== "string") return null;

  let str = raw.trim();
  if (!str) return null;

  // Unescape HTML entities
  str = str
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");

  // Check for common ad/promotional strings
  if (/^(ad|advert|commercial|sponsor|station id|jingle|promo|stream offline)/i.test(str)) {
    return null;
  }

  // Handle iHeart / WideOrbit / MediaBase stream attribute format
  if (str.includes('text="') || str.includes("song_spot=")) {
    let artist = "";
    if (str.includes('text="')) {
      artist = str.split(/-\s*text="/i)[0].trim();
    } else if (str.includes(" - ")) {
      artist = str.split(" - ")[0].trim();
    }

    let title = "";
    const textQuoteMatch = str.match(/text="([^"]+)"/i);
    if (textQuoteMatch) {
      title = textQuoteMatch[1].trim();
    } else {
      const textOpenMatch = str.match(/text="([^;,\n]+)/i);
      if (textOpenMatch) {
        title = textOpenMatch[1].replace(/\s+[a-zA-Z_]+=.*/, "").replace(/["']+$/, "").trim();
      }
    }

    artist = artist.replace(/^[:\-\s]+/, "").trim();
    if (artist && title) return `${artist} - ${title}`;
    if (title) return title;
  }

  // Strip XML / HTML tags & URLs
  str = str.replace(/<[^>]*>/g, " ").replace(/https?:\/\/\S+/gi, "").trim();

  // Strip trailing metadata or attributes and leading symbols
  str = str.replace(/;.*$/, "").replace(/^[:\-\s]+/, "").replace(/[:\-\s]+$/, "").trim();

  if (!str || str.length < 2) return null;
  if (/^(unknown|unknown - unknown|various artists|live stream|unnamed)$/i.test(str)) return null;

  return str;
}
