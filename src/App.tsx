import { Schedule } from "./pages/Schedule";
import { Navigate, Route, Routes } from "react-router-dom";
import { useSchedule } from "./lib/hooks/useSchedule";
import { ErrorScreen } from "./components/ErrorScreen";

function App() {
  const { rawData } = useSchedule();

  return (
    <main>
      <Routes>
        <Route
          path="/"
          element={<Navigate to={`/schedule/${rawData.days[0].id}`} />}
        />
        <Route path="/schedule/:scheduleId" element={<Schedule />} />
        <Route path="*" element={<ErrorScreen error="Page not found" />} />
      </Routes>
    </main>
  );
}

export default App;
