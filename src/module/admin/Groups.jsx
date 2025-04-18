import React, {useEffect, useState} from 'react'
import TableGroups from './components/TableGroups'
import AxiosClient from '../../config/http-gateway/http-client'

const Groups = () => {
  const [isModalMemberOpen, setIsModalMemberOpen] = useState(false);
  const [isModalMemberEdit, setIsModalMemberEdit] = useState(false);
  const [groups, setGroups] = useState([]);
  
  const handleModal = () => {
    setIsModalMemberOpen(!isModalMemberOpen);
  }

  const handleModalEdit = () => {
    setIsModalMemberEdit(!isModalMemberEdit);
  }

  const handleAdminModal = () =>{
    setIsModalAdminOpen(!isModalAdminOpen);
  }

  const getGroups = async () => {
    try {
      const response = await AxiosClient.get('/grupo/');
      
      setGroups(response.data);
      console.log(response);
    } catch (error) {
      console.error('Error fetching groups:', error);
    }
  }

  useEffect(() => {
    getGroups();
  }, []);

  return (
    <div className='p-8 font-poppins'>
      <div className='flex justify-between mt-6 mb-4 px-8 py-3'>
        <h2 className='text-2xl font-bold'>Grupos</h2>
        <button 
          className='bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-900 transition'
          onClick={handleModal}
          >
            Crear Nuevo Grupo
        </button>
      </div>
      <TableGroups 
        members={groups}
        handleModalEdit={handleModalEdit}
        handleAdminModal={handleAdminModal}
      />
      {
        isModalMemberOpen && (
          <div className="fixed inset-0 flex items-center justify-center z-2">
            <div className="bg-white p-6 rounded shadow-lg w-2/3">
              <h2 className="text-xl font-bold mb-4">Agregar Grupo</h2>
              <form>
                <div className="mb-4">
                  <label className="block text-gray-700">Nombre del Grupo</label>
                  <input type="text" className="border rounded w-full py-2 px-3" required />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">Municipio</label>
                  <input type="text" className="border rounded w-full py-2 px-3" required />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">Colonia</label>
                  <input type="text" className="border rounded w-full py-2 px-3" required />
                </div>
                <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition">Agregar</button>
              </form>
              <button onClick={handleModal} className='mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition'>Cerrar</button>
            </div>
          </div>
        )
      }
      {
        isModalMemberEdit && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded shadow-lg w-1/3">
              <h2 className="text-xl font-bold mb-4">Actualizar Grupo</h2>
              <form>
                <div className="mb-4">
                  <label className="block text-gray-700">Nombre del Grupo</label>
                  <input type="text" className="border rounded w-full py-2 px-3" required />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">Municipio</label>
                  <input type="text" className="border rounded w-full py-2 px-3" required />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">Colonia</label>
                  <input type="text" className="border rounded w-full py-2 px-3" required />
                </div>
                <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition">Agregar</button>
              </form>
              <button onClick={handleModalEdit} className='mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition'>Cerrar</button>
            </div>
          </div>
        )
      }
    </div>   
  )
}

export default Groups