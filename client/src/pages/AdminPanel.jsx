import React from "react";
import MainLayout from "../layouts/MainLayout";
import { Outlet, NavLink } from "react-router-dom";

const AdminPanel = () => {
  return (
    <MainLayout>
      <aside>
        <h2>Admin Panel</h2>
        <nav className="links">
          <NavLink to="/admin/users" />
          Users
        </nav>
      </aside>
    </MainLayout>
  );
};

export default AdminPanel;
