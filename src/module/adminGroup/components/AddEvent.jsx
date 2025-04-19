import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { AxiosClient, AxiosFormClient } from "../../../config/http-gateway/http-client";
import { alertaExito, alertaError, alertaCargando, alertaPregunta } from "../../../config/context/alert";

function AddEvent({ onClose }) {
    const [tipoEventos, setTipoEventos] = useState([]);
    const [imagen, setImagen] = useState(null);

    const user = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
        const fetchTipoEventos = async () => {
            try {
                const response = await AxiosClient.get("/tipoevento/");
                setTipoEventos(response.data);
                console.log("Tipos de eventos:", response.data);
            } catch (error) {
                console.error("Error al obtener los tipos de eventos:", error);
            }
        };
        fetchTipoEventos();
    }, []);

    const formik = useFormik({
        initialValues: {
            titulo: "",
            fecha: "",
            id_tipoevento: "",
        },
        validationSchema: yup.object({
            titulo: yup.string().max(100, "No debe exceder los 100 caracteres").required("Campo obligatorio"),
            fecha: yup.date().required("Campo obligatorio"),
            id_tipoevento: yup.string().required("Selecciona un tipo de evento"),
        }),
        onSubmit: async (values) => {
            if (!imagen) {
                alertaError("Falta imagen", "Debes seleccionar una imagen.");
                return;
            }

            alertaPregunta("¿Estás seguro?", "¿Deseas crear el evento?", async () => {
                try {
                    alertaCargando("Creando evento...", "Espere un momento");

                    const formData = {
                        titulo: values.titulo,
                        fecha: values.fecha,
                        estatus: "Próximamente",
                        id_usuario: user.usuario.id_usuario,
                        id_tipoevento: values.id_tipoevento,
                    };
                    console.log("Datos del evento:", formData);

                    const responseEvento = await AxiosClient.post("/evento/", formData);
                    const eventoCreado = responseEvento.message;

                    if (!eventoCreado?.id_evento) {
                        throw new Error("No se obtuvo el ID del evento");
                    }

                    const formImage = new FormData();
                    formImage.append("imagen", imagen);

                    await AxiosFormClient.post(`/evento/${eventoCreado.id_evento}/upload-image`, formImage);

                    alertaExito("Éxito", "Evento creado correctamente");
                    onClose();
                } catch (error) {
                    console.error("Error al crear el evento:", error);
                    alertaError("Error", "No se pudo crear el evento");
                }
            });
        },
    });

    const handleImageChange = (e) => {
        setImagen(e.target.files[0]);
    };

    return (
        <div>
            <div className="fixed inset-0 z-50 flex items-center justify-center font-poppins"
                style={{
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                }}
            >
                <div
                    id="create-event-modal"
                    className="relative bg-white rounded-lg shadow-lg dark:bg-gray-900 w-full max-w-md mx-auto"
                    style={{
                        maxHeight: "80vh",
                        overflowY: "auto",
                    }}
                >
                    <div className="px-6 py-4">
                        <div className="flex justify-end">
                            <button
                                onClick={onClose}
                                type="button"
                                className="text-sm font-medium text-gray-900 rounded-lg"
                            >
                                <svg
                                    className="w-6 h-6 text-gray-800 dark:text-white"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <h1 className="font-semibold text-xl text-start font-poppins text-black mb-6">
                            Crear Evento
                        </h1>

                        <form onSubmit={formik.handleSubmit} className="space-y-2">
                            <div className="relative mb-2">
                                <label className="block mb-2 text-sm font-poppins text-gray-900">
                                    Título del Evento:
                                </label>
                                <input
                                    type="text"
                                    id="titulo"
                                    name="titulo"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.titulo}
                                    required
                                    className="w-full border border-gray-300 p-2 mb-3 custom-input"
                                    placeholder="Título del evento"
                                />
                                {formik.touched.titulo && formik.errors.titulo && (
                                    <div className="text-red-600 text-sm">{formik.errors.titulo}</div>
                                )}
                            </div>

                            <div className="relative mb-2">
                                <label className="block mb-2 text-sm font-poppins text-gray-900">
                                    Fecha y Hora:
                                </label>
                                <input
                                    type="datetime-local"
                                    id="fecha"
                                    name="fecha"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.fecha}
                                    required
                                    className="w-full border border-gray-300 p-2 mb-3 custom-input"
                                />
                                {formik.touched.fecha && formik.errors.fecha && (
                                    <div className="text-red-600 text-sm">{formik.errors.fecha}</div>
                                )}
                            </div>

                            <div className="relative mb-2">
                                <label className="block mb-2 text-sm font-poppins text-gray-900">
                                    Tipo de Evento:
                                </label>
                                <select
                                    id="id_tipoevento"
                                    name="id_tipoevento"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.id_tipoevento}
                                    required
                                    className="w-full border border-gray-300 p-2 mb-3 custom-input"
                                >
                                    <option value="">Selecciona un tipo de evento</option>
                                    {tipoEventos.map((tipo) => (
                                        <option key={tipo.id_tipoevento} value={tipo.id_tipoevento}>
                                            {tipo.nombre}
                                        </option>
                                    ))}
                                </select>
                                {formik.touched.id_tipoevento && formik.errors.id_tipoevento && (
                                    <div className="text-red-600 text-sm">{formik.errors.id_tipoevento}</div>
                                )}
                            </div>

                            <div className="relative mb-2">
                                <label className="block mb-2 text-sm font-poppins text-gray-900">
                                    Imagen del Evento:
                                </label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="w-full border border-gray-300 mb-3 custom-input"
                                />
                            </div>

                            <div className="flex justify-between items-center mt-4">
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="text-gray-500 hover:text-gray-700 hover:bg-gray-100 font-poppins font-medium rounded-lg text-sm px-5 py-2.5 dark:text-white dark:hover:bg-gray-800"
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    className="text-white bg-custom-green hover:bg-green-700 focus:ring-1 focus:outline-none focus:ring-teal-300 font-medium rounded-lg text-sm px-5 py-2.5"
                                >
                                    Guardar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddEvent;