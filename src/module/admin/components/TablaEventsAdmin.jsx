import React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dropdown } from 'primereact/dropdown';
import { format } from 'date-fns'
import fondo from '../../../assets/img/fondo.png';

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
    if (rowData.estatus === 'En Ejecución') statusClass = 'bg-custom-green text-white text-center';
    else if (rowData.estatus === 'Próximamente') statusClass = 'bg-custom-yellow text-gray-900';
    else if (rowData.estatus === 'Finalizado') statusClass = 'bg-custom-red text-white';

    return (
      <span
        className={`px-2 py-2 rounded-full text-sm ${statusClass}`}
        style={{
          display: 'inline-block',
          width: '120px', // Ancho fijo para todos los estados
          textAlign: 'center', // Centrado del texto
        }}
      >
        {rowData.estatus}
      </span>
    );
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

    const dateBodyTemplate = (rowData) => {
        return format(new Date(rowData.fecha), 'dd/MM/yyyy HH:mm');
      };

    const rowNumberTemplate = (rowData, { rowIndex }) => {
      return <span>{rowIndex + 1}</span>;
    };
  

  return (
    <DataTable value={events} className="p-datatable px-8 custom-datatable" paginator rows={7} tableStyle={{ minWidth: '50rem' }}>
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
    </DataTable>
  );
};

export default TablaEventsAdmin;