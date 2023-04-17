import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../Layouts/Sidebar/Sidebar";
import Header from "../Layouts/Header/Header";

function DashboardLayout() {
  return (
      <>
        <div className="flex w-full bg-zinc-50">
          <Sidebar />
          <div className="w-full">
            <Header />
            <main className="px-10 pt-20 pb-14 w-full">
                <Outlet />
            </main>
          </div>
        </div>
      </>
  );
}

export default DashboardLayout;
