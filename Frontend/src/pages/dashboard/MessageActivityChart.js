import React, { useRef, useEffect } from "react";
import Chart from "chart.js/auto";

const MessageActivityChart = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");

    new Chart(ctx, {
      type: "bar",
      data: {
        labels: ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6", "Day 7"],
        datasets: [
          {
            label: "Messages Sent",
            data: [5, 10, 8, 12, 15, 20, 18],
            backgroundColor: "rgba(75, 192, 192, 0.6)",
          },
          {
            label: "Messages Received",
            data: [4, 8, 7, 10, 12, 15, 14],
            backgroundColor: "rgba(153, 102, 255, 0.6)",
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: "Message Activity",
          },
        },
      },
    });
  }, []);

  return <canvas ref={chartRef} />;
};

export default MessageActivityChart;