import React, { useEffect, useState, useRef } from "react";
import axios from "axios";

export default function GameList() {
  const [groupedGames, setGroupedGames] = useState({});
  const [dates, setDates] = useState([]);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const dropdownRef = useRef(null);
  const defaultLogo = "https://i.imgur.com/F0gTvRo.png"

  useEffect(() => {
    axios.get("http://localhost:8000/api/games/").then((res) => {
      const sorted = res.data.sort(
        (a, b) => new Date(a.date) - new Date(b.date)
      );

      const groups = {};
      sorted.forEach((game) => {
        if (!groups[game.date]) {
          groups[game.date] = [];
        }
        groups[game.date].push(game);
      });

      setGroupedGames(groups);
      setDates(Object.keys(groups));
    });
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDatePicker(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative">
      {/* Sticky Date Selector */}
      <div className="sticky top-[94px] z-30 p-4">
        <div className="relative flex justify-center" ref={dropdownRef}>
          <button
            onClick={() => setShowDatePicker(!showDatePicker)}
            className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-4 py-2 rounded"
          >
            Select Date of Games
          </button>

          {showDatePicker && (
            <div className="absolute top-14 left-1/2 transform -translate-x-1/2 bg-stone-800 border border-stone-700 p-4 rounded shadow-lg grid grid-cols-4 gap-2 w-fit max-w-xs">
              {dates.map((date) => (
                <button
                  key={date}
                  onClick={() => {
                    const el = document.getElementById(`games-${date}`);
                    if (el) {
                      const yOffset = -180; // Adjust this to match your navbar height
                      const y =
                        el.getBoundingClientRect().top +
                        window.pageYOffset +
                        yOffset;
                      window.scrollTo({ top: y, behavior: "smooth" });
                    }
                    setShowDatePicker(false);
                  }}
                  className="text-white hover:bg-yellow-600 px-3 py-2 rounded text-sm min-w-[72px] text-center"
                >
                  {new Date(date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Games by Date */}
      <div className="px-4 py-8">
        {dates.map((date) => (
          <div key={date} id={`games-${date}`} className="mb-10">
            <div className="text-center">
              <h2
                className="
  inline-block text-2xl text-white font-bold text-center 
  px-4 py-3 mb-6 rounded-xl shadow-lg
  bg-gradient-to-b from-yellow-700 via-yellow-500 to-yellow-800
  border border-yellow-300"
              >
                Games of {new Date(date).toLocaleDateString()}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {groupedGames[date].map((game) => (
                <div
                  key={game.id}
                  className="
  bg-gradient-to-br from-zinc-800 via-zinc-900 to-black 
  rounded-xl shadow-[inset_0_0_0.5px_rgba(255,255,255,0.05)] p-4
">
                  <div className="flex items-center text-white text-lg font-medium text-center">
                    {/* Team 1 */}
                    <div className="flex-1 flex justify-start items-center gap-2">
                      <img
                        src={game.team1_logo_url || defaultLogo}
                        className="w-20 h-20 rounded-full object-cover ring-2 ring-yellow-400"
                      />
                      <span className="text-3xl font-medium pl-6">{game.team1}</span>
                    </div>

                    {/* VS Centered */}
                    <div className="w-16 flex justify-center items-center">
                      <span className="text-stone-300 text-sm">vs</span>
                    </div>

                    {/* Team 2 */}
                    <div className="flex-1 flex justify-end items-center gap-2">
                      <span className="text-3xl font-medium pr-6">{game.team2}</span>
                      <img
                        src={game.team2_logo_url || defaultLogo}
                        className="w-20 h-20 rounded-full object-cover ring-2 ring-yellow-400"
                      />
                    </div>
                  </div>
                  <div className="text-sm text-stone-300 text-center mt-2">
                    {game.field_name} ·{" "}
                    {new Date(`1970-01-01T${game.time}`).toLocaleTimeString(
                      [],
                      {
                        hour: "numeric",
                        minute: "2-digit",
                      }
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
