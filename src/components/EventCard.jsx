import React from 'react'

const EventCard = ({ event }) => {
    return (
      <div className={`bg-white p-3 border-3 rounded-sm shadow-lg`}>
        <img className="rounded-lg w-full mb-2" src={event.image} alt={event.title} />
        <h5 className="mb-3 text-xl font-bold tracking-tight text-black">{event.title}</h5>
        <div className="text-black">
          <div className="flex items-center mb-2">
            <i className="fa-solid fa-calendar-day text-lg text-black mr-2"></i>
            <p className="text-xs">{event.date}</p>
          </div>
          <div className="flex items-center mb-2">
            <i className="fa-solid fa-location-dot text-lg text-black mr-2"></i>
            <p className="text-xs">{event.location}</p>
          </div>
          <div className="flex items-center mb-2">
            <i className="fa-solid fa-seedling text-lg text-black mr-2"></i>
            <p className="text-xs">{event.category}</p>
          </div>
          <div className={`mb-2 font-semibold flex items-center text-xs text-${event.status === "En Ejecución" ? "green-700" : "red-700"} `}>
            <div className={` w-4 h-4 mr-2 rounded-full bg-${event.status === "En Ejecución" ? "green-700" : "red-700"} `}
            ></div> {event.status}
          </div>
        </div>
      </div>
    );
}

export default EventCard