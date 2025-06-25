import Nav from "./Nav";
import SideBar from "./SideBar";
import Add from "../assets/Add.png";
import Doodle from "../assets/doodle.svg";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Main = () => {
  const [open, setOpen] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [editTaskId, setEditTaskId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
  });

  const location = useLocation();
  const navigate = useNavigate();
  const user = location.state?.user;
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!user) navigate("/login");
    else fetchTasks();
  }, [user]);

  useEffect(() => {
    const filtered = tasks.filter((task) =>
      task.Title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredTasks(filtered);
  }, [tasks, searchTerm]);

  const fetchTasks = async () => {
    try {
      const res = await axios.get("https://taskmanager-server-r9mj.onrender.com/api/tasks/all", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = Array.isArray(res.data.data) ? res.data.data : [];
      setTasks(data);
      setFilteredTasks(data);
    } catch (err) {
      console.error("Error fetching tasks", err);
      setTasks([]);
      setFilteredTasks([]);
    }
  };

  const handleSearch = (query) => setSearchTerm(query);
  const AddToggle = () => {
    setOpen(!open);
    setEditTaskId(null);
    setFormData({ title: "", description: "", date: "", time: "" });
  };
  const toggleSidebar = () => setShowSidebar(!showSidebar);
  const closeModal = () => setSelectedTask(null);
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddTask = async () => {
    const combinedDateTime = new Date(`${formData.date}T${formData.time}`);
    const formattedData = {
      Title: formData.title,
      Discription: formData.description,
      Date: combinedDateTime,
    };

    try {
      if (editTaskId) {
        await axios.put(
          `https://taskmanager-server-r9mj.onrender.com/api/tasks/update/${editTaskId}`,
          formattedData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        toast.success("Task Updated Successfully!");
      } else {
        await axios.post("https://taskmanager-server-r9mj.onrender.com/api/tasks/add", formattedData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success("Task Added Successfully!");
      }
      fetchTasks();
      setOpen(false);
      setEditTaskId(null);
      setFormData({ title: "", description: "", date: "", time: "" });
    } catch (err) {
      console.error("Error adding/updating task", err.response?.data || err.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://taskmanager-server-r9mj.onrender.com/api/tasks/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchTasks();
    } catch (err) {
      console.error("Error deleting task", err);
    }
  };

  const handleUpdate = async (task) => {
    try {
      await axios.put(
        `https://taskmanager-server-r9mj.onrender.com/api/tasks/update/${task._id}`,
        { status: "Completed" },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchTasks();
    } catch (err) {
      console.error("Error updating task", err);
    }
  };

  const handleEdit = (task) => {
    const taskDate = new Date(task.Date);
    setFormData({
      title: task.Title,
      description: task.Discription,
      date: taskDate.toISOString().split("T")[0],
      time: taskDate.toTimeString().slice(0, 5),
    });
    setEditTaskId(task._id);
    setOpen(true);
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  const getStatusColor = (task) => {
    const now = new Date();
    const due = new Date(task.Date);
    if (task.status === "Completed") return "bg-green-100 text-green-700 border-green-400";
    if (due < now) return "bg-red-100 text-red-700 border-red-400";
    return "bg-yellow-100 text-yellow-700 border-yellow-400";
  };

  const getPriorityLevel = (task) => {
    const text = `${task.Title} ${task.Discription}`.toLowerCase();

    const highKeywords = ["education", "study", "work", "exam", "job", "career"];
    const mediumKeywords = ["shopping", "exercise", "cleaning", "call", "project"];
    const lowKeywords = ["movie", "movies", "play", "beach", "game", "music"];

    if (highKeywords.some((word) => text.includes(word))) return "high";
    if (mediumKeywords.some((word) => text.includes(word))) return "medium";
    if (lowKeywords.some((word) => text.includes(word))) return "low";
    return "medium";
  };

  return (
    <div className="flex h-screen w-full overflow-hidden relative bg-white font-sans">
      <div className={`fixed top-0 left-0 h-full w-64 bg-blue-900 text-white z-50 transform transition-transform duration-300 ease-in-out ${showSidebar ? "translate-x-0" : "-translate-x-full"} sm:translate-x-0 sm:static sm:block`}>
        <SideBar navigate={navigate} tasks={filteredTasks} />
      </div>

      <button className="sm:hidden absolute top-4 left-4 z-50 bg-white p-2 rounded-md" onClick={toggleSidebar}>
        ☰
      </button>

      <div className="flex-1 flex flex-col">
        <Nav user={user} setTasks={setTasks} onSearch={handleSearch} />
        <div className="flex-1 p-2 bg-gray-100 overflow-y-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
          {filteredTasks.length === 0 ? (
            <div className="w-full flex flex-col items-center justify-center py-16 col-span-full">
              <img src={Doodle} alt="No Tasks" className="w-52 opacity-80 mb-3" />
              <p className="text-gray-400 text-lg">No tasks found</p>
            </div>
          ) : (
            filteredTasks.map((task, i) => {
              const dueDate = new Date(task.Date);
              const isLapsed = dueDate < new Date();
              const priority = getPriorityLevel(task);
              const priorityStyles = {
                high: "bg-red-100 text-red-700 border-red-400",
                medium: "bg-yellow-100 text-yellow-700 border-yellow-300",
                low: "bg-green-100 text-green-700 border-green-300",
              };

              return (
                <div
                  key={i}
                  className={`bg-white rounded-xl p-3 border-l-4 transition duration-200 flex flex-col justify-between 
                    ${task.status === "Completed" ? "border-green-500" : isLapsed ? "border-red-500" : "border-yellow-500"}`}
                  onClick={() => setSelectedTask(task)}
                >
                  <div className="mb-2">
                    <h3 className="text-md font-semibold text-gray-800 truncate">{task.Title}</h3>
                    <p className="text-sm text-gray-600 mt-1 line-clamp-2">{task.Discription}</p>
                    <div className="text-xs text-gray-400 mt-1">{formatDate(task.Date)}</div>
                  </div>

                  <div className="flex justify-between items-center mt-2">
                    <div className="flex flex-wrap gap-1 text-[10px] font-medium">
                      <span className="bg-blue-100 text-blue-600 px-2 py-0.5 rounded">#auto</span>
                      <span className="bg-purple-100 text-purple-600 px-2 py-0.5 rounded">#{priority}</span>
                    </div>
                    <div className={`text-[10px] px-2 py-0.5 rounded border ${priorityStyles[priority]}`}>
                      Priority: {priority.charAt(0).toUpperCase() + priority.slice(1)}
                    </div>
                  </div>

                  <div className="flex justify-end gap-2 text-xs font-medium mt-3">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEdit(task);
                      }}
                      className="text-yellow-500 hover:underline"
                    >
                      ✎ Edit
                    </button>
                    {task.status !== "Completed" && !isLapsed && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleUpdate(task);
                        }}
                        className="text-blue-600 hover:underline"
                      >
                        ✓ Done
                      </button>
                    )}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(task._id);
                      }}
                      className="text-red-500 hover:underline"
                    >
                      🗑
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      <button
        onClick={AddToggle}
        className="fixed bottom-6 right-6 w-16 h-16 rounded-full shadow-md flex items-center justify-center hover:shadow-lg transition z-40 bg-white"
      >
        <img src={Add} alt="Add Task" className="w-8 h-8" />
      </button>

      {open && (
        <div className="fixed bottom-24 right-6 w-[90%] sm:w-80 bg-white rounded-lg shadow-lg p-6 z-50">
          <h2 className="text-lg font-bold mb-4">{editTaskId ? "Edit Task" : "Add New Task"}</h2>
          <div className="flex flex-col gap-3">
            <input type="text" name="title" value={formData.title} onChange={handleInputChange} placeholder="Title" className="px-3 py-2 border border-gray-300 rounded" />
            <input type="text" name="description" value={formData.description} onChange={handleInputChange} placeholder="Description" className="px-3 py-2 border border-gray-300 rounded" />
            <input type="date" name="date" value={formData.date} onChange={handleInputChange} className="px-3 py-2 border border-gray-300 rounded" />
            <input type="time" name="time" value={formData.time} onChange={handleInputChange} className="px-3 py-2 border border-gray-300 rounded" />
            <button onClick={handleAddTask} className="text-white bg-blue-600 py-2 px-4 rounded hover:bg-blue-700 mt-3">
              {editTaskId ? "Update Task" : "Add Task"}
            </button>
          </div>
        </div>
      )}

      {selectedTask && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white w-[90%] sm:w-[400px] rounded-lg p-6 relative">
            <h3 className="text-lg font-semibold mb-2">{selectedTask.Title}</h3>
            <p className="text-sm text-gray-700 whitespace-pre-wrap">{selectedTask.Discription}</p>
            <div className="text-xs text-gray-500 mt-2">Due: {formatDate(selectedTask.Date)}</div>
            <div className={`text-xs mt-1 px-2 py-1 rounded inline-block ${getStatusColor(selectedTask)}`}>
              {selectedTask.status || "Pending"}
            </div>
            <button onClick={closeModal} className="absolute top-2 right-3 text-gray-500 hover:text-black">
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Main;
