import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
//import AxiosClient from "../../config/http-gateway/http-client";
//import { alertaExito, alertaError } from '../../config/alert/alert';
import FondoLogin from '../../assets/img/fondoLogin.jpg';
import Logo from '../../assets/img/logo.png';

const ResetPasswordPage = () => {
    const navigate = useNavigate();
    const [showPassword1, setShowPassword1] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);

    const togglePasswordVisibility1 = () => setShowPassword1(!showPassword1);
    const togglePasswordVisibility2 = () => setShowPassword2(!showPassword2);

    const formik = useFormik({
        initialValues: {
            token: '',
            newPassword: '',
            confirmPassword: '',
        },
        validationSchema: yup.object({
            token: yup.string().required('Campo obligatorio'),
            newPassword: yup.string().required('Campo obligatorio').min(8, 'La contraseña debe tener al menos 8 caracteres'),
            confirmPassword: yup.string().oneOf([yup.ref('newPassword'), null], 'Las contraseñas deben coincidir').required('Campo obligatorio'),
        }),
        onSubmit: async (values, { setSubmitting }) => {
            try {
                const payload = {
                    token: values.token,
                    newPassword: values.newPassword,
                    idUser: "1",
                };

/**                const response = await AxiosClient({
                  url: '/users/reset-password',
                    method: 'POST',
                    data: payload,
                });
 */
                if (!response?.data?.error) {
  //                  alertaExito('Contraseña restablecida', 'Tu contraseña ha sido restablecida con éxito');
                    navigate('/');
                } else {
                    throw new Error(response.data.message);
                }
            } catch (error) {
    //            alertaError('Restablecer contraseña', 'Ocurrió un error al restablecer la contraseña');
            } finally {
                setSubmitting(false);
            }
        },
    });

    return (
        <div className="h-screen flex items-center justify-center">
            <div className="flex bg-white overflow-hidden items-center justify-center" style={{ width: '1100px', height: '80vh' }}>
                <div className="hidden md:flex w-1/2 h-full relative">
                    <img src={FondoLogin} alt="IniciodeSesión" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center p-6 text-white" style={{ top: '25%' }}>
                        <h2 className="text-5xl font-bold">Cuida el Planeta</h2>
                        <p className="text-2xl mt-6 font-bold text-center">
                            Recupera tu acceso y sigue contribuyendo al cuidado del planeta.
                        </p>
                    </div>
                </div>

                <div className="w-1/2 h-full p-8 flex flex-col justify-center items-center">
                    <img src={Logo} alt="Logo" className="w-16 mb-4" />
                    <h3 className="text-3xl font-semibold mb-4 text-start w-full">Recuperar Cuenta</h3>
                    <form className="space-y-4 w-full" noValidate onSubmit={formik.handleSubmit}>
                        <div className="relative mb-2">
                            <input
                                type="text"
                                id="token"
                                name="token"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.token}
                                required
                                className="w-full border border-gray-300 p-2 mb-3"
                                placeholder="Código"
                            />
                            {formik.touched.token && formik.errors.token && <div className="text-red-600 text-sm">{formik.errors.token}</div>}
                        </div>

                        <div className="relative mb-2">
                            <input
                                type={showPassword1 ? 'text' : 'password'}
                                id="newPassword"
                                name="newPassword"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.newPassword}
                                required
                                className="w-full border border-gray-300 p-2 mb-3"
                                placeholder="Nueva contraseña"
                            />
                            <button type="button" onClick={togglePasswordVisibility1} className="absolute end-0 px-3 text-gray-500">👁️</button>
                            {formik.touched.newPassword && formik.errors.newPassword && <div className="text-red-600 text-sm">{formik.errors.newPassword}</div>}
                        </div>

                        <div className="relative mb-2">
                            <input
                                type={showPassword2 ? 'text' : 'password'}
                                id="confirmPassword"
                                name="confirmPassword"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.confirmPassword}
                                required
                                className="w-full border border-gray-300 p-2 mb-3"
                                placeholder="Confirmar Contraseña"
                            />
                            <button type="button" onClick={togglePasswordVisibility2} className="absolute end-0 px-3 text-gray-500">👁️</button>
                            {formik.touched.confirmPassword && formik.errors.confirmPassword && <div className="text-red-600 text-sm">{formik.errors.confirmPassword}</div>}
                        </div>

                        <button
                            type="submit"
                            disabled={formik.isSubmitting || !formik.isValid}
                            className="bg-gray-900 text-white p-2 w-full hover:bg-green-800 mt-4 transition"
                        >
                            {formik.isSubmitting ? 'Enviando...' : 'Enviar'}
                        </button>
                    </form>

                    <div className="text-center mt-5">
                        <a className="custom-blue text-base cursor-pointer hover:underline" onClick={() => navigate('/')}>¿Ya recordaste tu contraseña? Iniciar sesión</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResetPasswordPage;
