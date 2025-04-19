import React, { useState } from "react";
import { AxiosClient } from "../../../config/http-gateway/http-client";
import { alertaExito, alertaError, alertaCargando } from "../../../config/context/alert";

function EditStatus({ eventId, currentStatus, onClose, onStatusChange }) {
    const [selectedStatus, setSelectedStatus] = useState(currentStatus);

    const statusOptions = [
        { label: "En Ejecución", value: "En Ejecución" },
        { label: "Próximamente", value: "Próximamente" },
        { label: "Finalizado", value: "Finalizado" },
    ];

    const handleSubmit = async () => {
        try {
            alertaCargando("Actualizando estatus...", "Espere un momento");

            await AxiosClient.patch(`/evento/changeStatus/${eventId}`, { estatus: selectedStatus });

            alertaExito("Éxito", "El estatus ha sido actualizado correctamente.");
            onStatusChange(); 
            onClose();
        } catch (error) {
            console.error("Error al actualizar el estatus:", error);
            alertaError("Error", "No se pudo actualizar el estatus del evento.");
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center font-poppins"
        style={{
            backgroundColor: "rgba(0, 0, 0, 0.5)",
        }}
        >
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
                <h2 className="text-xl font-semibold mb-4">Cambiar Estatus del Evento</h2>
                <div className="mb-4">
                    <label className="block mb-2 text-sm font-medium text-gray-700">Selecciona el nuevo estatus:</label>
                    <select
                        value={selectedStatus}
                        onChange={(e) => setSelectedStatus(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg p-2"
                    >
                        {statusOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="flex justify-end space-x-4">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                        Guardar
                    </button>
                </div>
            </div>
        </div>
    );
}

export default EditStatus;