import React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dropdown } from 'primereact/dropdown';
import { format } from 'date-fns'
import fondo from '../../../assets/img/fondo.png';

const TablaEvents = ({
  events,
  selectedStatus,
  setSelectedStatus,
  selectedCategory,
  setSelectedCategory,
  statusOptions,
  categoryOptions,
  onEdit,
  onDelete,
  onEditStatus,
}) => {
  const statusFilterTemplate = (options) => {
    return (
      <Dropdown
        value={selectedStatus}
        options={statusOptions}
        onChange={(e) => {
          setSelectedStatus(e.value);
          options.filterApplyCallback(e.value);
        }}
        placeholder="Seleccionar Estado"
        className="p-column-filter"
        showClear
      />
    );
  };

  const tipeFilter = (options) => {
    return (
      <Dropdown
        value={selectedCategory}
        options={categoryOptions}
        onChange={(e) => {
          setSelectedCategory(e.value);
          options.filterApplyCallback(e.value);
        }}
        placeholder="Seleccionar Estado"
        className="p-column-filter"
        showClear
      />
    );
  };

  const dateBodyTemplate = (rowData) => {
    return format(new Date(rowData.fecha), 'dd/MM/yyyy HH:mm');
  };

  const statusBodyTemplate = (rowData) => {
    let statusClass = '';
    if (rowData.estatus === 'En Ejecución') statusClass = 'bg-custom-green text-white text-center';
    else if (rowData.estatus === 'Próximamente') statusClass = 'bg-custom-yellow text-gray-900';
    else if (rowData.estatus === 'Finalizado') statusClass = 'bg-custom-red text-white';

    return (
      <span
        className={`px-2 py-2 rounded-full text-sm ${statusClass}`}
        style={{
          display: 'inline-block',
          width: '120px',
          textAlign: 'center',
        }}
      >
        {rowData.estatus}
      </span>
    );
  };

  const actionsBodyTemplate = (rowData) => {
    return (
      <div className="flex space-x-2">
        <button
          className="bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500 transition"
          onClick={() => onEdit(rowData.id_evento)}
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
        <button 
          className="bg-red-700 text-white px-3 py-1 rounded hover:bg-red-800 transition"
          onClick={() => onDelete(rowData.id_evento)}  
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
              d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"
            />
          </svg>
        </button>
      </div>
    );
  };

  const rowNumberTemplate = (rowData, { rowIndex }) => {
    return <span>{rowIndex + 1}</span>;
  };

  const imageBodyTemplate = (rowData) => {
    const imageUrl = `http://localhost:8080/api/evento/path/${rowData.imagen}`;
    return (
      <img
        src={imageUrl}
        alt={rowData.titulo}
        className="w-10 h-10 object-cover rounded-lg"
        onError={(e) => (e.target.src = { fondo })}
      />
    );
  };

  return (
    <DataTable value={events} className="p-datatable px-8 custom-datatable" paginator rows={6} tableStyle={{ minWidth: '50rem' }}>
      <Column body={rowNumberTemplate} header="#" style={{ width: '20px' }}></Column>
      <Column field="imagen" header="Imagen" body={imageBodyTemplate}></Column>
      <Column field="titulo" header="Título"></Column>
      <Column field="fecha" header="Fecha y Hora" body={dateBodyTemplate}></Column>
      <Column
        field="tipoEvento.nombre"
        header="Tipo de Evento"
        filter
        filterElement={tipeFilter}
        showFilterMenuOptions={false}
        showApplyButton={false}
      ></Column>
      <Column
        field="estatus"
        header="Estado"
        body={statusBodyTemplate}
        filter
        filterElement={statusFilterTemplate}
        showFilterMenuOptions={false}
        showApplyButton={false}
      ></Column>
      <Column header="Acciones" body={actionsBodyTemplate}></Column>
    </DataTable>
  );
};

export default TablaEvents;