import { useState } from "react";
import { Link, Button, toast } from "@heroui/react";
import { NavLink, useNavigate } from "react-router-dom";
import { Search, ShoppingCart, Menu, X } from "lucide-react";
import { useCurrentSession } from "../../lib/action/useCurrentSession";
import { authClient } from "../../lib/auth-client";

interface NavLinkItem {
  label: string;
  path: string;
}

const navLinks: NavLinkItem[] = [
  { label: "Home", path: "/" },
  { label: "Explore", path: "/explore" },
  { label: "About", path: "/about" },
  
 
];

export default function AppNavbar() {
  const navigate = useNavigate()
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
   const { user } = useCurrentSession();

const finalNavLinks = user
  ? [...navLinks, { label: 'Be A Seller', path: '/seller' }, { label: 'Sell Your Artworks', path: '/sell' }]
  : navLinks;


   
 const navLinkClass = ({ isActive }: { isActive: boolean }): string =>
  `text-[15px] font-medium transition-colors ${
    isActive 
      ? "text-primary border-b border-b-primary pb-1" 
      : "text-text-dark hover:text-primary "
  }`;

  return (
    <nav className="sticky top-0 z-40 w-full border-b border-border bg-bg-light">
      <header className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <NavLink to="/" className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-md bg-text-dark text-bg-light font-bold text-lg font-serif">
            A
          </span>
          <span className="font-serif text-xl font-semibold text-text-dark">
            Artla
          </span>
        </NavLink>

        {/* Desktop links */}
        <ul className="hidden lg:flex items-center gap-8">
          {finalNavLinks.map((link) => (
            <li key={link.path}>
              <NavLink to={link.path} className={navLinkClass}>
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Right side actions */}
        <ul className="hidden lg:flex items-center gap-5">
          <li>
            <button
              aria-label="Search"
              className="text-text-dark hover:text-primary transition-colors"
            >
              <Search size={20} />
            </button>
          </li>
          <li>
            <Link href="/cart">
             <button
              aria-label="Cart"
              className="text-text-dark hover:text-primary transition-colors"
            >
              <ShoppingCart size={20} />
            </button>
            </Link>
           
          </li>
          {/*  */}

        {user ? 
        <>
       <li>
  <Button
  variant="ghost"
    onClick={async () => {
      await authClient.signOut();
      toast.success('user successfully logged out')
      navigate('/login')
    }}
  
    className="text-[15px] font-medium text-text-dark hover:text-primary hover:no-underline hover:bg-bg-light"
  >
    Signout
  </Button>
</li>
          <li>
            <Link
            className={'no-underline '}
            href="/profile">
             <Button
              className="bg-text-dark text-bg-light font-medium px-5 rounded-sm no-underline"
            >
              Profile
            </Button>
            </Link>
           
          </li>
        </>
        :
        
        <>
        <li>
            <Link
          
              href="/login"
              className="text-[15px] font-medium text-text-dark hover:text-primary hover:no-underline"
            >
              Login
            </Link>
          </li>
          <li>
            <Link
            className={'no-underline '}
            href="/signup">
             <Button
              className="bg-text-dark text-bg-light font-medium px-5 rounded-sm no-underline"
            >
              Signup
            </Button>
            </Link>
           
          </li>
        </>
        }
          
          {/*  */}
        </ul>

        {/* Mobile menu toggle */}
        <button
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="lg:hidden text-text-dark"
          onClick={() => setIsMenuOpen((prev) => !prev)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </header>

      {/* Mobile menu */}
      {isMenuOpen && (
        <ul className="lg:hidden flex flex-col gap-4 border-t border-border bg-bg-light px-6 py-5">
          {finalNavLinks.map((link) => (
            <li key={link.path}>
              <NavLink
                to={link.path}
                className={navLinkClass}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </NavLink>
            </li>
          ))}

          <li className="flex items-center gap-5 pt-1">
            <button aria-label="Search" className="text-text-dark">
              <Search size={20} />
            </button>
            <button aria-label="Cart" className="text-text-dark">
              <ShoppingCart size={20} />
            </button>
          </li>
{user ? 
<>
<li>
  <Button
  variant="ghost"
    onClick={async () => {
      await authClient.signOut();
      setIsMenuOpen(false)
      navigate('/login')
      toast.success('user successfully logged out!')
    }}
    className="bg-bg-light text-[15px] font-medium text-text-dark hover:text-primary hover:no-underline"
  >
    Signout
  </Button>
</li>

          <li>
            <Link
            className={'w-full no-underline'}
            href="/profile"
            >
            <Button
      
              className="bg-text-dark text-bg-light font-medium w-full rounded-full no-underline"
              onClick={() => setIsMenuOpen(false)}
            >
            Profile
            </Button>
            </Link>
            
          </li>
</>
:
<>
 <li>
            <Link
              
              href="/login"
              className="text-[15px] font-medium text-text-dark no-underline"
              onClick={() => setIsMenuOpen(false)}
            >
              Login
            </Link>
          </li>

          <li>
            <Link
            className={'w-full no-underline'}
            href="/signup"
            >
            <Button
      
              className="bg-text-dark text-bg-light font-medium w-full rounded-full no-underline"
              onClick={() => setIsMenuOpen(false)}
            >
              Sign up
            </Button>
            </Link>
            
          </li>
</>
}
         


        </ul>
      )}
    </nav>
  );
}