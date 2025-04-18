import React, { useState } from 'react'
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import TablaEvents from './components/TablaEvents';
import CrearEventoModal from './components/CrearEventoModal';

function Events() {
    const [selectedStatus, setSelectedStatus] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [showCreateEventModal, setShowCreateEventModal] = useState(false);


    const events = [
        {
            id: 1,
            title: "Feria de Innovación Ambiental",
            date: "22 de mayo, 08:00 AM",
            location: "Parque Nacional, México",
            category: "Reforestación",
            status: "Próximamente"
        },
        {
            id: 2,
            title: "Conferencia sobre Cambio Climático",
            date: "15 de junio, 10:00 AM",
            location: "Centro de Convenciones, CDMX",
            category: "Educación",
            status: "Próximamente"
        },
        {
            id: 3,
            title: "Jornada de Limpieza de Playas",
            date: "5 de abril, 09:00 AM",
            location: "Playa del Carmen, México",
            category: "Conservación",
            status: "En Ejecución"
        },
        {
            id: 4,
            title: "Taller de Energías Renovables",
            date: "10 de marzo, 10:00 AM",
            location: "Centro de Convenciones, CDMX",
            category: "Educación",
            status: "Finalizado"
        },
        {
            id: 5,
            title: "Expo Tecnología Verde",
            date: "30 de julio, 11:00 AM",
            location: "Expo Center, Monterrey",
            category: "Innovación",
            status: "Próximamente"
        },
        {
            id: 6,
            title: "Expo Tecnología Verde",
            date: "30 de julio, 11:00 AM",
            location: "Expo Center, Monterrey",
            category: "Innovación",
            status: "Próximamente"
        },
        {
            id: 7,
            title: "Expo Tecnología Verde",
            date: "30 de julio, 11:00 AM",
            location: "Expo Center, Monterrey",
            category: "Innovación",
            status: "Próximamente"
        },
        {
            id: 8,
            title: "Expo Tecnología Verde",
            date: "30 de julio, 11:00 AM",
            location: "Expo Center, Monterrey",
            category: "Innovación",
            status: "Finalizado"
        },
        {
            id: 9,
            title: "Expo Tecnología Verde",
            date: "30 de julio, 11:00 AM",
            location: "Expo Center, Monterrey",
            category: "Innovación",
            status: "En Ejecución"
        },
    ];

    const statusOptions = [
        { label: 'En Ejecución', value: 'En Ejecución' },
        { label: 'Próximamente', value: 'Próximamente' },
        { label: 'Finalizado', value: 'Finalizado' }
    ];

    const categoryOptions = [
        { label: 'Reforestación', value: 'Reforestación' },
        { label: 'Educación', value: 'Educación' },
        { label: 'Conservación', value: 'Conservación' }
    ];

    return (
        <div className="p-8 font-poppins">
            <div className="grid grid-cols-3 gap-4 mb-6 px-8">
                <div className="bg-custom-green text-white p-4 rounded-lg shadow-md flex flex-col items-center justify-center">
                    <h3 className="text-lg">Eventos en Ejecución</h3>
                    <p className="text-4xl font-bold mt-2">5</p>
                </div>
                <div className="bg-custom-yellow text-black p-4 rounded-lg shadow-md flex flex-col items-center justify-center">
                    <h3 className="text-lg">Eventos Próximos</h3>
                    <p className="text-4xl font-bold mt-2">5</p>
                </div>
                <div className="bg-custom-red text-white p-4 rounded-lg shadow-md flex flex-col items-center justify-center">
                    <h3 className="text-lg">Eventos Finalizados</h3>
                    <p className="text-4xl font-bold mt-2">15</p>
                </div>
            </div>

            <div className="flex justify-between mt-6 mb-4 px-8 py-3">
                <h2 className="font-poppins text-3xl font-semibold">Eventos</h2>
                <button
                    onClick={() => setShowCreateEventModal(true)}
                    className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-900 transition">
                    <i className="pi pi-plus mr-2"></i> Nuevo Evento
                </button>
            </div>

            <TablaEvents
                events={events}
                selectedStatus={selectedStatus}
                setSelectedStatus={setSelectedStatus}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                statusOptions={statusOptions}
                categoryOptions={categoryOptions}
            />

            {showCreateEventModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg">
                        <CrearEventoModal onClose={() => setShowCreateEventModal(false)} />
                    </div>
                </div>
            )}
        </div>
    )
}

export default Events
