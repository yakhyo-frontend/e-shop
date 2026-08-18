import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { FaRegUserCircle } from "react-icons/fa";
import { CiLogin } from "react-icons/ci";
import { FiLoader } from "react-icons/fi";

const Login = () => {
  const [formData, setFormData] = useState({
    login: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    axios
      .post(`https://backend.magnateshop.uz/api/auth/login`, formData)
      .then((res) => {
        if (res.data.data.accessToken) {
          localStorage.setItem("accessToken", res.data.data.accessToken);
          toast.success("Logged in successfully!", {
            position: "top-center",
            duration: 1500,
          });
          setTimeout(() => {
            navigate("/layout/dashboard");
          }, 2000);
        }
      })
      .catch((err) => {
        toast.error("Incorrect login or password!", {
          position: "top-center",
          duration: 3000,
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="w-full h-screen bg-slate-950 flex items-center justify-center overflow-hidden animate-in fade-in zoom-in-95 duration-500">
      <Toaster />

      <form
        onSubmit={handleSubmit}
        className="relative bg-white/95 w-[420px] border border-gray-100 p-8 pt-10 shadow-2xl rounded-[30px] transition-all"
      >
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-[55px] h-[55px] bg-emerald-50 text-emerald-600 rounded-2xl mb-4 shadow-md">
            <FaRegUserCircle size={30} />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Welcome Back</h2>
          <p className="text-xs text-gray-400 mt-1">
            Please enter your details to sign in
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <input
              name="login"
              value={formData.login}
              onChange={handleChange}
              type="text"
              placeholder="Login..."
              className="w-full h-[50px] px-4 bg-white/80 border border-gray-200 rounded-2xl text-gray-800 text-sm placeholder-gray-400 outline-none focus:bg-white focus:shadow-md focus:border-emerald-600 transition-all disabled:opacity-50"
            />
          </div>
          <div>
            <input
              name="password"
              value={formData.password}
              onChange={handleChange}
              type="password"
              placeholder="Password..."
              className="w-full h-[50px] px-4 bg-white/80 border border-gray-200 rounded-2xl text-gray-800 text-sm placeholder-gray-400 outline-none focus:bg-white focus:shadow-md focus:border-emerald-600 transition-all disabled:opacity-50"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="mt-6 w-full h-[50px] bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 shadow-xl rounded-2xl text-white text-sm font-medium cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <FiLoader size={18} className="animate-spin" />
              <span>Logging In...</span>
            </>
          ) : (
            <>
              <CiLogin size={18} />
              <span>Log In</span>
            </>
          )}
        </button>

        <div className="mt-6 pt-5 border-t border-gray-200 flex items-center justify-center gap-2 text-xs text-gray-400">
          <FaRegUserCircle size={15} className="text-emerald-600" />
          <span>Using demo credentials system</span>
        </div>
      </form>
    </div>
  );
};

export default Login;
