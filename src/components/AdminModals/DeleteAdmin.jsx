import React from "react";
import toast from "react-hot-toast";

const DeleteAdmin = ({ id, onClose, onSave }) => {
  const token = localStorage.getItem("accessToken");

  const handleDelete = async (e) => {
    e.preventDefault();

    try {
      await fetch(`https://backend.magnateshop.uz/api/admins/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success("Admin deleted successfully!");

      if (onSave) onSave(id);
      onClose();
    } catch (err) {
      toast.error(err);
    }
  };

  return (
    <div className="fixed z-50 flex items-center justify-center inset-0 bg-black/60 animate-in fade-in zoom-in-95 duration-500">
      <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 w-[400px] shadow-2xl">
        <h2 className="text-xl font-bold text-white mb-2">Confirm Delete</h2>
        <p className="text-slate-400 mb-6">
          Are you sure you want to delete this admin? This action cannot be
          undone!
        </p>
        <div className="flex gap-3 justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-slate-200 rounded-xl transition cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleDelete}
            className="px-4 py-2 bg-rose-900 hover:bg-rose-800 text-white rounded-xl transition cursor-pointer"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteAdmin;
