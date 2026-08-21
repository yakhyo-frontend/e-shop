import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FiEdit3 } from "react-icons/fi";
import { MdOutlineDelete } from "react-icons/md";
import AddAdmin from "./AdminModals/AddAdmin";
import EditAdmin from "./AdminModals/EditAdmin";
import DeleteAdmin from "./AdminModals/DeleteAdmin";

const Admin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [adminData, setAdminData] = useState([]);
  const [isModalAddOpen, setIsModalAddOpen] = useState(false);
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);

  const token = localStorage.getItem("accessToken");

  const fetchAdminData = () => {
    fetch(`https://backend.magnateshop.uz/api/admins`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setAdminData(data.data.items);
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  useEffect(() => {
    fetchAdminData();
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
          <h1 className="text-3xl font-bold text-emerald-400">Admins</h1>
          <p className="text-slate-400 mt-1 text-xs uppercase">
            Manage all admins
          </p>
        </div>

        <div>
          <button
            onClick={() => setIsModalAddOpen(true)}
            className="px-6 py-3 bg-slate-700 border border-slate-600 text-emerald-400 text-sm font-semibold rounded-xl hover:bg-emerald-500 hover:text-slate-950 transition-all shadow-lg cursor-pointer flex items-center justify-center gap-2"
          >
            <span>+ Add Admin</span>
          </button>
        </div>
      </div>

      <div className="bg-slate-800 border border-slate-700 rounded-2xl shadow-xl overflow-hidden mb-6">
        <table className="w-full text-left border-collapse">
          <thead className="bg-slate-900/80 text-emerald-400 border-b border-slate-700">
            <tr className="h-16 text-xs uppercase tracking-wider">
              <th className="px-4 text-center font-semibold">#</th>
              <th className="px-4 text-left font-semibold">Full Name</th>
              <th className="px-4 font-semibold">Login</th>
              <th className="px-4 text-center font-semibold">Created at</th>
              <th className="px-4 text-center font-semibold">Updated at</th>
              <th className="px-4 text-center font-semibold">Role</th>
              <th className="px-4 text-center font-semibold">Actions</th>
            </tr>
          </thead>

          <tbody>
            {adminData.map((item, index) => (
              <tr
                key={item.id}
                className="hover:bg-slate-700/50 transition-all border-b border-slate-700"
              >
                <td className="px-4 py-4 text-center font-medium text-slate-400">
                  {index + 1}
                </td>

                <td className="px-4 py-4 font-medium text-slate-200 text-sm">
                  {item.fullName}
                </td>

                <td className="px-4 py-4 text-sm text-slate-400">
                  {item.login}
                </td>

                <td className="px-4 py-4 text-sm text-slate-400">
                  {item.createdAt}
                </td>

                <td className="px-4 py-4 text-sm text-slate-400">
                  {item.updatedAt}
                </td>

                <td className="px-4 py-4 text-sm text-slate-400 text-center">
                  <button
                    className={`inline-flex items-center justify-center text-xs px-3 py-1 rounded-xl border font-medium transition-colors ${
                      item.isSuperAdmin
                        ? "bg-emerald-600 text-white border-emerald-700"
                        : "bg-sky-600 text-white border-sky-700"
                    }`}
                  >
                    {item.isSuperAdmin ? "Super Admin" : "Admin"}
                  </button>
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

      {isModalAddOpen && (
        <AddAdmin
          onClose={() => setIsModalAddOpen(false)}
          onSave={(newAdmin) => {
            setAdminData((prev) => [newAdmin, ...prev]);
          }}
        />
      )}

      {isModalEditOpen && (
        <EditAdmin
          id={editId}
          onClose={() => setIsModalEditOpen(false)}
          onSave={(updatedAdmin) => {
            setAdminData((prev) =>
              prev.map((item) =>
                item.id === updatedAdmin.id ? updatedAdmin : item,
              ),
            );
          }}
        />
      )}

      {isModalDeleteOpen && (
        <DeleteAdmin
          id={deleteId}
          onClose={() => setIsModalDeleteOpen(false)}
          onSave={(deletedId) => {
            setAdminData((prev) =>
              prev.filter((item) => item.id !== deletedId),
            );
          }}
        />
      )}
    </div>
  );
};

export default Admin;
