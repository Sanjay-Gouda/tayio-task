import React, { useState, useEffect } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";

import {
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";
import { useQuery } from "react-query";

Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);
const LineChart = () => {
  const [covidChart, setCovidChart] = useState<any>({
    cases: [],
    recovered: [],
    deaths: [],
  });

  // const { isLoading, data, error } = useQuery("lineChart", () => {
  //   return axios.get(
  //     "https://disease.sh/v3/covid-19/historical/all?lastdays=all"
  //   );
  // });

  useEffect(() => {
    // Make API request here
    axios
      .get("https://disease.sh/v3/covid-19/historical/all?lastdays=all")
      .then((response) => {
        console.log(response);
        setCovidChart({
          cases: response.data.cases,
          recovered: response.data.recovered,
          deaths: response.data.deaths,
        });
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const chartData = {
    labels: Object.keys(covidChart.cases),
    datasets: [
      {
        label: "Cases",
        data: Object.values(covidChart.cases),
        fill: true,
        borderColor: "#30BCC2",
        backgroundColor: "#30bcc27a",
      },
    ],
  };
  const recoveredData = {
    labels: Object.keys(covidChart.recovered),
    datasets: [
      {
        label: "Recovered",
        data: Object.values(covidChart.recovered),
        fill: true,
        borderColor: "green",
        backgroundColor: "rgba(40, 247, 17, 0.5)",
        tension: 0.1,
        borderWidth: 2,
      },
    ],
  };
  const DeathsData = {
    labels: Object.keys(covidChart.deaths),
    datasets: [
      {
        label: "Deaths",
        data: Object.values(covidChart.deaths),
        fill: true,
        borderColor: "#CC1034",
        backgroundColor: "rgba(204, 16, 52, 0.5)",
        tension: 0.1,
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: false,
        text: "Chart.js Line Chart",
      },
    },
  };

  return (
    <div className="w-full ">
      <div className="w-1/2">
        <Line data={chartData} options={options} />
      </div>
      <div className="w-full flex">
        <div className="w-1/2">
          <Line
            data={recoveredData}
            options={options}
            style={{ width: "20%" }}
          />
        </div>
        <div className="w-1/2">
          <Line data={DeathsData} options={options} />
        </div>
      </div>
    </div>
  );
};

export default LineChart;
