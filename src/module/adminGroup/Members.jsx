import React, { useState, useEffect } from "react";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import TableMembers from "./components/TableMembers";
import AddMembers from "./components/AddMembers";
import { AxiosClient } from "../../config/http-gateway/http-client";
import EditMember from "./components/EditMember";
import { alertaCargando, alertaError, alertaExito, alertaPregunta } from "../../config/context/alert";

function Members() {
  const [members, setMembers] = useState([]);
  const [showAddMemberModal, setShowAddMemberModal] = useState(false);
  const [grupoId, setGrupoId] = useState(null);
  const [showEditMemberModal, setShowEditMemberModal] = useState(false);
  const [selectedMemberId, setSelectedMemberId] = useState(null);
  const [loading, setLoading] = useState(false);


  const fetchGrupoId = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const userId = user?.usuario?.id_usuario;

      if (userId) {
        const response = await AxiosClient.get(`/grupo/`);
        const filteredGroup = response.data.find(
          (group) => group.usuario.id_usuario === userId
        );
        setGrupoId(filteredGroup.id_grupo);
      }
    } catch (error) {
      alertaError("Error", "No se pudo cargar el grupo seleccionado.");
    }
  };

  const fetchMembers = async () => {
    setLoading(true);
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const adminGroupId = user?.usuario?.id_usuario;

      const response = await AxiosClient.get("/usuario/");
      const filteredMembers = response.data.filter(
        (member) =>
          member.rol.rol === "USER" && member.grupo?.usuario?.id_usuario === adminGroupId
      );

      setMembers(filteredMembers);
    } catch (error) {
      alertaError("Error", "No se pudo cargar los miembros.");
    } finally {
      setLoading(false);
    }
  };

  const handleEditMember = (memberId) => {
    setSelectedMemberId(memberId);
    setShowEditMemberModal(true);
  };

  const handleDeleteMember = async (memberId) => {
    alertaPregunta(
        "¿Estás seguro?",
        "Esta acción no se puede deshacer. ¿Deseas eliminar este miembro?",
        async () => {
            try {
                alertaCargando("Eliminando miembro...", "Por favor espera un momento.");
                await AxiosClient.delete(`/usuario/${memberId}`);

                alertaExito("Éxito", "El miembro ha sido eliminado correctamente.");
                fetchMembers(); 
            } catch (error) {
                alertaError("Error", "No se pudo eliminar el miembro.");
            }
        }
    );
};

  useEffect(() => {
    fetchGrupoId();
    fetchMembers();
    return () => {
      setMembers([]);
      setGrupoId(null);
    }
  }, []);

  return (
    <>
      <div className="px-8 font-poppins">
        <div className="flex justify-between mt-6 mb-4 px-8 py-3">
          <h2 className="font-poppins text-3xl font-semibold">Miembros</h2>
          <button
            className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-900 transition"
            onClick={() => setShowAddMemberModal(true)}
          >
            <i className="pi pi-plus mr-2"></i> Nuevo Miembro
          </button>
        </div>

        <TableMembers members={members} onEdit={handleEditMember} onDelete={handleDeleteMember}/>

        {showAddMemberModal && (
          <AddMembers
            grupoId={grupoId}
            onClose={() => setShowAddMemberModal(false)}
            onMemberAdded={fetchMembers}
          />
        )}

        {showEditMemberModal && (
          <EditMember
            memberId={selectedMemberId}
            onClose={() => setShowEditMemberModal(false)}
            onMemberUpdated={fetchMembers}
          />
        )}
      </div>
    </>
  );
}

export default Members;