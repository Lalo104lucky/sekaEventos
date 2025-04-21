import React, { useState, useContext } from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import Logo from '../../../assets/img/logo.png'; 
import AuthContext from "../../../config/context/auth-context";

const NavbarMember = () => {
  const navigate = useNavigate();
  const { dispatch } = useContext(AuthContext);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  
  
  const handleLogout = () => {
    localStorage.removeItem("user");
    sessionStorage.removeItem("user");
    dispatch({ type: "SIGNOUT" });
    navigate("/");
}
  const user = JSON.parse(localStorage.getItem("user"));
  const nombreUsuario = user?.usuario?.nombre || "Usuario";
  const apellido = user?.usuario?.apellido_p || "";

  return (
    <>
      <nav className="bg_dark_forest border-gray-200 text-white py-4 px-4 flex justify-between items-center fixed w-full top-0 z-20">
        <div className="w-full flex justify-between items-center mx-auto px-4 ">
          <div className="flex items-center space-x-6">
            <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
              <img src={Logo} className="h-8" alt="SEKA Logo" />
              <span className="font-poppins font-bold text-3xl text-white title">SEKA</span>
            </a>

            <div className="flex items-center" id="navbar-menu">
              <ul className="flex flex-row p-0 font-medium">
                <li>
                  <NavLink

                    to="/"
                    className={({ isActive }) =>
                      isActive
                        ? "text-white font-semibold border-b-2 border-white pb-1"
                        : "text-gray-300 hover:text-white transition"
                    }
                    aria-current="page"
                  >
                    Eventos
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>

          <div className="flex items-center space-x-4">
           

            <div className="relative">
              <button
                onClick={toggleDropdown}
                className="text-white font-medium rounded-lg text-sm text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 space-x-2"
                type="button"
                aria-expanded={isDropdownOpen ? "true" : "false"}
                aria-haspopup="true"
              >
                <span className="material-symbols-outlined mr-2">account_circle</span>
                {nombreUsuario} {apellido}
                <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                </svg>
              </button>

              <div
                className={`z-20 ${isDropdownOpen ? 'block' : 'hidden'} absolute right-0 mt-2 bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700`}
              >
                <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                  <li>
                    
                    <NavLink
                      to="/perfil-miembro"
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      Perfil
                    </NavLink>
                  </li>
                  <li >
                  <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Cerrar Sesión
                </button> 
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
