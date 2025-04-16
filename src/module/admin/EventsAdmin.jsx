import React, {useState, useRef} from 'react';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import TableEventsAdmin from './components/TablaEventsAdmin';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function EventsAdmin() {
    const [isModalCategoryOpen, setIsModalCategoryOpen] = useState(false);
    const [newEvent, setNewEvent] = useState("");
    const [isModalCategoryEdit, setIsModalCategoryEdit] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(null);
    let  sliderRef = useRef(null);

    const handleModalCategory = () => {
        setIsModalCategoryOpen(!isModalCategoryOpen);
    }

    const handleModalCategoryEdit = () => {
        setIsModalCategoryEdit(!isModalCategoryEdit);
    }

    const next = () => {
        sliderRef.slickNext();
      };
      const previous = () => {
        sliderRef.slickPrev();
      };

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
        }
    ];

    const statusOptions = [
        { label: 'En Ejecución', value: 'En Ejecución' },
        { label: 'Próximamente', value: 'Próximamente' },
        { label: 'Finalizado', value: 'Finalizado' }
    ];

    const categoryOptions = [
        { label: 'Reforestación', value: 'Reforestación' },
        { label: 'Educación', value: 'Educación' },
        { label: 'Conservación', value: 'Conservación' },
        { label: 'Innovación', value: 'Innovación' },
        { label: 'Reciclaje', value: 'Reciclaje' },
        { label: 'Sustentabilidad', value: 'Sustentabilidad' },
        { label: 'Energías Renovables', value: 'Energías Renovables' },
        { label: 'Cambio Climático', value: 'Cambio Climático' },
        { label: 'Desarrollo Sostenible', value: 'Desarrollo Sostenible' },
        { label: 'Biodiversidad', value: 'Biodiversidad' }
    ];

    const carouselSettings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: false,
        responsive: [
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 2,
            },
        },
        {
            breakpoint: 768,
            settings: {
            slidesToShow: 2,
            },
        },
        ],
    };

  return (
    <div className='p-8 font-poppins'>
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
        <div className='flex justify-between mt-6 mb-4 px-8 py-3'>
            <h1 className='text-2xl font-bold'>Tipo de Evento</h1>
            <button 
                className='bg_dark_forest text-white px-4 py-2 rounded-lg hover:bg_dark_forest transition'
                onClick={handleModalCategory}
            >
                Crear Nuevo Tipo de Evento
            </button>
        </div>
        <Slider ref={slider => {
                sliderRef = slider;
            }} {...carouselSettings}>
            {categoryOptions.map((event, index) => (
                <div key={index} className="p-2">
                    <div className='bg-white text-black p-4 rounded-lg shadow-md flex justify-between w-full'>
                        <span className="material-symbols-outlined">psychiatry</span>
                        <p className='text-base font-semibold text-center truncate mx-2'>{event.label}</p>
                        <div className="flex items-center justify-center space-x-2">
                            <button className="bg-red-700 px-3 py-1 rounded hover:bg-red-800 transition">
                                <svg
                                    className="w-5 h-5 text-white"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"
                                    />
                                </svg>
                            </button>
                            <button  className="bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500 transition"
                                onClick={handleModalCategoryEdit}    
                            >
                                <svg
                                    className="w-5 h-5 text-white"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </Slider>
        <div className='flex justify-center mt-6 mb-4 px-8 py-3 space-x-4'>
            <button 
                className="bg_dark_forest text-white rounded-lg hover:bg-green-800 transition flex items-center space-x-2"
                onClick={previous}
            >
                <span className="material-symbols-outlined px-4 py-2 text-white">arrow_back</span>
            </button>
            <button 
                className="bg_dark_forest text-white px-4 py-2 rounded-lg hover:bg-green-800 transition flex items-center space-x-2"
                onClick={next}
            >
                <span className="material-symbols-outlined text-white">arrow_forward</span>
            </button>
        </div>
        <div className='flex justify-between mt-6 mb-4 px-8 py-3'>
            <h2 className='text-2xl font-bold'>Eventos</h2>
        </div>
        <TableEventsAdmin
            events={events}
            statusOptions={statusOptions}
            categoryOptions={categoryOptions}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            selectedStatus={selectedStatus}
            setSelectedStatus={setSelectedStatus}
        />
        {
            isModalCategoryOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                        <h2 className="text-xl font-bold mb-4">Crear Nuevo Tipo de Evento</h2>
                        <input
                        type="text"
                        className="w-full p-2 border border-gray-300 rounded mb-4"
                        placeholder="Nombre del evento"
                        value={newEvent}
                        onChange={(e) => setNewEvent(e.target.value)}
                        />
                        <div className="flex justify-between">
                        <button
                            className="text-black px-4 py-2 rounded hover:bg-gray-400 transition"
                            onClick={() => setNewEvent("")}
                        >
                            Limpiar
                        </button>
                        <button
                            className="text-black px-4 py-2 rounded hover:bg-red-600 transition"
                            onClick={handleModalCategory}
                        >
                            Cancelar
                        </button>
                        <button
                            className="bg-custom-green text-white text-center px-4 py-2 rounded hover:bg-green-600 transition"
                            onClick={()=>console.log("Aqui se crea",)}
                        >
                            Guardar
                        </button>
                        </div>
                    </div>
                </div>
            )
        }
        {
            isModalCategoryEdit && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                        <h2 className="text-xl font-bold mb-4">Actualizar Nuevo Tipo de Evento</h2>
                        <input
                        type="text"
                        className="w-full p-2 border border-gray-300 rounded mb-4"
                        placeholder="Nombre del evento"
                        value={newEvent}
                        onChange={(e) => setNewEvent(e.target.value)}
                        />
                        <div className="flex justify-between">
                        <button
                            className="text-black px-4 py-2 rounded hover:bg-gray-400 transition"
                            onClick={() => setNewEvent("")}
                        >
                            Limpiar
                        </button>
                        <button
                            className="text-black px-4 py-2 rounded hover:bg-red-600 transition"
                            onClick={handleModalCategoryEdit}
                        >
                            Cancelar
                        </button>
                        <button
                            className="bg-custom-green text-white text-center px-4 py-2 rounded hover:bg-green-600 transition"
                            onClick={()=>console.log("Aqui se actualiza")}
                        >
                            Guardar
                        </button>
                        </div>
                    </div>
                </div>
            )
        }
    </div>
  );
}

export default EventsAdmin;