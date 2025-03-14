package mx.edu.utez.seka_eventos.models.dao;


import mx.edu.utez.seka_eventos.models.entity.Evento;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EventoRepository extends JpaRepository<Evento, Long> {



}
