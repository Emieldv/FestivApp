import { Route, Routes } from "react-router-dom";
import { ErrorScreen } from "./components/ErrorScreen";
import { useNavigationItems } from "./lib/hooks/useNavigationItems";

function App() {
  const navigationItems = useNavigationItems();

  return (
    <main>
      <Routes>
        {navigationItems.map((item, index) => (
          <Route key={index} path={item.baseUrl} element={<item.component />} />
        ))}
        <Route path="*" element={<ErrorScreen error="Page not found" />} />
      </Routes>
    </main>
  );
}

export default App;
