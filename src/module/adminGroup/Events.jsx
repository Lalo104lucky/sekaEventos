import React, {useState} from 'react'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dropdown } from 'primereact/dropdown';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

function Events() {
    const [selectedStatus, setSelectedStatus] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(null);

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
            title: "Taller de Energías Renovables",
            date: "10 de marzo, 10:00 AM",
            location: "Centro de Convenciones, CDMX",
            category: "Educación",
            status: "Finalizado"
        },
        {
            title: "Expo Tecnología Verde",
            date: "30 de julio, 11:00 AM",
            location: "Expo Center, Monterrey",
            category: "Innovación",
            status: "Próximamente"
        },
        {
            title: "Expo Tecnología Verde",
            date: "30 de julio, 11:00 AM",
            location: "Expo Center, Monterrey",
            category: "Innovación",
            status: "Próximamente"
        },
        {
            title: "Expo Tecnología Verde",
            date: "30 de julio, 11:00 AM",
            location: "Expo Center, Monterrey",
            category: "Innovación",
            status: "Próximamente"
        },
        {
            title: "Expo Tecnología Verde",
            date: "30 de julio, 11:00 AM",
            location: "Expo Center, Monterrey",
            category: "Innovación",
            status: "Finalizado"
        },
        {
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

    // Plantilla del filtro de estado
    const statusFilterTemplate = (options) => {
        return (
            <Dropdown
                value={selectedStatus}
                options={statusOptions}
                onChange={(e) => {
                    setSelectedStatus(e.value);
                    options.filterApplyCallback(e.value);
                }}
                placeholder="Seleccionar Estado"
                className="p-column-filter"
                showClear
            />
        );
    };

    const tipeFilter = (options) => {
        return (
            <Dropdown
                value={selectedCategory}
                options={categoryOptions}
                onChange={(e) => {
                    setSelectedCategory(e.value);
                    options.filterApplyCallback(e.value);
                }}
                placeholder="Seleccionar Categoría"
                className="p-column-filter"
                showClear
            />
        );
    };

    const statusBodyTemplate = (rowData) => {
        let statusClass = '';
        if (rowData.status === 'En Ejecución') statusClass = 'bg-green-600 text-white';
        else if (rowData.status === 'Próximamente') statusClass = 'bg-yellow-300 text-gray-900';
        else if (rowData.status === 'Finalizado') statusClass = 'bg-red-700 text-white';

        return (
            <span className={`px-3 py-1 rounded-full text-sm ${statusClass}`}>
                {rowData.status}
            </span>
        );
    };

    const actionsBodyTemplate = () => {
        return (
            <div className="flex space-x-2">
                <button className="bg-yellow-300 text-white px-3 py-1 rounded hover:bg-yellow-400 transition">
                    <svg className="w-5 h-5 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z" />
                    </svg>

                </button>
                <button className="bg-red-700 text-white px-3 py-1 rounded hover:bg-red-800 transition">
                    <svg className="w-5 h-5 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z" />
                    </svg>
                </button>
            </div>
        );
    };

    return (
        <div className="p-8 font-poppins">
            <div className="grid grid-cols-3 gap-4 mb-6 px-8">
                <div className="bg-green-600 text-white p-4 rounded-lg shadow-md flex flex-col items-center justify-center">
                    <h3 className="text-lg">Eventos en Ejecución</h3>
                    <p className="text-4xl font-bold mt-2">5</p>
                </div>
                <div className="bg-yellow-300 text-black p-4 rounded-lg shadow-md flex flex-col items-center justify-center">
                    <h3 className="text-lg">Eventos Próximos</h3>
                    <p className="text-4xl font-bold mt-2">5</p>
                </div>
                <div className="bg-red-700 text-white p-4 rounded-lg shadow-md flex flex-col items-center justify-center">
                    <h3 className="text-lg">Eventos Finalizados</h3>
                    <p className="text-4xl font-bold mt-2">15</p>
                </div>
            </div>

            <div className="flex justify-between mt-6 mb-4 px-8 py-3">
                <h2 className="font-poppins text-3xl font-semibold">Eventos</h2>
                <button className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-900 transition">
                    <i className="pi pi-plus mr-2"></i> Nuevo Evento
                </button>
            </div>

            <DataTable value={events} className="p-datatable px-8 custom-datatable"
                paginator
                rows={10}
                tableStyle={{ minWidth: '50rem' }}
            >
                <Column field="title" header="Título"  ></Column>
                <Column field="date" header="Fecha y Hora" ></Column>
                <Column field="location" header="Ubicación" ></Column>
                <Column field="category" header="Tipo de Evento" filter  filterElement={tipeFilter} ></Column>
                <Column
                    field="status"
                    header="Estado"
                    body={statusBodyTemplate}
                    filter filterElement={statusFilterTemplate}
                ></Column>
                <Column
                    header="Acciones"
                    body={actionsBodyTemplate}
                ></Column>
            </DataTable>

        </div>
    )
}

export default Events
