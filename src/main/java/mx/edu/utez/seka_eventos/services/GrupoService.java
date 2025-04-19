package mx.edu.utez.seka_eventos.services;

import mx.edu.utez.seka_eventos.kernel.CustomResponse;
import mx.edu.utez.seka_eventos.models.dao.GrupoRepository;
import mx.edu.utez.seka_eventos.models.dao.UsuarioRepository;
import mx.edu.utez.seka_eventos.models.dto.GrupoDTO;
import mx.edu.utez.seka_eventos.models.entity.Grupo;
import mx.edu.utez.seka_eventos.models.entity.Usuario;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.SQLException;
import java.util.List;
import java.util.Optional;

@Service
public class GrupoService {

    private final GrupoRepository repository;
    private final UsuarioRepository usuarioRepository;
    private final CustomResponse customResponse;

    public GrupoService(GrupoRepository repository, UsuarioRepository usuarioRepository, CustomResponse customResponse) {
        this.repository = repository;
        this.usuarioRepository = usuarioRepository;
        this.customResponse = customResponse;
    }

    @Transactional(readOnly = true)
    public ResponseEntity<?> findAll(){
        List<Grupo> grupos = repository.findAll();
        return customResponse.getOkResponse(grupos);
    }

    @Transactional(readOnly = true)
    public ResponseEntity<?> findById(Long id) {
        Optional<Grupo> foundGrupo = repository.findById(id);
        if (foundGrupo.isEmpty()){
            return customResponse.get400Response(400);
        }
        return customResponse.getOkResponse(foundGrupo.get());
    }

    @Transactional(rollbackFor = {SQLException.class})
    public ResponseEntity<?> register(GrupoDTO grupoDTO) {
        Optional<Usuario> foundUser = usuarioRepository.findById(grupoDTO.getId_usuario());
        if (foundUser.isEmpty()){
            return customResponse.get400Response(400);
        }
        Usuario usuario = foundUser.get();
        Grupo grupo = new Grupo();
        grupo.setNombre(grupoDTO.getNombre());
        grupo.setMunicipio(grupoDTO.getMunicipio());
        grupo.setColonia(grupoDTO.getColonia());
        grupo.setUsuario(usuario);
        return customResponse.getCreatedResponse(repository.save(grupo));
    }

    @Transactional(rollbackFor = {SQLException.class})
    public ResponseEntity<?> update(GrupoDTO grupoDTO) {
        Optional<Grupo> foundGrupo = repository.findById(grupoDTO.getId_grupo());
        Optional<Usuario> foundUser = usuarioRepository.findById(grupoDTO.getId_grupo());
        if (foundGrupo.isEmpty()){
            return customResponse.get400Response(400);
        }
        if (foundUser.isEmpty()){
            return customResponse.get400Response(400);
        }
        Grupo grupo = foundGrupo.get();
        Usuario usuario = foundUser.get();
        grupo.setNombre(grupoDTO.getNombre());
        grupo.setMunicipio(grupoDTO.getMunicipio());
        grupo.setColonia(grupoDTO.getColonia());
        grupo.setUsuario(usuario);
        return customResponse.getOkResponse(repository.save(grupo));
    }

    @Transactional(rollbackFor = {SQLException.class})
    public ResponseEntity<?> delete(Long id) {
        Optional<Grupo> foundGrupo = repository.findById(id);
        if (foundGrupo.isEmpty()){
            return customResponse.get400Response(400);
        }
        repository.deleteById(id);
        return customResponse.getOkResponse("Grupo eliminado");
    }

    @Transactional(rollbackFor = {SQLException.class})
    public ResponseEntity<?> addUsertoGroup(Long id_grupo, Long id_usuario) {
        Optional<Grupo> foundGrupo = repository.findById(id_grupo);
        Optional<Usuario> foundUsuario = usuarioRepository.findById(id_usuario);
        if (foundGrupo.isEmpty()) {
            return customResponse.get400Response(404);
        }
        if (foundUsuario.isEmpty()) {
            return customResponse.get400Response(404);
        }
        Grupo grupo = foundGrupo.get();
        Usuario usuario = foundUsuario.get();
        usuario.setGrupo(grupo);
        usuarioRepository.save(usuario);
        return customResponse.getOkResponse("Usuario agregado al grupo");
    }

}
