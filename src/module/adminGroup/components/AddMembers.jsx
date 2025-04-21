import React, { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { AxiosClient } from "../../../config/http-gateway/http-client";
import { alertaExito, alertaError, alertaCargando, alertaPregunta } from "../../../config/context/alert";

function AddMembers({ grupoId, onClose, onMemberAdded }) {
    const [showPassword, setShowPassword] = useState(false);

    const toggleShowPassword = () => setShowPassword(!showPassword);

    const formik = useFormik({
        initialValues: {
            usuario: "",
            correo: "",
            contrasena: "",
            confirmContra: "",
            nombre: "",
            apellido_p: "",
            apellido_m: "",
            telefono: "",
        },
        validationSchema: yup.object({
            usuario: yup.string().required("Campo obligatorio"),
            correo: yup.string().email("Correo inválido").required("Campo obligatorio"),
            contrasena: yup.string().min(8, "Debe tener al menos 8 caracteres").required("Campo obligatorio"),
            confirmContra: yup.string().oneOf([yup.ref("contrasena"), null], "Las contraseñas no coinciden").required("Campo obligatorio"),
            nombre: yup.string().required("Campo obligatorio"),
            apellido_p: yup.string().required("Campo obligatorio"),
            apellido_m: yup.string().required("Campo obligatorio"),
            telefono: yup.string().matches(/^\d{10}$/, "Debe ser un número de 10 dígitos").required("Campo obligatorio"),
        }),
        onSubmit: async (values) => {
            alertaPregunta(
                "¿Estás seguro?",
                "¿Deseas agregar este miembro?",
                async () => {
                    try {
                        alertaCargando("Agregando miembro...", "Por favor espera un momento.");

                        const userResponse = await AxiosClient.post("/usuario/", {
                            ...values,
                            id_rol: 3, 
                        });

                        const newUserId = userResponse.message.id_usuario;

                        await AxiosClient.post(`/grupo/${grupoId}/add-usuario/${newUserId}`, {
                            id_grupo: grupoId,
                            id_usuario: newUserId,
                        });

                        alertaExito("Éxito", "El miembro se agregó correctamente.");
                        onMemberAdded(); 
                        onClose(); 
                    } catch (error) {
                        alertaError("Error", "No se pudo agregar el miembro.");
                    }
                }
            );
        },
    });

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center"
            style={{
                backgroundColor: "rgba(0, 0, 0, 0.5)",
            }}
        >
            <div
                id="add-member-modal"
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
                        Agregar Nuevo Miembro
                    </h1>

                    <form onSubmit={formik.handleSubmit} className="space-y-2">
                        <div className="relative mb-2">
                            <label className="block mb-2 text-sm font-poppins text-gray-900">Nombre:</label>
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
                            <label className="block mb-2 text-sm font-poppins text-gray-900">Apellido Paterno:</label>
                            <input
                                type="text"
                                id="apellido_p"
                                name="apellido_p"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.apellido_p}
                                required
                                className="w-full border border-gray-300 p-2 mb-3 custom-input"
                                placeholder="Apellido Paterno"
                            />
                            {formik.touched.apellido_p && formik.errors.apellido_p && (
                                <div className="text-red-600 text-sm">{formik.errors.apellido_p}</div>
                            )}
                        </div>

                        <div className="relative mb-2">
                            <label className="block mb-2 text-sm font-poppins text-gray-900">Apellido Materno:</label>
                            <input
                                type="text"
                                id="apellido_m"
                                name="apellido_m"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.apellido_m}
                                required
                                className="w-full border border-gray-300 p-2 mb-3 custom-input"
                                placeholder="Apellido Materno"
                            />
                            {formik.touched.apellido_m && formik.errors.apellido_m && (
                                <div className="text-red-600 text-sm">{formik.errors.apellido_m}</div>
                            )}
                        </div>

                        <div className="relative mb-2">
                            <label className="block mb-2 text-sm font-poppins text-gray-900">Usuario:</label>
                            <input
                                type="text"
                                id="usuario"
                                name="usuario"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.usuario}
                                required
                                className="w-full border border-gray-300 p-2 mb-3 custom-input"
                                placeholder="Usuario"
                            />
                            {formik.touched.usuario && formik.errors.usuario && (
                                <div className="text-red-600 text-sm">{formik.errors.usuario}</div>
                            )}
                        </div>

                        <div className="relative mb-2">
                            <label className="block mb-2 text-sm font-poppins text-gray-900">Correo Electrónico:</label>
                            <input
                                type="email"
                                id="correo"
                                name="correo"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.correo}
                                required
                                className="w-full border border-gray-300 p-2 mb-3 custom-input"
                                placeholder="Correo Electrónico"
                            />
                            {formik.touched.correo && formik.errors.correo && (
                                <div className="text-red-600 text-sm">{formik.errors.correo}</div>
                            )}
                        </div>

                        <div className="relative mb-2">
                            <label className="block mb-2 text-sm font-poppins text-gray-900">Teléfono:</label>
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

                        <div className="relative mb-2">
                            <label className="block mb-2 text-sm font-poppins text-gray-900">Contraseña:</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    id="contrasena"
                                    name="contrasena"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.contrasena}
                                    required
                                    className="w-full border border-gray-300 p-2 pr-12 custom-input"
                                    placeholder="Contraseña"
                                />
                                <button
                                    type="button"
                                    onClick={toggleShowPassword}
                                    className="absolute inset-y-0 right-0 flex py-2 px-3 items-center text-gray-500"
                                >
                                    {showPassword ? (
                                        <i className="pi pi-eye-slash"></i>
                                    ) : (
                                        <i className="pi pi-eye"></i>
                                    )}
                                </button>
                            </div>
                            {formik.touched.contrasena && formik.errors.contrasena && (
                                <div className="text-red-600 text-sm mt-3">{formik.errors.contrasena}</div>
                            )}
                        </div>

                        <div className="relative mb-2">
                            <label className="block mb-2 text-sm font-poppins text-gray-900">Confirmar Contraseña:</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    id="confirmContra"
                                    name="confirmContra"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.confirmContra}
                                    required
                                    className="w-full border border-gray-300 p-2 pr-12 custom-input"
                                    placeholder="Confirmar Contraseña"
                                />
                                <button
                                    type="button"
                                    onClick={toggleShowPassword}
                                    className="absolute inset-y-0 right-0 flex py-2 px-3 items-center text-gray-500"
                                >
                                    {showPassword ? (
                                        <i className="pi pi-eye-slash"></i>
                                    ) : (
                                        <i className="pi pi-eye"></i>
                                    )}
                                </button>
                            </div>
                            {formik.touched.confirmContra && formik.errors.confirmContra && (
                                <div className="text-red-600 text-sm mt-3">{formik.errors.confirmContra}</div>
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
    );
}

export default AddMembers;