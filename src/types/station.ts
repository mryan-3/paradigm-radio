export type Genre = "all" | "country" | "gospel" | "blues";

export interface Station {
  id: string;
  name: string;
  callSign?: string | null;
  genre: "country" | "gospel" | "blues";
  subGenre: string;
  city: string;
  state: string; // US State code (e.g. TN, TX, MS, GA, IL)
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
  playStation: (station: Station) => void;
  togglePlay: () => void;
  setVolume: (volume: number) => void;
  toggleMute: () => void;
  playNext: () => void;
  playPrevious: () => void;
}
