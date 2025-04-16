import React from 'react'
import TableAdminGroups from './components/TableAdminGroups'

const AdminGroups = () => {
    const administradores = [
        {
          id: 1,
          nombre: "Maximiliano",
          apellido_p: "González",
          apellido_m: "García",
          telefono: "7771234567",
          correo: "maximus_garcia@gmail.com",
          grupo: "Grupo Ambiental A"
        },
        {
          id: 2,
          nombre: "Lucía",
          apellido_p: "Martínez",
          apellido_m: "Hernández",
          telefono: "5559876543",
          correo: "lucia_martinez@gmail.com",
          grupo: "Grupo Ambiental B"
        },
        {
          id: 3,
          nombre: "Sofía",
          apellido_p: "López",
          apellido_m: "Pérez",
          telefono: "3334567890",
          correo: "sofia_lopez@gmail.com",
          grupo: "Grupo Ambiental C"
        },
        {
          id: 4,
          nombre: "Carlos",
          apellido_p: "Ramírez",
          apellido_m: "Torres",
          telefono: "4441239876",
          correo: "carlos_ramirez@gmail.com",
          grupo: "Grupo Ambiental D"
        },
        {
          id: 5,
          nombre: "Fernanda",
          apellido_p: "Gómez",
          apellido_m: "Sánchez",
          telefono: "2227894561",
          correo: "fernanda_gomez@gmail.com",
          grupo: "Grupo Ambiental E"
        },
        {
          id: 6,
          nombre: "Alejandro",
          apellido_p: "Morales",
          apellido_m: "Castro",
          telefono: "7776543210",
          correo: "alejandro_morales@gmail.com",
          grupo: "Grupo Ambiental F"
        },
        {
          id: 7,
          nombre: "Valeria",
          apellido_p: "Hernández",
          apellido_m: "Ortiz",
          telefono: "8883216547",
          correo: "valeria_hernandez@gmail.com",
          grupo: "Grupo Ambiental G"
        },
        {
          id: 8,
          nombre: "Diego",
          apellido_p: "Vargas",
          apellido_m: "Rojas",
          telefono: "6669871234",
          correo: "diego_vargas@gmail.com",
          grupo: "Grupo Ambiental H"
        },
        {
          id: 9,
          nombre: "Mariana",
          apellido_p: "Cruz",
          apellido_m: "Flores",
          telefono: "9994567891",
          correo: "mariana_cruz@gmail.com",
          grupo: "Grupo Ambiental I"
        },
        {
          id: 10,
          nombre: "Javier",
          apellido_p: "Mendoza",
          apellido_m: "Luna",
          telefono: "1112345678",
          correo: "javier_mendoza@gmail.com",
          grupo: "Grupo Ambiental J"
        },
        {
          id: 11,
          nombre: "Isabella",
          apellido_p: "Reyes",
          apellido_m: "Navarro",
          telefono: "5556781234",
          correo: "isabella_reyes@gmail.com",
          grupo: "Grupo Ambiental K"
        }
      ];    
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
      <TableAdminGroups administradores={administradores}/>
    </div>
  )
}

export default AdminGroups