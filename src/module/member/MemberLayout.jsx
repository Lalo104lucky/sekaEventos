import React,{ useEffect, useState } from 'react';
import NavbarMember from './components/NavbarMember';
import { Outlet } from 'react-router-dom';

const MemberLayout = () => {

  const [perfilData, setPerfilData] = useState(null);

  const obtenerDatosLocalStorage = () => {
    const userData = localStorage.getItem('user');
    if (userData) {
      try {
        const parsedData = JSON.parse(userData);
        const perfilInfo = parsedData || {};
        setPerfilData(perfilInfo);
      } catch (error) {
        console.error("Error al parsear datos del usuario:", error);
      }
    }

  }

  useEffect(() => {
    obtenerDatosLocalStorage();
  }, []);

  return (
    <><div className="w-full pt-24 pb-2 mb-[64px]">
      <NavbarMember perfilData={perfilData} />
      <Outlet />
    </div></>
  );
}

export default MemberLayout;
