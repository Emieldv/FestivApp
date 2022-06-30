import { FC } from "react";
import styled from "styled-components";
import { colors, sizes } from "../../lib/constants";
import Select, { StylesConfig } from "react-select";
import { useParams, useNavigate } from "react-router-dom";
import { useSchedule } from "../../lib/hooks/useSchedule";

interface TopNavigationProps {
  title: string;
  url: string;
}

export const TopNavigation: FC<TopNavigationProps> = ({ title, url }) => {
  const navigate = useNavigate();
  const { rawData } = useSchedule();
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
      <Select
        options={options}
        value={value}
        onChange={handleChange}
        styles={selectStyle}
        isSearchable={false}
      />
    </Container>
  );
};

const Container = styled.div`
  height: ${sizes.topNavigationHeight};
  display: flex;
  align-items: center;
  background-color: ${colors.lessDark};
  padding: 0 20px;

  h1 {
    text-transform: uppercase;
    font-size: 25px;
    color: white;
    font-weight: 600;
    margin: 0;
    padding-top: 5px;
  }
`;

const selectStyle: StylesConfig = {
  container: (old) => ({
    ...old,
    zIndex: 200,
  }),
  control: (old) => ({
    ...old,
    backgroundColor: "transparent",
    border: "none",
    paddingTop: "5px",
  }),
  singleValue: (old) => ({
    ...old,
    color: colors.primary,
    fontSize: "25px",
    fontWeight: "600",
    textTransform: "uppercase",
  }),
  indicatorSeparator: () => ({
    display: "none",
  }),
  valueContainer: (old) => ({
    ...old,
    paddingRight: 0,
    marginRight: "-5px",
  }),
  dropdownIndicator: (old) => ({
    ...old,
    color: colors.primary,
  }),
};
