import { useLocation, useNavigate } from "react-router-dom";
import Nav from "./Nav";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import axios from "axios";

const Settings = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const user = location.state?.user;

  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    Name: user?.Name || "",
    Email: user?.Email || "",
    Bio: user?.Bio || "", 
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      setMessage("");
      await axios.put(
        "https://taskmanager-server-r9mj.onrender.com/api/users/update",
        {
          Name: formData.Name,
          Email: formData.Email,
          Bio: formData.Bio,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMessage("Profile updated successfully");
      setEditing(false);
    } catch (error) {
      setMessage(error.response?.data?.message || "Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-yellow-50 flex flex-col">
      <Nav />
      <div className="flex flex-1 items-center justify-center py-10">
        <div className="relative bg-white shadow-2xl rounded-3xl px-10 py-12 w-full max-w-lg flex flex-col items-center">
          <button
            className="absolute top-6 left-6 text-gray-500 hover:text-blue-700 transition"
            onClick={() => navigate(-1)}
            aria-label="Back"
          >
            <ArrowLeft size={24} />
          </button>
          <div className="flex flex-col items-center mb-6">
            <img
              src="https://i.pravatar.cc/120"
              alt="Profile"
              className="w-28 h-28 rounded-full border-4 border-blue-200 shadow-md object-cover"
            />
            <h2 className="text-2xl font-bold text-blue-900 mt-4">{formData.Name}</h2>
            <p className="text-gray-500 text-sm">{formData.Email}</p>
          </div>
          <div className="w-full mb-6 text-center">
            {editing ? (
              <textarea
                name="Bio"
                value={formData.Bio}
                onChange={handleInputChange}
                placeholder="Add a short bio..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg resize-none"
                rows={2}
              />
            ) : (
              formData.Bio && (
                <p className="text-gray-700 italic">{formData.Bio}</p>
              )
            )}
          </div>
          <div className="w-full space-y-4">
            <div>
              <label className="text-sm text-gray-600 font-medium">Name</label>
              {editing ? (
                <input
                  type="text"
                  name="Name"
                  value={formData.Name}
                  onChange={handleInputChange}
                  className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200"
                />
              ) : (
                <p className="text-lg font-semibold text-gray-800">{formData.Name}</p>
              )}
            </div>
            <div>
              <label className="text-sm text-gray-600 font-medium">Email</label>
              {editing ? (
                <input
                  type="email"
                  name="Email"
                  value={formData.Email}
                  onChange={handleInputChange}
                  className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200"
                />
              ) : (
                <p className="text-lg font-semibold text-gray-800">{formData.Email}</p>
              )}
            </div>
            {editing ? (
              <div className="flex gap-2 mt-4">
                <button
                  onClick={handleSave}
                  disabled={loading}
                  className="bg-blue-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
                >
                  {loading ? "Saving..." : "Save"}
                </button>
                <button
                  onClick={() => setEditing(false)}
                  className="bg-gray-200 text-gray-800 px-5 py-2 rounded-lg font-semibold hover:bg-gray-300 transition"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                onClick={() => setEditing(true)}
                className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg font-semibold hover:bg-blue-600 transition"
              >
                Edit Profile
              </button>
            )}
            {message && (
              <p className={`text-sm mt-3 text-center ${message.includes("success") ? "text-green-600" : "text-red-600"}`}>
                {message}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
