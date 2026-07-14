import { Spinner, Card } from "@heroui/react";
import { motion, type Variant } from "framer-motion";
import { Link } from "react-router-dom"; // Vite-এ রাউটিংয়ের জন্য standard react-router-dom
import { useServerFetch } from "../../lib/action/core/useServerFetch";
import type { ArtworkProduct } from "../../lib/types/ArtWorksProduct";

const FeaturedCollections = () => {
  const { data, loading } = useServerFetch<ArtworkProduct[]>("/api/featuredArtWorks");

  if (loading) {
    return (
      <div className="w-full h-[60vh] flex justify-center items-center">
        <Spinner className="text-primary" size="lg" />
      </div>
    );
  }

  // সর্বোচ্চ ৬টি ডেটা দেখানোর জন্য slice করা হয়েছে
  const featuredArtworks = data?.slice(0, 6) || [];

  // মোশন অ্যানিমেশন কনফিগারেশন
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

  return (
    <section className="bg-bg-light py-12 px-4 md:px-8 max-w-7xl mx-auto">
      {/* হেডার সেকশন */}
      <div className="flex justify-between items-baseline mb-8 border-b border-border pb-4">
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-text-dark">
          Featured Artworks
        </h2>
        <Link 
          to="/explore" 
          className="text-accent font-medium hover:underline flex items-center gap-1 transition-all"
        >
          View all <span className="text-lg">→</span>
        </Link>
      </div>

      {/* কার্ড গ্রিড এবং মোশন কন্টেইনার */}
      <motion.div 
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.1 }}
      >
        {featuredArtworks.map((art) => (
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
      </motion.div>
    </section>
  );
};

export default FeaturedCollections;