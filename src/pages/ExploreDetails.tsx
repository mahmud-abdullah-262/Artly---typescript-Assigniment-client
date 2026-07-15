import { Link, useParams } from "react-router-dom";
import { motion, type TargetAndTransition, type Variants } from "framer-motion";
import { useState } from "react";
import { Spinner, Button, Card } from "@heroui/react";
import {
  ChevronLeft,
  Star,
  Palette,
  Ruler,
  MapPin,
  Truck,
  MessageCircle,
  Heart,
  Share2,
  ShieldCheck,
  PackageCheck,
} from "lucide-react";

import { useServerFetch } from "../../lib/action/core/useServerFetch";
import type { ArtworkProduct } from "../../lib/types/ArtWorksProduct";
import type { Artist } from "../../lib/types/Artist";


const TABS = ["overview", "specs", "reviews"] as const;
type TabKey = (typeof TABS)[number];

const TRUST_BADGE_MAP: Record<string, { icon: typeof ShieldCheck; label: string }> = {
  authentic_certified: { icon: ShieldCheck, label: "Authentic & certified" },
  archival_packaging: { icon: PackageCheck, label: "Archival packaging" },
  insured_delivery: { icon: Truck, label: "Insured delivery" },
};



const fadeUp: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: (i: number): TargetAndTransition => ({
    opacity: 1,
    y: 0,
    transition: { 
      duration: 0.4, 
      delay: i * 0.05, 
      ease: "easeOut" 
    },
  }),
};

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  } as const;

    const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { type: "spring", stiffness: 100, damping: 15 } 
    },
  } as const ;

