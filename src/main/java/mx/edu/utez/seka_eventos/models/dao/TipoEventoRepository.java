package mx.edu.utez.seka_eventos.models.dao;

import mx.edu.utez.seka_eventos.models.entity.TIpoEvento;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TipoEventoRepository extends JpaRepository<TIpoEvento, Long> {
}
