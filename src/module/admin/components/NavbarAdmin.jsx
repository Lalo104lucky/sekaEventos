import React, { useEffect, useContext, useState, useRef } from 'react'
import { NavLink, useNavigate } from "react-router-dom";
import Logo from '../../../assets/img/Logo.png';
import AuthContext from "../../../config/context/auth-context";
import ProfileModal from './ProfileModalAdmin';

const NavbarAdmin = ({ setLoading }) => {
  const navigate = useNavigate();
  const { dispatch } = useContext(AuthContext);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const dropdownRef = useRef(null);

  const handleNavigation = (path) => {
    setBitacora([]);
    navigate(path);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  }

  const handleLogout = async () => {
    setLoading(true);
    setTimeout(() => {
      localStorage.removeItem("user");
      sessionStorage.removeItem("user");
      dispatch({ type: "SIGNOUT" });
      navigate("/");
      setIsDropdownOpen(false);
      setShowProfileModal(false);
      
      setLoading(false);
  }, 500);
  }

  const getUserFromLocalStorage = () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      return user || null;
    } catch (error) {
      return null;
    }
  };

  const handleOpenProfileModal = () => {
    setShowProfileModal(true);
    setIsDropdownOpen(false);
  }

  const handleCloseProfileModal = () => {
    setShowProfileModal(false);
  }


  const user = getUserFromLocalStorage();

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
    <>
      <nav className="bg_dark_forest border-gray-200 text-white py-4 px-6 flex justify-between items-center fixed w-full top-0 z-10">
        <div className="flex items-center space-x-3">
          <NavLink to="/" className="flex items-center space-x-3" onClick={() => handleNavigation("/")}>
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
              onClick={() => handleNavigation("/")}
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
              onClick={() => handleNavigation("/grupos")}
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
              onClick={() => handleNavigation("/admingroups")}
              className={({ isActive }) =>
                isActive
                  ? "text-white font-semibold border-b-2 border-white pb-1"
                  : "text-gray-300 hover:text-white transition"
              }
            >
              Administradores
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/bitacora"
              onClick={() => handleNavigation("/bitacora")}
              className={({ isActive }) =>
                isActive
                  ? "text-white font-semibold border-b-2 border-white pb-1"
                  : "text-gray-300 hover:text-white transition"
              }
            >
              Bitácora
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
            <span>{user.usuario.nombre} {user.usuario.apellido_p}</span>
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
            className={`z-20 ${isDropdownOpen ? "block" : "hidden"
              } absolute right-0 mt-2 bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700`}
          >
            <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
              <li>
                <button
                  onClick={handleOpenProfileModal}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Mi Perfil
                </button>
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
      {showProfileModal && (
        <ProfileModal
          user={user}
          onClose={handleCloseProfileModal}
        />
      )}
    </>
  )
}

export default NavbarAdmin;