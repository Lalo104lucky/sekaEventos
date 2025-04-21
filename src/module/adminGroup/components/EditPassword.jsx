import React, { useState } from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import bcrypt from 'bcryptjs'
import { AxiosClient } from '../../../config/http-gateway/http-client'
import { alertaExito, alertaError, alertaCargando, alertaPregunta } from '../../../config/context/alert'

function EditPassword({ user, onClose }) {
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const toggleShowCurrentPassword = () => setShowCurrentPassword(!showCurrentPassword);
    const toggleShowNewPassword = () => setShowNewPassword(!showNewPassword);
    const toggleShowConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);

    const formik = useFormik({
        initialValues: {
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
        },
        validationSchema: yup.object({
            currentPassword: yup.string().required("Campo obligatorio"),
            newPassword: yup
                .string()
                .min(8, "La contraseña debe tener al menos 8 caracteres")
                .required("Campo obligatorio"),
            confirmPassword: yup
                .string()
                .oneOf([yup.ref("newPassword"), null], "Las contraseñas no coinciden")
                .required("Campo obligatorio"),
        }),
        onSubmit: async (values) => {
            const storedEncryptedPassword = user.usuario.contrasena;
            const isPasswordMatch = await bcrypt.compare(values.currentPassword, storedEncryptedPassword);

            if (!isPasswordMatch) {
                alertaError("Error", "La contraseña actual no es correcta.");
                return;
            }

            alertaPregunta(
                "¿Estás seguro?",
                "¿Deseas cambiar tu contraseña?",
                async () => {
                    try {
                        alertaCargando("Cambiando contraseña...", "Por favor espera un momento.");
                        const response = await AxiosClient.patch(`/usuario/changeContra/${user.usuario.id_usuario}`, {
                            contrasena: values.newPassword,
                        });

                        alertaExito("Éxito", "La contraseña se actualizó correctamente.");
                        onClose();
                    } catch (error) {
                        alertaError("Error", "No se pudo cambiar la contraseña.");
                    }
                }
            );
        },
    });

    return (
        <div>
            <div
                className="fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-300 ease-in-out"
            >
                <div
                    id="change-password-modal"
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
                            Cambiar Contraseña
                        </h1>

                        <form onSubmit={formik.handleSubmit} className="space-y-2">
                            <div className="relative mb-2">
                                <label
                                    type="base-input"
                                    className="block mb-2 text-sm font-poppins text-gray-900 "
                                >
                                    Contraseña Actual:
                                </label>
                                <div className="relative mb-2">
                                    <input
                                        type={showCurrentPassword ? 'text' : 'password'}
                                        id="currentPassword"
                                        name="currentPassword"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.currentPassword}
                                        required
                                        className="w-full border border-gray-300 p-2 pr-12 custom-input"
                                        placeholder="Contraseña Actual"
                                    />
                                    <button
                                        type="button"
                                        onClick={toggleShowCurrentPassword}
                                        className="absolute inset-y-0 right-0 flex py-2 px-3 items-center text-gray-500"
                                    >
                                        {showCurrentPassword ? (
                                            <svg
                                                className="w-5 h-5 text-gray-800 dark:text-white"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M21 12c0 1.2-4.03 6-9 6s-9-4.8-9-6c0-1.2 4.03-6 9-6s9 4.8 9 6Z"
                                                />
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                                                />
                                            </svg>
                                        ) : (
                                            <svg
                                                className="w-5 h-5 text-gray-800 dark:text-white"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M3.933 13.909A4.357 4.357 0 0 1 3 12c0-1 4-6 9-6m7.6 3.8A5.068 5.068 0 0 1 21 12c0 1-3 6-9 6-.314 0-.62-.014-.918-.04M5 19 19 5m-4 7a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                                                />
                                            </svg>
                                        )}
                                    </button>
                                </div>
                                {formik.touched.currentPassword && formik.errors.currentPassword && (
                                    <div className="text-red-600 text-sm mt-3">{formik.errors.currentPassword}</div>
                                )}
                            </div>

                            <div className="relative mb-2">
                                <label
                                    type="base-input"
                                    className="block mb-2 text-sm font-poppins text-gray-900 "
                                >
                                    Nueva Contraseña:
                                </label>
                                <div className='relative mb-2'>
                                    <input
                                        type={showNewPassword ? 'text' : 'password'}
                                        id="newPassword"
                                        name="newPassword"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.newPassword}
                                        required
                                        className="w-full border border-gray-300 p-2 pr-12 custom-input"
                                        placeholder="Nueva Contraseña"
                                    />
                                    <button
                                        type="button"
                                        onClick={toggleShowNewPassword}
                                        className="absolute inset-y-0 right-0 flex py-2 px-3 items-center text-gray-500"
                                    >
                                        {showNewPassword ? (
                                            <svg
                                                className="w-5 h-5 text-gray-800 dark:text-white"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M21 12c0 1.2-4.03 6-9 6s-9-4.8-9-6c0-1.2 4.03-6 9-6s9 4.8 9 6Z"
                                                />
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                                                />
                                            </svg>
                                        ) : (
                                            <svg
                                                className="w-5 h-5 text-gray-800 dark:text-white"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M3.933 13.909A4.357 4.357 0 0 1 3 12c0-1 4-6 9-6m7.6 3.8A5.068 5.068 0 0 1 21 12c0 1-3 6-9 6-.314 0-.62-.014-.918-.04M5 19 19 5m-4 7a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                                                />
                                            </svg>
                                        )}
                                    </button>
                                </div>
                                {formik.touched.newPassword && formik.errors.newPassword && (
                                    <div className="text-red-600 text-sm mt-3">{formik.errors.newPassword}</div>
                                )}
                            </div>

                            <div className="relative mb-2">
                                <label
                                    type="base-input"
                                    className="block mb-2 text-sm font-poppins text-gray-900 "
                                >
                                    Confirmar Nueva Contraseña:
                                </label>
                                <div className="relative mb-2">
                                    <input
                                        type={showConfirmPassword ? 'text' : 'password'}
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.confirmPassword}
                                        required
                                        className="w-full border border-gray-300 p-2 pr-12 custom-input"
                                        placeholder="Confirmar Nueva Contraseña"
                                    />
                                    <button
                                        type="button"
                                        onClick={toggleShowConfirmPassword}
                                        className="absolute inset-y-0 right-0 flex py-2 px-3 items-center text-gray-500"
                                    >
                                        {showConfirmPassword ? (
                                            <svg
                                                className="w-5 h-5 text-gray-800 dark:text-white"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M21 12c0 1.2-4.03 6-9 6s-9-4.8-9-6c0-1.2 4.03-6 9-6s9 4.8 9 6Z"
                                                />
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                                                />
                                            </svg>
                                        ) : (
                                            <svg
                                                className="w-5 h-5 text-gray-800 dark:text-white"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M3.933 13.909A4.357 4.357 0 0 1 3 12c0-1 4-6 9-6m7.6 3.8A5.068 5.068 0 0 1 21 12c0 1-3 6-9 6-.314 0-.62-.014-.918-.04M5 19 19 5m-4 7a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                                                />
                                            </svg>
                                        )}
                                    </button>
                                </div>
                                {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                                    <div className="text-red-600 text-sm mt-3">{formik.errors.confirmPassword}</div>
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
    )
}

export default EditPassword
