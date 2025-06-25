import { useNavigate } from 'react-router-dom';
import Logo from '../assets/Logo.svg';
import { motion } from 'framer-motion';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './CalendarCustom.css'; // custom styles for neat calendar
import { useState } from 'react';
import dayjs from 'dayjs';

const SideBar = ({ tasks }) => {
  const navigate = useNavigate();
  const [date, setDate] = useState(new Date());

  const taskMap = tasks.reduce((map, task) => {
    const taskDate = new Date(task.Date).toISOString().split('T')[0];
    map[taskDate] = (map[taskDate] || 0) + 1;
    return map;
  }, {});

  const tileContent = ({ date, view }) => {
    if (view === 'month') {
      const key = date.toISOString().split('T')[0];
      const count = taskMap[key];

      if (count) {
        const color =
          count >= 3 ? 'bg-red-500' :
          count === 2 ? 'bg-yellow-400' :
          'bg-green-400';

        return <div className={`w-2 h-2 mt-1 mx-auto rounded-full ${color}`}></div>;
      }
    }
    return null;
  };

  const tileClassName = ({ date, view }) => {
    const key = date.toISOString().split('T')[0];
    if (view === 'month' && taskMap[key]) {
      return 'has-task'; // hook for styling if needed
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
          <a href="#Task" className="hover:bg-blue-700 py-2 px-4 rounded transition">
            📝 Tasks
          </a>
          <button
            onClick={() => navigate("/DashBoard", { state: { tasks } })}
            className="hover:bg-blue-700 py-2 px-4 rounded transition"
          >
            📊 Dashboard
          </button>
          <button className="hover:bg-blue-700 py-2 px-4 rounded transition">
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
          tileContent={tileContent}
          tileClassName={tileClassName}
        />
      </motion.div>
    </motion.div>
  );
};

export default SideBar;
