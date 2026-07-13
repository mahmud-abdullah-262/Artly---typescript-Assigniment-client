import { Card } from "@heroui/react";
import { Sparkles, Eye, Hexagon, type LucideIcon } from "lucide-react";

interface PromiseItem {
  icon: LucideIcon;
  iconBg: string;
  iconColor: string;
  title: string;
  description: string;
}

const promises: PromiseItem[] = [
  {
    icon: Sparkles,
    iconBg: "bg-primary/10",
    iconColor: "text-primary",
    title: "Curated with intention",
    description:
      "Every piece is hand-reviewed by our editorial team. No algorithms. No bulk uploads. Just 200+ artists whose work we'd hang in our own homes.",
  },
  {
    icon: Eye,
    iconBg: "bg-secondary/10",
    iconColor: "text-secondary",
    title: "Direct from the artist",
    description:
      "Artists set their own prices and keep 85% of every sale. When you buy on Artly, you're investing in a real person's practice — not a middleman.",
  },
  {
    icon: Hexagon,
    iconBg: "bg-accent/10",
    iconColor: "text-accent",
    title: "Delivered with care",
    description:
      "We pack every piece by hand with archival materials. Fragile works travel in custom-built timber crates. Delivery is insured, tracked, and guaranteed.",
  },
];

const WhyChooseArtly = () => {
  return (
    <section className="bg-bg-light py-20 px-6">
      <div className="mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <p className="text-xs font-semibold tracking-[0.15em] uppercase text-primary mb-3">
            Our Promise
          </p>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-text-dark">
            Why collectors choose Artly
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {promises.map(({ icon: Icon, iconBg, iconColor, title, description }) => (
            <Card
              key={title}
              className="bg-bg-card border border-border rounded-xl shadow-sm"
            >
              <Card.Header className="flex-col items-start gap-4 pb-2">
                <div
                  className={`w-11 h-11 rounded-lg flex items-center justify-center ${iconBg}`}
                >
                  <Icon className={`w-5 h-5 ${iconColor}`} strokeWidth={2} />
                </div>
                <Card.Title className="font-serif text-lg font-bold text-text-dark">
                  {title}
                </Card.Title>
              </Card.Header>
              <Card.Content>
                <p className="text-sm leading-relaxed text-text-muted">
                  {description}
                </p>
              </Card.Content>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseArtly;