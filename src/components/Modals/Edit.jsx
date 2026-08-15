import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const Edit = ({ id, onClose, onSave }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [categoryId, setCategoryId] = useState("");

  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    if (id) {
      const fetchProductDetails = async () => {
        try {
          const res = await fetch(
            `https://backend.magnateshop.uz/api/products/${id}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            },
          );
          const data = await res.json();
          const product = data.data;

          setName(product.name);
          setDescription(product.description);
          setPrice(product.price);
          setCategoryId(product.categoryId);
        } catch (err) {
          toast.error(err);
        }
      };

      fetchProductDetails();
    }
  }, [id, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(
        `https://backend.magnateshop.uz/api/products/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            name,
            description,
            price: Number(price),
            categoryId: Number(categoryId),
          }),
        },
      );

      const data = await res.json();

      toast.success("Product has edited successfully!");

      if (res.ok && onSave) {
        onSave(data.data);
        onClose();
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="bg-slate-800 border border-slate-700 w-full max-w-md p-6 rounded-2xl shadow-2xl text-slate-100">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-emerald-400">Edit Product</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs uppercase text-slate-400 mb-1 font-semibold">
              Product Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-slate-100 text-sm focus:outline-none focus:border-emerald-400"
            />
          </div>

          <div>
            <label className="block text-xs uppercase text-slate-400 mb-1 font-semibold">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              rows="3"
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-slate-100 text-sm focus:outline-none focus:border-emerald-400 resize-none"
            />
          </div>

          <div>
            <label className="block text-xs uppercase text-slate-400 mb-1 font-semibold">
              Price (so'm)
            </label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-slate-100 text-sm focus:outline-none focus:border-emerald-400"
            />
          </div>

          <div>
            <label className="block text-xs uppercase text-slate-400 mb-1 font-semibold">
              Category ID
            </label>
            <input
              type="number"
              min="1"
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              required
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-slate-100 text-sm focus:outline-none focus:border-emerald-400"
            />
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 bg-slate-700 text-slate-300 rounded-xl text-sm font-medium hover:bg-slate-600 transition cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 bg-sky-600 text-white font-semibold rounded-xl text-sm hover:bg-sky-700 transition cursor-pointer"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Edit;
