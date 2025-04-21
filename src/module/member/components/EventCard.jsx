import React, { useState } from 'react';
import { format } from 'date-fns';
import { AxiosClient } from '../../../config/http-gateway/http-client';
import {
  alertaPregunta,
  alertaCargando,
  alertaExito,
  alertaError
} from '../../../config/context/alert';

const EventCard = ({ event, idUser, tokenType, token , refreshEvents}) => {

  const imageUrl = event.imagen
  ? `http://localhost:8080/api/evento/path/${event.imagen}`
  : "https://pensamientoamplio.net/wp-content/uploads/naturaleza-y-medio-ambiente-9.jpg";
   const [asistenciaConfirmada, setAsistenciaConfirmada] = useState(true); 

  const handleCancelarAsistencia = () => {
    alertaPregunta(
      "¿Cancelar asistencia?",
      `¿Deseas cancelar tu asistencia al evento "${event.titulo}"?`,
      async () => {
        try {
          alertaCargando("Cancelando asistencia...", "Por favor, espere");
          const response = await AxiosClient.post(`evento/${event.id_evento}/cancelarAsistencia/${idUser}`);
          refreshEvents();
          alertaExito("¡Asistencia cancelada!", "Se ha cancelado tu asistencia al evento.");
          setAsistenciaConfirmada(false);
        } catch (error) {
          console.error("Error al cancelar asistencia:", error);
          alertaError("Error", "No se pudo cancelar tu asistencia. Inténtalo de nuevo.");
        }
      }
    );
  };

  // 🎨 Determinar colores según estatus
  const getEstatusColor = (estatus) => {
    switch (estatus) {
      case "En Ejecución":
        return { text: "text-green-700", bg: "bg-green-700" };
      case "Finalizado":
        return { text: "text-red-700", bg: "bg-red-700" };
      case "Próximamente":
      default:
        return { text: "text-yellow-600", bg: "bg-yellow-600" };
    }
  };

  const estatusColor = getEstatusColor(event.estatus);

  return (
    <div className="bg-white p-3 border-3 rounded-sm shadow-lg flex flex-col justify-between h-full">
      <div>
      <img className="rounded-lg w-[100%] h-[40px] mb-2" src={imageUrl} alt={event.titulo} />

      <h5 className="text-xl font-bold tracking-tight text-black mb-4">{event.titulo}</h5>
      </div>

      <div className="text-black space-y-4 mt-auto">
        <div className="flex items-center">
          <i className="fa-solid fa-calendar-day text-lg text-black mr-2"></i>
          <p className="text-xs">{format(new Date(event.fecha), 'dd/MM/yyyy HH:mm')}</p>
        </div>
        <div className="flex items-center">
          <i className="fa-solid fa-seedling text-lg text-black mr-2"></i>
          <p className="text-xs">{event?.tipoEvento?.nombre}</p>
        </div>
        <div className={`font-semibold flex items-center text-xs ${estatusColor.text}`}>
          <div className={`w-4 h-4 mr-2 rounded-full ${estatusColor.bg}`}></div>
          {event.estatus}
        </div>

        {event.estatus === "Próximamente" && asistenciaConfirmada && (
          <button
            onClick={handleCancelarAsistencia}
            className="w-full mt-2 text-white font-medium rounded-lg text-sm px-5 py-2.5 bg-red-600 hover:bg-red-700"
          >
            Cancelar Asistencia
          </button>
        )}
      </div>
    </div>
  );
};

export default EventCard;