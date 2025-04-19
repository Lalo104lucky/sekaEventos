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
            <div
                className="relative bg-white rounded-lg shadow-lg dark:bg-gray-900 w-full max-w-md mx-auto"
                style={{
                    maxHeight: "80vh",
                    overflowY: "auto",
                }}
            >
                <div className="px-6 py-4">
                    <div className="flex justify-end">
                        <button
                            onClick={onClose}
                            type="button"
                            className="text-sm font-medium text-gray-900 rounded-lg"
                        >
                            <svg
                                className="w-6 h-6 text-gray-800 dark:text-white"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    <h2 className="font-semibold text-xl text-start font-poppins text-black mb-6">Cambiar Estatus del Evento</h2>
                    <div className="mb-4">
                        <label className="block mb-2 text-sm font-poppins text-gray-900">Selecciona el nuevo estatus:</label>
                        <select
                            value={selectedStatus}
                            onChange={(e) => setSelectedStatus(e.target.value)}
                            className="w-full border border-gray-300 p-2 mb-3 custom-input"
                        >
                            {statusOptions.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="flex justify-between items-center mt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="text-gray-500 hover:text-gray-700 hover:bg-gray-100 font-poppins font-medium rounded-lg text-sm px-5 py-2.5 dark:text-white dark:hover:bg-gray-800"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            onClick={handleSubmit}
                            className="text-white bg-custom-green hover:bg-green-700 focus:ring-1 focus:outline-none focus:ring-teal-300 font-medium rounded-lg text-sm px-5 py-2.5"
                        >
                            Guardar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EditStatus;