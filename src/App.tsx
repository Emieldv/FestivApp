import { ScheduleProvider } from "./lib/context/Schedule";
import { Schedule } from "./pages/Schedule";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { DaySelector } from "./pages/DaySelector";

function App() {
  return (
    <main>
      <Routes>
        <Route path="/" element={<DaySelector />} />
        <Route path="/schedule/:scheduleId" element={<Schedule />} />
      </Routes>
    </main>
  );
}

export default App;
