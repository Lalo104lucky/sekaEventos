import React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

const TableAdminGroups = ({administradores}) => {
    
    const fullNameBodyTemplate = (rowData) => {
        return `${rowData.nombre} ${rowData.apellido_p} ${rowData.apellido_m}`;
    };

    const actionsBodyTemplate = () => {
        return (
            <div className="flex space-x-2">
                <button 
                    className="bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500 transition"
                    //onClick={handleModalEdit}
                >
                    <svg
                        className="w-5 h-5 text-white"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z"
                        />
                    </svg>
                </button>
            </div>
        );
    };

    return (
        <DataTable value={administradores} className="p-datatable px-8 custom-datatable" paginator rows={7} tableStyle={{ minWidth: '50rem' }}>
            <Column field="id" header="#" style={{ width: '20px' }}></Column>
            <Column header="Nombre completo" body={fullNameBodyTemplate}></Column>
            <Column field="correo" header="Correo Electronico"></Column>
            <Column field="telefono" header="Telefono"></Column>
            <Column field="grupo" header="Grupo"></Column>
            <Column header="Acciones" body={actionsBodyTemplate}></Column>
        </DataTable>
    )
}

export default TableAdminGroups