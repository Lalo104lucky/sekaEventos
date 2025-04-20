import React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

const TableGroups = ({ members, handleModalEdit}) => {

    const actionsBodyTemplate = (rowData) => {
        return (
            <div className="flex space-x-2">
                <button 
                    className="bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500 transition"
                    onClick={()=> handleModalEdit(rowData) }
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

    const rowNumberTemplate = (rowData, { rowIndex }) => {
        return <span>{rowIndex + 1}</span>;
      };

    return (
        <DataTable value={members} className="p-datatable px-8 custom-datatable" paginator rows={7} tableStyle={{ minWidth: '50rem' }}>
            <Column body={rowNumberTemplate} header="#" style={{ width: '20px' }}></Column>
            <Column field="nombre" header="Nombre"></Column>
            <Column field="municipio" header="Municipio"></Column>
            <Column field="colonia" header="Colonia"></Column>
            <Column header="Acciones" body={actionsBodyTemplate}></Column>
        </DataTable>
    );
};

export default TableGroups;