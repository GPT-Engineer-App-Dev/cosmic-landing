import { Rocket, Star, Satellite, Info } from "lucide-react";
import Index from "./pages/Index.jsx";

/**
 * Central place for defining the navigation items. Used for navigation components and routing.
 */
export const navItems = [
  {
    title: "Home",
    to: "/",
    icon: <Rocket className="h-4 w-4" />,
    page: <Index />,
  },
  {
    title: "Explore",
    to: "/explore",
    icon: <Star className="h-4 w-4" />,
    page: <div>Explore Page</div>,
  },
  {
    title: "Technology",
    to: "/technology",
    icon: <Satellite className="h-4 w-4" />,
    page: <div>Technology Page</div>,
  },
  {
    title: "About",
    to: "/about",
    icon: <Info className="h-4 w-4" />,
    page: <div>About Page</div>,
  },
];
