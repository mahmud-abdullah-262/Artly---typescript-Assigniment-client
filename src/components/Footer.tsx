import { Link as RouterLink } from "react-router-dom";
import { Link as HeroLink, Separator  } from "@heroui/react";
import { Mail, Phone, MapPin } from "lucide-react";
import { Icon } from "@iconify/react";

// Explore -> হোম পেজের বিভিন্ন সেকশনে স্মুথ-স্ক্রল করবে (anchor link)
const exploreLinks = [
  { label: "Featured", href: "#featured" },
  { label: "New Arrivals", href: "#new-arrivals" },
  { label: "Our Promises", href: "#promises" },
  { label: "Reviews", href: "#reviews" },
  { label: "Upcoming Events", href: "#upcoming-events" },
  { label: "Newsletter", href: "#newsletter" },
];

// Links -> আলাদা আলাদা পেজে নিয়ে যাবে (react-router)
const pageLinks = [
  { label: "All Products", href: "/products" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Cafe", href: "/cafe" },
];

const socialLinks = [
  { label: "Instagram", href: "https://instagram.com", icon:  <Icon icon="mdi:instagram" /> },
  { label: "Facebook", href: "https://facebook.com", icon: <Icon icon="ic:outline-facebook" /> },
  { label: "X", href: "https://X.com", icon: <Icon icon="prime:twitter" /> },
];

// একই origin (হোম পেজ) এ থাকলে স্মুথ স্ক্রল, না থাকলে আগে হোমে নিয়ে গিয়ে scroll
const handleSectionScroll = (
  e: React.MouseEvent<HTMLAnchorElement>,
  hash: string
) => {
  if (window.location.pathname !== "/") return; // অন্য পেজে থাকলে স্বাভাবিক নেভিগেশন হবে
  e.preventDefault();
  const id = hash.replace("#", "");
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    window.history.pushState(null, "", hash);
  }
};

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-bg-light text-text-dark border-t border-border">
      <div className="mx-auto max-w-7xl px-6 py-12 sm:px-8 lg:px-10">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <RouterLink to="/" className="inline-flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-md bg-secondary text-bg-light font-serif text-lg font-semibold">
                A
              </span>
              <span className="font-serif text-xl font-semibold text-text-dark">
                Artly
              </span>
            </RouterLink>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-text-muted">
              A marketplace for original art and craft — connecting
              collectors with independent artists worldwide since 2019.
            </p>

            <div className="mt-5 flex items-center gap-3">
              {socialLinks.map(({ label, href, icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-md border border-border text-text-muted transition-colors hover:border-primary hover:text-primary"
                >
               {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Explore - homepage sections */}
          <nav aria-label="Explore">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-secondary">
              Explore
            </h3>
            <ul className="mt-4 space-y-3">
              {exploreLinks.map(({ label, href }) => (
                <li key={label}>
                  <HeroLink
                    as="a"
                    href={href}
                    onClick={(e) =>
                      handleSectionScroll(
                        e as unknown as React.MouseEvent<HTMLAnchorElement>,
                        href
                      )
                    }
                    className="text-sm text-text-muted transition-colors hover:text-accent"
                  >
                    {label}
                  </HeroLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* Links - other pages */}
          <nav aria-label="Links">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-secondary">
              Links
            </h3>
            <ul className="mt-4 space-y-3">
              {pageLinks.map(({ label, href }) => (
                <li key={label}>
                  <HeroLink
                    as={RouterLink}
                    to={href}
                    className="text-sm text-text-muted transition-colors hover:text-accent"
                  >
                    {label}
                  </HeroLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-secondary">
              Contact
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-text-muted">
              <li>
                <a
                  href="mailto:hello@artly.com"
                  className="flex items-start gap-2 transition-colors hover:text-accent"
                >
                  <Mail size={16} strokeWidth={1.75} className="mt-0.5 shrink-0" />
                  <span>hello@artly.com</span>
                </a>
              </li>
              <li>
                <a
                  href="tel:+43155512345"
                  className="flex items-start gap-2 transition-colors hover:text-accent"
                >
                  <Phone size={16} strokeWidth={1.75} className="mt-0.5 shrink-0" />
                  <span>+43 1 555 1234</span>
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin size={16} strokeWidth={1.75} className="mt-0.5 shrink-0" />
                <span>Naschmarkt 12, 1040 Vienna</span>
              </li>
            </ul>
          </div>
        </div>

        <Separator  className="my-8 bg-border" />

        <div className="flex flex-col-reverse items-center justify-between gap-4 sm:flex-row">
          <p className="text-xs text-text-muted">
            © {year} Artly. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            <RouterLink
              to="/privacy"
              className="text-xs text-text-muted transition-colors hover:text-accent"
            >
              Privacy Policy
            </RouterLink>
            <RouterLink
              to="/terms"
              className="text-xs text-text-muted transition-colors hover:text-accent"
            >
              Terms of Use
            </RouterLink>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;