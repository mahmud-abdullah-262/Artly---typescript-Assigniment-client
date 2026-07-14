import type { ArtistStat } from "./ArtistStat";

export type TributeArtist = {
  label: string; // e.g. "ARTIST SPOTLIGHT"
  name: string;
  location: string;
  medium: string;
  image: {
    src: string;
    alt: string;
  };
  bio: string[]; // one entry per paragraph
  quote: string;
  stats: ArtistStat[];
  worksAvailable: number;
  cta: {
    label: string;
    href: string;
  };
};