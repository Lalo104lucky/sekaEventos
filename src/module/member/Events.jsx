import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import FeaturedEvent from './components/FeaturedEvent';
import EventCard from './components/EventCard';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { AxiosClient } from '../../config/http-gateway/http-client';

const Events = () => {
  const [events, setEventos] = useState([]);

  const getEvents = async () => {
    try {
      const response = await AxiosClient.get('evento/');
      setEventos(response.data);
      console.log("datos: ", response.data)
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  }
  console.log("datos fuera: ", events)

  useEffect(() => {
    getEvents();
  }, []);


  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
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

  return (
    <>
      <div className="p-10 m-4">
        <h2 className="text-2xl font-bold mb-4">Eventos Próximos</h2>
        <Slider {...carouselSettings}>
          {events.filter(event => event.estatus === "Próximamente").map((event, index) => (
            <div key={index} className="p-2">
              <FeaturedEvent event={event} />
            </div>
          ))}
        </Slider>

        <h2 className="text-2xl font-bold mt-8 mb-4">Eventos en Ejecución</h2>
        <div className="grid grid-cols-5 gap-4">
          {events.filter(event => event.estatus === "En Ejecución").map((event, index) => (
            <EventCard key={index} event={event} />
          ))}
        </div>

        <h2 className="text-2xl font-bold mt-8 mb-4">Eventos Finalizados</h2>
        <div className="grid grid-cols-5 gap-4">
          {events.filter(event => event.estatus === "Finalizado").map((event, index) => (
            <EventCard key={index} event={event} />
          ))}
        </div>
      </div>
    </>
  )
}

export default Events