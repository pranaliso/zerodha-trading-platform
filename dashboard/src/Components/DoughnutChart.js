import React, { useMemo } from "react";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Doughnut } from "react-chartjs-2";

import "./DoughnutChart.css";

// ==========================================
// REGISTER CHART.JS COMPONENTS
// ==========================================

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

// ==========================================
// DOUGHNUT CHART
// ==========================================

const DoughnutChart = ({ data }) => {
  // ========================================
  // SAFE DATA
  // ========================================

  const chartData = useMemo(() => {
    const labels = Array.isArray(data?.labels)
      ? data.labels
      : [];

    const values =
      Array.isArray(data?.datasets?.[0]?.data)
        ? data.datasets[0].data
        : [];

    const safeValues = values.map((value) => {
      const number = Number(value);

      return Number.isFinite(number)
        ? number
        : 0;
    });

    return {
      labels,

      datasets: [
        {
          label: "Stocks",

          data: safeValues,

          backgroundColor: [
            "#387ed1",
            "#00b386",
            "#ff9800",
            "#df514c",
            "#9b59b6",
            "#34495e",
            "#16a085",
            "#f1c40f",
            "#e67e22",
            "#8e44ad",
          ],

          borderColor: "#ffffff",

          borderWidth: 3,

          hoverOffset: 10,
        },
      ],
    };
  }, [data]);

  // ========================================
  // NO DATA
  // ========================================

  if (
    chartData.labels.length === 0 ||
    chartData.datasets[0].data.length === 0
  ) {
    return (
      <div className="doughnut-container doughnut-empty">
        <p>No stock data available.</p>
      </div>
    );
  }

  // ========================================
  // CHART OPTIONS
  // ========================================

  const chartOptions = {
    responsive: true,

    maintainAspectRatio: false,

    cutout: "65%",

    plugins: {
      legend: {
        position: "bottom",

        labels: {
          padding: 15,

          boxWidth: 12,

          usePointStyle: true,

          font: {
            size: 12,

            weight: "600",
          },
        },
      },

      tooltip: {
        enabled: true,

        callbacks: {
          label: (context) => {
            const value = Number(
              context.raw
            );

            const safeValue =
              Number.isFinite(value)
                ? value
                : 0;

            return (
              context.label +
              " : ₹" +
              safeValue.toLocaleString("en-IN", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })
            );
          },
        },
      },
    },
  };

  // ========================================
  // RENDER
  // ========================================

  return (
    <div className="doughnut-container">
      <Doughnut
        data={chartData}
        options={chartOptions}
      />
    </div>
  );
};

export default DoughnutChart;