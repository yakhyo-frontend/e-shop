import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [categoryStats, setCategoryStats] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("accessToken");

  // Stats
  const fetchStats = () =>
    fetch("https://backend.magnateshop.uz/api/dashboard/stats", {
      headers: { Authorization: `Bearer ${token}` },
    }).then((res) =>
      res.json().then((data) => {
        if (!res.ok) {
          throw new Error(data.message);
        }
        return data.data;
      }),
    );

  // Category Stats
  const fetchCategoryStats = () =>
    fetch("https://backend.magnateshop.uz/api/dashboard/category-stats", {
      headers: { Authorization: `Bearer ${token}` },
    }).then((res) =>
      res.json().then((data) => {
        if (!res.ok) {
          throw new Error(data.message);
        }
        return data.data;
      }),
    );

  const thClass =
    "border border-slate-700 px-3 py-2 text-center text-sm font-medium text-slate-300";
  const tdClass = "border border-slate-700 px-3 py-2 text-sm text-slate-300";

  useEffect(() => {
    Promise.all([fetchStats(), fetchCategoryStats()])
      .then(([statsRes, categoryRes]) => {
        setStats(statsRes);
        setCategoryStats(categoryRes);
      })
      .catch((err) => {
        toast.error(err.message);
      })
      .finally(() => setLoading(false));
  }, []);

  const StatCard = ({ title, value, color }) => (
    <div
      className={`bg-slate-800 border border-slate-700 rounded-2xl p-6 shadow-xl w-[475px] border-l-3 ${color} hover:border-slate-900 hover:bg-slate-700 transition-all`}
    >
      <p className="text-xs text-slate-400 uppercase font-medium">{title}</p>
      <p className="text-2xl font-bold text-slate-100 mt-2">{value}</p>
    </div>
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center p-6 mt-[300px] bg-slate-900 min-h-screen">
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

      <h2 className="mb-7 text-lg font-bold text-slate-200 border-l-3 border-emerald-700 pl-3">
        Statistics
      </h2>

      <div className="flex flex-wrap gap-5 mb-8">
        <StatCard
          title="Products"
          value={stats.products.total}
          color="border-l-sky-500"
        />
        <StatCard
          title="Categories"
          value={stats.categories.total}
          color="border-l-emerald-500"
        />
        <StatCard
          title="Stock Items"
          value={stats.stock.totalItems}
          color="border-l-yellow-500"
        />
        <StatCard
          title="Stock Value"
          value={`${stats.stock.totalValue.toLocaleString()} so'm`}
          color="border-l-red-500"
        />
      </div>

      <h2 className="mb-7 text-lg font-bold text-slate-200 border-l-3 border-sky-700 pl-3">
        Category Statistics
      </h2>
      <table
        className="w-full border border-slate-700 mb-6 bg-slate-800 rounded-2xl overflow-hidden shadow-lg shadow-slate-800"
        style={{ borderCollapse: "collapse" }}
      >
        <thead>
          <tr className="bg-slate-700">
            <th className={thClass}>Category</th>
            <th className={thClass}>Products</th>
            <th className={thClass}>Active</th>
            <th className={thClass}>Stock</th>
            <th className={thClass}>Total Value</th>
          </tr>
        </thead>
        <tbody>
          {categoryStats.map((category) => (
            <tr key={category.id} className="hover:bg-slate-700/50">
              <td className="border border-slate-700 px-3 py-2 text-sm text-slate-100 text-center">
                {category.name}
              </td>
              <td className={`${tdClass} text-center`}>
                {category.productsCount}
              </td>
              <td className={`${tdClass} text-center`}>
                {category.activeProductsCount}
              </td>
              <td className={`${tdClass} text-center`}>
                {category.totalStock}
              </td>
              <td className={`${tdClass} text-blue-400 text-center`}>
                {category.totalValue.toLocaleString()} so'm
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
