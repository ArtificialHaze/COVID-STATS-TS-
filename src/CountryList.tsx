import styled from "@emotion/styled";
import type { Country } from "./utils";
import CountryItem from "./CountryItem";

interface Props {
  countries: Country[];
  countryClicked: (country: Country) => void;
}

const ListWrapper = styled.ul`
  padding: 0;
  display: flex;
  flex-wrap: wrap;
`;

const CountryList: React.FunctionComponent<Props> = ({
  countries,
  countryClicked,
}) => {
  return (
    <ListWrapper>
      {countries.map((country) => (
        <CountryItem
          key={country.ID}
          country={country}
          countryClicked={countryClicked}
        />
      ))}
    </ListWrapper>
  );
};

export default CountryList;
