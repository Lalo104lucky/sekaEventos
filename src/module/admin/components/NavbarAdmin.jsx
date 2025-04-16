import React, { useEffect, useContext, useState, useRef } from 'react'
import { NavLink, useNavigate } from "react-router-dom";
import Logo from '../../../assets/img/Logo.png';
import AuthContext from "../../../config/context/auth-context";

const NavbarAdmin = () => {
    const navigate = useNavigate();
    const { dispatch } = useContext(AuthContext);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    }

    const handleLogout = () => {
        localStorage.removeItem("user");
        sessionStorage.removeItem("user");
        dispatch({ type: "SIGNOUT" });
        navigate("/");
    }

    useEffect(() => {
        const handleClickOutside = (event) => {
          if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsDropdownOpen(false);
          }
        };
    
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
          document.removeEventListener("mousedown", handleClickOutside);
        };
      }, []);

  return (
      <nav className="bg_dark_forest border-gray-200 text-white py-4 px-6 flex justify-between items-center fixed w-full top-0 z-10">
        <div className="flex items-center space-x-3">
          <NavLink to="/" className="flex items-center space-x-3">
            <img
              src={Logo}
              alt="Logo"
              className="h-8"
            />
            <span className="font-poppins font-bold text-3xl text-white title">SEKA</span>
          </NavLink>
        </div>
  
        <ul className="flex space-x-8 text-lg">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "text-white font-semibold border-b-2 border-white pb-1"
                  : "text-gray-300 hover:text-white transition"
              }
            >
              Eventos
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/grupos"
              className={({ isActive }) =>
                isActive
                  ? "text-white font-semibold border-b-2 border-white pb-1"
                  : "text-gray-300 hover:text-white transition"
              }
            >
              Grupos
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admingroups"
              className={({ isActive }) =>
                isActive
                  ? "text-white font-semibold border-b-2 border-white pb-1"
                  : "text-gray-300 hover:text-white transition"
              }
            >
              Administradores
            </NavLink>
          </li>
        </ul>
  
        <div className="relative" ref={dropdownRef}>
          <button
            className="text-white font-medium rounded-lg text-sm text-center inline-flex items-center transition space-x-2"
            onClick={toggleDropdown}
            aria-expanded={isDropdownOpen ? "true" : "false"}
          >
            <svg
              className="w-7 h-7 text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0 0a8.949 8.949 0 0 0 4.951-1.488A3.987 3.987 0 0 0 13 16h-2a3.987 3.987 0 0 0-3.951 3.512A8.948 8.948 0 0 0 12 21Zm3-11a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
            </svg>
            <span>Nombre del usuario</span>
            <svg
              className="w-4 h-4 text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 4 4 4-4"
              />
            </svg>
          </button>
  
          <div
            className={`z-20 ${
              isDropdownOpen ? "block" : "hidden"
            } absolute right-0 mt-2 bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700`}
          >
            <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
              <li>
                <NavLink
                  to="/cuenta"
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Mi Perfil
                </NavLink>
              </li>
              <li>
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
      </nav>
  )
}

export default NavbarAdmin;