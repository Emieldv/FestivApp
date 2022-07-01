import styled from "styled-components";
import { Camera } from "react-feather";
import { colors, sizes } from "../../lib/constants";
import {
  NavigationItem,
  useNavigationItems,
} from "../../lib/hooks/useNavigationItems";
import { Link } from "react-router-dom";

export const BottomNavigation = () => {
  const navigationItems = useNavigationItems();

  return (
    <Container navigationItems={navigationItems}>
      {navigationItems.map((item, index) => (
        <ItemContainer key={index} to={item.url}>
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

const ItemContainer = styled(Link)`
  place-self: center;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: ${colors.white};
  text-decoration: none;

  &.active {
    color: ${colors.primary};
  }

  svg {
    height: 22px;
  }

  p {
    margin: 0;
    padding-top: 5px;
  }
`;
