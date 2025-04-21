import React from "react";
import { useNavigate } from 'react-router-dom';
import Image403 from "../../assets/img/403.png"; 

const Page403 = () => {
    const navigate = useNavigate();

    return (
        <div className="container mx-auto py-10 font-poppins">
            <div className="flex flex-col justify-center items-center h-screen">
                <div className="text-center">
                    <p className="text-9xl text-gray-800">403</p>
                    <img src={Image403} alt="Imagen de error 403" className="mx-auto mb-6 w-64 h-auto" />
                    <p className="text-3xl font-semibold text-gray-800">Acceso prohibido</p>
                    <p className="text-xl mt-2 text-gray-600">
                        No tienes permiso para ver esta página.
                    </p>
                </div>
                <button 
                    onClick={() => navigate('/')} 
                    className="mt-6 bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-900 transition"
                >
                    Volver al Inicio
                </button>
            </div>
        </div>
    );
};

export default Page403;
