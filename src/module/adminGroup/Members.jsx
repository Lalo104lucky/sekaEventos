import React, { useState } from 'react'
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import TableMembers from './components/TableMembers';

function Members() {

  const members = [
    {
      id: 1,
      usuario: "Matsuri",
      nombre: "Maximiliano",
      apellido_p: "González",
      apellido_m: "García",
      telefono: "7771234567",
      correo: "maximus_garcia@gmail.com"
    },
    {
      id: 2,
      usuario: "Luna",
      nombre: "Lucía",
      apellido_p: "Martínez",
      apellido_m: "Hernández",
      telefono: "5559876543",
      correo: "lucia_martinez@gmail.com",
    },
    {
      id: 3,
      usuario: "Solaris",
      nombre: "Sofía",
      apellido_p: "López",
      apellido_m: "Pérez",
      telefono: "3334567890",
      correo: "sofia_lopez@gmail.com",
    },
    {
      id: 4,
      usuario: "Shadow",
      nombre: "Carlos",
      apellido_p: "Ramírez",
      apellido_m: "Torres",
      telefono: "4441239876",
      correo: "carlos_ramirez@gmail.com",
    },
    {
      id: 5,
      usuario: "Phoenix",
      nombre: "Fernanda",
      apellido_p: "Gómez",
      apellido_m: "Sánchez",
      telefono: "2227894561",
      correo: "fernanda_gomez@gmail.com",
    },
    {
      id: 6,
      usuario: "Starlight",
      nombre: "Alejandro",
      apellido_p: "Morales",
      apellido_m: "Castro",
      telefono: "7776543210",
      correo: "alejandro_morales@gmail.com",
    },
    {
      id: 7,
      usuario: "Nova",
      nombre: "Valeria",
      apellido_p: "Hernández",
      apellido_m: "Ortiz",
      telefono: "8883216547",
      correo: "valeria_hernandez@gmail.com",
    },
    {
      id: 8,
      usuario: "Comet",
      nombre: "Diego",
      apellido_p: "Vargas",
      apellido_m: "Rojas",
      telefono: "6669871234",
      correo: "diego_vargas@gmail.com",
    },
    {
      id: 9,
      usuario: "Aurora",
      nombre: "Mariana",
      apellido_p: "Cruz",
      apellido_m: "Flores",
      telefono: "9994567891",
      correo: "mariana_cruz@gmail.com",
    },
    {
      id: 10,
      usuario: "Orion",
      nombre: "Javier",
      apellido_p: "Mendoza",
      apellido_m: "Luna",
      telefono: "1112345678",
      correo: "javier_mendoza@gmail.com",
    },
    {
      id: 11,
      usuario: "Lyra",
      nombre: "Isabella",
      apellido_p: "Reyes",
      apellido_m: "Navarro",
      telefono: "5556781234",
      correo: "isabella_reyes@gmail.com",
    },
  ];
  return (
    <>
      <div className="px-8 font-poppins">
        <div className="flex justify-between mt-6 mb-4 px-8 py-3">
          <h2 className="font-poppins text-3xl font-semibold">Miembros</h2>
          <button className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-900 transition">
            <i className="pi pi-plus mr-2"></i> Nuevo Miembro
          </button>
        </div>

        <TableMembers members={members} />

      </div>
    </>
  )
}

export default Members
