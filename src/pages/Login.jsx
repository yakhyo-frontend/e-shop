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
    <div className="bg-gradient-to-br from-slate-900 to-emerald-900 w-full h-screen p-[100px]">
      <Toaster />
      <form
        onSubmit={handleSubmit}
        className="shadow-2xl bg-white w-[400px] border-[1px] border-gray-300 p-[25px] pb-7 pt-[40px] m-auto mt-[70px] rounded-[30px]"
      >
        <h2 className="text-3xl font-normal text-emerald-700 text-center mb-6">
          Log In to your account
        </h2>

        <div>
          <input
            name="login"
            value={formData.login}
            onChange={handleChange}
            type="text"
            placeholder="Login..."
            className="w-full h-11 shadow-sm px-5.5 bg-gray-50 border border-gray-300 rounded-[20px] text-gray-900 text-sm placeholder-gray-400 outline-none focus:border-emerald-700 focus:placeholder-emerald-700 transition-colors disabled:opacity-50"
          />
        </div>
        <div>
          <input
            name="password"
            value={formData.password}
            onChange={handleChange}
            type="password"
            placeholder="Password..."
            className="mt-[15px] shadow-sm w-full h-11 px-5.5 bg-gray-50 border border-gray-300 rounded-[30px] text-gray-900 text-sm placeholder-gray-400 outline-none focus:border-emerald-700 focus:placeholder-emerald-700 transition-colors disabled:opacity-50"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="mt-[15px] w-full h-11 px-3.5 bg-gradient-to-br from-emerald-900 to-emerald-700 border border-emerald-700 rounded-[30px] text-white text-sm hover:opacity-[0.8] hover:bg-emerald-700 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          {loading ? (
            <div className="text-center items-center justify-center text-sm text-white flex items-center justify-center gap-2">
              <FiLoader size={17} />
              <span>Logging In...</span>
            </div>
          ) : (
            <div className="text-center items-center justify-center text-sm text-white flex items-center justify-center gap-2">
              <CiLogin size={17} />
              <span>Log In</span>
            </div>
          )}
        </button>

        <p className="mt-5 text-center text-xs text-gray-500 flex items-center justify-center gap-1.5">
          <FaRegUserCircle size={15} />
          <span>Using demo credentials</span>
        </p>
      </form>
    </div>
  );
};

export default Login;
