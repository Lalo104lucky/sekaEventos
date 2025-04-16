import React from 'react';
import FeaturedEvent from './FeaturedEvent';
import EventCard from './EventCard';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const EventList = ({ events }) => {
    const eventList = [  // Cambié "events" a "eventList"
        {
            id: 1,
            title: "Concierto de Rock",
            date: "2025-04-05",
            location: "Auditorio Nacional, CDMX",
            category: "Concierto",
            status: "Confirmado",
            image: "https://via.placeholder.com/600x400?text=Concierto+de+Rock"
          },
          {
            id: 2,
            title: "Feria de Tecnología",
            date: "2025-05-12",
            location: "Expo Guadalajara, Jalisco",
            category: "Feria",
            status: "Pendiente",
            image: "https://via.placeholder.com/600x400?text=Feria+de+Tecnología"
          },
          {
            id: 3,
            title: "Maratón Internacional",
            date: "2025-06-20",
            location: "Avenida Reforma, CDMX",
            category: "Deportes",
            status: "Confirmado",
            image: "https://via.placeholder.com/600x400?text=Maratón+Internacional"
          },
          {
            id: 4,
            title: "Exposición de Arte Contemporáneo",
            date: "2025-07-10",
            location: "Museo de Arte Moderno, CDMX",
            category: "Arte",
            status: "Confirmado",
            image: "https://via.placeholder.com/600x400?text=Exposición+de+Arte"
          },
          {
            id: 5,
            title: "Conferencia sobre Inteligencia Artificial",
            date: "2025-08-15",
            location: "Centro Banamex, CDMX",
            category: "Conferencia",
            status: "Pendiente",
            image: "https://via.placeholder.com/600x400?text=Conferencia+de+IA"
          }
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
        <div className="p-10 m-4">
            <h2 className="text-2xl font-bold mb-4">Eventos Próximos</h2>
            <Slider {...carouselSettings}>
                {eventList.filter(event => event.status === "Próximamente").map((event, index) => (
                    <div key={index} className="p-2">
                        <FeaturedEvent event={event} />
                    </div>
                ))}
            </Slider>

            <h2 className="text-2xl font-bold mt-8 mb-4">Eventos en Ejecución</h2>
            <div className="grid grid-cols-5 gap-4">
                {eventList.filter(event => event.status === "En Ejecución").map((event, index) => (
                    <EventCard key={index} event={event} />
                ))}
            </div>

            <h2 className="text-2xl font-bold mt-8 mb-4">Eventos Finalizados</h2>
            <div className="grid grid-cols-5 gap-4">
                {eventList.filter(event => event.status === "Finalizado").map((event, index) => (
                    <EventCard key={index} event={event} />
                ))}
            </div>
        </div>
    );
};

export default EventList;
