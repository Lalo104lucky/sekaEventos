
import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Swal from 'sweetalert2';
import { AxiosClient } from '../../config/http-gateway/http-client';

const Profile = ({ perfilData, obtenerDatosLocalStorage }) => {
    const usuarioInfo = perfilData?.usuario || "No hay datos";
    const token = perfilData?.token || "No hay token";
    const tokenType = perfilData?.tokenType || "No hay tokenType";
    const idUsuario = perfilData?.usuario?.id_usuario || "no hay id ";
    const usuario = perfilData?.usuario?.usuario || "no hay id ";
    const idRol = perfilData?.usuario?.rol?.id_rol || "no hay datos";

    const [showPassword, setShowPassword] = useState({
        newPassword: false,
        confirmPassword: false,
        currentPassword: false
    });


    const actualizarInformacionLocalStorage = (data) => {
        const storedData = JSON.parse(localStorage.getItem("user"));
        if (storedData) {
            const updatedData = {
                ...storedData,             // mantiene signed, token y tokenType
                usuario: data     // reemplaza solo el objeto usuario
            };
            localStorage.setItem("user", JSON.stringify(updatedData));
            obtenerDatosLocalStorage();
        }
    }
    // CSS class variables for repeated styles
    const styles = {
        container: "grid grid-cols-3 gap-4 w-full h-screen p-8 overflow-hidden",
        panel: "border-sage color-dark p-4 flex flex-col justify-center items-center space-y-2",
        divider: "line-sage w-full h-1",
        sectionTitle: "text-xl mb-2 font-medium",
        inputContainer: "relative",
        inputIcon: "absolute w-8 h-10 text-[#001C0E] items-center ps-2",
        inputField: "colorInput text-sm rounded-lg block w-full pl-10 mb-3",
        passwordField: "colorInput text-sm rounded-lg block w-full pl-10 mb-3 pr-10",
        passwordToggleBtn: "absolute inset-y-0 right-0 mt-4 pr-4",
        cancelButton: "w-1/3 cancelButton border-2 font-medium rounded-lg text-sm px-5 py-2.5",
        submitButton: "w-1/3 styleButton font-medium rounded-lg text-sm px-5 py-2.5",
        formButtonContainer: "flex justify-end space-x-2 mt-4",
        inputLabel: "block mb-2 text-sm font-medium"
    };

    // Esquema de validación para información personal
    const userFormSchema = yup.object({
        nombre: yup
            .string()
            .min(2, "El nombre debe tener al menos 2 caracteres")
            .max(50, "El nombre no debe exceder los 50 caracteres")
            .required("El nombre es obligatorio"),
        apellido_p: yup
            .string()
            .min(2, "El apellido paterno debe tener al menos 2 caracteres")
            .max(50, "El apellido paterno no debe exceder los 50 caracteres")
            .required("El apellido paterno es obligatorio"),
        apellido_m: yup
            .string()
            .min(2, "El apellido materno debe tener al menos 2 caracteres")
            .max(50, "El apellido materno no debe exceder los 50 caracteres"),
        correo: yup
            .string()
            .email("Ingrese un correo electrónico válido")
            .required("El correo electrónico es obligatorio"),
        telefono: yup
            .string()
            .matches(/^[0-9]{10}$/, "El teléfono debe contener 10 dígitos numéricos")
            .required("El teléfono es obligatorio"),
    });
    useEffect(() => {
        if (usuarioInfo) {
            userFormik.setValues({
                usuario: usuarioInfo.usuario || "Usuario",
                nombre: usuarioInfo.nombre || "",
                apellido_p: usuarioInfo.apellido_p || "",
                apellido_m: usuarioInfo.apellido_m || "",
                correo: usuarioInfo.correo || "",
                telefono: usuarioInfo.telefono || "",
            });
        }
    }, [usuarioInfo]);

    const passwordFormSchema = yup.object({
        newPassword: yup
            .string()
            .min(8, "La contraseña debe tener al menos 8 caracteres")
            .required("La nueva contraseña es obligatoria"),
        confirmPassword: yup
            .string()
            .oneOf([yup.ref('newPassword')], "Las contraseñas no coinciden")
            .required("La confirmación de contraseña es obligatoria"),
        currentPassword: yup
            .string()
            .required("La contraseña actual es obligatoria"),
    });

    const userFormik = useFormik({
        initialValues: {
            usuario: usuarioInfo?.usuario || "Usuario",
            nombre: usuarioInfo?.nombre || "",
            apellido_p: usuarioInfo?.apellido_p || "",
            apellido_m: usuarioInfo?.apellido_m || "",
            correo: usuarioInfo?.correo || "",
            telefono: usuarioInfo?.telefono || "",
        },
        validationSchema: userFormSchema,
        onSubmit: async (values) => {
            try {
                // Mostrar alerta de confirmación
                Swal.fire({
                    title: "¿Estás seguro?",
                    text: "¿Está seguro de actualizar la información del usuario?",
                    icon: "question",
                    showCancelButton: true,
                    confirmButtonText: "Sí, actualizar",
                    cancelButtonText: "Cancelar",
                }).then(async (result) => {
                    if (result.isConfirmed) {
                        // Mostrar carga
                        Swal.fire({
                            title: "Guardando cambios...",
                            allowOutsideClick: false,
                            didOpen: () => {
                                Swal.showLoading();
                            }
                        });

                        // Preparar payload
                        const payload = {
                            // Ajusta según la estructura requerida por tu API
                            id_usuario: idUsuario,
                            usuario: usuario,
                            nombre: values.nombre,
                            apellido_p: values.apellido_p,
                            apellido_m: values.apellido_m,
                            telefono: values.telefono,
                            correo: values.correo,
                            id_rol: idRol,
                        };

                        const response = await AxiosClient({
                            url: `usuario/${idUsuario}`,
                            method: "PUT",
                            data: payload,
                            headers: {
                                Authorization: `${tokenType} ${token}`,
                                "Content-Type": "application/json",
                            },
                        });
                        console.log("Response:", response.data);
                        const data = response.data;
                        console.log(data);
                        actualizarInformacionLocalStorage(data);
                        // Mostrar mensaje de éxito
                        Swal.fire({
                            title: "Éxito",
                            text: "Se actualizó correctamente la información del usuario",
                            icon: "success",
                        });
                    }
                });
            } catch (error) {
                console.error("Error:", error);
                Swal.fire({
                    title: "Error",
                    text: "Error al actualizar la información del usuario",
                    icon: "error",
                });
            }
        },
    });
    // Formik para formulario de contraseña
    const passwordFormik = useFormik({
        initialValues: {
            newPassword: '',
            confirmPassword: '',
            currentPassword: '',
        },
        validationSchema: passwordFormSchema,
        onSubmit: async (values) => {
            try {
                // Mostrar alerta de confirmación
                Swal.fire({
                    title: "¿Estás seguro?",
                    text: "¿Está seguro de cambiar la contraseña?",
                    icon: "question",
                    showCancelButton: true,
                    confirmButtonText: "Sí, cambiar",
                    cancelButtonText: "Cancelar",
                }).then(async (result) => {
                    if (result.isConfirmed) {
                        // Mostrar carga
                        Swal.fire({
                            title: "Guardando cambios...",
                            allowOutsideClick: false,
                            didOpen: () => {
                                Swal.showLoading();
                            }
                        });

                        const payload = {
                            contrasena: values.newPassword,
                        };
                        const response = await AxiosClient({
                            url: `usuario/changeContra/${idUsuario}`,
                            method: "PATCH",
                            data: payload,
                        });

                        console.log("Response:", response.data);

                        // Mostrar mensaje de éxito
                        Swal.fire({
                            title: "Éxito",
                            text: "Se actualizó correctamente la contraseña",
                            icon: "success",
                        });

                        // Limpiar formulario
                        passwordFormik.resetForm();
                    }
                });
            } catch (error) {
                console.error("Error:", error);
                Swal.fire({
                    title: "Error",
                    text: "Error al actualizar la contraseña",
                    icon: "error",
                });
            }
        }
    });

    // Función para resetear el formulario de usuario
    const handleResetUserForm = () => {
        userFormik.resetForm();
    };

    // Función para resetear el formulario de contraseña
    const handleResetPasswordForm = () => {
        passwordFormik.resetForm();
    };

    // Función para alternar la visibilidad de la contraseña
    const togglePasswordVisibility = (field) => {
        setShowPassword(prev => ({
            ...prev,
            [field]: !prev[field]
        }));
    };

    return (
        <div className={styles.container}>

            <div className="grid-rows-3 h-full flex flex-col min-h-0">

                <div className={`${styles.panel} mb-5 flex-grow`}>
                    <svg className="w-32 h-32 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0 0a8.949 8.949 0 0 0 4.951-1.488A3.987 3.987 0 0 0 13 16h-2a3.987 3.987 0 0 0-3.951 3.512A8.948 8.948 0 0 0 12 21Zm3-11a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    </svg>
                    <p className="text-xl font-medium text-center">{usuarioInfo?.nombre} {usuarioInfo?.apellido_p} {usuarioInfo?.apellido_m}</p>
                    <p className="text-sm font-regular">{usuarioInfo?.correo}</p>
                    <p className="text-sm font-regular">{usuarioInfo?.telefono}</p>
                </div>

                <div className={`${styles.panel} flex-grow`}>
                    <svg className="w-32 h-32" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" strokeLinecap="round" strokeWidth="1" d="M4.5 17H4a1 1 0 0 1-1-1 3 3 0 0 1 3-3h1m0-3.05A2.5 2.5 0 1 1 9 5.5M19.5 17h.5a1 1 0 0 0 1-1 3 3 0 0 0-3-3h-1m0-3.05a2.5 2.5 0 1 0-2-4.45m.5 13.5h-7a1 1 0 0 1-1-1 3 3 0 0 1 3-3h3a3 3 0 0 1 3 3 1 1 0 0 1-1 1Zm-1-9.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z" />
                    </svg>
                    <p className="text-xl font-medium text-gray-500">Grupo Perteneciente</p>
                    <p className="text-sm font-regular">Correo</p>
                    <p className="text-sm font-regular">Correo</p>
                    <p className={`${styles.divider} mt-5`} />
                    <svg className="w-16 h-16 mt-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0 0a8.949 8.949 0 0 0 4.951-1.488A3.987 3.987 0 0 0 13 16h-2a3.987 3.987 0 0 0-3.951 3.512A8.948 8.948 0 0 0 12 21Zm3-11a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    </svg>
                    <p className="text-xl font-medium">Nombre</p>
                    <p className="text-sm font-regular">Correo</p>
                </div>
            </div>

            <div className="col-span-2 border-sage text-green-200 p-4 h-full flex flex-col overflow-hidden">
                <p className="text-3xl mb-2">Cuenta</p>
                <p className={styles.divider + ' mb-3'}></p>
                <p className={styles.sectionTitle}>Información Personal</p>
                <p className="text-sm mb-2 font-regular">Actualizar tu información personal</p>

                <form onSubmit={userFormik.handleSubmit} id='formUpdateUser' className="flex-grow overflow-hidden">
                    <div className="grid grid-cols-3 gap-4">
                        <div className={styles.inputContainer}>
                            <label className={styles.inputLabel}>Usuario:</label>
                            <svg className={styles.inputIcon} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0 0a8.949 8.949 0 0 0 4.951-1.488A3.987 3.987 0 0 0 13 16h-2a3.987 3.987 0 0 0-3.951 3.512A8.948 8.948 0 0 0 12 21Zm3-11a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                            </svg>
                            <input
                                type="text"
                                name="usuario"
                                className={styles.inputField}
                                value={userFormik.values.usuario}
                                disabled
                            />
                        </div>

                        <div className={styles.inputContainer}>
                            <label className={styles.inputLabel}>Nombre:</label>
                            <svg className={styles.inputIcon} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" strokeLinecap="round" strokeWidth="1" d="M7 17v1a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1a3 3 0 0 0-3-3h-4a3 3 0 0 0-3 3Zm8-9a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                            </svg>
                            <input
                                type="text"
                                name="nombre"
                                className={styles.inputField}
                                value={userFormik.values.nombre}
                                onChange={userFormik.handleChange}
                                onBlur={userFormik.handleBlur}
                            />
                            {userFormik.touched.nombre && userFormik.errors.nombre ? (
                                <div className="text-red-600 text-sm">{userFormik.errors.nombre}</div>
                            ) : null}
                        </div>

                        <div className={styles.inputContainer}>
                            <label className={styles.inputLabel}>Apellido Paterno:</label>
                            <svg className={styles.inputIcon} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" strokeLinecap="round" strokeWidth="1" d="M7 17v1a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1a3 3 0 0 0-3-3h-4a3 3 0 0 0-3 3Zm8-9a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                            </svg>
                            <input
                                type="text"
                                name="apellido_p"
                                className={styles.inputField}
                                value={userFormik.values.apellido_p}
                                onChange={userFormik.handleChange}
                                onBlur={userFormik.handleBlur}
                            />
                            {userFormik.touched.apellido_p && userFormik.errors.apellido_p ? (
                                <div className="text-red-600 text-sm">{userFormik.errors.apellido_p}</div>
                            ) : null}
                        </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 mt-4">
                        <div className={styles.inputContainer}>
                            <label className={styles.inputLabel}>Apellido Materno:</label>
                            <svg className={styles.inputIcon} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" strokeLinecap="round" strokeWidth="1" d="M7 17v1a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1a3 3 0 0 0-3-3h-4a3 3 0 0 0-3 3Zm8-9a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                            </svg>
                            <input
                                type="text"
                                name="apellido_m"
                                className={styles.inputField}
                                value={userFormik.values.apellido_m}
                                onChange={userFormik.handleChange}
                                onBlur={userFormik.handleBlur}
                            />
                            {userFormik.touched.apellido_m && userFormik.errors.apellido_m ? (
                                <div className="text-red-600 text-sm">{userFormik.errors.apellido_m}</div>
                            ) : null}
                        </div>

                        <div className={styles.inputContainer}>
                            <label className={styles.inputLabel}>Correo Electrónico:</label>
                            <svg className={styles.inputIcon} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" strokeLinecap="round" strokeWidth="1" d="m3.5 5.5 7.893 6.036a1 1 0 0 0 1.214 0L20.5 5.5M4 19h16a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Z" />
                            </svg>
                            <input
                                type="email"
                                name="correo"
                                className={styles.inputField}
                                value={userFormik.values.correo}
                                onChange={userFormik.handleChange}
                                onBlur={userFormik.handleBlur}
                            />
                            {userFormik.touched.correo && userFormik.errors.correo ? (
                                <div className="text-red-600 text-sm">{userFormik.errors.correo}</div>
                            ) : null}
                        </div>
                        <div className={styles.inputContainer}>
                            <label className={styles.inputLabel}>Núm. Teléfono:</label>
                            <svg className={styles.inputIcon} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M18.427 14.768 17.2 13.542a1.733 1.733 0 0 0-2.45 0l-.613.613a1.732 1.732 0 0 1-2.45 0l-1.838-1.84a1.735 1.735 0 0 1 0-2.452l.612-.613a1.735 1.735 0 0 0 0-2.452L9.237 5.572a1.6 1.6 0 0 0-2.45 0c-3.223 3.2-1.702 6.896 1.519 10.117 3.22 3.221 6.914 4.745 10.12 1.535a1.601 1.601 0 0 0 0-2.456Z" />
                            </svg>
                            <input
                                type="tel"
                                name="telefono"
                                className={styles.inputField}
                                value={userFormik.values.telefono}
                                onChange={userFormik.handleChange}
                                onBlur={userFormik.handleBlur}
                            />
                            {userFormik.touched.telefono && userFormik.errors.telefono ? (
                                <div className="text-red-600 text-sm">{userFormik.errors.telefono}</div>
                            ) : null}
                        </div>
                    </div>

                    <div className={styles.formButtonContainer}>
                        <button
                            type="button"
                            className={styles.cancelButton}
                            onClick={handleResetUserForm}
                        >
                            Descartar
                        </button>
                        <button
                            type="submit"
                            className={styles.submitButton}
                        >
                            Modificar
                        </button>
                    </div>
                </form>
                <p className={`${styles.divider} mt-5 mb-2`}></p>
                <p className={styles.sectionTitle}>Información de Inicio de Sesión</p>

                <form onSubmit={passwordFormik.handleSubmit} action="#" method="post" id="formUpdatePassword">
                    <div className="grid grid-cols-3 gap-4">
                        <div className={styles.inputContainer}>
                            <label className={styles.inputLabel}>Nueva Contraseña:</label>
                            <svg className={styles.inputIcon} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M12 14v3m-3-6V7a3 3 0 1 1 6 0v4m-8 0h10a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1v-7a1 1 0 0 1 1-1Z" />
                            </svg>
                            <div className="flex">
                                <input
                                    type={showPassword.newPassword ? "text" : "password"}
                                    className={styles.passwordField}
                                    name="newPassword"
                                    value={passwordFormik.values.newPassword}
                                    onChange={passwordFormik.handleChange}
                                    onBlur={passwordFormik.handleBlur}
                                    required
                                    minLength="8"
                                    title="Debe contener al menos 8 caracteres" />
                                <button
                                    type="button"
                                    className={styles.passwordToggleBtn}
                                    onClick={() => togglePasswordVisibility('newPassword')}
                                >
                                    {showPassword.newPassword ? (
                                        <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7A9.97 9.97 0 014.02 8.971m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                        </svg>
                                    ) : (
                                        <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                        </svg>
                                    )}
                                </button>
                                {passwordFormik.touched.newPassword && passwordFormik.errors.newPassword && (
                                    <p className="text-red-500 text-sm mt-1">{passwordFormik.errors.newPassword}</p>
                                )}
                            </div>
                        </div>
                        <div className={styles.inputContainer}>
                            <label className={styles.inputLabel}>Confirmar Contraseña:</label>
                            <svg className={styles.inputIcon} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M12 14v3m-3-6V7a3 3 0 1 1 6 0v4m-8 0h10a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1v-7a1 1 0 0 1 1-1Z" />
                            </svg>
                            <div className="flex">
                                <input
                                    type={showPassword.confirmPassword ? "text" : "password"}
                                    className={styles.passwordField}
                                    name="confirmPassword"
                                    value={passwordFormik.values.confirmPassword}
                                    onChange={passwordFormik.handleChange}
                                    onBlur={passwordFormik.handleBlur}
                                    required
                                    minLength="8"
                                    title="Debe coincidir con la nueva contraseña"
                                />
                                <button
                                    type="button"
                                    className={styles.passwordToggleBtn}
                                    onClick={() => togglePasswordVisibility('confirmPassword')}
                                >
                                    {showPassword.confirmPassword ? (
                                        <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7A9.97 9.97 0 014.02 8.971m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                        </svg>
                                    ) : (
                                        <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                        </svg>
                                    )}
                                </button>
                                {passwordFormik.touched.confirmPassword && passwordFormik.errors.confirmPassword && (
                                    <p className="text-red-500 text-sm mt-1">{passwordFormik.errors.confirmPassword}</p>
                                )}
                            </div>
                        </div>
                        <div className={styles.inputContainer}>
                            <label className={styles.inputLabel}>Contraseña Actual:</label>
                            <svg className={styles.inputIcon} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M12 14v3m-3-6V7a3 3 0 1 1 6 0v4m-8 0h10a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1v-7a1 1 0 0 1 1-1Z" />
                            </svg>
                            <div className="flex">
                                <input
                                    type={showPassword.currentPassword ? "text" : "password"}
                                    className={styles.passwordField}
                                    name="currentPassword"
                                    value={passwordFormik.values.currentPassword}
                                    onChange={passwordFormik.handleChange}
                                    onBlur={passwordFormik.handleBlur}
                                    required
                                />
                                <button
                                    type="button"
                                    className={styles.passwordToggleBtn}
                                    onClick={() => togglePasswordVisibility('currentPassword')}
                                >
                                    {showPassword.currentPassword ? (
                                        <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7A9.97 9.97 0 014.02 8.971m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                        </svg>
                                    ) : (
                                        <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                        </svg>
                                    )}
                                </button>
                                {passwordFormik.touched.currentPassword && passwordFormik.errors.currentPassword && (
                                    <p className="text-red-500 text-sm mt-1">{passwordFormik.errors.currentPassword}</p>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className={styles.formButtonContainer}>
                        <button type="button" className={styles.cancelButton}>Descartar</button>
                        <button type="submit" className={styles.submitButton}>Modificar</button>
                    </div>
                </form>


            </div>
        </div>
    );
};

export default Profile;