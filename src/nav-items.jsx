import { Rocket, Star, Satellite, Info, BookOpen, Sun, Trello } from "lucide-react";
import Index from "./pages/Index.jsx";
import SpaceFacts from "./pages/SpaceFacts.jsx";
import SolarSystem from "./pages/SolarSystem.jsx";
import Kanban from "./pages/Kanban.jsx";

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
    title: "Space Facts",
    to: "/space-facts",
    icon: <BookOpen className="h-4 w-4" />,
    page: <SpaceFacts />,
  },
  {
    title: "Solar System",
    to: "/solar-system",
    icon: <Sun className="h-4 w-4" />,
    page: <SolarSystem />,
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
  {
    title: "Kanban",
    to: "/kanban",
    icon: <Trello className="h-4 w-4" />,
    page: <Kanban />,
  },
];
