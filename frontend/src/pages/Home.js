import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="bg-gradient-to-b from-stone-900 to-black min-h-screen text-white">
      {/* Hero Section */}
      <div className="text-center py-20 px-4 bg-gradient-to-br from-yellow-500 to-yellow-600 shadow-lg">
        <h1 className="text-4xl md:text-5xl font-extrabold text-black mb-2">
          Welcome to the League Hub
        </h1>
        <p className="text-lg md:text-xl text-black font-medium">
          Your official home for schedules, scores, and standings
        </p>
      </div>

      {/* Quick Links */}
      <div className="max-w-5xl mx-auto py-16 px-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link to="/LeagueSchedule" className="bg-stone-800 hover:bg-stone-700 rounded-xl p-6 shadow-lg transition transform hover:scale-105">
          <h2 className="text-2xl font-bold text-yellow-400 mb-2">📅 League Schedule</h2>
          <p className="text-stone-300">See upcoming games grouped by date with team logos.</p>
        </Link>

        <Link to="/Standings" className="bg-stone-800 hover:bg-stone-700 rounded-xl p-6 shadow-lg transition transform hover:scale-105">
          <h2 className="text-2xl font-bold text-yellow-400 mb-2">📊 Standings</h2>
          <p className="text-stone-300">Track team performance throughout the season.</p>
        </Link>

        <Link to="/News" className="bg-stone-800 hover:bg-stone-700 rounded-xl p-6 shadow-lg transition transform hover:scale-105">
          <h2 className="text-2xl font-bold text-yellow-400 mb-2">📰 Latest News</h2>
          <p className="text-stone-300">Stay up-to-date with league announcements.</p>
        </Link>

        <Link to="/Links" className="bg-stone-800 hover:bg-stone-700 rounded-xl p-6 shadow-lg transition transform hover:scale-105">
          <h2 className="text-2xl font-bold text-yellow-400 mb-2">🔗 Useful Links</h2>
          <p className="text-stone-300">Access forms, rules, and other resources.</p>
        </Link>
      </div>

      {/* Footer */}
      <footer className="text-center text-sm text-stone-500 pb-6">
        Built with ❤️ for the community — 2025
      </footer>
    </div>
  );
}

