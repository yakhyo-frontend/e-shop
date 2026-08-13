import { useEffect, useState } from "react";
import { FiEdit3 } from "react-icons/fi";
import { MdOutlineDelete } from "react-icons/md";
import Add from "./Modals/Add";
import Delete from "./Modals/Delete";
import Edit from "./Modals/Edit";

const Products = () => {
  // States
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [isModalAddOpen, setIsModalAddOpen] = useState(false);

  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const [editId, setEditId] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = products.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(products.length / itemsPerPage);

  const token = localStorage.getItem("accessToken");

  // Fetch - API
  const getProducts = async () => {
    try {
      const API = `https://backend.magnateshop.uz/api/products?page=1&limit=20&isActive=true&inStock=true&sortBy=id&order=ASC`;
      const res = await fetch(API, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();

      setProducts(data.data.items);
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
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
          <h1 className="text-3xl font-bold text-emerald-400">Products</h1>
          <p className="text-slate-400 mt-1 text-xs uppercase">
            Manage all products
          </p>
        </div>

        <div>
          <button
            onClick={() => setIsModalAddOpen(true)}
            className="px-6 py-3 bg-slate-700 border border-slate-600 text-emerald-400 text-sm font-semibold rounded-xl hover:bg-emerald-500 hover:text-slate-950 transition-all shadow-lg cursor-pointer flex items-center justify-center gap-2"
          >
            <span>+ Add Product</span>
          </button>
        </div>

        <div className="bg-slate-800 border border-slate-700 rounded-2xl shadow-lg px-6 py-3 text-center">
          <p className="text-xs text-slate-400 uppercase tracking-wider">
            Total Products
          </p>
          <h2 className="text-2xl font-bold text-emerald-400">
            {products.length}
          </h2>
        </div>
      </div>

      <div className="bg-slate-800 border border-slate-700 rounded-2xl shadow-xl overflow-hidden mb-6">
        <table className="w-full text-left border-collapse">
          <thead className="bg-slate-900/80 text-emerald-400 border-b border-slate-700">
            <tr className="h-16 text-xs uppercase tracking-wider">
              <th className="px-4 text-center font-semibold">#</th>
              <th className="px-4 text-center font-semibold">Image</th>
              <th className="px-4 font-semibold">Name</th>
              <th className="px-4 font-semibold">Description</th>
              <th className="px-4 text-center font-semibold">Status</th>
              <th className="px-4 text-center font-semibold">Price</th>
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

                <td className="px-4 py-4 text-center">
                  <div className="w-[60px] h-[55px] m-auto rounded-xl bg-slate-900 border border-slate-700 flex items-center justify-center p-1">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-[40px] h-[40px] object-contain"
                    />
                  </div>
                </td>

                <td className="px-4 py-4 font-medium text-slate-200 text-sm">
                  {item.name.slice(0, 15)}...
                </td>

                <td className="px-4 py-4 text-sm text-slate-400">
                  {item.description.slice(0, 40)}...
                </td>

                <td className="px-4 py-4 text-center">
                  <span className="inline-flex items-center justify-center bg-emerald-900/60 text-emerald-400 text-xs px-3 py-1 rounded-xl border border-emerald-950 font-medium">
                    {item.isActive ? "Active" : "inActive"}
                  </span>
                </td>

                <td className="px-4 py-4 text-center font-bold text-emerald-400 whitespace-nowrap">
                  {item.price.toLocaleString()} so'm
                </td>

                <td className="px-4 py-4 text-center">
                  <div className="flex items-center justify-center gap-1.5">
                    <button
                      onClick={() => {
                        setEditId(item.id);
                        setIsModalEditOpen(true);
                      }}
                      className="w-[60px] h-[42px] text-xs flex flex-col items-center justify-center gap-0.5 bg-sky-900 border border-sky-950 text-sky-400 font-medium rounded-xl hover:bg-sky-500 hover:text-white transition-all cursor-pointer"
                    >
                      <FiEdit3 size={14} />
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={() => {
                        setDeleteId(item.id);
                        setIsModalDeleteOpen(true);
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

      {isModalAddOpen && (
        <Add
          onClose={() => setIsModalAddOpen(false)}
          onSave={(newProduct) => {
            setProducts((prev) => [newProduct, ...prev]);
          }}
        />
      )}

      {isModalDeleteOpen && (
        <Delete
          id={deleteId}
          isOpen={isModalDeleteOpen}
          onClose={() => setIsModalDeleteOpen(false)}
          onSave={(deletedId) => {
            setProducts((prev) => prev.filter((item) => item.id !== deletedId));
          }}
        />
      )}

      {isModalEditOpen && (
        <Edit
          id={editId}
          isOpen={isModalEditOpen}
          onClose={() => setIsModalEditOpen(false)}
          onSave={(updatedProduct) => {
            setProducts((prev) =>
              prev.map((item) =>
                item.id === updatedProduct.id ? updatedProduct : item,
              ),
            );
          }}
        />
      )}
    </div>
  );
};

export default Products;
