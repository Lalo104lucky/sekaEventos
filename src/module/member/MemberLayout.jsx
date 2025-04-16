import React from 'react';
import NavbarMember from './components/NavbarMember';
import FeaturedEvent from './components/FeaturedEvent';
import EventCard from './components/EventCard';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const MemberLayout = () => {
  const events = [
    {
      title: "Feria de Innovación Ambiental",
      date: "22 de mayo, 08:00 AM",
      location: "Parque Nacional, México",
      category: "Reforestación",
      status: "Próximamente",
      image: "https://s1.significados.com/foto/medio-ambiente.jpg?class=article"
    },
    {
      title: "Conferencia sobre Cambio Climático",
      date: "15 de junio, 10:00 AM",
      location: "Centro de Convenciones, CDMX",
      category: "Educación",
      status: "Próximamente",
      image: "https://s1.significados.com/foto/medio-ambiente.jpg?class=article"
    },
    {
      title: "Jornada de Limpieza de Playas",
      date: "5 de abril, 09:00 AM",
      location: "Playa del Carmen, México",
      category: "Conservación",
      status: "En Ejecución",
      image: "https://s1.significados.com/foto/medio-ambiente.jpg?class=article"
    },
    {
      title: "Taller de Energías Renovables",
      date: "10 de marzo, 10:00 AM",
      location: "Centro de Convenciones, CDMX",
      category: "Educación",
      status: "Finalizado",
      image: "https://s1.significados.com/foto/medio-ambiente.jpg?class=article"
    },
    {
      title: "Expo Tecnología Verde",
      date: "30 de julio, 11:00 AM",
      location: "Expo Center, Monterrey",
      category: "Innovación",
      status: "Próximamente",
      image: "https://s1.significados.com/foto/medio-ambiente.jpg?class=article"
    },
    {
      title: "Expo Tecnología Verde",
      date: "30 de julio, 11:00 AM",
      location: "Expo Center, Monterrey",
      category: "Innovación",
      status: "Próximamente",
      image: "https://s1.significados.com/foto/medio-ambiente.jpg?class=article"
    },
    {
      title: "Expo Tecnología Verde",
      date: "30 de julio, 11:00 AM",
      location: "Expo Center, Monterrey",
      category: "Innovación",
      status: "Próximamente",
      image: "https://s1.significados.com/foto/medio-ambiente.jpg?class=article"
    },
  ];

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
      <NavbarMember />
      <div className="p-10 m-4">
        <h2 className="text-2xl font-bold mb-4">Eventos Próximos</h2>
        <Slider {...carouselSettings}>
          {events.filter(event => event.status === "Próximamente").map((event, index) => (
            <div key={index} className="p-2">
              <FeaturedEvent event={event} />
            </div>
          ))}
        </Slider>

        <h2 className="text-2xl font-bold mt-8 mb-4">Eventos en Ejecución</h2>
        <div className="grid grid-cols-5 gap-4">
          {events.filter(event => event.status === "En Ejecución").map((event, index) => (
            <EventCard key={index} event={event} />
          ))}
        </div>

        <h2 className="text-2xl font-bold mt-8 mb-4">Eventos Finalizados</h2>
        <div className="grid grid-cols-5 gap-4">
          {events.filter(event => event.status === "Finalizado").map((event, index) => (
            <EventCard key={index} event={event} />
          ))}
        </div>
      </div>
    </>
  );
}

export default MemberLayout;
