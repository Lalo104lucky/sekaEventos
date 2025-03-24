package mx.edu.utez.seka_eventos.services;

import mx.edu.utez.seka_eventos.kernel.CustomResponse;
import mx.edu.utez.seka_eventos.models.dao.RolRepository;
import mx.edu.utez.seka_eventos.models.entity.Rol;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class RolService {

    private final RolRepository rolRepository;
    private final CustomResponse customResponse;

    public RolService(RolRepository rolRepository, CustomResponse customResponse) {
        this.rolRepository = rolRepository;
        this.customResponse = customResponse;
    }

    @Transactional(readOnly = true)
    public ResponseEntity<?> findAll(){
        List<Rol> roles = rolRepository.findAll();
        return customResponse.getOkResponse(roles);
    }
}
