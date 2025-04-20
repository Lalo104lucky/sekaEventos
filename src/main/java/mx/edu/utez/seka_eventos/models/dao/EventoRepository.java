package mx.edu.utez.seka_eventos.models.dao;


import mx.edu.utez.seka_eventos.models.entity.Evento;
import mx.edu.utez.seka_eventos.models.entity.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EventoRepository extends JpaRepository<Evento, Long> {

    @Query("SELECT e FROM Evento e JOIN e.usuarios u WHERE u.id = :idUsuario")
    List<Evento> findEventosPorUsuario(@Param("idUsuario") Long idUsuario);

    @Query("SELECT u FROM Evento e JOIN e.usuarios u WHERE e.id = :eventoId AND u.grupo.id = :grupoId")
    List<Usuario> findAsistentesPorEventoYGrupo(@Param("eventoId") Long eventoId, @Param("grupoId") Long grupoId);

}
