import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import FeaturedEvent from './components/FeaturedEvent';
import EventCard from './components/EventCard';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { AxiosClient } from '../../config/http-gateway/http-client';

const Events = ({ perfilData }) => {
  const idUser = perfilData?.usuario?.id_usuario || "No hay id";
  const token = perfilData?.token || "No hay token";
  const tokenType = perfilData?.tokenType || "No hay tokenType";

  const [events, setEventos] = useState([]);
  const [eventsUser, setEventosUsuarios] = useState([]);

  const getEvents = async () => {
    try {
      const response = await AxiosClient.get('evento/');
      setEventos(response.data);
    } catch (error) {
      console.error('Error al obtener eventos generales:', error);
    }
  };

  const getEventsByUser = async () => {
    try {
      const response = await AxiosClient({
        url: `evento/usuario/${idUser}/eventos`,
        method: "GET",
        headers: {
          Authorization: `${tokenType} ${token}`,
          "Content-Type": "application/json",
        },
      });
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
    infinite: true,
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

  const userEventIds = new Set(eventsUser.map(event => event.id_evento));

  const filteredEvents = events.filter(event => !userEventIds.has(event.id_evento));
  const confirmedEvents = eventsUser.filter(event => event.estatus === "Próximamente");

  return (
    <div className="p-8 font-poppins">
      <h2 className="text-2xl font-bold mb-4 px-8 py-3">Eventos Próximos</h2>
      <div className="relative overflow-hidden w-full px-8">
        {filteredEvents.filter(event => event.estatus === "Próximamente").length > 4 ? (
          <Slider {...carouselSettings}>
            {filteredEvents
              .filter(event => event.estatus === "Próximamente")
              .map((event, index) => (
                <div key={index} className="p-2">
                  <FeaturedEvent
                    event={event}
                    refreshEvents={refreshEvents}
                    idUser={idUser}
                    token={token}
                    tokenType={tokenType}
                  />
                </div>
              ))}
          </Slider>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {filteredEvents
              .filter(event => event.estatus === "Próximamente")
              .map((event, index) => (
                <FeaturedEvent
                  key={index}
                  event={event}
                  refreshEvents={refreshEvents}
                  idUser={idUser}
                  token={token}
                  tokenType={tokenType}
                />
              ))}
          </div>
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
                token={token}
                tokenType={tokenType}
              />
            ))}
          </div>
        </>
      )}

      <h2 className="text-2xl font-bold mt-8 mb-4">Eventos en Ejecución</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {filteredEvents
          .filter(event => event.estatus === "En Ejecución")
          .map((event, index) => (
            <EventCard
              key={index}
              event={event}
              refreshEvents={refreshEvents}
              idUser={idUser}
              token={token}
              tokenType={tokenType}
            />
          ))}
      </div>

      <h2 className="text-2xl font-bold mt-8 mb-4">Eventos Finalizados</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {filteredEvents
          .filter(event => event.estatus === "Finalizado")
          .map((event, index) => (
            <EventCard
              key={index}
              event={event}
              refreshEvents={refreshEvents}
              idUser={idUser}
              token={token}
              tokenType={tokenType}
            />
          ))}
      </div>
    </div>
  );
};

export default Events;
