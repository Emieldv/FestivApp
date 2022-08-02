import styled from "styled-components";
import { breakpoints, sizes } from "../../lib/constants";
import {
  NavigationItem,
  useNavigationItems,
} from "../../lib/hooks/useNavigationItems";
import { Link } from "react-router-dom";
// @ts-ignore
import cursorCur from "../../assets/cursor/hand.cur";
import cursorPng from "../../assets/cursor/hand.png";
import cursorGif from "../../assets/cursor/hand.gif";
import { useConfig } from "../../lib/hooks/useConfig";

// TODO change schedule and my lineup to select day

export const TopNavigation = () => {
  const navigationItems = useNavigationItems();
  const { logo } = useConfig();

  const active = (url: string) => {
    return window.location.pathname.includes(url);
  };
  return (
    <Container navigationItems={navigationItems}>
      <TitleContainer to={"/home"}>
        <img src={logo} alt="Logo" />
      </TitleContainer>
      <NavigationContainer>
        {navigationItems.map((item, index) => (
          <ItemContainer
            key={index}
            to={item.url}
            $active={active(item.baseUrl)}
          >
            <p>{item.name}</p>
          </ItemContainer>
        ))}
      </NavigationContainer>
    </Container>
  );
};

interface ContainerProps {
  navigationItems: NavigationItem[];
}

const Container = styled.div<ContainerProps>`
  @media screen and (min-width: ${breakpoints.tabletPortrait}) {
    height: ${sizes.mainNavigationHeight};
    padding: 0 20px;
    background-color: ${({ theme }) => theme.navigation};
    display: flex;
    align-items: center;
    justify-content: space-between;
    grid-template-columns: repeat(
      ${({ navigationItems }) => navigationItems.length},
      1fr
    );
  }

  display: none;
`;

const TitleContainer = styled(Link)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-decoration: none;
  object-fit: contain;
  overflow: hidden;
  height: 100%;

  h1 {
    margin: 0;
    padding-left: 10px;
    color: ${({ theme }) => theme.navigationIcon};
  }

  img {
    height: 80%;
  }
`;

const NavigationContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const ItemContainer = styled(Link)<{ $active: boolean }>`
  color: ${({ $active, theme }) =>
    $active ? theme.navigationIconActive : theme.navigationIcon};
  text-decoration: none;

  padding-left: 20px;

  cursor: url(${cursorCur}), url(${cursorPng}), url(${cursorGif}), pointer;

  p {
    margin: 0;
    padding-top: 5px;
    font-size: 20px;
  }
`;
