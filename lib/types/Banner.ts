import { ObjectId } from "mongodb";

export interface Cta {
  label: string;
  href: string;
}


export interface Slide {
  id?: string;
  badge?: string;
  title?: string;
  artist?: string;
  medium?: string;
  dimensions?: string;
  price?: number;
  currency?: string;
  ctaPrimary?: Cta;
  ctaSecondary?: Cta;
  image?: string;
  alt?: string;
}


export interface Banner {
  _id?: ObjectId;
  autoPlayIntervalMs: number;
  slides: Slide[];
}