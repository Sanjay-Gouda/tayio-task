import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, Tooltip } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";
import { defaultMarker } from "./default-marker";

// import { useMap } from "react-leaflet/lib/hooks";

interface CovidMapProps {
  countriesData?: CountryData[];
}

interface CountryData {
  country: string;
  countryInfo: {
    lat: number;
    long: number;
  };
  cases: number;
  recovered: number;
  deaths: number;
}
// function MyComponent() {
//   const map = useMap();
//   console.log("map center:", map.getCenter());
//   return null;
// }

const LeafletMap: React.FC<CovidMapProps> = ({ countriesData }) => {
  const [countryData, setCountryData] = useState<any>([]);

  useEffect(() => {
    // Make API request here
    axios
      .get("https://disease.sh/v3/covid-19/countries")
      .then((response) => {
        console.log(response);
        setCountryData(response?.data);
        // setCovidChart({
        //   cases: response.data.cases,
        //   recovered: response.data.recovered,
        //   deaths: response.data.deaths,
        // });
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  // const center = [51.505, -0.09];

  return (
    <MapContainer
      center={[51.505, -0.09]}
      zoom={13}
      scrollWheelZoom={true}
      style={{ width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {countryData?.map((country: any) => (
        <Marker
          key={country.country}
          icon={defaultMarker}
          position={[country.countryInfo.lat, country.countryInfo.long]}
          // position={[51.505, -0.09]}
        >
          <Popup>
            <div>
              <h2>{country.country}</h2>
              <p>Total Cases: {country.cases}</p>
              <p>Recovered: {country.recovered}</p>
              <p>Deaths: {country.deaths}</p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default LeafletMap;
