import { Navigate, Route, Routes } from "react-router-dom";
import styled from "styled-components";
import { ErrorScreen } from "./components/ErrorScreen";
import { useNavigationItems } from "./lib/hooks/useNavigationItems";

// TODO somehow chache images from api
// TODO Cache google font

function App() {
  const navigationItems = useNavigationItems();

  return (
    <Main>
      <Routes>
        {navigationItems.map((item, index) => (
          <Route
            key={index}
            path={item.routingUrl}
            element={<item.component />}
          />
        ))}
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="*" element={<ErrorScreen error="Page not found" />} />
      </Routes>
    </Main>
  );
}

const Main = styled.main`
  background-color: ${({ theme }) => theme.background};
`;

export default App;
