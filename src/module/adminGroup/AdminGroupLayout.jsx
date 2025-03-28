import React, { useContext, useState, useEffect } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import Logo from '../../assets/img/Logo.png';

function AdminGroupLayout() {
return (
    <>
      <nav className="bg_dark_forest border-gray-200 text-white py-4 px-6 flex justify-between items-center fixed w-full top-0 z-10">
        <div className="flex items-center space-x-3">
          <img
            src={Logo}
            alt="Logo"
            className="h-8"
          />
          <span className="font-poppins font-bold text-3xl text-white title">SEKA</span>
        </div>

        <ul className="flex space-x-8 text-lg">
          <li>
            <a
              href="#"
              className="text-white font-semibold border-b-2 border-white pb-1"
            >
              Eventos
            </a>
          </li>
          <li>
            <a
              href="#"
              className="text-gray-300 hover:text-white transition"
            >
              Miembros
            </a>
          </li>
        </ul>

        <div className="flex space-x-6 items-center">
          <button className="text-white hover:text-gray-300 transition">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-4.35-4.35M17 10a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
          <button className="text-white hover:text-gray-300 transition">
            <svg className="w-6 h-6 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0 0a8.949 8.949 0 0 0 4.951-1.488A3.987 3.987 0 0 0 13 16h-2a3.987 3.987 0 0 0-3.951 3.512A8.948 8.948 0 0 0 12 21Zm3-11a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
            </svg>
          </button>
        </div>
      </nav>
      <main className="pt-16">
        <section>
          <Outlet />
        </section>
      </main>
    </>
  );
}


export default AdminGroupLayout