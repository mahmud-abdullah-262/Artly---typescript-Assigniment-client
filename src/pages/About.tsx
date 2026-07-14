import { motion, type TargetAndTransition, type Variants } from "framer-motion";
import { Button, Input, TextArea } from "@heroui/react";
import {
  Palette,
  Users,
  Globe2,
  ShieldCheck,
  Mail,
  Phone,
  MapPin,
  Send,
  Quote,
} from "lucide-react";

const STATS = [
  { label: "Artists onboard", value: "180+" },
  { label: "Artworks sold", value: "2,400+" },
  { label: "Countries shipped to", value: "34" },
  { label: "Years running", value: "6" },
];

const VALUES = [
  {
    icon: Palette,
    title: "Curated, not crowded",
    desc: "Every piece on Artly is hand-picked — quality and story both matter to us.",
  },
  {
    icon: Users,
    title: "Artist-first",
    desc: "We keep a fair commission on every sale, so artists can build a sustainable income from their work.",
  },
  {
    icon: Globe2,
    title: "Local to global",
    desc: "From a Dhaka studio straight to a collector's wall — safely packaged and insured, worldwide.",
  },
  {
    icon: ShieldCheck,
    title: "Authenticity guaranteed",
    desc: "Every piece ships with a certificate of authenticity and direct provenance from the artist.",
  },
];

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

const About = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // functionality to be added later
  };

  return (
    <div className="bg-bg-light">
      {/* Hero */}
      <section className="max-w-6xl mx-auto px-4 md:px-6 pt-16 pb-14 md:pt-24 md:pb-20 text-center">
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={0}
          className="text-xs font-semibold tracking-widest uppercase text-primary"
        >
          About Artly
        </motion.p>
        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={1}
          className="mt-3 text-3xl md:text-5xl font-bold text-text-dark leading-tight max-w-3xl mx-auto"
        >
          Bangladeshi artists, on walls around the world
        </motion.h1>
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={2}
          className="mt-5 text-base md:text-lg text-text-muted max-w-2xl mx-auto leading-relaxed"
        >
          Artly is an online art marketplace connecting contemporary artists
          from Dhaka and across Bangladesh directly with collectors —
          no gallery markup in between.
        </motion.p>
      </section>

      {/* Stats strip */}
      <motion.section
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        custom={0}
        className="border-y border-border bg-bg-card"
      >
        <div className="max-w-6xl mx-auto px-4 md:px-6 py-8 grid grid-cols-2 md:grid-cols-4 gap-6">
          {STATS.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-2xl md:text-3xl font-bold text-primary">
                {stat.value}
              </p>
              <p className="mt-1 text-xs md:text-sm text-text-muted">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Story */}
      <section className="max-w-6xl mx-auto px-4 md:px-6 py-16 md:py-20 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          custom={0}
          className="rounded-2xl overflow-hidden border border-border aspect-4/3 bg-bg-card"
        >
          <img
            src="https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=800"
            alt="Artist studio in Dhaka"
            className="w-full h-full object-cover"
          />
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          custom={1}
        >
          <p className="text-xs font-semibold tracking-widest uppercase text-text-muted">
            Our story
          </p>
          <h2 className="mt-3 text-2xl md:text-3xl font-bold text-text-dark">
            It started in a Mirpur studio
          </h2>
          <p className="mt-4 text-sm md:text-base text-text-muted leading-relaxed">
            In 2019, three artist friends noticed something — the country
            never had a shortage of talent, but the paths for that talent to
            reach the right audience were limited. Artly began as a simple
            Instagram page, and has since grown into a full marketplace where
            180+ artists now showcase and sell their work.
          </p>
          <div className="mt-5 flex items-start gap-3 rounded-xl bg-bg-card border border-border p-4">
            <Quote size={20} className="text-primary shrink-0 mt-0.5" />
            <p className="text-sm text-text-muted italic leading-relaxed">
              "We want every artist to be paid fairly for their work, and
              every collector to know exactly who — and what story — they're
              buying from."
            </p>
          </div>
        </motion.div>
      </section>

      {/* Values */}
      <section className="max-w-6xl mx-auto px-4 md:px-6 pb-16 md:pb-20">
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          custom={0}
          className="text-2xl md:text-3xl font-bold text-text-dark text-center"
        >
          What we believe in
        </motion.h2>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {VALUES.map((value, i) => {
            const Icon = value.icon;
            return (
              <motion.div
                key={value.title}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                custom={i + 1}
                className="rounded-xl border border-border bg-bg-card p-5"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Icon size={18} className="text-primary" />
                </div>
                <h3 className="mt-4 font-semibold text-text-dark">
                  {value.title}
                </h3>
                <p className="mt-2 text-sm text-text-muted leading-relaxed">
                  {value.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Contact - prominent section */}
      <section className="bg-bg-card border-t border-border">
        <div className="max-w-6xl mx-auto px-4 md:px-6 py-16 md:py-20">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            custom={0}
            className="text-center max-w-xl mx-auto"
          >
            <p className="text-xs font-semibold tracking-widest uppercase text-primary">
              Get in touch
            </p>
            <h2 className="mt-3 text-2xl md:text-3xl font-bold text-text-dark">
              Have a question or a custom order?
            </h2>
            <p className="mt-3 text-sm md:text-base text-text-muted">
              Whether you want to join as an artist, discuss a commission, or
              ask about a piece — we usually reply within 24 hours.
            </p>
          </motion.div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-10">
            {/* Contact info */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              custom={1}
              className="md:col-span-2 space-y-4"
            >
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <Mail size={16} className="text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-text-dark">Email</p>
                  <p className="text-sm text-text-muted">hello@artly.com.bd</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <Phone size={16} className="text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-text-dark">Phone</p>
                  <p className="text-sm text-text-muted">+880 1685567565</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <MapPin size={16} className="text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-text-dark">
                    Studio Office
                  </p>
                  <p className="text-sm text-text-muted">
                    House 12, Road 5, Mirpur, Dhaka, Bangladesh
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Form */}
            <motion.form
              onSubmit={handleSubmit}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              custom={2}
              className="md:col-span-3 rounded-2xl border border-border bg-bg-light p-5 md:p-7 space-y-4"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  ara-label="Name"
                  placeholder="Your name"
                
              
                />
                <Input
                  aria-label="Email"
                  type="email"
                  placeholder="you@example.com"
               
                 
                />
              </div>
              <Input
                aria-label="Subject"
                placeholder="e.g. Custom commission"
              
           
              />
                <TextArea
      aria-label="Enter Your Message"
      className="h-32 w-full"
      placeholder="Enter Your Message"
    />
              <Button
                type="submit"
                className="w-full bg-primary text-white font-medium"
                size="lg"
              
              >
              <Send size={16} />  Send message
              </Button>
            </motion.form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;



