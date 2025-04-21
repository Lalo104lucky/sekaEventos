package mx.edu.utez.seka_eventos.models.dao;

import mx.edu.utez.seka_eventos.models.entity.Bitacora;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BitacoraRepository extends JpaRepository<Bitacora, Long> {
}
