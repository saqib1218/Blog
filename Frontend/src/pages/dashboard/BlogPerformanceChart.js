import React, { useRef, useEffect } from "react";
import Chart from "chart.js/auto";

const BlogPerformanceChart = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");

    new Chart(ctx, {
      type: "line",
      data: {
        labels: ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6", "Day 7"],
        datasets: [
          {
            label: "Blogs Published",
            data: [1, 2, 1, 3, 2, 4, 3],
            borderColor: "rgba(75, 192, 192, 1)",
            fill: false,
          },
          {
            label: "Likes Received",
            data: [10, 20, 15, 25, 30, 40, 35],
            borderColor: "rgba(153, 102, 255, 1)",
            fill: false,
          },
          {
            label: "Comments Received",
            data: [5, 10, 8, 12, 15, 20, 18],
            borderColor: "rgba(255, 159, 64, 1)",
            fill: false,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: "Blog Performance Over Time",
          },
        },
      },
    });
  }, []);

  return <canvas ref={chartRef} />;
};

export default BlogPerformanceChart;