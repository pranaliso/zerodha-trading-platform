import React from "react";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";

import "./VerticalGraph.css";


ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);


const options = {

  responsive: true,

  maintainAspectRatio: false,

  plugins: {

    legend: {
      position: "top",
    },

    title: {
      display: true,
      text: "Holdings",
    },

    tooltip: {
      enabled: true,
    },

  },

};



const VerticalGraph = ({ data }) => {

  return (

    <div className="vertical-graph-container">

      <Bar 
        data={data}
        options={options}
      />

    </div>

  );

};


export default VerticalGraph;