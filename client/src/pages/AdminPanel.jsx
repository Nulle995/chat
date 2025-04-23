import React from "react";
import MainLayout from "../layouts/MainLayout";
import { Outlet, NavLink } from "react-router-dom";

const AdminPanel = () => {
  return (
    <MainLayout>
      <aside>
        <h2>Admin Panel</h2>
        <nav>
          <NavLink to="/admin/users">Users</NavLink>
        </nav>
      </aside>
      <main>
        <Outlet />
      </main>
    </MainLayout>
  );
};

export default AdminPanel;
