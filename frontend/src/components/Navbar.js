import { NavLink } from "react-router-dom";

const navItems = [
  { name: "Home", path: "/" },
  { name: "Latest News", path: "/latest-news" },
  { name: "League Schedule", path: "/league-schedule" },
  { name: "Team Schedules", path: "/team-schedules" },
  { name: "Scores", path: "/scores" },
  { name: "Standings", path: "/standings" },
  { name: "Links", path: "/links" },
];

export default function Navbar() {
  return (
    <nav className="bg-stone-900 text-white sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center h-24">
        {/* Logo */}
        <div className="text-yellow-400 font-bold text-2xl">
          🥎 Softball League
        </div>

        {/* Links */}
        <div className="hidden md:flex space-x-6">
          {navItems.map(({ name, path }) => (
            <NavLink
              key={name}
              to={path}
              className={({ isActive }) =>
                `relative group hover:text-yellow-400 transition-colors duration-200 text-xl ${
                  isActive ? "text-yellow-400 font-semibold text-xl" : ""
                }`
              }
            >
              {name}
              <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-yellow-400 transition-all duration-300 group-hover:w-full" />
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
}
