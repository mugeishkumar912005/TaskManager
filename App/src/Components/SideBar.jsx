import { useNavigate } from 'react-router-dom';
import Logo from '../assets/Logo.svg';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useState } from 'react';

const SideBar = ({ tasks }) => {
  const navigate = useNavigate();
  const [date, setDate] = useState(new Date());

  return (
    <div className="flex flex-col justify-between w-64 h-screen bg-blue-500 text-white p-6">
      <div>
        <div className="mb-10">
          <h2 className="text-2xl font-extrabold tracking-wide flex items-center gap-2">
            <img src={Logo} className="w-10 h-10" alt="Logo" />
            TaskApp
          </h2>
        </div>

        <nav className="flex flex-col gap-4 text-left text-lg font-medium">
          <button
            className="hover:bg-blue-700 py-2 px-4 rounded text-left transition"
          >
            📝 Tasks
          </button>
          <button
            onClick={() => navigate("/DashBoard", { state: { tasks } })}
            className="hover:bg-blue-700 py-2 px-4 rounded text-left transition"
          >
            📊 Dashboard
          </button>
          <button
            onClick={() => navigate('/settings')}
            className="hover:bg-blue-700 py-2 px-4 rounded text-left transition"
          >
            📅 Calendar
          </button>
        </nav>
      </div>
      <div className="bg-white p-3 rounded-lg text-black shadow-md">
        <Calendar
          onChange={setDate}
          value={date}
          className="w-full text-sm rounded"
          tileClassName={({ date, view }) =>
            view === 'month' ? 'text-xs' : ''
          }
        />
      </div>
    </div>
  );
};

export default SideBar;