const ExploreDetails = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState<TabKey>("overview");

  const { data, loading } = useServerFetch<ArtworkProduct>(`/api/artworks/${id}`);
  const { data: artistProfile } = useServerFetch<Artist>(
    data?.artist?.artistID ? `/api/artist/${data.artist.artistID}` : null
  );

  const {data:fromThisArtist} = useServerFetch<ArtworkProduct[]>(
    artistProfile ?  `/api/artworkbyartist/${artistProfile?.artistId}` : null
  )
  console.log(fromThisArtist, 'from this artist')

  if (loading) {
    return (
      <div className="w-full h-[60vh] flex justify-center items-center">
        <Spinner className="text-primary" size="lg" />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="w-full h-[60vh] flex flex-col gap-2 justify-center items-center text-text-muted">
        <p>Did not found the artwork</p>
        <Link to="/explore" className="text-primary font-medium">
        Return to Collection
        </Link>
      </div>
    );
  }

  const priceFormatted = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: data.price.currency,
    maximumFractionDigits: 0,
  }).format(data.price.amount);

  const filledStars = Math.round(data.rating.average);
  const isAvailable = data.status === "available";

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-6 py-8 md:py-12">
      {/* Back link */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="show"
        custom={0}
      >
        <Link
          to="/explore"
          className="inline-flex items-center gap-1 text-sm text-text-muted hover:text-text-dark transition-colors"
        >
          <ChevronLeft size={16} />
          Back to collection
        </Link>
      </motion.div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14">
        {/* Image */}
        <motion.div
           variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={1}
          className="rounded-sm overflow-hidden bg-bg-card border border-border"
        >
          <img
            src={data.images.url}
            alt={data.images.alt}
            className="w-full h-full object-cover aspect-4/5"
          />
        </motion.div>

        {/* Info */}
        <div>
          <motion.p
          variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={2}
            className="text-xs font-semibold tracking-widest uppercase text-text-muted"
          >
            {data.category.replace(/-/g, " ")}
          </motion.p>

          <motion.h1
       variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={3}
            className="mt-2 text-3xl md:text-4xl font-bold text-text-dark"
          >
            {data.title}
          </motion.h1>

          <motion.p
      variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={4}
            className="mt-2 text-sm text-text-muted"
          >
            by{" "}
            <span className="text-primary font-medium">
              {artistProfile?.name ?? "..."}
            </span>{" "}
            · {artistProfile?.location ?? data.shipping.shipsFrom}
          </motion.p>

          <motion.div
       variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={5}
            className="mt-3 flex items-center gap-2 text-sm"
          >
            <div className="flex items-center gap-1 text-accent">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  className={i < filledStars ? "fill-accent text-accent" : "text-border"}
                />
              ))}
            </div>
            <span className="font-medium text-text-dark">{data.rating.average}</span>
            <span className="text-text-muted">
              ({data.rating.totalReviews} reviews)
            </span>
            <span className="text-text-muted">·</span>
            <span
              className={`flex items-center gap-1 font-medium ${
                isAvailable ? "text-green-600" : "text-text-muted"
              }`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  isAvailable ? "bg-green-600" : "bg-text-muted"
                }`}
              />
              {isAvailable ? "Available" : "Sold"}
            </span>
          </motion.div>

          <motion.p
        variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={6}
            className="mt-4 text-3xl font-bold text-text-dark"
          >
            {priceFormatted}
          </motion.p>

          {/* Info grid */}
          <motion.div
      variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={7}
            className="mt-6 grid grid-cols-2 gap-3"
          >
            <InfoBox icon={Palette} label="Medium" value={data.medium} />
            <InfoBox
              icon={Ruler}
              label="Dimensions"
              value={`${data.dimensions.cm.width} × ${data.dimensions.cm.height} cm (${data.dimensions.inches.width} × ${data.dimensions.inches.height} in)`}
            />
            <InfoBox icon={MapPin} label="Ships from" value={data.shipping.shipsFrom} />
            <InfoBox icon={Truck} label="Delivery" value={data.shipping.estimatedDelivery} />
          </motion.div>

          {/* CTA */}
          <motion.div
    variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={8}
            className="mt-6 space-y-3"
          >
            <Button
              className="w-full bg-primary rounded-sm text-white font-medium"
              size="lg"
           
            >
             <MessageCircle size={18} /> Contact to Order
            </Button>

            <div className="grid grid-cols-2 gap-3">
              <Button
            
                className="rounded-sm bg-primary w-full text-text-light"
              
              >
               <Heart size={18} /> Save
              </Button>
              <Button
          
                className="rounded-sm bg-primary w-full text-text-light"
              
              >
              <Share2 size={18} />  Share
              </Button>
            </div>
          </motion.div>

          {/* Trust badges */}
          <motion.div
     variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={9}
            className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-xs text-text-muted"
          >
            {data.trustBadges.map((badge) => {
              const entry = TRUST_BADGE_MAP[badge];
              if (!entry) return null;
              const Icon = entry.icon;
              return (
                <span key={badge} className="flex items-center gap-1.5">
                  <Icon size={14} />
                  {entry.label}
                </span>
              );
            })}
          </motion.div>
        </div>
      </div>

      {/* Tabs section */}
      <motion.div
   variants={fadeUp}
        initial="hidden"
        animate="show"
        custom={10}
        className="mt-12"
      >
        <div className="flex items-center gap-6 border-b border-border">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`relative pb-3 text-sm font-medium capitalize transition-colors ${
                activeTab === tab ? "text-primary" : "text-text-muted hover:text-text-dark"
              }`}
            >
              {tab === "reviews" ? `Reviews (${data.reviewsCount})` : tab}
              {activeTab === tab && (
                <motion.span
                  layoutId="activeTabIndicator"
                  className="absolute left-0 right-0 -bottom-px h-0.5 bg-primary rounded-full"
                />
              )}
            </button>
          ))}
        </div>

        <div className="pt-6">
          {activeTab === "overview" && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-lg font-semibold text-text-dark">About this work</h2>
              <p className="mt-3 text-sm leading-relaxed text-text-muted whitespace-pre-line">
                {data.description}
              </p>

              {artistProfile && (
                <div className="mt-8 rounded-sm border border-border bg-bg-card p-5">
                  <p className="text-xs font-semibold tracking-widest uppercase text-text-muted">
                    About the artist
                  </p>
                  <div className="mt-3 flex items-start gap-4">
                    <img
                      src={artistProfile.image}
                      alt={artistProfile.name}
                      className="w-12 h-12 rounded-full object-cover shrink-0"
                    />
                    <div className="flex-1">
                      <p className="font-semibold text-text-dark">{artistProfile.name}</p>
                      <p className="text-xs text-text-muted">{artistProfile.location}</p>
                      <p className="mt-2 text-sm text-text-muted leading-relaxed">
                        {artistProfile.bio}
                      </p>
                      <Button
                        size="sm"
                     
                        className="mt-4 bg-primary rounded-sm text-text-light"
                      >
                        Go to Profile
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {activeTab === "specs" && (
            <motion.div
              key="specs"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              <SpecRow label="Year" value={String(data.specs.year)} />
              <SpecRow label="Edition" value={data.specs.edition} />
              <SpecRow label="Surface" value={data.specs.surface} />
              <SpecRow label="Framing" value={data.specs.framing} />
              <SpecRow label="Certificate" value={data.specs.certificate} />
            </motion.div>
          )}

          {activeTab === "reviews" && (
            <motion.div
              key="reviews"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="text-sm text-text-muted"
            >
              {data.rating.totalReviews} reviews · average {data.rating.average} / 5
              {/* রিভিউ লিস্ট পরে বসাবে */}
            </motion.div>
          )}
        </div>
      </motion.div>

<section  className="bg-bg-light py-12 px-4 md:px-8 max-w-7xl mx-auto">
      {/* হেডার সেকশন */}
      <>
      
        <div className="flex justify-between items-baseline mb-8 border-b border-border pb-4">
        <div>
            <p className="text-md text-accent tracking-widest font-light">FROM THIS ARTIST</p>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-text-dark">
          Related Artworks
        </h2>
        </div>
        
        
      </div>

      {/* কার্ড গ্রিড এবং মোশন কন্টেইনার */}
      {fromThisArtist && <motion.div 
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.1 }}
      >
        {fromThisArtist.map((art) => (
          <motion.div key={art?._id?.toString()} variants={cardVariants}>
            <Link to={`/explore/${art?._id}`} className="block group">
              <Card className="p-0  overflow-hidden rounded-none shadow-sm transition-all duration-300 group-hover:shadow-md">
                
              
                <div className="relative aspect-3/4 w-full overflow-hidden">
                  <img
                    src={art?.images?.url || "/placeholder.jpg"}
                    alt={art?.title || "Artwork Image"}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>

                {/* কার্ডের কন্টেন্ট এরিয়া */}
                <Card.Header className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/80 via-black/40 to-transparent p-6 text-white">
                  <Card.Title className="text-xl font-serif font-semibold leading-tight mb-1 text-white">
                    {art.title}
                  </Card.Title>
                  <Card.Description className="text-sm text-gray-200/95">
                    {art.medium}
                  </Card.Description>
                </Card.Header>

              </Card>
            </Link>
          </motion.div>
        ))}
      </motion.div>}
      </>
    
    </section>

    </div>
  );
};

const InfoBox = ({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Palette;
  label: string;
  value: string;
}) => (
  <div className="flex items-start gap-2 rounded-sm bg-bg-card border border-border p-3">
    <Icon size={16} className="text-primary mt-0.5 shrink-0" />
    <div>
      <p className="text-[11px] uppercase tracking-wide text-text-muted">{label}</p>
      <p className="text-sm text-text-dark">{value}</p>
    </div>
  </div>
);

const SpecRow = ({ label, value }: { label: string; value: string }) => (
  <div className="rounded-sm bg-bg-card border border-border p-3">
    <p className="text-[11px] uppercase tracking-wide text-text-muted">{label}</p>
    <p className="text-sm text-text-dark mt-0.5">{value}</p>
  </div>
  
);




export default ExploreDetails;