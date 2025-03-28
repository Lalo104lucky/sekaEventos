import React, { useState } from 'react';
import Logo from '../assets/img/Logo.png';

const NavbarMember = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <>
      <nav className="bg_dark_forest border-gray-200">
        <div className="max-w-screen-xl flex justify-between items-center mx-auto p-4">
          {/* Logo y menú agrupados al inicio */}
          <div className="flex items-center space-x-6">
            {/* Logo */}
            <a href="#" className="flex items-center space-x-3 rtl:space-x-reverse">
              <img src={Logo} className="h-8" alt="SEKA Logo" />
              <span className="font-poppins font-bold text-3xl text-white title">SEKA</span>
            </a>

            {/* Menú ul junto al logo */}
            <div className="flex items-center" id="navbar-menu">
              <ul className="flex flex-row p-0 font-medium">
                <li>
                  <a href="#" className="block py-2 px-3 text-xl text-white rounded-sm md:text-white font-semibold md:p-0" aria-current="page">Eventos</a>
                </li>
              </ul>
            </div>
          </div>

          {/* Buscador y dropdown al final */}
          <div className="flex items-center space-x-4">
            {/* Buscador */}
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                </svg>
              </div>
              <input type="text" id="search-navbar" className="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500" placeholder="Buscar" />
            </div>

            {/* Dropdown de perfil */}
            <div className="relative">
              <button
                onClick={toggleDropdown}
                className="text-white  font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                type="button"
                aria-expanded={isDropdownOpen ? "true" : "false"}
                aria-haspopup="true"
              ><span className="material-symbols-outlined mr-2">account_circle</span>
                Nombre del usuario
                <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                </svg>
              </button>

              <div
                className={`z-10 ${isDropdownOpen ? 'block' : 'hidden'} absolute right-0 mt-2 bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700`}
              >
                <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                  <li>
                    <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Perfil</a>
                  </li>
                  <li>
                    <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Cerrar Sesión</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavbarMember;