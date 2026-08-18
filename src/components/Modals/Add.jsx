import { useState } from "react";
import toast from "react-hot-toast";

const Add = ({ onClose, onSave }) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("accessToken");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const res = await fetch("https://backend.magnateshop.uz/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name,
          price: Number(price),
          description,
          categoryId: Number(categoryId),
          image,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message);
        toast.error(data.message);
      }

      toast.success("Product added successfully!");
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
        <h2 className="text-xl font-bold text-emerald-400 mb-4">Add Product</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <div>
            <label className="text-xs uppercase text-slate-400">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full mt-1 px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl focus:outline-none focus:border-emerald-400 text-sm"
              placeholder="Product name..."
            />
          </div>

          <div>
            <label className="text-xs uppercase text-slate-400">
              Price (so'm)
            </label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
              className="w-full mt-1 px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl focus:outline-none focus:border-emerald-400 text-sm"
              placeholder="99000"
            />
          </div>

          <div>
            <label className="text-xs uppercase text-slate-400">
              Category ID
            </label>
            <input
              type="number"
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              required
              className="w-full mt-1 px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl focus:outline-none focus:border-emerald-400 text-sm"
              placeholder="1, 2, 3..."
            />
          </div>

          <div>
            <label className="text-xs uppercase text-slate-400">
              Image URL
            </label>
            <input
              type="url"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              required
              className="w-full mt-1 px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl focus:outline-none focus:border-emerald-400 text-sm"
              placeholder="https://..."
            />
          </div>

          <div>
            <label className="text-xs uppercase text-slate-400">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              rows="3"
              className="w-full mt-1 px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl focus:outline-none focus:border-emerald-400 text-sm resize-none"
              placeholder="Product description..."
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

export default Add;
