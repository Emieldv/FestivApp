import { FC } from "react";
import styled from "styled-components";
import { breakpoints, sizes } from "../../lib/constants";
import Select, { StylesConfig } from "react-select";
import { useParams, useNavigate } from "react-router-dom";
import { useData } from "../../lib/hooks/useData";
import { useConfig } from "../../lib/hooks/useConfig";
import { IColors } from "../../interfaces/data";

interface TopNavigationProps {
  title: string;
  url?: string;
  select?: boolean;
}

export const Header: FC<TopNavigationProps> = ({
  title,
  url,
  select = false,
}) => {
  const { colors } = useConfig();
  const navigate = useNavigate();
  const { rawData } = useData();
  const { dayId } = useParams();

  const options = rawData.days.map((day) => ({
    value: day.id,
    label: day.name,
  }));
  const value = options.find((option) => dayId === option.value);

  const handleChange = (option: any) => {
    navigate(`..${url}/${option.value}`);
  };

  return (
    <Container>
      <h1>{title}</h1>
      {select ? (
        options.length > 1 ? (
          <Select
            options={options}
            value={value}
            onChange={handleChange}
            styles={selectStyle(colors)}
            isSearchable={false}
          />
        ) : (
          <FakeSelect>{value?.label}</FakeSelect>
        )
      ) : null}
    </Container>
  );
};

const Container = styled.div`
  height: ${sizes.pageHeaderHeight};
  display: flex;
  align-items: center;
  background-color: ${({ theme }) => theme.navigation};
  padding: 0 20px;

  @media screen and (min-width: ${breakpoints.tabletPortrait}) {
    display: none;
  }

  h1 {
    text-transform: uppercase;
    font-size: 25px;
    color: ${({ theme }) => theme.navigationIcon};
    font-weight: 600;
    margin: 0;
    padding-top: 5px;
  }
`;

const FakeSelect = styled.h1`
  color: ${({ theme }) => theme.navigationIconActive} !important;
  padding-left: 10px;
`;

const selectStyle = (colors: IColors): StylesConfig => ({
  container: (old: any) => ({
    ...old,
    zIndex: 200,
  }),
  control: (old: any) => ({
    ...old,
    backgroundColor: "transparent",
    border: "none",
    paddingTop: "5px",
  }),
  singleValue: (old: any) => ({
    ...old,
    color: colors.navigationIconActive,
    fontSize: "25px",
    fontWeight: "600",
    textTransform: "uppercase",
  }),
  indicatorSeparator: () => ({
    display: "none",
  }),
  valueContainer: (old: any) => ({
    ...old,
    paddingRight: 0,
    marginRight: "-5px",
  }),
  dropdownIndicator: (old: any) => ({
    ...old,
    color: colors.navigationIconActive,
  }),
});
