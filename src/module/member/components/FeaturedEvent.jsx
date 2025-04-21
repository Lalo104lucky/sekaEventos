import React, { useState } from 'react';
import { format } from 'date-fns';
import { AxiosClient } from '../../../config/http-gateway/http-client';
import {
  alertaPregunta,
  alertaCargando,
  alertaExito,
  alertaError
} from '../../../config/context/alert';

const FeaturedEvent = ({ event, idUser, tokenType, token, refreshEvents}) => {
  const [asistenciaConfirmada, setAsistenciaConfirmada] = useState(false);
  const imageUrl = event.imagen
  ? `http://localhost:8080/api/evento/path/${event.imagen}`
  : "https://s1.significados.com/foto/medio-ambiente-og.jpg";

 
  const handleConfirmarAsistencia = () => {
    alertaPregunta(
      "¿Confirmar asistencia?",
      `¿Deseas confirmar tu asistencia al evento "${event.titulo}"?`,
      async () => {
        try {
          alertaCargando("Confirmando asistencia...", "Por favor, espere");
          const response = await AxiosClient.post(
            `evento/${event.id_evento}/confirmarAsistencia/${idUser}`,
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          setAsistenciaConfirmada(true);
          refreshEvents();
          alertaExito("¡Asistencia confirmada!", "Te has registrado correctamente al evento.");
        } catch (error) {
          alertaError("Error", "No se pudo confirmar tu asistencia. Inténtalo de nuevo.");
        }
      }
    );
  };
  

  return (
    <div className="h-96 shadow-sm overflow-hidden relative flex flex-col">
            <img className="w-full h-full object-cover" src={imageUrl} alt={event.titulo} />
            <div className="absolute inset-0 z-10" style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}></div>
            
            <div className="absolute inset-0 flex flex-col justify-between p-4 z-20">
                <div>
                    <h5 className="text-2xl font-bold tracking-tight text-white mb-8 h-24 line-clamp-3">
                        {event.titulo}
                    </h5>
                    <div className="text-xs text-white space-y-2">
                        <div className="flex items-center">
                            <span className="material-symbols-outlined mr-1">event</span> {format(new Date(event.fecha), 'dd/MM/yyyy HH:mm')}
                        </div>
                        <div className="flex items-center">
                            <span className="material-symbols-outlined mr-1">category</span> {event?.tipoEvento?.nombre}
                        </div>
                        <div className="flex items-center">
                            <div className="bg-white w-4 h-4 rounded-full mr-2"></div> {event.estatus}
                        </div>
                    </div>
                </div>
        {event.estatus === "Próximamente" && !asistenciaConfirmada && (
          <button
            type="button"
            onClick={handleConfirmarAsistencia}
            className="w-full text-white font-medium rounded-lg text-sm px-5 py-2.5 bg-green-700 hover:bg-green-800"
          >
            Confirmar Asistencia
          </button>
        )}
      </div>
    </div>
  );
};

export default FeaturedEvent;
