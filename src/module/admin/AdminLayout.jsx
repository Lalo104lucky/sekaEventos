import React from "react";
import NavbarAdmin from "./components/NavbarAdmin";
import { Outlet } from "react-router-dom";

function AdminLayout({ setLoading }) {
  return (
    <>
      <NavbarAdmin setLoading={setLoading}/>
      <main className="pt-16">
        <section>
          <Outlet/>
        </section>
      </main>
    </>
  );
}

export default AdminLayout;