import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
);

function LineChart({ history }) {
  // Xử lý dữ liệu từ history
  const labels = history.map((item) => {
    const date = new Date(item.createdAt);
    return date.toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  });

  const scores = history.map((item) => item.score);

  // Dữ liệu cho biểu đồ
  const data = {
    labels: labels,
    datasets: [
      {
        label: "Điểm số",
        data: scores,
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        tension: 0.4,
        fill: true,
        pointRadius: 6,
        pointHoverRadius: 8,
        pointBackgroundColor: "rgb(75, 192, 192)",
        pointBorderColor: "#fff",
        pointBorderWidth: 2,
      },
    ],
  };

  // Cấu hình cho biểu đồ
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          font: {
            size: 14,
          },
        },
      },
      title: {
        display: true,
        text: "Tiến độ học tập",
        font: {
          size: 18,
          weight: "bold",
        },
      },
      tooltip: {
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        padding: 12,
        callbacks: {
          title: (context) => {
            return `Thời gian: ${context[0].label}`;
          },
          label: (context) => {
            return `Điểm: ${context.parsed.y}/10`;
          },
          afterLabel: (context) => {
            const index = context.dataIndex;
            const examTitle =
              history[index]?.examId?.title || "Không có tiêu đề";
            return `Bài thi: ${examTitle}`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 10,
        ticks: {
          stepSize: 1,
          callback: function (value) {
            return value;
          },
        },
        title: {
          display: true,
          text: "Điểm số",
        },
      },
      x: {
        title: {
          display: true,
          text: "Thời gian",
        },
        ticks: {
          maxRotation: 45,
          minRotation: 45,
        },
      },
    },
  };

  return (
    <div style={{ width: "100%", height: "500px", padding: "20px" }}>
      {history.length === 0 ? (
        <div style={{ textAlign: "center", paddingTop: "100px" }}>
          <p>Chưa có dữ liệu lịch sử thi</p>
        </div>
      ) : (
        <Line data={data} options={options} />
      )}
    </div>
  );
}

export default LineChart;
