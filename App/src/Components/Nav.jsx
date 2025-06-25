import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import { Typewriter } from "react-simple-typewriter";
import sort from "../assets/sort.png";
import axios from "axios";

const Nav = ({ user, onSearch, setTasks }) => {
  const [sortOpen, setSortOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const toggleSort = () => {
    setSortOpen(!sortOpen);
    setProfileOpen(false);
  };

  const toggleProfile = () => {
    setProfileOpen(!profileOpen);
    setSortOpen(false);
  };

  const profileNav = () => {
    navigate("/settings", { state: { user } });
  };

  const LogOutHandler = () => {
    localStorage.removeItem("token");
    navigate("/Login");
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    onSearch(value);
  };

  const fetchSortedTasks = async (type) => {
    try {
      let url = `http://localhost:5000/api/tasks/${type}`;
      const res = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(res.data.data || []);
      setSortOpen(false);
    } catch (err) {
      console.error(`Failed to fetch ${type} tasks`, err);
    }
  };

  return (
    <nav className="px-6 py-4 bg-white border-b border-gray-200 w-full">
      <div className="flex justify-between items-center gap-4 w-full">
        <div className="text-lg font-semibold text-blue-700 whitespace-nowrap">
          <Typewriter
            words={[`Welcome, ${user?.Name || "User"} 👋`]}
            cursor
            cursorStyle="|"
            typeSpeed={60}
            deleteSpeed={40}
            delaySpeed={3000}
          />
        </div>
        <div className="flex items-center gap-4 ml-auto relative">
          <div className="relative hidden sm:block">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={handleSearch}
              className="pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
          </div>
          <div className="relative">
            <button className="relative cursor-pointer" onClick={toggleSort}>
              <img src={sort} className="w-6 h-6" alt="Toggle Sort" />
            </button>
            {sortOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg z-50">
                <ul className="flex flex-col p-2 text-sm text-gray-700">
                  <li
                    className="hover:bg-gray-100 px-4 py-2 rounded cursor-pointer"
                    onClick={() => fetchSortedTasks("la")}
                  >
                    Lapsed
                  </li>
                  <li
                    className="hover:bg-gray-100 px-4 py-2 rounded cursor-pointer"
                    onClick={() => fetchSortedTasks("cp")}
                  >
                    Completed
                  </li>
                  <li
                    className="hover:bg-gray-100 px-4 py-2 rounded cursor-pointer"
                    onClick={() => fetchSortedTasks("pn")}
                  >
                    Pending
                  </li>
                </ul>
              </div>
            )}
          </div>
          <div className="relative">
            <button
              className="rounded-full overflow-hidden w-10 h-10 border-2 border-gray-300"
              onClick={toggleProfile}
            >
              <img
                src="https://i.pravatar.cc/100"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </button>
            {profileOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50">
                <ul className="flex flex-col p-2 text-sm text-gray-700">
                  <button onClick={profileNav}>
                    <li className="hover:bg-gray-100 px-4 py-2 rounded cursor-pointer">My Profile</li>
                  </button>
                  <button onClick={LogOutHandler}>
                    <li className="hover:bg-gray-100 px-4 py-2 rounded cursor-pointer">Logout</li>
                  </button>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
