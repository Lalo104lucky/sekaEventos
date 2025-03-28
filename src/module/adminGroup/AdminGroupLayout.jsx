import React from "react";
import NavbarAdminGroup from "./components/NavbarAdminGroup";
import { Outlet } from "react-router-dom";

function AdminGroupLayout() {
  
  return (
    <>
      <NavbarAdminGroup />
      <main className="pt-16">
        <section>
          <Outlet />
        </section>
      </main>
    </>
  );
}


export default AdminGroupLayout