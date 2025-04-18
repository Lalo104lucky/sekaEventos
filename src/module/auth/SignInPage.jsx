import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as yup from "yup";
import { useFormik } from "formik";
import AuthContext from "../../config/context/auth-context";
import { AxiosClient } from '../../config/http-gateway/http-client';
import { alertaExito, alertaError } from '../../config/context/alert';

import Logo from '../../assets/img/logo.png';
import Fondo from '../../assets/img/fondoLogin.jpg';

const SignInPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const { dispatch } = useContext(AuthContext);
    const navigate = useNavigate();

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const formik = useFormik({
        initialValues: {
            usuario: "",
            contrasena: "",
        },
        validationSchema: yup.object().shape({
            usuario: yup.string().required("Campo obligatorio"),
            contrasena: yup.string().required("Campo obligatorio"),
        }),
        onSubmit: async (values, { setSubmitting }) => {
            try {
                const response = await AxiosClient.post("/auth/login", values);
                console.log("Formulario enviado:", values);
                if (response.data && response.data.token) {
                    dispatch({
                        type: "SIGNIN",
                        payload: response.data,
                    });

                    localStorage.setItem("user", JSON.stringify(response.data));

                    alertaExito('Éxito', 'Se inició sesión correctamente');
                    console.log("Inicio de sesión exitoso");
                    navigate("/", { replace: true });

                } else {
                    ('Acceso Denegado', 'Credenciales incorrectas.');
                    console.log("Error: Credenciales incorrectas");
                }
            } catch (error) {
                console.error("Error en inicio de sesión:", error);
                alertaError('Error', 'Usuario y/o contraseña incorrectos');
            } finally {
                setSubmitting(false);
            }
        },
    });

    return (
        <div className="h-screen flex items-center justify-center">
            <div className="flex bg-white overflow-hidden items-center justify-center" style={{ width: "1100px", height: "80vh" }}>
                <div className="hidden md:flex w-1/2 h-full relative">
                    <img src={Fondo} alt="Fondo" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center p-6 text-white" style={{ top: "25%" }}>
                        <h2 className="text-5xl font-bold text-stroke">Únete al Cambio</h2>
                        <p className="text-2xl mt-6 font-bold text-center text-stroke">
                            Cada acción cuenta. Únete y transforma el futuro del planeta, un evento a la vez.
                        </p>
                    </div>
                </div>

                <div className="w-1/2 p-8 flex flex-col justify-center items-center">
                    <img src={Logo} alt="Logo" className="w-16 mb-4" />
                    <h3 className="text-3xl font-semibold mb-4 text-start w-full">Inicio de Sesión</h3>

                    <form className="space-y-4 w-full" noValidate onSubmit={formik.handleSubmit}>
                        <div className="relative mb-2">
                            <input
                                type="usuario"
                                id="usuario"
                                name="usuario"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.usuario}
                                autoComplete="usuario"
                                required
                                className="w-full border border-gray-300 p-2 mb-3 custom-input"
                                placeholder="Usuario"
                            />
                            {formik.touched.usuario && formik.errors.usuario && (
                                <div className="text-red-600 text-sm">{formik.errors.usuario}</div>
                            )}
                        </div>

                        <div className="relative mb-2">
                            <input
                                type={showPassword ? "text" : "password"}
                                id="contrasena"
                                name="contrasena"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.contrasena}
                                required
                                className="w-full border border-gray-300 p-2 pr-12 items-center custom-input"
                                placeholder="Contraseña"
                            />
                            <button
                                type="button"
                                onClick={togglePasswordVisibility}
                                className="absolute inset-y-0 right-0 flex py-2 px-3 text-gray-500 "
                            >
                                {showPassword ? (
                                    <svg
                                        className="w-6 h-6 text-gray-800 dark:text-white"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            d="M21 12c0 1.2-4.03 6-9 6s-9-4.8-9-6c0-1.2 4.03-6 9-6s9 4.8 9 6Z"
                                        />
                                        <path
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                                        />
                                    </svg>
                                ) : (
                                    <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.933 13.909A4.357 4.357 0 0 1 3 12c0-1 4-6 9-6m7.6 3.8A5.068 5.068 0 0 1 21 12c0 1-3 6-9 6-.314 0-.62-.014-.918-.04M5 19 19 5m-4 7a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                    </svg>

                                )}
                            </button>
                            {formik.touched.contrasena && formik.errors.contrasena && (
                                <div className="text-red-600 text-sm">{formik.errors.contrasena}</div>
                            )}
                        </div>

                        <p className="text-sm text-grey-500 cursor-pointer text-right w-full" onClick={() => navigate("/forgot-password")}>
                            ¿Olvidó su contraseña?
                        </p>

                        <button
                            type="submit"
                            disabled={formik.isSubmitting || !formik.isValid}
                            className="bg-gray-900 text-white p-2 w-full hover:bg-green-800 mt-4 transition"
                        >
                            Entrar
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignInPage;
