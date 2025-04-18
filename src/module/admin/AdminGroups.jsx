import React, {useEffect, useState} from 'react';
import TableAdminGroups from './components/TableAdminGroups';
import { AxiosClient } from '../../config/http-gateway/http-client';


const AdminGroups = () => {
    const [data, setData] = useState([]);
    
    const getAdministradores = async () => {
        try{
          const response = await AxiosClient.get('/usuario/');
          const administradores = response.data.filter(user => user.rol.rol === "ADMIN_GROUP");
          setData(administradores);
        }catch(error){
          console.error('Error fetching administradores:', error);
        }
      };

      useEffect(()=>{
        getAdministradores()
      }, [])

  return (
    <div className='p-8 font-poppins'>
      <div className='flex justify-between mt-6 mb-4 px-8 py-3'>
        <h2 className='text-2xl font-bold'>Administradores de Grupos</h2>
        <button 
          className='bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-900 transition'
          //onClick={handleModal}
          >
            Crear Nuevo Administrador de Grupo
        </button>
      </div>
      <TableAdminGroups administradores={data}/>
    </div>
  )
}

export default AdminGroups