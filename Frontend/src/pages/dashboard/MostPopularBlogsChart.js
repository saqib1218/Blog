import React, { useRef, useEffect } from "react";
import Chart from "chart.js/auto";

const MostPopularBlogsChart = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");

    new Chart(ctx, {
      type: "bar",
      data: {
        labels: ["React Tips", "CSS Tricks", "JavaScript Basics", "Node.js Guide"],
        datasets: [
          {
            label: "Likes",
            data: [40, 35, 25, 20],
            backgroundColor: "rgba(75, 192, 192, 0.6)",
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: "Most Popular Blogs",
          },
        },
      },
    });
  }, []);

  return <canvas ref={chartRef} />;
};

export default MostPopularBlogsChart;