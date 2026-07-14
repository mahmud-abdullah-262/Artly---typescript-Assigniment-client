import type { TributeArtist } from "../types/TributeArtist";

export const artistsOfTheDayData: Record<string, TributeArtist> = {
  "mara-voss": {
    label: "ARTIST SPOTLIGHT",
    name: "Mara Voss",
    location: "Munich, Germany",
    medium: "Oil & acrylic",
    image: {
      src: "https://res.cloudinary.com/dto6szvn9/image/upload/v1783959519/jonathan-borba-o15lOC7SJKs-unsplash_uxzwam.jpg",
      alt: "Mara Voss in her studio",
    },
    bio: [
      "Mara Voss trained under Anton Heyboer in the Netherlands before establishing her practice in Munich's Schwabing district. Her paintings explore stillness — surfaces of water, light through muslin, the moment before rain.",
    ],
    quote:
      "I paint what can't be photographed. The feeling of almost-silence. The weight of afternoon light.",
    stats: [
      { value: 14, label: "Years active" },
      { value: 38, label: "Exhibitions" },
      { value: "4 continents", label: "Collections" },
    ],
    worksAvailable: 12,
    cta: {
      label: "Explore Mara's Works",
      href: "/artists/mara-voss",
    },
  },

  "vincent-van-gogh": {
    label: "ARTIST SPOTLIGHT",
    name: "Vincent van Gogh",
    location: "Arles, France",
    medium: "Oil on canvas",
    image: {
      src: "https://res.cloudinary.com/dto6szvn9/image/upload/v1783959612/europeana-w5sZ5pohapM-unsplash_maockt.jpg",
      alt: "Vincent van Gogh in his studio",
    },
    bio: [
      "Vincent van Gogh studied briefly at the Antwerp Academy before developing his own expressive style, moving to the south of France in search of light and color. His paintings capture raw emotion — swirling skies, sunlit wheat fields, the quiet intensity of a single sunflower.",
    ],
    quote: "I dream of painting and then I paint my dream.",
    stats: [
      { value: 10, label: "Years active" },
      { value: 2100, label: "Works created" },
      { value: "4 continents", label: "Collections" },
    ],
    worksAvailable: 9,
    cta: {
      label: "Explore Vincent's Works",
      href: "/artists/vincent-van-gogh",
    },
  },

  hokusai: {
    label: "ARTIST SPOTLIGHT",
    name: "Katsushika Hokusai",
    location: "Edo, Japan",
    medium: "Woodblock print & ink",
    image: {
      src: "https://res.cloudinary.com/dto6szvn9/image/upload/v1783959740/images_cud0nh.jpg",
      alt: "Hokusai working in his studio",
    },
    bio: [
      "Hokusai worked across nearly seven decades, changing his name and style many times in pursuit of what he called true drawing. His prints turned waves, mountains, and everyday labor into studies of pattern, motion, and scale.",
    ],
    quote:
      "From the age of six I had a mania for drawing the shapes of things.",
    stats: [
      { value: 70, label: "Years active" },
      { value: 30000, label: "Works created" },
      { value: "3 continents", label: "Collections" },
    ],
    worksAvailable: 20,
    cta: {
      label: "Explore Hokusai's Works",
      href: "/artists/hokusai",
    },
  },
};