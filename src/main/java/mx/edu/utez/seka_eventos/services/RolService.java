package mx.edu.utez.seka_eventos.services;

import mx.edu.utez.seka_eventos.models.dao.RolRepository;
import mx.edu.utez.seka_eventos.models.entity.Rol;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RolService {

    private final RolRepository rolRepository;

    public RolService(RolRepository rolRepository) {
        this.rolRepository = rolRepository;
    }

    public List<Rol> findAll(){
        return rolRepository.findAll();
    }
}
