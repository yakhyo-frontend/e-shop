import { NavLink, useNavigate } from "react-router-dom";
import { TbLayoutDashboard } from "react-icons/tb";
import { BsBoxSeam } from "react-icons/bs";
import { CgLogOut } from "react-icons/cg";
import { RiAdminFill } from "react-icons/ri";
import { MdOutlineCategory } from "react-icons/md";
import toast from "react-hot-toast";

export const Sidebar = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("accessToken");
    toast.success("LogOut successfully!", {
      position: "top-center",
      duration: 1500,
    });
    setTimeout(() => {
      navigate("/login");
    }, 1500);
  };

  return (
    <aside className="w-[260px] h-screen sticky top-0 bg-slate-900 border-r border-slate-800 p-6 flex flex-col justify-between select-none">
      <div>
        <div className="mb-10 px-2">
          <h1 className="text-2xl font-bold text-emerald-400 tracking-wide">
            Magnate E-Shop
          </h1>
          <p className="text-xs text-slate-400 mt-1 uppercase tracking-wider font-medium">
            Admin Dashboard
          </p>
        </div>

        <nav className="flex flex-col gap-2 font-medium">
          <NavLink
            to="/layout/dashboard"
            end
            className={({ isActive }) =>
              `flex items-center gap-3.5 text-[15px] px-4 py-3 rounded-2xl transition-all  cursor-pointer ${
                isActive
                  ? "bg-emerald-600 text-white shadow-lg shadow-emerald-900 font-semibold"
                  : "text-slate-400 hover:bg-slate-800/80 hover:text-emerald-300"
              }`
            }
          >
            <TbLayoutDashboard size={20} />
            <span>Dashboard</span>
          </NavLink>

          <NavLink
            to="/layout/category"
            end
            className={({ isActive }) =>
              `flex items-center gap-3.5 text-[15px] px-4 py-3 rounded-2xl transition-all cursor-pointer ${
                isActive
                  ? "bg-emerald-600 text-white shadow-lg shadow-emerald-900 font-semibold"
                  : "text-slate-400 hover:bg-slate-800/80 hover:text-emerald-300"
              }`
            }
          >
            <MdOutlineCategory size={20} />
            <span>Category</span>
          </NavLink>

          <NavLink
            to="/layout/products"
            end
            className={({ isActive }) =>
              `flex items-center gap-3.5 text-[15px] px-4 py-3 rounded-2xl transition-all  cursor-pointer ${
                isActive
                  ? "bg-emerald-600 text-white shadow-lg shadow-emerald-900 font-semibold"
                  : "text-slate-400 hover:bg-slate-800  hover:text-emerald-300"
              }`
            }
          >
            <BsBoxSeam size={20} />
            <span>Products</span>
          </NavLink>
        </nav>
      </div>

      <div>
        <div className="w-full h-[50px] mb-3 flex items-center justify-center gap-2.5 bg-slate-900 border border-emerald-900 text-emerald-300 font-medium rounded-2xl text-sm">
          <RiAdminFill size={18} className="text-emerald-400" />
          <h4>Bosh Administrator</h4>
        </div>

        <button
          onClick={logout}
          className="w-full h-[50px] flex items-center justify-center gap-2.5 bg-slate-900 border border-rose-900 text-rose-400 font-medium rounded-2xl hover:bg-rose-900 hover:text-white hover:border-slate-900 transition-all  cursor-pointer text-sm"
        >
          <CgLogOut size={20} />
          <span>LogOut</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
