import React,{ useEffect, useState } from 'react';
import NavbarMember from './components/NavbarMember';
import { Outlet } from 'react-router-dom';
import { alertaError } from '../../config/context/alert';

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
        alertaError("Error", "No se pudo cargar los datos del perfil.");
      }
    }

  }

  useEffect(() => {
    obtenerDatosLocalStorage();
    return () => {
      setPerfilData(null); 
    }
  }, []);

  return (
    <><div className="w-full pt-16 pb-2 mb-[64px]">
      <NavbarMember perfilData={perfilData} />
      <Outlet />
    </div></>
  );
}

export default MemberLayout;
