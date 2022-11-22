import { Global, css } from "@emotion/react";
import { useEffect, useState } from "react";
import BarChart from "./BarChart";
import CountryList from "./CountryList";
import GlobalInfo from "./GlobalData";
import type { ResponseData, Country } from "./utils";

const App: React.FunctionComponent = () => {
  const [data, setData] = useState<ResponseData | undefined>(undefined);
  const [activeCountries, setActiveCountries] = useState<Country[]>([]);

  const fetchData = async () => {
    const result = await fetch("https://api.covid19api.com/summary");
    const data: ResponseData = await result.json();

    setData(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onCountryClick = (country: Country) => {
    const countryIndex = activeCountries.findIndex(
      (activeCountry) => activeCountry.ID === country.ID
    );

    if (countryIndex > -1) {
      const newActiveCountries = [...activeCountries];
      newActiveCountries.splice(countryIndex, 1);

      setActiveCountries(newActiveCountries);
    } else {
      setActiveCountries([...activeCountries, country]);
    }
  };

  return (
    <div>
      <Global
        styles={css`
          body {
            background-color: #f1f1f1;
            color: #7d7d7d;
          }
        `}
      />

      {data ? (
        <>
          <GlobalInfo
            newConfirmed={data?.Global.NewConfirmed}
            newDeaths={data?.Global.NewDeaths}
            newRecovered={data?.Global.NewRecovered}
          />
          <hr />

          {activeCountries.length ? (
            <BarChart countries={activeCountries} />
          ) : null}

          <CountryList
            countries={data.Countries}
            countryClicked={onCountryClick}
          />
        </>
      ) : (
        "Loading..."
      )}
    </div>
  );
};

export default App;
