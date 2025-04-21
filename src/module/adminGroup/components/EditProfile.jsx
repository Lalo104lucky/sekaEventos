import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { AxiosClient } from "../../../config/http-gateway/http-client";
import { alertaExito, alertaError, alertaCargando, alertaPregunta } from "../../../config/context/alert";

function EditProfile({ user, onClose }) {
    const formik = useFormik({
        initialValues: {
            nombre: user.usuario.nombre || "",
            apellido1: user.usuario.apellido_p || "",
            apellido2: user.usuario.apellido_m || "",
            correo: user.usuario.correo || "",
            telefono: user.usuario.telefono || "",
        },
        validationSchema: yup.object({
            nombre: yup.string().max(50, "No debe exceder los 50 caracteres").required("Campo obligatorio"),
            apellido1: yup.string().max(50, "No debe exceder los 50 caracteres").required("Campo obligatorio"),
            apellido2: yup.string().max(50, "No debe exceder los 50 caracteres").required("Campo obligatorio"),
            correo: yup.string().email("Correo inválido").required("Campo obligatorio"),
            telefono: yup.string().matches(/^\d{10}$/, "Debe ser un número de 10 dígitos").required("Campo obligatorio"),
        }),
        onSubmit: async (values) => {
            alertaPregunta(
                "¿Estás seguro?",
                "¿Deseas guardar los cambios?",
                async () => {
                    try {
                        alertaCargando("Guardando cambios...", "Por favor espera un momento.");
                        const response = await AxiosClient.put(`/usuario/${user.usuario.id_usuario}`, {
                            id_usuario: user.usuario.id_usuario,
                            usuario: user.usuario.usuario,
                            nombre: values.nombre,
                            apellido_p: values.apellido1,
                            apellido_m: values.apellido2,
                            correo: values.correo,
                            telefono: values.telefono,
                            id_rol: user.usuario.rol.id_rol,
                        });
                        const updatedUser = {
                            ...user,
                            usuario: {
                                ...user.usuario,
                                nombre: values.nombre,
                                apellido_p: values.apellido1,
                                apellido_m: values.apellido2,
                                correo: values.correo,
                                telefono: values.telefono,
                            },
                        };
                        localStorage.setItem("user", JSON.stringify(updatedUser));

                        alertaExito("Éxito", "La información se actualizó correctamente.");
                        onClose();
                    } catch (error) {
                        alertaError("Error", "No se pudo actualizar la información.");
                    }
                }
            );
        },
    });

    return (
        <div>
            <div
                className="fixed inset-0 z-50 flex items-center justify-center"
            >
                <div
                    id="authentication-modal"
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
                            Editar Información
                        </h1>

                        <form onSubmit={formik.handleSubmit} className="space-y-2">
                            
                            <div className="relative mb-2">
                                <label
                                    type="base-input"
                                    className="block mb-2 text-sm font-poppins text-gray-900 "
                                >
                                    Nombre:
                                </label>
                                <input
                                    type="text"
                                    id="nombre"
                                    name="nombre"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.nombre}
                                    required
                                    className="w-full border border-gray-300 p-2 mb-3 custom-input"
                                    placeholder="Nombre"
                                />
                                {formik.touched.nombre && formik.errors.nombre && (
                                    <div className="text-red-600 text-sm">{formik.errors.nombre}</div>
                                )}
                            </div>

                            <div className="relative mb-2">
                                <label
                                    type="base-input"
                                    className="block mb-2 text-sm font-poppins text-gray-900 "
                                >
                                    Apellido Paterno:
                                </label>
                                <input
                                    type="text"
                                    id="apellido1"
                                    name="apellido1"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.apellido1}
                                    required
                                    className="w-full border border-gray-300 p-2 mb-3 custom-input"
                                    placeholder="Apellido Paterno"
                                />
                                {formik.touched.apellido1 && formik.errors.apellido1 && (
                                    <div className="text-red-600 text-sm">{formik.errors.apellido1}</div>
                                )}
                            </div>

                            <div className="relative mb-2">
                                <label
                                    type="base-input"
                                    className="block mb-2 text-sm font-poppins text-gray-900 "
                                >
                                    Apellido Materno:
                                </label>
                                <input
                                    type="text"
                                    id="apellido2"
                                    name="apellido2"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.apellido2}
                                    required
                                    className="w-full border border-gray-300 p-2 mb-3 custom-input"
                                    placeholder="Apellido Materno"
                                />
                                {formik.touched.apellido2 && formik.errors.apellido2 && (
                                    <div className="text-red-600 text-sm">{formik.errors.apellido2}</div>
                                )}
                            </div>

                            <div className="relative mb-2">
                                <label
                                    type="base-input"
                                    className="block mb-2 text-sm font-poppins text-gray-900 "
                                >
                                    Correo Electrónico:
                                </label>
                                <input
                                    type="email"
                                    id="correo"
                                    name="correo"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.correo}
                                    required
                                    className="w-full border border-gray-300 p-2 mb-3 custom-input"
                                    placeholder="Correo"
                                />
                                {formik.touched.correo && formik.errors.correo && (
                                    <div className="text-red-600 text-sm">{formik.errors.correo}</div>
                                )}
                            </div>

                            <div className="relative mb-2">
                                <label
                                    type="base-input"
                                    className="block mb-2 text-sm font-poppins text-gray-900 "
                                >
                                    Teléfono:
                                </label>
                                <input
                                    type="text"
                                    id="telefono"
                                    name="telefono"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.telefono}
                                    required
                                    className="w-full border border-gray-300 p-2 mb-3 custom-input"
                                    placeholder="Teléfono"
                                />
                                {formik.touched.telefono && formik.errors.telefono && (
                                    <div className="text-red-600 text-sm">{formik.errors.telefono}</div>
                                )}
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

export default EditProfile;