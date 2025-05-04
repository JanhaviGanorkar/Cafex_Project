// components/Navbar.jsx
import { useEffect, useState } from "react";
import { Menu, ShoppingCart, Search, Home } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [isSticky, setIsSticky] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/");
  };

  useEffect(() => {
    const handleScroll = () => setIsSticky(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 z-50 w-full flex items-center justify-between px-6 py-4 transition-all",
        isSticky ? "bg-gray-900 shadow-lg" : "bg-transparent"
      )}
    >
      <Link to="/" className="flex items-center text-white text-2xl font-bold">
        <Home className="text-orange-400 mr-2" />
        CafeX
      </Link>

      <ul
        className={cn(
          "flex gap-6 font-medium text-white transition-all",
          "max-md:absolute max-md:flex-col max-md:left-0 max-md:right-0 max-md:bg-gray-900 max-md:text-left max-md:px-6 max-md:py-4",
          isMenuOpen ? "top-full" : "hidden md:flex"
        )}
      >
        <li><Link to="/" className="hover:text-orange-400">Home</Link></li>
        <li><Link to="/about" className="hover:text-orange-400">About</Link></li>
        <li><Link to="/shop" className="hover:text-orange-400">Shop</Link></li>
        <li><Link to="/review" className="hover:text-orange-400">Review</Link></li>
        <li><Link to="/contact" className="hover:text-orange-400">Contact</Link></li>
        {isLoggedIn ? (
          <>
            <li><Link to="/search" className="hover:text-orange-400">Search</Link></li>
            <li><button onClick={handleLogout} className="hover:text-orange-400">Logout</button></li>
          </>
        ) : (
          <li><Link to="/login" className="hover:text-orange-400">Login</Link></li>
        )}
      </ul>

      <div className="flex items-center bg-orange-400 px-3 py-2 rounded-full shadow-md space-x-3">
        <Link to="/cart"><ShoppingCart className="text-black" /></Link>
        <Link to="/search"><Search className="text-black" /></Link>
        <Menu
          className="text-black cursor-pointer md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        />
      </div>
    </header>
  );
}
