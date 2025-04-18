import React, { useState } from "react";
import { AxiosFormClient } from "../../../config/http-gateway/http-client";
import { alertaExito, alertaError, alertaCargando, alertaPregunta } from "../../../config/context/alert";

function CrearEventoModal({ onClose }) {
    const [formData, setFormData] = useState({
        titulo: "",
        fecha: "",
        estatus: "ACTIVO",
        id_usuario: 2,
        id_tipoevento: 1,
    });
    const [imagen, setImagen] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        setImagen(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!imagen) {
            alertaError("Falta imagen", "Debes seleccionar una imagen.");
            return;
        }

        alertaPregunta("¿Estás seguro?", "¿Deseas crear el evento?", async () => {
            try {
                alertaCargando("Creando evento...", "Espere un momento");
                const body = new FormData();
                body.append("eventoDTO", new Blob([JSON.stringify(formData)], { type: "application/json" }));
                body.append("imagen", imagen);
                const response = await AxiosFormClient.post("/evento/", body);

                alertaExito("Éxito", "Evento creado correctamente");
                console.log("Respuesta:", response.data);
                onClose();
            } catch (error) {
                console.error("Error al crear el evento:", error);
                alertaError("Error", "No se pudo crear el evento");
            }
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 p-4">
            <input type="text" name="titulo" placeholder="Título del evento" onChange={handleChange} className="border p-2 w-full" />
            <input type="datetime-local" name="fecha" onChange={handleChange} className="border p-2 w-full" />
            <input type="file" accept="image/*" onChange={handleImageChange} className="border p-2 w-full" />
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Crear Evento</button>
        </form>
    );
}

export default CrearEventoModal;
