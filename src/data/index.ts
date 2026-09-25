import { Station, Genre } from "@/types/station";
import { countryStations as rawCountry } from "./country-stations";
import { gospelStations as rawGospel } from "./gospel-stations";
import { bluesStations as rawBlues } from "./blues-stations";

function deduplicate(stations: Station[]): Station[] {
  const seen = new Set<string>();
  return stations.filter((s) => {
    if (!s.id || seen.has(s.id)) return false;
    seen.add(s.id);
    return true;
  });
}

export const countryStations: Station[] = deduplicate(rawCountry);
export const gospelStations: Station[] = deduplicate(rawGospel);
export const bluesStations: Station[] = deduplicate(rawBlues);

export const allStations: Station[] = deduplicate([
  ...countryStations,
  ...gospelStations,
  ...bluesStations,
]);

export function getStationsByGenre(genre: Genre): Station[] {
  if (genre === "all") return allStations;
  return allStations.filter((s) => s.genre === genre);
}

export function getUniqueStates(): string[] {
  const states = new Set<string>();
  allStations.forEach((s) => {
    if (s.state && s.state.length === 2 && s.state !== "US") {
      states.add(s.state);
    }
  });
  return Array.from(states).sort();
}

export function getStationCounts(): Record<Genre, number> {
  return {
    all: allStations.length,
    country: countryStations.length,
    gospel: gospelStations.length,
    blues: bluesStations.length,
    favorites: 0,
  };
}

export async function searchRadioBrowser(
  query: string,
  genre?: Genre
): Promise<Station[]> {
  try {
    const params = new URLSearchParams({
      countrycode: "US",
      name: query,
      limit: "25",
      order: "votes",
      reverse: "true",
      hidebroken: "true",
    });
    if (genre && genre !== "all") {
      params.append("tag", genre);
    }

    const res = await fetch(
      `https://de1.api.radio-browser.info/json/stations/search?${params.toString()}`
    );
    if (!res.ok) return [];
    const data = await res.json();

    return data
      .filter((item: { url_resolved?: string; url?: string; name?: string }) => {
        return (item.url_resolved || item.url) && item.name;
      })
      .map(
        (item: {
          stationuuid: string;
          name: string;
          state?: string;
          tags?: string;
          url_resolved?: string;
          url?: string;
          bitrate?: number;
          codec?: string;
        }): Station => ({
          id: item.stationuuid,
          name: item.name.trim(),
          genre: (genre && genre !== "all" ? genre : "country") as "country" | "gospel" | "blues",
          subGenre: item.tags ? item.tags.split(",")[0].trim() : "Radio",
          city: item.state ? item.state.trim() : "United States",
          state: item.state ? item.state.slice(0, 2).toUpperCase() : "US",
          streamUrl: item.url_resolved || item.url || "",
          bitrate: item.bitrate || 128,
          format: item.codec?.toLowerCase().includes("aac") ? "aac" : "mp3",
        })
      );
  } catch {
    return [];
  }
}
