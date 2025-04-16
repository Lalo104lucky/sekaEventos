import React from 'react';

const FeaturedEvent = ({ event }) => {
    return (
        <div className="h-96 shadow-sm overflow-hidden relative flex flex-col">
            <img className="w-full h-full object-cover" src={event.image} alt={event.title} />
            <div className="absolute inset-0 z-40" style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}></div>
            <div className="absolute inset-0 z-40 bg-black bg-opacity-50"></div>

            <div className="absolute inset-0 flex flex-col justify-between p-4 z-50">
                <div>
                    <h5 className="text-2xl font-bold tracking-tight text-white mb-4">{event.title}</h5>
                    <div className="text-xs text-white space-y-2">
                        <div className="flex items-center">
                            <span className="material-symbols-outlined mr-1">event</span> {event.date}
                        </div>
                        <div className="flex items-center">
                            <span className="material-symbols-outlined mr-1">location_on</span> {event.location}
                        </div>
                        <div className="flex items-center">
                            <span className="material-symbols-outlined mr-1">category</span> {event.category}
                        </div>
                        <div className="flex items-center">
                            <div className="bg-white w-4 h-4 rounded-full mr-2"></div> {event.status}
                        </div>
                    </div>
                </div>

                <button type="button" className="w-full text-white bg-green-700 hover:bg-green-800 font-medium rounded-lg text-sm px-5 py-2.5">
                    Confirmar Asistencia
                </button>
            </div>
        </div>
    );
};

export default FeaturedEvent;
