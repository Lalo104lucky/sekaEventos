import React, { useEffect, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { AxiosClient } from '../../config/http-gateway/http-client';
import { alertaError } from '../../config/context/alert';
import { format } from 'date-fns';

const Bitacora = () => {
    const [bitacora, setBitacora] = useState([]);

    const fetchBitacora = async () => {
        try {
            const response = await AxiosClient.get('bitacora/');
            const sortedData = response.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
            const uniqueData = sortedData.filter((item, index, self) =>
                index === self.findIndex((t) => (
                    t.metodo === item.metodo &&
                    t.endpoint === item.endpoint &&
                    Math.floor(new Date(t.fecha).getTime() / 1000) === Math.floor(new Date(item.fecha).getTime() / 1000)
                ))
            );
            setBitacora(uniqueData);
        } catch (error) {
            alertaError("Error", "No se pudo cargar la bitácora.");
        }
    };

    useEffect(() => {
        fetchBitacora();
        return () => {
            setBitacora([]); 
        }
    }, []);

    const dateBodyTemplate = (rowData) => {
        const formattedDate = format(new Date(rowData.fecha), 'dd/MM/yyyy HH:mm:ss');
        return <span>{formattedDate}</span>;
    };

    const rowNumberTemplate = (rowData, { rowIndex }) => {
        return <span>{rowIndex + 1}</span>;
    };

    return (
        <div className="p-8 font-poppins">
            <h2 className="text-2xl font-bold mb-4 px-8">Bitácora</h2>
            <DataTable value={bitacora} className="p-datatable px-8 custom-datatable" paginator rows={10} tableStyle={{ minWidth: '50rem' }}>
                <Column body={rowNumberTemplate} header="#" style={{ width: '50px' }}></Column>
                <Column field="metodo" header="Método"></Column>
                <Column field="endpoint" header="Endpoint"></Column>
                <Column field="usuario" header="Usuario"></Column>
                <Column header="Fecha" body={dateBodyTemplate}></Column>
            </DataTable>
        </div>
    );
};

export default Bitacora;