export type Genre = "all" | "country" | "gospel" | "blues" | "favorites";

export interface Station {
  id: string;
  name: string;
  callSign?: string | null;
  genre: "country" | "gospel" | "blues";
  subGenre: string;
  city: string;
  state: string;
  streamUrl: string;
  backupStreamUrl?: string | null;
  bitrate?: number;
  format?: "mp3" | "aac" | "hls";
  description?: string | null;
  featured?: boolean;
}

export type PlaybackStatus = "idle" | "buffering" | "playing" | "error";

export interface AudioContextType {
  currentStation: Station | null;
  playbackStatus: PlaybackStatus;
  isPlaying: boolean;
  volume: number;
  isMuted: boolean;
  nowPlayingTrack: string | null;
  favorites: string[];
  playStation: (station: Station) => void;
  togglePlay: () => void;
  setVolume: (volume: number) => void;
  toggleMute: () => void;
  playNext: () => void;
  playPrevious: () => void;
  playRandom: () => void;
  toggleFavorite: (stationId: string) => void;
  isFavorite: (stationId: string) => boolean;
}
