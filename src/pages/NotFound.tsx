import { ArrowLeft, Compass } from "lucide-react";

const NotFound = () => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-bg-light px-6 py-16 overflow-hidden relative">
      <style>{`
        @keyframes frame-sway {
          0%, 100% { transform: rotate(-2.5deg); }
          50% { transform: rotate(2deg); }
        }
        @keyframes drip-grow {
          0% { height: 0; opacity: 0; }
          100% { height: var(--drip-h); opacity: 1; }
        }
        @keyframes drip-fall {
          0% { transform: translateY(0); opacity: 0.9; }
          100% { transform: translateY(14px); opacity: 0; }
        }
        .frame-sway { animation: frame-sway 7s ease-in-out infinite; transform-origin: 50% 8%; }
        .drip { animation: drip-grow 1.4s ease-out forwards; }
        .drip-drop { animation: drip-fall 2.6s ease-in 1.4s infinite; }
        @media (prefers-reduced-motion: reduce) {
          .frame-sway, .drip, .drip-drop { animation: none !important; }
        }
      `}</style>

      {/* faint wall texture dots */}
      <div
        className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(var(--color-text-dark) 1px, transparent 1px)",
          backgroundSize: "26px 26px",
        }}
      />

      <div className="relative flex flex-col items-center text-center max-w-md">
        {/* nail + wire */}
        <div className="flex flex-col items-center mb-1">
          <div className="w-1.5 h-1.5 rounded-full bg-text-muted/50" />
          <svg width="90" height="26" viewBox="0 0 90 26" className="text-text-muted/40">
            <path d="M2 2 L45 22 L88 2" fill="none" stroke="currentColor" strokeWidth="1" />
          </svg>
        </div>

        {/* empty frame, artwork missing */}
        <div className="frame-sway relative mb-2">
          <svg width="220" height="180" viewBox="0 0 220 180" fill="none">
            {/* outer frame */}
            <rect
              x="6"
              y="6"
              width="208"
              height="168"
              rx="3"
              stroke="var(--color-primary)"
              strokeWidth="7"
              fill="var(--color-bg-card)"
            />
            {/* inner mat */}
            <rect
              x="20"
              y="20"
              width="180"
              height="140"
              stroke="var(--color-border)"
              strokeWidth="2"
              fill="none"
            />
            {/* missing artwork ghost outline */}
            <rect
              x="34"
              y="34"
              width="152"
              height="112"
              stroke="var(--color-text-muted)"
              strokeWidth="1.5"
              strokeDasharray="6 6"
              fill="none"
              opacity="0.5"
            />
            {/* crack near corner */}
            <path
              d="M170 20 L182 34 L176 44 L188 58"
              stroke="var(--color-secondary)"
              strokeWidth="2"
              fill="none"
              opacity="0.6"
            />
            {/* small hanger mark inside mat */}
            <circle cx="110" cy="40" r="2.5" fill="var(--color-text-muted)" opacity="0.5" />
          </svg>

          {/* paint drips leaking from the bottom edge of the frame */}
          <div className="absolute left-1/2 -translate-x-1/2 -bottom-1 flex gap-6">
            <span
              className="drip block w-0.75 rounded-b-full"
              style={{ ["--drip-h" as string]: "22px", background: "var(--color-accent)" }}
            >
              <span
                className="drip-drop block w-1.5 h-1.5 rounded-full ml-[-1.5px] mt-5"
                style={{ background: "var(--color-accent)" }}
              />
            </span>
            <span
              className="drip block w-0.75 rounded-b-full"
              style={{ ["--drip-h" as string]: "34px", background: "var(--color-primary)", animationDelay: "0.2s" }}
            />
            <span
              className="drip block w-0.75 rounded-b-full"
              style={{ ["--drip-h" as string]: "16px", background: "var(--color-secondary)", animationDelay: "0.4s" }}
            >
              <span
                className="drip-drop block w-1.25 h-1.25 rounded-full -ml-px mt-3.5"
                style={{ background: "var(--color-secondary)", animationDelay: "2s" }}
              />
            </span>
          </div>
        </div>

        {/* museum-style placard */}
        <div className="mt-10 bg-bg-card border border-border rounded-md px-8 py-6 shadow-sm">
          <p className="font-serif text-6xl text-primary leading-none mb-2">404</p>
          <h1 className="font-serif text-2xl text-text-dark mb-2">
            This piece isn't on display
          </h1>
          <p className="text-text-muted text-sm leading-relaxed mb-6">
            It may have been sold, moved to a private collection, or
            never framed at all. Let's get you back to the gallery.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="/"
              className="inline-flex items-center justify-center gap-2 bg-primary text-bg-light text-sm font-medium px-5 py-2.5 rounded-md hover:opacity-90 transition-opacity"
            >
              <ArrowLeft size={16} />
              Back to Gallery
            </a>
            <a
              href="/explore"
              className="inline-flex items-center justify-center gap-2 border border-border text-text-dark text-sm font-medium px-5 py-2.5 rounded-md hover:bg-bg-light transition-colors"
            >
              <Compass size={16} />
              Browse Artworks
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;