import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import FeaturedEvent from './components/FeaturedEvent';
import EventCard from './components/EventCard';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { AxiosClient } from '../../config/http-gateway/http-client';

const Events = () => {
  const [perfilData, setPerfilData] = useState(null);

  const obtenerDatosLocalStorage = () => {
    const userData = localStorage.getItem('user');
    if (userData) {
      try {
        const parsedData = JSON.parse(userData);
        setPerfilData(parsedData || {});
      } catch (error) {
        console.error("Error al parsear datos del usuario:", error);
      }
    }
  };

  useEffect(() => {
    obtenerDatosLocalStorage();
    return () => {
      setPerfilData(null); // Limpiar el estado al desmontar el componente
    }
  }, []);

  const idUser  = perfilData?.usuario?.id_usuario || "No hay id";
  const idAdmin = perfilData?.usuario?.grupo?.usuario?.id_usuario || "No hay dato";
  const [events, setEventos] = useState([]);
  const [eventsUser, setEventosUsuarios] = useState([]);


  const getEvents = async () => {
    try {
      const response = await AxiosClient.get('evento/');
      const filteredEvents=response.data.filter(event=>event.usuario.id_usuario===idAdmin)
      setEventos(filteredEvents);
    } catch (error) {
      console.error('Error al obtener eventos generales:', error);
    }
  };
  const getEventsByUser = async () => {
    try {
      const response = await AxiosClient.get(`evento/usuario/${idUser}/eventos`);
      setEventosUsuarios(response.data);
    } catch (error) {
      console.error('Error al obtener eventos del usuario:', error);
    }
  };

  const refreshEvents = async () => {
    await getEvents();
    if (idUser && idUser !== "No hay id") {
      await getEventsByUser();
    }
  };

  useEffect(() => {
    refreshEvents();
  }, [idUser]);

  const ArrowLeft = ({ onClick }) => (
    <button
      onClick={onClick}
      className="absolute z-10 left-2 top-1/2 transform -translate-y-1/2 bg-green-600 text-white w-14 h-14 text-3xl rounded-full shadow-md flex items-center justify-center"
    >
      ‹
    </button>
  );

  const ArrowRight = ({ onClick }) => (
    <button
      onClick={onClick}
      className="absolute z-10 right-2 top-1/2 transform -translate-y-1/2 bg-green-600 text-white w-14 h-14 text-3xl rounded-full shadow-md flex items-center justify-center"
    >
      ›
    </button>
  );

  const carouselSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    nextArrow: <ArrowRight />,
    prevArrow: <ArrowLeft />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        }
      }
    ]
  };

  const sortByFechaDesc = (eventos) => {
    return [...eventos].sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
  };

  const userEventIds = new Set(eventsUser.map(event => event.id_evento));
  const filteredEvents = events.filter(event => !userEventIds.has(event.id_evento));
  const proximosEventos = sortByFechaDesc(filteredEvents).filter(e => e.estatus === "Próximamente");
  const confirmedEvents = sortByFechaDesc(eventsUser).filter(event => event.estatus === "Próximamente");

  return (
    <div className="m-4 p-4">
      <h2 className="text-2xl font-bold mb-4">Eventos Próximos</h2>
      <div className="relative overflow-hidden w-full">
        {proximosEventos.length > 0 ? (
          <Slider {...carouselSettings}>
            {proximosEventos.map((event, index) => (
              <div key={index} className="p-2 ml-4 mr-4">
                <FeaturedEvent
                  event={event}
                  refreshEvents={refreshEvents}
                  idUser={idUser}
                />
              </div>
            ))}
            <div className="p-2">
              <div className="h-full flex items-center justify-center border-2 border-dashed border-green-500 rounded-lg p-4 text-center text-gray-700">
                <p className="text-lg font-medium">Ya has visto todos los eventos disponibles</p>
              </div>
            </div>
          </Slider>
        ) : (
          <p className="text-gray-500">No hay eventos próximos disponibles.</p>
        )}
      </div>

      {confirmedEvents.length > 0 && (
        <>
          <h2 className="text-2xl font-bold mt-8 mb-4">Eventos Confirmados</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {confirmedEvents.map((event, index) => (
              <EventCard
                key={index}
                event={event}
                refreshEvents={refreshEvents}
                idUser={idUser}
              />
            ))}
          </div>
        </>
      )}

      <h2 className="text-2xl font-bold mt-8 mb-4">Eventos en Ejecución</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {sortByFechaDesc(filteredEvents)
          .filter(event => event.estatus === "En Ejecución")
          .map((event, index) => (
            <EventCard
              key={index}
              event={event}
              refreshEvents={refreshEvents}
              idUser={idUser}
            />
          ))}
      </div>

      <h2 className="text-2xl font-bold mt-8 mb-4">Eventos Finalizados</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {sortByFechaDesc(filteredEvents)
          .filter(event => event.estatus === "Finalizado")
          .map((event, index) => (
            <EventCard
              key={index}
              event={event}
              refreshEvents={refreshEvents}
              idUser={idUser}
            />
          ))}
      </div>
    </div>
  );
};

export default Events;
