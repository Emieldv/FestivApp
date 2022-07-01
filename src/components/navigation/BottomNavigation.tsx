import styled from "styled-components";
import { colors, sizes } from "../../lib/constants";
import {
  NavigationItem,
  useNavigationItems,
} from "../../lib/hooks/useNavigationItems";
import { Link } from "react-router-dom";

export const BottomNavigation = () => {
  const navigationItems = useNavigationItems();

  const active = (url: string) => {
    return window.location.pathname.includes(url);
  };

  return (
    <Container navigationItems={navigationItems}>
      {navigationItems.map((item, index) => (
        <ItemContainer key={index} to={item.url} $active={active(item.baseUrl)}>
          <item.icon />
          <p>{item.name}</p>
        </ItemContainer>
      ))}
    </Container>
  );
};

interface ContainerProps {
  navigationItems: NavigationItem[];
}

const Container = styled.div<ContainerProps>`
  height: ${sizes.bottomNavigationHeight};
  background-color: ${colors.lessDark};
  display: grid;
  justify-content: center;
  align-items: center;
  grid-template-columns: repeat(
    ${({ navigationItems }) => navigationItems.length},
    1fr
  );
`;

const ItemContainer = styled(Link)<{ $active: boolean }>`
  place-self: center;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: ${({ $active }) => ($active ? colors.primary : colors.white)};
  text-decoration: none;

  svg {
    height: 22px;
  }

  p {
    margin: 0;
    padding-top: 5px;
  }
`;
