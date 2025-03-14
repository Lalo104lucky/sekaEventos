package mx.edu.utez.seka_eventos.services;

import mx.edu.utez.seka_eventos.models.dao.GrupoRepository;
import mx.edu.utez.seka_eventos.models.entity.Evento;
import mx.edu.utez.seka_eventos.models.entity.Grupo;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GrupoService {

    private final GrupoRepository grupoRepository;

    public GrupoService(GrupoRepository grupoRepository) {
        this.grupoRepository = grupoRepository;
    }

    public List<Grupo> findAll(){
        return grupoRepository.findAll();
    }
}
