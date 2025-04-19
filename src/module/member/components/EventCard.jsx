import React from 'react'
const EventCard = ({ event }) => {
  const imagen = event?.imagen || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtHxnEv6UA56xUq2i0aMNAVibe8zTrCqxorJZEueuHigzTv-VqroUUcLVyjjAd7SSPUNI&usqp=CAU"; 
    return (
      <div className={`bg-white p-3 border-3 rounded-sm shadow-lg`}>
        <img className="rounded-lg w-full mb-2" src={imagen} alt={event.titulo} />
        <h5 className="mb-3 text-xl font-bold tracking-tight text-black">{event.titulo}</h5>
        <div className="text-black">
          <div className="flex items-center mb-2">
            <i className="fa-solid fa-calendar-day text-lg text-black mr-2"></i>
            <p className="text-xs">{event.fecha}</p>
          </div>
          <div className="flex items-center mb-2">
            <i className="fa-solid fa-seedling text-lg text-black mr-2"></i>
            <p className="text-xs">{event?.tipoEvento?.nombre}</p>
          </div>
          <div className={`mb-2 font-semibold flex items-center text-xs text-${event.estatus === "En Ejecución" ? "green-700" : "red-700"} `}>
            <div className={` w-4 h-4 mr-2 rounded-full bg-${event.estatus === "En Ejecución" ? "green-700" : "red-700"} `}
            ></div> {event.estatus}
          </div>
        </div>
      </div>
    );
}

export default EventCard