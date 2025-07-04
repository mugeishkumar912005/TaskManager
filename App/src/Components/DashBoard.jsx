import { useLocation, useNavigate } from "react-router-dom";
import { Doughnut, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

ChartJS.register(ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const DashBoard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const tasks = location.state?.tasks || [];

  const now = new Date();
  const completed = tasks.filter((t) => t.status === "Completed").length;
  const missed = tasks.filter((t) => new Date(t.Date) < now && t.status !== "Completed").length;
  const pending = tasks.length - completed - missed;

  const doughnutData = {
    labels: ["Completed", "Missed", "Pending"],
    datasets: [
      {
        label: "Tasks",
        data: [completed, missed, pending],
        backgroundColor: ["#2563eb", "#ef4444", "#facc15"],
        borderWidth: 2,
      },
    ],
  };

  const taskByDay = {};
  tasks.forEach((t) => {
    const day = new Date(t.Date).toLocaleDateString("en-IN", {
      weekday: "short",
      day: "numeric",
      month: "short",
    });
    taskByDay[day] = (taskByDay[day] || 0) + 1;
  });

  const barData = {
    labels: Object.keys(taskByDay),
    datasets: [
      {
        label: "Tasks by Date",
        data: Object.values(taskByDay),
        backgroundColor: "#60a5fa",
        borderRadius: 5,
        barThickness: 40,
      },
    ],
  };

  return (
    <motion.div
      className="min-h-screen w-full bg-gradient-to-br from-blue-50 to-yellow-50 flex flex-col items-center justify-start py-8 px-2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="w-full max-w-6xl flex items-center mb-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-blue-700 font-semibold hover:underline focus:outline-none"
        >
          <ArrowLeft className="h-5 w-5" />
          Back
        </button>
      </div>

      <motion.h2
        className="text-4xl font-extrabold text-blue-900 mb-10 text-center w-full max-w-6xl flex items-center justify-center gap-2"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <span role="img" aria-label="chart">📊</span> Task Analytics Dashboard
      </motion.h2>

      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-10">
        <motion.div
          className="bg-white rounded-3xl shadow-2xl p-10 flex flex-col items-center transition-all duration-300 hover:shadow-3xl"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <h3 className="text-2xl font-bold text-blue-700 mb-6 text-center">Task Status Overview</h3>
          <div className="w-72 h-72 flex items-center justify-center">
            <Doughnut data={doughnutData} />
          </div>
        </motion.div>

        <motion.div
          className="bg-white rounded-3xl shadow-2xl p-10 flex flex-col items-center transition-all duration-300 hover:shadow-3xl"
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <h3 className="text-2xl font-bold text-blue-700 mb-6 text-center">Tasks by Due Date</h3>
          <div className="w-full h-72 flex items-center justify-center">
            <Bar data={barData} />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default DashBoard;
