import React, { useRef, useEffect } from "react";
import Chart from "chart.js/auto";

const FriendActivityChart = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");

    new Chart(ctx, {
      type: "line",
      data: {
        labels: ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6", "Day 7"],
        datasets: [
          {
            label: "Friend Requests Sent",
            data: [2, 3, 1, 4, 2, 5, 3],
            borderColor: "rgba(75, 192, 192, 1)",
            fill: false,
          },
          {
            label: "Friend Requests Accepted",
            data: [1, 2, 1, 3, 2, 4, 3],
            borderColor: "rgba(153, 102, 255, 1)",
            fill: false,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: "Friend Activity",
          },
        },
      },
    });
  }, []);

  return <canvas ref={chartRef} />;
};

export default FriendActivityChart;