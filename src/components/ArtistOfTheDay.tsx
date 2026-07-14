
import type { Artist } from "../../lib/types/Artist";
import { artistsOfTheDayData } from "../../lib/data/artistsOfTheDayDatd"


function getArtistOfTheDay(): Artist {
  const keys = Object.keys(artistsOfTheDayData);
  const startOfYear = new Date(new Date().getFullYear(), 0, 0).getTime();
  const dayOfYear = Math.floor((Date.now() - startOfYear) / 86_400_000);
  const index = dayOfYear % keys.length;
  return artistsOfTheDayData[keys[index]];
}

const ArtistOfTheDay = () => {
  const artist = getArtistOfTheDay();

  return (
    <section className="bg-primary w-full">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-5 py-10 sm:gap-10 sm:px-6 sm:py-14 md:grid-cols-2 md:gap-14 md:px-10 md:py-16">
        {/* Image side */}
        <div className="relative">
          <div className="aspect-4/3 w-full overflow-hidden rounded-xl bg-bg-card sm:aspect-4/5 md:aspect-auto md:h-full">
            {/* Replace with next/image in an actual Next.js project */}
            <img
              src={artist.image.src}
              alt={artist.image.alt}
              className="h-full w-full object-cover"
            />
          </div>

          
        </div>

        {/* Content side */}
        <div className="flex flex-col justify-center">
          <span className="text-xs font-semibold tracking-[0.2em] text-light">
           Artist of the Day
          </span>

          <h2 className="mt-3 font-serif text-3xl font-bold text-bg-light sm:text-4xl md:text-5xl">
            {artist.name}
          </h2>

          <p className="mt-2 text-sm font-medium text-secondary sm:text-base">
            {artist.location} · {artist.medium}
          </p>

          <div className="mt-4 space-y-3 text-sm text-secondary sm:mt-6 sm:space-y-4 sm:text-base">
            {artist.bio.map((paragraph, i) => (
              <p key={i} className="leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>

          <blockquote className="mt-4 border-l-2 border-border pl-4 text-sm italic leading-relaxed text-secondary sm:mt-6 sm:text-base">
            "{artist.quote}"
          </blockquote>

          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-4 sm:mt-8 sm:gap-x-8">
            {artist.stats.map((stat, i) => (
              <div key={i}>
                <p className="font-serif text-xl font-bold text-bg-light sm:text-2xl">
                  {stat.value}
                </p>
                <p className="text-xs text-secondary sm:text-sm">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default ArtistOfTheDay;














