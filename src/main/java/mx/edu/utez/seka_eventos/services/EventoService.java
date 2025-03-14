package mx.edu.utez.seka_eventos.services;

import mx.edu.utez.seka_eventos.models.dao.EventoRepository;
import mx.edu.utez.seka_eventos.models.entity.Evento;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EventoService {

    private final EventoRepository eventoRepository;

    public EventoService(EventoRepository eventoRepository) {
        this.eventoRepository = eventoRepository;
    }

    public List<Evento> findAll(){
        return eventoRepository.findAll();
    }


}
