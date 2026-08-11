import { useEffect, useState } from "react";
import axios from "axios";
import { BsBoxSeam, BsCurrencyDollar } from "react-icons/bs";
import { BiCategoryAlt } from "react-icons/bi";
import { GrProductHunt } from "react-icons/gr";
import { BiSolidCategory } from "react-icons/bi";
import { FaSortAmountUpAlt } from "react-icons/fa";

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    axios
      .get("https://backend.magnateshop.uz/api/dashboard/stats", {
        Athorization: `Bearer ${token}`,
      })
      .then((res) => {
        setStats(data.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-6 mt-[300px]">
        <div className="size-[80px] border-4 border-slate-700 border-t-emerald-400 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="p-8 bg-slate-900 min-h-screen text-slate-100">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-emerald-400">Dashboard</h1>
        <p className="text-slate-400 mt-1 text-sm">
          You're Welcome! Here's Dashboard's statistics.
        </p>
      </div>

      <div className="flex flex-wrap gap-6 relative">
        <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 shadow-xl w-[260px]">
          <p className="text-xs text-slate-400 uppercase font-medium">
            Total Products
          </p>
          <span className="absolute right-[760px] top-[30px] p-3 border border-emerald-500 rounded-2xl flex items-center justify-center w-[50px] h-[50px] shadow-xl">
            <GrProductHunt size={40} className=" text-emerald-600" />
          </span>
          <h3 className="text-2xl font-bold text-slate-100 mt-2">100</h3>
        </div>

        <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 shadow-xl w-[260px]">
          <p className="text-xs text-slate-400 uppercase font-medium">
            Categories
          </p>
          <span className="absolute right-[470px] top-[30px] p-3 border border-emerald-500 rounded-2xl flex items-center justify-center w-[50px] h-[50px] shadow-xl">
            <BiSolidCategory size={40} className="text-emerald-600" />
          </span>
          <h3 className="text-2xl font-bold text-slate-100 mt-2">8</h3>
        </div>

        <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 shadow-xl w-[260px]">
          <p className="text-xs text-slate-400 uppercase font-medium">
            Total Amount
          </p>
          <span className="absolute right-[180px] top-[30px] p-3 border border-emerald-500 rounded-2xl flex items-center justify-center w-[50px] h-[50px] shadow-xl">
            <FaSortAmountUpAlt size={40} className="text-emerald-600" />
          </span>
          <h3 className="text-2xl font-bold text-slate-100 mt-2">$987.654</h3>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
