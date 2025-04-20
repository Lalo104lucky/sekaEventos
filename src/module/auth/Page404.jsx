import React from "react";
import { useNavigate } from 'react-router-dom';
import Image404 from "../../assets/img/404.png"; // Asegúrate de tener esta imagen

const Page404 = () => {
    const navigate = useNavigate();

    return (
        <div className="container mx-auto py-10 font-poppins">
            <div className="flex flex-col justify-center items-center h-screen">
                <div className="text-center">
                    <p className="text-9xl text-gray-800">404</p>
                    <img src={Image404} alt="Imagen de error 404" className="mx-auto mb-6 w-64 h-auto" />
                    <p className="text-3xl font-semibold text-gray-800">Página no encontrada</p>
                    <p className="text-xl mt-2 text-gray-600">
                        La ruta que estás buscando no existe o fue eliminada.
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

export default Page404;
