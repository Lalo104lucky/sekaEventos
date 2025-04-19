import React, { useEffect, useState } from 'react'
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import TablaEvents from './components/TablaEvents';
import AddEvent from './components/AddEvent';
import { AxiosClient } from '../../config/http-gateway/http-client';
import EditEvent from './components/EditEvent';
import { alertaCargando, alertaError, alertaExito, alertaPregunta } from '../../config/context/alert';

function Events() {
    const [events, setEvents] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [categoryOptions, setCategoryOptions] = useState([]);
    const [showCreateEventModal, setShowCreateEventModal] = useState(false);
    const [showEditEventModal, setShowEditEventModal] = useState(false);
    const [selectedEventId, setSelectedEventId] = useState(null);
    const [showEditStatusModal, setShowEditStatusModal] = useState(false);
    const [selectedEventForStatus, setSelectedEventForStatus] = useState(null);

    const fetchEvents = async () => {
        try {
            const response = await AxiosClient.get("/evento/");
            setEvents(response.data);
        } catch (error) {
            console.error("Error al obtener los eventos:", error);
        }
    }

    const fetchCategoryOptions = async () => {
        try {
            const response = await AxiosClient.get("/tipoevento/");
            const categories = response.data.map((tipo) => ({
                label: tipo.nombre,
                value: tipo.nombre,
            }));
            setCategoryOptions(categories);
        } catch (error) {
            console.error("Error al obtener las categorías:", error);
        }
    };

    const handleDelete = async (eventId) => {
        alertaPregunta(
            "¿Estás seguro?",
            "Esta acción no se puede deshacer. ¿Deseas eliminar este evento?",
            async () => {
                try {
                    alertaCargando("Eliminando evento...", "Espere un momento");

                    await AxiosClient.delete(`/evento/${eventId}`);

                    alertaExito("Éxito", "El evento ha sido eliminado correctamente.");
                    fetchEvents();
                } catch (error) {
                    console.error("Error al eliminar el evento:", error);
                    alertaError("Error", "No se pudo eliminar el evento.");
                }
            }
        );
    };

    useEffect(() => {
        fetchEvents();
        fetchCategoryOptions();
    }, [])


    const statusOptions = [
        { label: 'En Ejecución', value: 'En Ejecución' },
        { label: 'Próximamente', value: 'Próximamente' },
        { label: 'Finalizado', value: 'Finalizado' }
    ];

    return (
        <div className="p-8 font-poppins">
            <div className="grid grid-cols-3 gap-4 mb-6 px-8">
                <div className="bg-custom-green text-white p-4 rounded-lg shadow-md flex flex-col items-center justify-center">
                    <h3 className="text-lg">Eventos en Ejecución</h3>
                    <p className="text-4xl font-bold mt-2">
                        {events.filter(event => event.estatus === 'En Ejecución').length}
                    </p>
                </div>
                <div className="bg-custom-yellow text-black p-4 rounded-lg shadow-md flex flex-col items-center justify-center">
                    <h3 className="text-lg">Eventos Próximos</h3>
                    <p className="text-4xl font-bold mt-2">
                        {events.filter(event => event.estatus === 'Próximamente').length}
                    </p>
                </div>
                <div className="bg-custom-red text-white p-4 rounded-lg shadow-md flex flex-col items-center justify-center">
                    <h3 className="text-lg">Eventos Finalizados</h3>
                    <p className="text-4xl font-bold mt-2">
                        {events.filter(event => event.estatus === 'Finalizado').length}
                    </p>
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
                onEdit={(eventId) => {
                    setSelectedEventId(eventId);
                    setShowEditEventModal(true);
                }}
                onDelete={handleDelete}
                onEditStatus={(eventId, currentStatus) => {
                    setSelectedEventForStatus({ id: eventId, status: currentStatus });
                    setShowEditStatusModal(true);
                }}
            />



            {showCreateEventModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg">
                        <AddEvent onClose={() => {
                            setShowCreateEventModal(false)
                            fetchEvents();
                        }} />
                    </div>
                </div>
            )}

            {showEditEventModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg">
                        <EditEvent
                            eventId={selectedEventId}
                            onClose={() => {
                                setShowEditEventModal(false);
                                fetchEvents();
                            }}
                        />
                    </div>
                </div>
            )}

            {showEditStatusModal && (
                <EditStatus
                    eventId={selectedEventForStatus.id}
                    currentStatus={selectedEventForStatus.status}
                    onClose={() => setShowEditStatusModal(false)}
                    onStatusChange={fetchEvents} 
                />
            )}
        </div>
    )
}

export default Events
