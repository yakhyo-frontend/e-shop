import { useState, useEffect } from "react";
import toast from "react-hot-toast";

const AddAdmin = ({ onClose, onSave }) => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("accessToken");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("https://backend.magnateshop.uz/api/admins", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          login,
          password,
          fullName,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message);
      }

      toast.success("Admin added successfully!");
      if (onSave) onSave(data.data);
      onClose();
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center fixed bg-black/60 z-50 inset-0 p-4 animate-in fade-in zoom-in-95 duration-500">
      <div className="bg-slate-800 border border-slate-700 p-6 w-[450px] rounded-2xl shadow-2xl text-slate-100">
        <h2 className="text-xl font-bold text-emerald-400 mb-4">Add Admin</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <div>
            <label className="text-xs uppercase text-slate-400">Login</label>
            <input
              type="text"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
              required
              className="w-full mt-1 px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl focus:outline-none focus:border-emerald-400 text-sm"
              placeholder="Admin login..."
            />
          </div>

          <div>
            <label className="text-xs uppercase text-slate-400">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full mt-1 px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl focus:outline-none focus:border-emerald-400 text-sm"
              placeholder="The password must be at least 6 characters long."
            />
          </div>

          <div>
            <label className="text-xs uppercase text-slate-400">
              Full Name
            </label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              className="w-full mt-1 px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl focus:outline-none focus:border-emerald-400 text-sm"
              placeholder="Admin full name..."
            />
          </div>

          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 bg-slate-700 text-slate-300 rounded-xl hover:bg-slate-600 transition text-sm font-medium cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2 bg-emerald-500 text-slate-950 font-bold rounded-xl hover:bg-emerald-400 transition text-sm cursor-pointer disabled:opacity-50"
            >
              {loading ? "Adding..." : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddAdmin;
