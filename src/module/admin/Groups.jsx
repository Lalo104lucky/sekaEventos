import React, { useEffect, useState } from 'react';
import TableGroups from './components/TableGroups';
import { AxiosClient } from '../../config/http-gateway/http-client';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { alertaExito, alertaError, alertaCargando, alertaPregunta } from '../../config/context/alert';

const Groups = () => {
  const [isModalMemberOpen, setIsModalMemberOpen] = useState(false);
  const [isModalMemberEdit, setIsModalMemberEdit] = useState(false);
  const [groups, setGroups] = useState([]);
  const [administrators, setAdministrators] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);

  const getGroups = async () => {
    try {
      const response = await AxiosClient.get('/grupo/');
      setGroups(response.data);
    } catch (error) {
      alertaError("Error", "No se pudieron obtener los grupos");
    }
  };

  const getAdministrators = async () => {
    try {
      const response = await AxiosClient.get('/usuario/');
      const administradores = response.data.filter(user => user.rol.rol === "ADMIN_GROUP");
      setAdministrators(administradores);
    } catch (error) {
      alertaError("Error", "No se pudieron obtener los administradores");
    }
  };

  const handleModal = () => {
    setIsModalMemberOpen(!isModalMemberOpen);
    formik.resetForm();
  };

  const handleModalEdit = (group) => {
    setIsModalMemberEdit(!isModalMemberEdit);
    setSelectedGroup(group);
    if (group) {
      formik.setValues({
        nombre: group.nombre,
        municipio: group.municipio,
        colonia: group.colonia,
        id_usuario: group.usuario?.id_usuario || '',
      });
    } else {
      formik.resetForm();
    }
  };

  const formik = useFormik({
    initialValues: {
        nombre: '',
        municipio: '',
        colonia: '',
        id_usuario: '',
    },
    validationSchema: yup.object({
        nombre: yup.string().required('Campo obligatorio'),
        municipio: yup.string().required('Campo obligatorio'),
        colonia: yup.string().required('Campo obligatorio'),
        id_usuario: yup.string().required('Selecciona un administrador'),
    }),
    onSubmit: async (values) => {
        alertaPregunta(
            isModalMemberOpen ? "Crear Grupo" : "Editar Grupo",
            "¿Deseas guardar los cambios?",
            async () => {
                try {
                    alertaCargando("Cargando", "Guardando los datos...");
                    if (isModalMemberOpen) {
                        await AxiosClient.post('/grupo/', values);
                        alertaExito("Éxito", "El grupo se creó correctamente");
                        setIsModalMemberOpen(false);
                    } else if (isModalMemberEdit) {
                        await AxiosClient.put(`/grupo/${selectedGroup.id_grupo}`, values);
                        alertaExito("Éxito", "El grupo se actualizó correctamente");
                        setIsModalMemberEdit(false);
                    }
                    getGroups();
                } catch (error) {
                    if (error.response.status === 400) {
                        alertaError("Error", "El Administrador ya tiene un grupo asignado");
                    }
                    if (error.response.status !== 400) {
                      alertaError("Error", "No se pudo guardar el grupo");
                    }
                }
            }
        );
    },
});

  useEffect(() => {
    getGroups();
    getAdministrators();
  }, []);

  return (
    <div className='p-8 font-poppins'>
      <div className='flex justify-between mt-6 mb-4 px-8 py-3'>
        <h2 className='text-2xl font-bold'>Grupos</h2>
        <button
            className='bg_dark_forest text-white px-4 py-2 rounded-lg hover:bg_dark_forest transition flex items-center space-x-2'
          onClick={handleModal}
        >
          <i className="pi pi-plus mr-2"></i> Nuevo Grupo
        </button>
      </div>
      <TableGroups
        members={groups}
        handleModalEdit={handleModalEdit}
      />
      {(isModalMemberOpen || isModalMemberEdit) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" style={{
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        }}>
          <div className="relative bg-white rounded-lg shadow-lg dark:bg-gray-900 w-full max-w-md mx-auto" style={{
            maxHeight: '80vh',
            overflowY: 'auto',
          }}>
            <div className="px-6 py-4">
              <div className="flex justify-end">
                <button
                  onClick={isModalMemberOpen ? handleModal : () => handleModalEdit(null)}
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
                {isModalMemberOpen ? 'Crear Grupo' : 'Editar Grupo'}
              </h1>

              <form onSubmit={formik.handleSubmit} className="space-y-2">
                <div className="relative mb-2">
                  <label className="block mb-2 text-sm font-poppins text-gray-900">Nombre del Grupo:</label>
                  <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.nombre}
                    required
                    className="w-full border border-gray-300 p-2 mb-3 custom-input"
                    placeholder="Nombre del Grupo"
                  />
                  {formik.touched.nombre && formik.errors.nombre && (
                    <div className="text-red-600 text-sm">{formik.errors.nombre}</div>
                  )}
                </div>

                <div className="relative mb-2">
                  <label className="block mb-2 text-sm font-poppins text-gray-900">Municipio:</label>
                  <input
                    type="text"
                    id="municipio"
                    name="municipio"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.municipio}
                    required
                    className="w-full border border-gray-300 p-2 mb-3 custom-input"
                    placeholder="Municipio"
                  />
                  {formik.touched.municipio && formik.errors.municipio && (
                    <div className="text-red-600 text-sm">{formik.errors.municipio}</div>
                  )}
                </div>

                <div className="relative mb-2">
                  <label className="block mb-2 text-sm font-poppins text-gray-900">Colonia:</label>
                  <input
                    type="text"
                    id="colonia"
                    name="colonia"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.colonia}
                    required
                    className="w-full border border-gray-300 p-2 mb-3 custom-input"
                    placeholder="Colonia"
                  />
                  {formik.touched.colonia && formik.errors.colonia && (
                    <div className="text-red-600 text-sm">{formik.errors.colonia}</div>
                  )}
                </div>

                <div className="relative mb-2">
                  <label className="block mb-2 text-sm font-poppins text-gray-900">Administrador:</label>
                  <select
                    id="id_usuario"
                    name="id_usuario"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.id_usuario}
                    required
                    className="w-full border border-gray-300 p-2 mb-3 custom-input"
                    placeholder="Seleccionar Administrador"
                  >
                    <option value="">Seleccionar Administrador</option>
                    {administrators.map((admin) => (
                      <option key={admin.id_usuario} value={admin.id_usuario}>
                        {admin.nombre} {admin.apellido_p} {admin.apellido_m}
                      </option>
                    ))}
                  </select>
                  {formik.touched.id_usuario && formik.errors.id_usuario && (
                    <div className="text-red-600 text-sm">{formik.errors.id_usuario}</div>
                  )}
                </div>

                <div className="flex justify-between items-center mt-4">
                  <button
                    type="button"
                    onClick={isModalMemberOpen ? handleModal : () => handleModalEdit(null)}
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
      )}
    </div>
  );
};

export default Groups;