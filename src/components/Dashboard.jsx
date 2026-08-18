import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [categoryStats, setCategoryStats] = useState([]);
  const [lowStockStats, setLowStockStats] = useState([]);
  const [loading, setLoading] = useState(true);

  // Pagination states
  const [categoryPage, setCategoryPage] = useState(1);
  const categoryPerPage = 4;

  const [lowStockPage, setLowStockPage] = useState(1);
  const lowStockPerPage = 4;

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

  // LowStockStats
  const fetchLowStockStats = () => {
    return fetch("https://backend.magnateshop.uz/api/dashboard/low-stock", {
      headers: { Authorization: `Bearer ${token}` },
    }).then((res) =>
      res.json().then((data) => {
        if (!res.ok) {
          throw new Error(data.message);
        }
        return data.data;
      }),
    );
  };

  useEffect(() => {
    Promise.all([fetchStats(), fetchCategoryStats(), fetchLowStockStats()])
      .then(([statsRes, categoryRes, lowStockRes]) => {
        setStats(statsRes);
        setCategoryStats(categoryRes);
        setLowStockStats(lowStockRes);
      })
      .catch((err) => {
        toast.error(err.message);
      })
      .finally(() => setLoading(false));
  }, []);

  // Category Pagination logic
  const indexOfLastCategory = categoryPage * categoryPerPage;
  const indexOfFirstCategory = indexOfLastCategory - categoryPerPage;
  const currentCategories = categoryStats.slice(
    indexOfFirstCategory,
    indexOfLastCategory,
  );
  const totalCategoryPages = Math.ceil(categoryStats.length / categoryPerPage);

  // LowStock Pagination logic
  const indexOfLastLowStock = lowStockPage * lowStockPerPage;
  const indexOfFirstLowStock = indexOfLastLowStock - lowStockPerPage;
  const currentLowStocks = lowStockStats.slice(
    indexOfFirstLowStock,
    indexOfLastLowStock,
  );
  const totalLowStockPages = Math.ceil(lowStockStats.length / lowStockPerPage);

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
      <div className="flex items-center justify-center p-6 mt-[300px] bg-slate-900">
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

      {/* Category Statistics Table */}
      <h2 className="mb-7 text-lg font-bold text-slate-200 border-l-3 border-sky-700 pl-3">
        Category Statistics
      </h2>
      <div className="bg-slate-800 border border-slate-700 rounded-2xl shadow-xl overflow-hidden mb-4">
        <table className="w-full text-left border-collapse">
          <thead className="bg-slate-900/80 text-emerald-400 border-b border-slate-700">
            <tr className="h-16 text-xs uppercase tracking-wider">
              <th className="px-4 text-center font-semibold">Category</th>
              <th className="px-4 text-center font-semibold">Products</th>
              <th className="px-4 text-center font-semibold">Active</th>
              <th className="px-4 text-center font-semibold">Stock</th>
              <th className="px-4 text-center font-semibold">Total Value</th>
            </tr>
          </thead>
          <tbody>
            {currentCategories.map((category) => (
              <tr
                key={category.id}
                className="hover:bg-slate-700/50 transition-all border-b border-slate-700 last:border-b-0"
              >
                <td className="px-4 py-4 text-sm text-slate-100 text-center font-medium">
                  {category.name}
                </td>
                <td className="px-4 py-4 text-sm text-slate-300 text-center">
                  {category.productsCount}
                </td>
                <td className="px-4 py-4 text-sm text-slate-300 text-center">
                  {category.activeProductsCount}
                </td>
                <td className="px-4 py-4 text-sm text-slate-300 text-center">
                  {category.totalStock}
                </td>
                <td className="px-4 py-4 text-sm text-emerald-400 font-bold text-center">
                  {category.totalValue.toLocaleString()} so'm
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Category Pagination */}
      <div className="flex items-center justify-center gap-2 mb-8">
        <button
          onClick={() => setCategoryPage((prev) => Math.max(prev - 1, 1))}
          disabled={categoryPage === 1}
          className="px-4 py-2 bg-slate-800 border border-slate-700 text-slate-300 rounded-xl disabled:opacity-40 hover:bg-slate-700 transition cursor-pointer text-sm font-medium"
        >
          Prev
        </button>
        <span className="px-4 py-2 text-slate-300 text-sm font-medium">
          Page {categoryPage} of {totalCategoryPages || 1}
        </span>
        <button
          onClick={() =>
            setCategoryPage((prev) => Math.min(prev + 1, totalCategoryPages))
          }
          disabled={categoryPage === totalCategoryPages}
          className="px-4 py-2 bg-slate-800 border border-slate-700 text-slate-300 rounded-xl disabled:opacity-40 hover:bg-slate-700 transition cursor-pointer text-sm font-medium"
        >
          Next
        </button>
      </div>

      {/* Low Stock Statistics Table */}
      <h2 className="mb-7 text-lg mt-5 font-bold text-slate-200 border-l-3 border-rose-700 pl-3">
        Low Stock Statistics
      </h2>

      {lowStockStats.length === 0 ? (
        <p className="text-gray-500 mb-8">
          There's no any low-stock products here.
        </p>
      ) : (
        <>
          <div className="bg-slate-800 border border-slate-700 rounded-2xl shadow-xl overflow-hidden mb-4">
            <table className="w-full text-left border-collapse">
              <thead className="bg-slate-900/80 text-emerald-400 border-b border-slate-700">
                <tr className="h-16 text-xs uppercase tracking-wider">
                  <th className="px-4 text-center font-semibold">Name</th>
                  <th className="px-4 text-center font-semibold">Category</th>
                  <th className="px-4 text-center font-semibold">Stock</th>
                  <th className="px-4 text-center font-semibold">Price</th>
                </tr>
              </thead>
              <tbody>
                {currentLowStocks.map((product) => (
                  <tr
                    key={product.id}
                    className="hover:bg-slate-700/50 transition-all border-b border-slate-700 last:border-b-0"
                  >
                    <td className="px-4 py-4 text-sm text-slate-100 text-center font-medium">
                      {product.name}
                    </td>
                    <td className="px-4 py-4 text-sm text-slate-300 text-center">
                      {product.category?.name}
                    </td>
                    <td className="px-4 py-4 text-sm text-slate-300 text-center">
                      {product.stock}
                    </td>
                    <td className="px-4 py-4 text-sm text-emerald-400 font-bold text-center">
                      {product.price.toLocaleString()} so'm
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Low Stock Pagination */}
          <div className="flex items-center justify-center gap-2 mb-8">
            <button
              onClick={() => setLowStockPage((prev) => Math.max(prev - 1, 1))}
              disabled={lowStockPage === 1}
              className="px-4 py-2 bg-slate-800 border border-slate-700 text-slate-300 rounded-xl disabled:opacity-40 hover:bg-slate-700 transition cursor-pointer text-sm font-medium"
            >
              Prev
            </button>
            <span className="px-4 py-2 text-slate-300 text-sm font-medium">
              Page {lowStockPage} of {totalLowStockPages || 1}
            </span>
            <button
              onClick={() =>
                setLowStockPage((prev) =>
                  Math.min(prev + 1, totalLowStockPages),
                )
              }
              disabled={lowStockPage === totalLowStockPages}
              className="px-4 py-2 bg-slate-800 border border-slate-700 text-slate-300 rounded-xl disabled:opacity-40 hover:bg-slate-700 transition cursor-pointer text-sm font-medium"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
