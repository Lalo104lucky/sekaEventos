import React, { useState } from 'react';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { AxiosClient } from '../../config/http-gateway/http-client';
import FondoLogin from '../../assets/img/fondoLogin.jpg';
import Logo from '../../assets/img/logo.png';
import { alertaExito, alertaError } from '../../config/context/alert';

const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      destinatario: "",
    },
    validationSchema: yup.object().shape({
      destinatario: yup
        .string()
        .required("Campo obligatorio")
        .email("Email inválido"),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      setLoading(true);
      try {
        const response = await AxiosClient.post('/send-email', {
          destinatario: values.destinatario,
          asunto: "Recuperar contraseña",
        });
        
        if (!response?.data?.error) {
          alertaExito("Correo enviado", "Revisa tu bandeja de entrada para continuar con el restablecimiento de contraseña.");
          navigate('/reset-password/', { state: { id: response.data.id_usuario, token: response.data.email.pin } });
          
        } else {
          throw new Error(response.data.message);
        }
      } catch (error) {
      alertaError("Restablecer contraseña", "Ocurrió un error al enviar el correo electrónico");
      } finally {
        setLoading(false);
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="flex bg-white overflow-hidden items-center justify-center" style={{ width: "1100px", height: "80vh" }}>
        <div className="hidden md:flex w-1/2 h-full relative">
          <img src={FondoLogin} alt="IniciodeSesión" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center p-6 text-white" style={{ top: "25%" }}>
            <h2 className="text-5xl font-bold text-stroke">Cuida el Planeta</h2>
            <p className="text-2xl mt-6 font-bold text-center text-stroke">
              Recupera tu acceso y sigue contribuyendo al cuidado del planeta.
            </p>
          </div>
        </div>

        <div className="w-1/2 h-full p-8 flex flex-col justify-center items-center">
          <img src={Logo} alt="Logo" className="w-16 mb-4" />
          <h3 className="text-3xl font-semibold mb-4 text-start w-full">
            Recuperar Cuenta
          </h3>
          <form className="space-y-4 w-full" noValidate onSubmit={formik.handleSubmit}>
            <div className="relative mb-2">
              <label className="block mb-2 text-sm font-medium text-gray-900">Correo Electrónico:</label>
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <img src="" alt="icono correo" className="w-5 h-5" />
              </div>
              <input
                type="email"
                id="destinatario"
                name="destinatario"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.destinatario}
                autoComplete="email"
                required
                className="w-full border border-gray-300 p-2 pl-10 rounded-lg"
                placeholder="name@example.com"
              />
              {formik.touched.destinatario && formik.errors.destinatario && (
                <div className="text-red-600 text-sm">{formik.errors.destinatario}</div>
              )}
            </div>

            <button
              type="submit"
              disabled={formik.isSubmitting || !formik.isValid || loading}
              className="bg-gray-900 text-white p-2 w-full hover:bg-green-800 mt-4 transition"
            >
              {loading ? "Enviando..." : "Enviar"}
            </button>
            <p className="text-sm text-gray-500 cursor-pointer text-right w-full" onClick={() => navigate("/reset-password")}>
              Siguiente pantalla
            </p>
          </form>

          <div className="text-center mt-5">
            <a
              className="text-blue-600 text-base cursor-pointer hover:underline"
              onClick={() => navigate("/")}
            >
              <p>¿Ya recordaste tu contraseña?</p>
              <p>Iniciar sesión</p>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
