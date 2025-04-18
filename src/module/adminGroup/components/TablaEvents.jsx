import React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dropdown } from 'primereact/dropdown';

const TablaEvents = ({
  events,
  selectedStatus,
  setSelectedStatus,
  selectedCategory,
  setSelectedCategory,
  statusOptions,
  categoryOptions,
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
        placeholder="Seleccionar Categoría"
        className="p-column-filter"
        showClear
      />
    );
  };

  const statusBodyTemplate = (rowData) => {
    let statusClass = '';
    if (rowData.status === 'En Ejecución') statusClass = 'bg-custom-green text-white text-center';
    else if (rowData.status === 'Próximamente') statusClass = 'bg-custom-yellow text-gray-900';
    else if (rowData.status === 'Finalizado') statusClass = 'bg-custom-red text-white';

    return (
      <span
        className={`px-2 py-2 rounded-full text-sm ${statusClass}`}
        style={{
          display: 'inline-block',
          width: '120px', // Ancho fijo para todos los estados
          textAlign: 'center', // Centrado del texto
        }}
      >
        {rowData.status}
      </span>
    );
  };

  const actionsBodyTemplate = () => {
    return (
      <div className="flex space-x-2">
        <button className="bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500 transition">
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
        <button className="bg-red-700 text-white px-3 py-1 rounded hover:bg-red-800 transition">
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

  return (
    <DataTable value={events} className="p-datatable px-8 custom-datatable" paginator rows={10} tableStyle={{ minWidth: '50rem' }}>
      <Column field="id" header="#" style={{ width: '20px' }}></Column>
      <Column field="title" header="Título"></Column>
      <Column field="date" header="Fecha y Hora"></Column>
      <Column field="location" header="Ubicación"></Column>
      <Column
        field="category"
        header="Tipo de Evento"
        filter
        filterElement={tipeFilter}
        showFilterMenuOptions={false}
        showApplyButton={false}
      ></Column>
      <Column
        field="status"
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