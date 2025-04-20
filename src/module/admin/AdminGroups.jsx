import React, {useEffect, useState} from 'react';
import TableAdminGroups from './components/TableAdminGroups';
import { AxiosClient } from '../../config/http-gateway/http-client';
import { FaUser, FaEnvelope, FaPhone, FaUsers } from 'react-icons/fa';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { alertaExito, alertaError, alertaCargando, alertaPregunta } from '../../config/context/alert';


const AdminGroups = () => {
  const [data, setData] = useState([]);
  const [groups, setGroups] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const [isModalGroup, setisModalGroup] = useState(false);

  const getAdminGroups = async () => {
    try{
      // Realiza las peticiones para obtener administradores y grupos
    const [adminsResponse, groupsResponse] = await Promise.all([
      AxiosClient.get('/usuario/'),
      AxiosClient.get('/grupo/')
    ]);

    const admins = adminsResponse.data.filter(admin => admin.rol.rol === "ADMIN_GROUP");
    const groups = groupsResponse.data;

    // Combina los datos de administradores y grupos
    const adminGroups = admins.map(admin => {
      // Busca si el administrador está asociado a un grupo
      const group = groups.find(group => group.usuario?.id_usuario === admin.id_usuario);

      return {
        ...admin,
        grupo: group ? group.nombre : "Sin grupo"
      };
    });
      console.log(adminGroups);
      setData(adminGroups);
      setGroups(groups);
    }catch(error){
      console.error('Error fetching administradores:', error);
    }
  }
    
    const handleAddModal = () => {
      setIsModalOpen(!isModalOpen);
      formik.resetForm();
    };

    const handleEditModal = (event) => {
      setIsModalEditOpen(!isModalEditOpen);
      formikEdit.resetForm();
      formikEdit.setValues({
        id: event.id_usuario,
        usuario: event.usuario,
        nombre: event.nombre,
        apellido1: event.apellido_m,
        apellido2: event.apellido_p,
        correo: event.correo,
        telefono: event.telefono,
        grupo: event.grupo  
    })
    }

    const formik = useFormik({
      initialValues: {
          usuario: '',
          nombre: '',
          apellido1: '',
          apellido2: '',
          correo: '',
          telefono: '',
          contraseña: '',
          confirmarContraseña: '',
      },
      validationSchema: yup.object({
          usuario: yup.string().max(50, "No debe exceder los 50 caracteres").required("Campo obligatorio"),
          nombre: yup.string().max(50, "No debe exceder los 50 caracteres").required("Campo obligatorio"),
          apellido1: yup.string().max(50, "No debe exceder los 50 caracteres").required("Campo obligatorio"),
          apellido2: yup.string().max(50, "No debe exceder los 50 caracteres").required("Campo obligatorio"),
          correo: yup.string().email("Correo inválido").required("Campo obligatorio"),
          telefono: yup.string().matches(/^\d{10}$/, "Debe ser un número de 10 dígitos").required("Campo obligatorio"),
          contraseña: yup.string().min(6, "Debe tener al menos 6 caracteres").required("Campo obligatorio"),
          confirmarContraseña: yup
              .string()
              .oneOf([yup.ref('contraseña'), null], "Las contraseñas no coinciden")
              .required("Campo obligatorio"),
      }),
      onSubmit: async (values) => {
          alertaPregunta(
              "Crear Administrador",
              `¿Estás seguro de que deseas crear el administrador "${values.usuario}"?`,
              async () => {
                  try {
                      alertaCargando("Cargando", "Guardando los datos...");
                      await AxiosClient.post('/usuario/', {
                          usuario: values.usuario,
                          nombre: values.nombre,
                          apellido_p: values.apellido1,
                          apellido_m: values.apellido2,
                          correo: values.correo,
                          telefono: values.telefono,
                          contrasena: values.contraseña,
                          id_rol: 2,
                      });
                      alertaExito("Éxito", "El administrador se creó correctamente");
                      getAdminGroups();
                      handleAddModal();
                  } catch (error) {
                      console.error('Error creando administrador:', error);
                      alertaError("Error", "Algo salió mal al crear el administrador");
                  }
              },
              () => {
                  alertaError("Cancelado", "La creación fue cancelada");
              }
          );
      },
  });
  
  const formikEdit = useFormik({
      initialValues: {
          id: '',
          usuario: '',
          nombre: '',
          apellido1: '',
          apellido2: '',
          correo: '',
          telefono: '',
      },
      validationSchema: yup.object({
          usuario: yup.string().max(50, "No debe exceder los 50 caracteres").required("Campo obligatorio"),
          nombre: yup.string().max(50, "No debe exceder los 50 caracteres").required("Campo obligatorio"),
          apellido1: yup.string().max(50, "No debe exceder los 50 caracteres").required("Campo obligatorio"),
          apellido2: yup.string().max(50, "No debe exceder los 50 caracteres").required("Campo obligatorio"),
          correo: yup.string().email("Correo inválido").required("Campo obligatorio"),
          telefono: yup.string().matches(/^\d{10}$/, "Debe ser un número de 10 dígitos").required("Campo obligatorio"),
      }),
      onSubmit: async (values) => {
          alertaPregunta(
              "Editar Administrador",
              `¿Estás seguro de que deseas actualizar el administrador "${values.usuario}"?`,
              async () => {
                  try {
                      alertaCargando("Cargando", "Guardando los datos...");
                      await AxiosClient.put(`/usuario/${values.id}`, {
                          id_usuario: values.id,
                          usuario: values.usuario,
                          nombre: values.nombre,
                          apellido_p: values.apellido1,
                          apellido_m: values.apellido2,
                          correo: values.correo,
                          telefono: values.telefono,
                          id_rol: 2,
                      });
                      alertaExito("Éxito", "El administrador se actualizó correctamente");
                      getAdminGroups();
                      setIsModalEditOpen(false);
                  } catch (error) {
                      console.error('Error actualizando administrador:', error);
                      alertaError("Error", "Algo salió mal al actualizar el administrador");
                  }
              },
              () => {
                  alertaError("Cancelado", "La actualización fue cancelada");
              }
          );
      },
  });

      useEffect(()=>{
        getAdminGroups()
      }, [])

  return (
    <div className='p-8 font-poppins'>
      <div className='flex justify-between mt-6 mb-4 px-8 py-3'>
        <h2 className='text-2xl font-bold'>Administradores de Grupos</h2>
        <button 
          className='bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-900 transition'
          onClick={handleAddModal}
        >
            Crear Nuevo Administrador de Grupo
        </button>
      </div>
      <TableAdminGroups administradores={data} editAdmin={handleEditModal} grupos={groups}/>
      {isModalOpen && (
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
                  onClick={handleAddModal}
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
                Crear Administrador
              </h1>

              <form onSubmit={formik.handleSubmit} className="space-y-2">
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
                  <label className="block mb-2 text-sm font-poppins text-gray-900">Apellido Materno:</label>
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
                    placeholder="Correo"
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
                  <input
                    type="password"
                    id="contraseña"
                    name="contraseña"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.contraseña}
                    required
                    className="w-full border border-gray-300 p-2 mb-3 custom-input"
                    placeholder="Contraseña"
                  />
                  {formik.touched.contraseña && formik.errors.contraseña && (
                    <div className="text-red-600 text-sm">{formik.errors.contraseña}</div>
                  )}
                </div>

                <div className="relative mb-2">
                  <label className="block mb-2 text-sm font-poppins text-gray-900">Confirmar Contraseña:</label>
                  <input
                    type="password"
                    id="confirmarContraseña"
                    name="confirmarContraseña"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.confirmarContraseña}
                    required
                    className="w-full border border-gray-300 p-2 mb-3 custom-input"
                    placeholder="Confirmar Contraseña"
                  />
                  {formik.touched.confirmarContraseña && formik.errors.confirmarContraseña && (
                    <div className="text-red-600 text-sm">{formik.errors.confirmarContraseña}</div>
                  )}
                </div>


                <div className="flex justify-between items-center mt-4">
                  <button
                    type="button"
                    onClick={handleAddModal}
                    className="text-gray-500 hover:text-gray-700 hover:bg-gray-100 font-poppins font-medium rounded-lg text-sm px-5 py-2.5 dark:text-white dark:hover:bg-gray-800"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="text-white bg-custom-green hover:bg-green-700 focus:ring-1 focus:outline-none focus:ring-teal-300 font-medium rounded-lg text-sm px-5 py-2.5"
                  >
                    Crear
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      {isModalEditOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
        >
          <div
            className="relative bg-white rounded-lg shadow-lg dark:bg-gray-900 w-full max-w-md mx-auto"
            style={{
              maxHeight: "80vh",
              overflowY: "auto",
            }}>
            <div className="px-6 py-4">
              <div className="flex justify-end">
                        <button
                          onClick={handleEditModal}
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
                  <h2 className="text-xl font-bold mb-4">Editar Administrador</h2>
            <form onSubmit={formikEdit.handleSubmit} className="space-y-2">
              <div className="relative mb-2">
                <label className="block mb-2 text-sm font-poppins text-gray-900">
                  Usuario:
                </label>
                <input
                  type="text"
                  name="usuario"
                  placeholder="Usuario"
                  className="w-full p-2 border border-gray-300 rounded mb-4"
                  value={formikEdit.values.usuario}
                  onChange={formikEdit.handleChange}
                  onBlur={formikEdit.handleBlur}
                />
                {formikEdit.touched.usuario && formikEdit.errors.usuario && (
                  <div className="text-red-600 text-sm">{formikEdit.errors.usuario}</div>
                )}
              </div>

              <div className="relative mb-2">
                <label className="block mb-2 text-sm font-poppins text-gray-900">
                  Nombre:
                </label>
                <input
                  type="text"
                  name="nombre"
                  placeholder="Nombre"
                  className="w-full p-2 border border-gray-300 rounded mb-4"
                  value={formikEdit.values.nombre}
                  onChange={formikEdit.handleChange}
                  onBlur={formikEdit.handleBlur}
                />
                {formikEdit.touched.nombre && formikEdit.errors.nombre && (
                  <div className="text-red-600 text-sm">{formikEdit.errors.nombre}</div>
                )}
              </div>

              <div className="relative mb-2">
                <label className="block mb-2 text-sm font-poppins text-gray-900">
                  Apellido Paterno:
                </label>
                <input
                  type="text"
                  name="apellido1"
                  placeholder="Apellido Paterno"
                  className="w-full p-2 border border-gray-300 rounded mb-4"
                  value={formikEdit.values.apellido1}
                  onChange={formikEdit.handleChange}
                  onBlur={formikEdit.handleBlur}
                />
                {formikEdit.touched.apellido1 && formikEdit.errors.apellido1 && (
                  <div className="text-red-600 text-sm">{formikEdit.errors.apellido1}</div>
                )}
              </div>

              <div className="relative mb-2">
                <label className="block mb-2 text-sm font-poppins text-gray-900">
                  Apellido Materno:
                </label>
                <input
                  type="text"
                  name="apellido2"
                  placeholder="Apellido Materno"
                  className="w-full p-2 border border-gray-300 rounded mb-4"
                  value={formikEdit.values.apellido2}
                  onChange={formikEdit.handleChange}
                  onBlur={formikEdit.handleBlur}
                />
                {formikEdit.touched.apellido2 && formikEdit.errors.apellido2 && (
                  <div className="text-red-600 text-sm">{formikEdit.errors.apellido2}</div>
                )}
              </div>

              <div className="relative mb-2">
                <label className="block mb-2 text-sm font-poppins text-gray-900">
                  Correo Electrónico:
                </label>
                <input
                  type="email"
                  name="correo"
                  placeholder="Correo Electrónico"
                  className="w-full p-2 border border-gray-300 rounded mb-4"
                  value={formikEdit.values.correo}
                  onChange={formikEdit.handleChange}
                  onBlur={formikEdit.handleBlur}
                />
                {formikEdit.touched.correo && formikEdit.errors.correo && (
                  <div className="text-red-600 text-sm">{formikEdit.errors.correo}</div>
                )}
              </div>

              <div className="relative mb-2">
                <label className="block mb-2 text-sm font-poppins text-gray-900">
                  Teléfono:
                </label>
                <input
                  type="text"
                  name="telefono"
                  placeholder="Teléfono"
                  className="w-full p-2 border border-gray-300 rounded mb-4"
                  value={formikEdit.values.telefono}
                  onChange={formikEdit.handleChange}
                  onBlur={formikEdit.handleBlur}
                />
                {formikEdit.touched.telefono && formikEdit.errors.telefono && (
                  <div className="text-red-600 text-sm">{formikEdit.errors.telefono}</div>
                )}
              </div>

              <div className="flex justify-between">
                <button
                  type="button"
                  className="text-black px-4 py-2 rounded hover:bg-gray-400 transition"
                  onClick={() => setIsModalEditOpen(false)}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-custom-green text-white px-4 py-2 rounded hover:bg-green-600 transition"
                >
                  Guardar
                </button>
              </div>
            </form>
              </div>
            
            
          </div>
        </div>
      )}
      {isModalGroup && (
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
                  onClick={() => setisModalGroup(false)}
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
                Crear Administrador
              </h1>

              
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminGroups