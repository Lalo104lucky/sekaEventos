import React, {useState, useRef, useEffect} from 'react';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import TableEventsAdmin from './components/TablaEventsAdmin';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import {AxiosClient} from '../../config/http-gateway/http-client';
import * as yup from "yup";
import { useFormik, yupToFormErrors } from "formik";
import { alertaExito, alertaError, alertaCargando, alertaPregunta } from '../../config/context/alert';

function EventsAdmin() {
    const [isModalCategoryOpen, setIsModalCategoryOpen] = useState(false);
    const [isModalCategoryEdit, setIsModalCategoryEdit] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [events, setEventos] = useState([]);
    const [category, setCategory] = useState([]);
    let  sliderRef = useRef(null);

    const handleModalCategory = () => {
        setIsModalCategoryOpen(!isModalCategoryOpen);
    }

    const handleModalCategoryEdit = (event) => {
        formikEditTipoEvento.setValues({
            id: event.id_tipoevento,
            nombre: event.nombre,
          });
        setIsModalCategoryEdit(!isModalCategoryEdit);
    }

    const next = () => {
        sliderRef.slickNext();
    };
      
    const previous = () => {
        sliderRef.slickPrev();
    };

    const statusOptions = [
        { label: 'En Ejecución', value: 'En Ejecución' },
        { label: 'Próximamente', value: 'Próximamente' },
        { label: 'Finalizado', value: 'Finalizado' }
    ];

    const formikTipoEvento = useFormik({
        initialValues: {
            nombre: ""
        },
        validationSchema: yup.object().shape({
            nombre: yup.string().required("Campo Obligatorio").max(50, "Máximo 50 caracteres") 
        }),
        onSubmit: async (values) => {
            alertaPregunta(
                "Crear Tipo de Evento",
                `¿Estás seguro de que deseas crear el tipo de evento "${values.nombre}"?`,
                async () => {
                    try {
                        alertaCargando("Cargando", "Guardando los datos");
                        await AxiosClient.post("/tipoevento/", values);
                        alertaExito("Éxito", "Se guardó correctamente el tipo de evento");
                    } catch (error) {
                        alertaError("Error", "Algo salió mal");
                    } finally {
                        handleModalCategory();
                        await getCategories();
                    }
                },
                () => {
                    alertaError("Cancelado", "La creación fue cancelada");
                }
            );
        }
    });
    
    const formikEditTipoEvento = useFormik({
        initialValues: {
            id: "",
            nombre: "",
        },
        validationSchema: yup.object().shape({
            nombre: yup.string().required("Campo Obligatorio")
        }),
        onSubmit: async (values) => {
            alertaPregunta(
                "Actualizar Tipo de Evento",
                `¿Estás seguro de que deseas actualizar el tipo de evento a "${values.nombre}"?`,
                async () => {
                    try {
                        alertaCargando("Cargando", "Guardando los datos");
                        await AxiosClient.put(`/tipoevento/${values.id}`, {
                            id_tipoevento: values.id,
                            nombre: values.nombre
                        });
                        alertaExito("Éxito", "Se actualizó correctamente el tipo de evento");
                    } catch (error) {
                        alertaError("Error", "Algo salió mal");
                    } finally {
                        setIsModalCategoryEdit(false);
                        await getCategories();
                    }
                },
                () => {
                    alertaError("Cancelado", "La actualización fue cancelada");
                }
            );
        }
    });

    const eliminarTipoEvento = (event) => {
        alertaPregunta(
            "Eliminar Tipo de Evento",
            `¿Estás seguro de que deseas eliminar el tipo de evento "${event.nombre}"?`,
            async () => {
                try {
                    alertaCargando("Cargando", "Eliminando el tipo de evento...");
                    await AxiosClient.delete(`/tipoevento/${event.id_tipoevento}`);
                    alertaExito("Éxito", "El tipo de evento se eliminó correctamente");
                    await getCategories();
                } catch (error) {
                    console.error("Error al eliminar el tipo de evento:", error.response || error.message);
                    alertaError("Error", "Algo salió mal al eliminar el tipo de evento");
                }
            },
            () => {
                alertaError("Cancelado", "La eliminación fue cancelada");
            }
        );
    }

    const getEvents = async () => {
        try {
            const response = await AxiosClient.get('/evento/');
            setEventos(response.data);
        } catch (error) {
            console.error('Error fetching events:', error);
        }
    }

    const getCategories = async () => {
        try{
            const response = await AxiosClient.get('/tipoevento/');
            const categories = response.data.map((tipo) => ({
                id_tipoevento: tipo.id_tipoevento,
                nombre: tipo.nombre,
                label: tipo.nombre,
                value: tipo.nombre,
            }));
            console.log(categories)
            setCategory(categories);
        }catch(error){
            console.error('Error fetching events:', error);
        }
    }

    useEffect(() => {
        getEvents();
        getCategories();
    }, [])


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
                <p className="text-4xl font-bold mt-2">
                    {events.filter(event => event.estatus === "En Ejecución").length}
                </p>
            </div>
            <div className="bg-custom-yellow text-black p-4 rounded-lg shadow-md flex flex-col items-center justify-center">
                <h3 className="text-lg">Eventos Próximos</h3>
                <p className="text-4xl font-bold mt-2">
                    {events.filter(event => event.estatus === "Próximamente").length}
                </p>
            </div>
            <div className="bg-custom-red text-white p-4 rounded-lg shadow-md flex flex-col items-center justify-center">
                <h3 className="text-lg">Eventos Finalizados</h3>
                <p className="text-4xl font-bold mt-2">
                    {events.filter(event => event.estatus === "Finalizado").length}
                </p>
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
        {
            category.length > 0 ? (
                <>
                    <Slider ref={slider => {
                sliderRef = slider;
            }} {...carouselSettings}>
            {category.map((event, index) => (
                <div key={index} className="p-2">
                    <div className='bg-white text-black p-4 rounded-lg shadow-md flex justify-between w-full'>
                        <span className="material-symbols-outlined">psychiatry</span>
                        <p className='text-base font-semibold text-center truncate mx-2'>{event.label}</p>
                        <div className="flex items-center justify-center space-x-2">
                            <button 
                                className="bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500 transition"
                                onClick={()=>handleModalCategoryEdit(event)}
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
                            <button 
                                className="bg-red-700 px-3 py-1 rounded hover:bg-red-800 transition"
                                onClick={()=> eliminarTipoEvento(event)}
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
                                        d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"
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
                </>
            ) : (
                <div className="flex justify-center items-center h-32">
                    <p className="text-black-500">No hay tipos de eventos disponibles</p>
                </div>
            )
        }
        <div className='flex justify-between mt-6 mb-4 px-8 py-3'>
            <h2 className='text-2xl font-bold'>Eventos</h2>
        </div>
        <TableEventsAdmin
            events={events}
            statusOptions={statusOptions}
            category={category}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            selectedStatus={selectedStatus}
            setSelectedStatus={setSelectedStatus}
        />
        {
            isModalCategoryOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center" 
                style={{
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                }}>
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                        <h2 className="text-xl font-bold mb-4">Crear Nuevo Tipo de Evento</h2>
                        <form noValidate onSubmit={formikTipoEvento.handleSubmit}> 
                        <input
                            type="text"
                            id="nombre"
                            name="nombre"
                            className="w-full p-2 border border-gray-300 rounded mb-4"
                            placeholder="Nombre del evento"
                            value={formikTipoEvento.values.nombre}
                            onChange={formikTipoEvento.handleChange}
                            onBlur={formikTipoEvento.handleBlur}
                            autoComplete='nombre'
                            required
                        />
                        {formikTipoEvento.touched.nombre && formikTipoEvento.errors.nombre && (
                            <div className="text-red-600 text-sm">{formikTipoEvento.errors.usuario}</div>
                        )}
                        <div className="flex justify-between">
                        <button
                            className="text-black px-4 py-2 rounded hover:bg-gray-400 transition"
                            onClick={()=> formikTipoEvento.resetForm()}
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
                            type='submit'
                            className="bg-custom-green text-white text-center px-4 py-2 rounded hover:bg-green-600 transition"
                            disabled={!formikTipoEvento.isValid}
                        >
                            Guardar
                        </button>
                        </div>
                        </form>
                    </div>
                </div>
            )
        }
        {
            isModalCategoryEdit && (
                <div className="fixed inset-0 z-50 flex items-center justify-center" 
                    style={
                        {backgroundColor: "rgba(0, 0, 0, 0.5)",}
                    }>
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96" >
                        <h2 className="text-xl font-bold mb-4">Actualizar Nuevo Tipo de Evento</h2>
                        <form noValidate onSubmit={formikEditTipoEvento.handleSubmit}>
                        <input
                        type="text"
                        id="nombre"
                        name="nombre"
                        className="w-full p-2 border border-gray-300 rounded mb-4"
                        placeholder="Nombre del evento"
                        value={formikEditTipoEvento.values.nombre}
                        onChange={formikEditTipoEvento.handleChange}
                        onBlur={formikEditTipoEvento.handleBlur}
                        autoComplete="nombre"
                        required
                        />
                        <div className="flex justify-between">
                        <button
                            className="text-black px-4 py-2 rounded hover:bg-gray-400 transition"
                            onClick={() => formikEditTipoEvento.resetForm()}
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
                            type='submit'
                            disabled={!formikEditTipoEvento.isValid}
                        >
                            Guardar
                        </button>
                        </div>
                        </form>
                    </div>
                </div>
            )
        }
    </div>
  );
}

export default EventsAdmin;