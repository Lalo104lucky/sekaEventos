import React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dropdown } from 'primereact/dropdown';

const TablaEventsAdmin = ({
  events,
  selectedStatus,
  setSelectedStatus,
  selectedCategory,
  setSelectedCategory,
  statusOptions,
  category,
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
        options={category}
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

  return (
    <DataTable value={events} className="p-datatable px-8 custom-datatable" paginator rows={7} tableStyle={{ minWidth: '50rem' }}>
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
    </DataTable>
  );
};

export default TablaEventsAdmin;