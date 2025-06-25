import { useNavigate } from 'react-router-dom';
import Logo from '../assets/Logo.svg';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useState } from 'react';
import { motion } from 'framer-motion';
import '../../src/index.css'; 

const SideBar = ({ tasks }) => {
  const navigate = useNavigate();
  const [date, setDate] = useState(new Date());
  const taskDates = tasks.map(task =>
    new Date(task.Date).toDateString()
  );

  const tileClassName = ({ date, view }) => {
    if (view === 'month') {
      return taskDates.includes(date.toDateString()) ? 'highlight-tile' : '';
    }
    return '';
  };

  return (
    <motion.div
      initial={{ x: -80, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="flex flex-col justify-between w-64 h-screen bg-blue-500 text-white p-6"
    >
      <div>
        <div className="mb-10">
          <h2 className="text-2xl font-extrabold tracking-wide flex items-center gap-2">
            <img src={Logo} className="w-10 h-10" alt="Logo" />
            TaskApp
          </h2>
        </div>

        <nav className="flex flex-col gap-4 text-left text-lg font-medium">
          <a href="#Task "className="hover:bg-blue-700 py-2 px-4 rounded transition">
            📝 Tasks
          </a>
          <button
            onClick={() => navigate("/DashBoard", { state: { tasks } })}
            className="hover:bg-blue-700 py-2 px-4 rounded transition"
          >
            📊 Dashboard
          </button>
          <button
            className="hover:bg-blue-700 py-2 px-4 rounded transition"
          >
            📅 Calendar
          </button>
        </nav>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
        className="bg-white p-3 rounded-lg text-black shadow-md"
      >
        <Calendar
          onChange={setDate}
          value={date}
          className="w-full text-sm rounded"
          tileClassName={tileClassName}
        />
      </motion.div>
    </motion.div>
  );
};

export default SideBar;
