import React from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "../components/Sidebar";

const Layout = () => {
  return (
    <div className="flex bg-slate-900 animate-in fade-in zoom-in-110 duration-500">
      <Sidebar />
      <main className="flex-1 min-h-screen bg-slate-900 text-slate-100">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
