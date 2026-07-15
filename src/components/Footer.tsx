import { Link as RouterLink } from "react-router-dom";
import { Link as HeroLink, Separator  } from "@heroui/react";
import { Mail, Phone, MapPin } from "lucide-react";
import { Icon } from "@iconify/react";



// Links -> আলাদা আলাদা পেজে নিয়ে যাবে (react-router)
const pageLinks = [
  {label: "Home", href: "/"},
  { label: "All Products", href: "/explore" },
  { label: "About", href: "/about" },
  { label: "Be A Seller", href: "/seller" },
  { label: "Sell Your Artwork", href: "/sell" },
  { label: "Terms & Conditions", href: "/terms" },
  
];

const socialLinks = [
  { label: "Instagram", href: "https://instagram.com", icon:  <Icon icon="mdi:instagram" /> },
  { label: "Facebook", href: "https://facebook.com", icon: <Icon icon="ic:outline-facebook" /> },
  { label: "X", href: "https://X.com", icon: <Icon icon="prime:twitter" /> },
];



const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-bg-light text-text-dark border-t border-border">
      <div className="mx-auto max-w-7xl px-6 py-12 sm:px-8 lg:px-10">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <RouterLink to="/" className="inline-flex items-center gap-2">
             
            
          <img className="w-20 h-10 object-cover object-center" src="/logo.png" alt="logo" />
       
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


          {/* Links - other pages */}
          <nav aria-label="Links">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-secondary">
              Links
            </h3>
            <ul className="mt-4 space-y-3">
              {pageLinks.map(({ label, href }) => (
                <li key={label}>
                  <HeroLink
                  
                    href={href}
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