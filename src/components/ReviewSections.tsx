
import { Card } from "@heroui/react";

// রেটিং স্টার কম্পোনেন্ট
const StarIcon = () => (
  <svg
    className="w-5 h-5 fill-accent text-accent"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
  >
    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
  </svg>
);

interface Review {
  id: number;
  rating: number;
  comment: string;
  user: {
    name: string;
    location: string;
    avatar: string;
  };
}

const dummyReviews: Review[] = [
  {
    id: 1,
    rating: 5,
    comment:
      '"The Sunset Over Dhaka arrived immaculately packaged with a handwritten note from Rafiq. It\'s transformed our dining room — exactly as described, and even more alive in person."',
    user: {
      name: "Sophie Laurent",
      location: "Paris, France",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=256",
    },
  },
  {
    id: 2,
    rating: 5,
    comment:
      '"Kenji\'s ceramic work is extraordinary to hold. Artly\'s curation is genuinely different — every piece is chosen with real care. My fourth order, still surprised every time."',
    user: {
      name: "James Whitfield",
      location: "London, UK",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=256",
    },
  },
  {
    id: 3,
    rating: 5,
    comment:
      '"Fast shipping, impeccable packaging, and the print quality is stunning. I\'ve gifted three Artly prints now and each time the recipient is floored."',
    user: {
      name: "Ana Lima",
      location: "Lisbon, Portugal",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=256",
    },
  },
];

const ReviewSections = () => {
  return (
    <section className="bg-bg-light py-16 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* হেডার সেকশন */}
        <div className="text-center mb-12">
          <p className="text-xs font-semibold tracking-widest text-text-muted uppercase mb-2">
            Collector Stories
          </p>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-text-dark">
            What collectors say
          </h2>
        </div>

        {/* নতুন কার্ড অ্যানাটমি অনুযায়ী রিভিউ গ্রিড */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {dummyReviews.map((review) => (
            <Card
              key={review.id}
              className="bg-bg-card border border-border rounded-none shadow-none p-6 flex flex-col justify-between transition-shadow hover:shadow-md"
            >
              {/* কার্ড হেডার: স্টার রেটিং */}
              <Card.Header className="p-0 flex flex-col items-start gap-4">
                <div className="flex gap-1">
                  {Array.from({ length: review.rating }).map((_, index) => (
                    <StarIcon key={index} />
                  ))}
                </div>
              </Card.Header>

              {/* কার্ড কনটেন্ট: রিভিউ টেক্সট */}
              <Card.Content className="p-0 mt-4 grow">
                <p className="text-text-dark italic font-serif leading-relaxed text-[15px]">
                  {review.comment}
                </p>
              </Card.Content>

              {/* কার্ড ফুটার: ইউজার প্রোফাইল */}
              <Card.Footer className="p-0 mt-6 flex flex-col items-stretch gap-4 w-full">
                {/* ডিভাইডার বর্ডার */}
                <div className="border-t border-border w-full" />
                
                {/* ইউজার ডিটেইলস */}
                <div className="flex items-center gap-3">
                  <img
                    src={review.user.avatar}
                    alt={review.user.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-text-dark">
                      {review.user.name}
                    </span>
                    <span className="text-xs text-text-muted">
                      {review.user.location}
                    </span>
                  </div>
                </div>
              </Card.Footer>
            </Card>
          ))}
        </div>

      </div>
    </section>
  );
};

export default ReviewSections;