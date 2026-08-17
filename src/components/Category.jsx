import React, { useEffect, useState } from "react";
import { FiEdit3 } from "react-icons/fi";
import { MdOutlineDelete } from "react-icons/md";
import CategoryAdd from "./CategoryModals/CategoryAdd";
import CategoryEdit from "./CategoryModals/CategoryEdit";
import CategoryDelete from "./CategoryModals/CategoryDelete";
import toast from "react-hot-toast";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [isCategoryModalAddOpen, setIsCategoryModalAddOpen] = useState(false);

  const [isCategoryModalDeleteOpen, setIsCategoryModalDeleteOpen] =
    useState(false);
  const [categoryDeleteId, setCategoryDeleteId] = useState(null);

  const [isCategoryModalEditOpen, setIsCategoryModalEditOpen] = useState(false);
  const [categoryEditId, setCategoryEditId] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = categories.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(categories.length / itemsPerPage);

  const token = localStorage.getItem("accessToken");

  // Fetch - API
  const getCategories = async () => {
    try {
      const API = `https://backend.magnateshop.uz/api/categories`;
      const res = await fetch(API, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();

      setCategories(data.data.items);
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleStatus = (category) => {
    const token = localStorage.getItem("accessToken");

    fetch(
      `https://backend.magnateshop.uz/api/categories/${category.id}/status`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ isActive: !category.isActive }),
      },
    )
      .then(async (res) => {
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message);
        }

        return data.data;
      })
      .then(() => {
        setCategories((prev) =>
          prev.map((p) =>
            p.id === category.id ? { ...p, isActive: !category.isActive } : p,
          ),
        );

        toast.success("Status updated!");
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  useEffect(() => {
    getCategories();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-6 mt-[300px]">
        <div className="size-[80px] border-4 border-slate-700 border-t-emerald-400 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-[670px]">
        <h1 className="text-3xl font-medium text-rose-400">
          Some Error Occured!
        </h1>
      </div>
    );
  }

  return (
    <div className="p-8 bg-slate-900 min-h-screen text-slate-100">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-emerald-400">Categories</h1>
          <p className="text-slate-400 mt-1 text-xs uppercase">
            Manage all categories
          </p>
        </div>

        <div>
          <button
            onClick={() => setIsCategoryModalAddOpen(true)}
            className="px-6 py-3 bg-slate-700 border border-slate-600 text-emerald-400 text-sm font-semibold rounded-xl hover:bg-emerald-500 hover:text-slate-950 transition-all shadow-lg cursor-pointer flex items-center justify-center gap-2"
          >
            <span>+ Add category</span>
          </button>
        </div>

        <div className="bg-slate-800 border border-slate-700 rounded-2xl shadow-lg px-6 py-3 text-center">
          <p className="text-xs text-slate-400 uppercase tracking-wider">
            Total Categories
          </p>
          <h2 className="text-2xl font-bold text-emerald-400">
            {categories.length}
          </h2>
        </div>
      </div>

      <div className="bg-slate-800 border border-slate-700 rounded-2xl shadow-xl overflow-hidden mb-6 mt-15">
        <table className="w-full text-left border-collapse">
          <thead className="bg-slate-900/80 text-emerald-400 border-b border-slate-700">
            <tr className="h-16 text-xs uppercase tracking-wider">
              <th className="px-4 text-center font-semibold">#</th>
              <th className="px-4 font-semibold">Name</th>
              <th className="px-4 font-semibold">Description</th>
              <th className="px-4 text-center font-semibold">Status</th>
              <th className="px-4 text-center font-semibold">Total Products</th>
              <th className="px-4 text-center font-semibold">Actions</th>
            </tr>
          </thead>

          <tbody>
            {currentItems.map((item, index) => (
              <tr
                key={item.id}
                className="hover:bg-slate-700/50 transition-all border-b border-slate-700"
              >
                <td className="px-4 py-4 text-center font-medium text-slate-400">
                  {indexOfFirstItem + index + 1}
                </td>

                <td className="px-4 py-4 font-medium text-slate-200 text-sm">
                  {item.name}
                </td>

                <td className="px-4 py-4 text-sm text-slate-400">
                  {item.description}
                </td>

                <td className="px-4 py-4 text-center">
                  <button
                    onClick={() => handleToggleStatus(item)}
                    className={`cursor-pointer inline-flex items-center justify-center text-xs px-3 py-1 rounded-xl border font-medium transition-colors ${
                      item.isActive
                        ? "bg-emerald-600 text-white border-emerald-700 hover:bg-emerald-700"
                        : "bg-rose-600 text-white border-rose-700 hover:bg-rose-700"
                    }`}
                  >
                    {item.isActive ? "Active" : "Inactive"}
                  </button>
                </td>

                <td className="px-4 py-4 text-center">
                  <span className="inline-flex items-center justify-center w-[30px] h-[30px] shadow-lg shadow-slate-800 bg-slate-700 text-white rounded-full">
                    {item.productsCount}
                  </span>
                </td>

                <td className="px-4 py-4 text-center">
                  <div className="flex items-center justify-center gap-1.5">
                    <button
                      onClick={() => {
                        setCategoryEditId(item.id);
                        setIsCategoryModalEditOpen(true);
                      }}
                      className="w-[60px] h-[42px] text-xs flex flex-col items-center justify-center gap-0.5 bg-sky-900 border border-sky-950 text-sky-400 font-medium rounded-xl hover:bg-sky-500 hover:text-white transition-all cursor-pointer"
                    >
                      <FiEdit3 size={14} />
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={() => {
                        setCategoryDeleteId(item.id);
                        setIsCategoryModalDeleteOpen(true);
                      }}
                      className="w-[65px] h-[42px] text-xs flex flex-col items-center justify-center gap-0.5 bg-rose-900 border border-rose-950 text-rose-400 font-medium rounded-xl hover:bg-rose-600 hover:text-white transition-all cursor-pointer"
                    >
                      <MdOutlineDelete size={16} />
                      <span>Delete</span>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-center gap-2">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-slate-800 border border-slate-700 text-slate-300 rounded-xl disabled:opacity-40 hover:bg-slate-700 transition cursor-pointer text-sm font-medium"
        >
          Prev
        </button>

        <span className="px-4 py-2 text-slate-300 text-sm font-medium">
          Page {currentPage} of {totalPages || 1}
        </span>

        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-slate-800 border border-slate-700 text-slate-300 rounded-xl disabled:opacity-40 hover:bg-slate-700 transition cursor-pointer text-sm font-medium"
        >
          Next
        </button>
      </div>

      {isCategoryModalAddOpen && (
        <CategoryAdd
          onClose={() => setIsCategoryModalAddOpen(false)}
          onSave={(newCategory) => {
            setCategories((prev) => [newCategory, ...prev]);
          }}
        />
      )}

      {isCategoryModalDeleteOpen && (
        <CategoryDelete
          id={categoryDeleteId}
          isOpen={isCategoryModalDeleteOpen}
          onClose={() => setIsCategoryModalDeleteOpen(false)}
          onSave={(categoryDeletedId) => {
            setCategories((prev) =>
              prev.filter((item) => item.id !== categoryDeletedId),
            );
          }}
        />
      )}

      {isCategoryModalEditOpen && (
        <CategoryEdit
          id={categoryEditId}
          isOpen={isCategoryModalEditOpen}
          onClose={() => setIsCategoryModalEditOpen(false)}
          onSave={(updatedCategory) => {
            setCategories((prev) =>
              prev.map((item) =>
                item.id === updatedCategory.id ? updatedCategory : item,
              ),
            );
          }}
        />
      )}
    </div>
  );
};

export default Categories;
