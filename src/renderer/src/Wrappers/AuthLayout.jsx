import React from "react";
import { Outlet } from "react-router-dom";

function AuthLayout() {
  return (
      <main id="main">
          <Outlet />
      </main>
  )
}

export default AuthLayout;
