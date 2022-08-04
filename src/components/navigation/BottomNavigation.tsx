import styled from "styled-components";
import { breakpoints, sizes } from "../../lib/constants";
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
  height: ${sizes.mainNavigationHeight};
  background-color: ${({ theme }) => theme.navigation};
  display: grid;
  justify-content: center;
  align-items: center;
  grid-template-columns: repeat(
    ${({ navigationItems }) => navigationItems.length},
    1fr
  );

  @media screen and (min-width: ${breakpoints.tabletPortrait}) {
    display: none;
  }
`;

const ItemContainer = styled(Link)<{ $active: boolean }>`
  place-self: center;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: ${({ $active, theme }) =>
    $active ? theme.navigationIconActive : theme.navigationIcon};
  text-decoration: none;

  svg {
    height: 22px;
  }

  p {
    margin: 0;
    padding-top: 5px;
  }
`;
