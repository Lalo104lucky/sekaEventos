package mx.edu.utez.seka_eventos.services;

import mx.edu.utez.seka_eventos.models.dao.TipoEventoRepository;
import mx.edu.utez.seka_eventos.models.entity.Evento;
import mx.edu.utez.seka_eventos.models.entity.TIpoEvento;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TipoEventoService {

    private final TipoEventoRepository tipoEventoRepository;

    public TipoEventoService(TipoEventoRepository tipoEventoRepository) {
        this.tipoEventoRepository = tipoEventoRepository;
    }

    public List<TIpoEvento> findAll(){
        return tipoEventoRepository.findAll();
    }
}
