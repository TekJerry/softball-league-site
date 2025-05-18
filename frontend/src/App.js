import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import LeagueSchedule from "./pages/LeagueSchedule";

function App() {
  return (
    <>
      <Navbar />
      <div >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/league-schedule" element={<LeagueSchedule />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
