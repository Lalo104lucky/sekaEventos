package mx.edu.utez.seka_eventos.services;

import mx.edu.utez.seka_eventos.kernel.CustomResponse;
import mx.edu.utez.seka_eventos.models.dao.RolRepository;
import mx.edu.utez.seka_eventos.models.dao.UsuarioRepository;
import mx.edu.utez.seka_eventos.models.dto.UsuarioDTO;
import mx.edu.utez.seka_eventos.models.entity.Rol;
import mx.edu.utez.seka_eventos.models.entity.Usuario;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.SQLException;
import java.util.List;
import java.util.Optional;

@Service
public class UsuarioService {

    private final UsuarioRepository repository;
    private final RolRepository rolRepository;
    private final CustomResponse customResponse;

    public UsuarioService(UsuarioRepository repository, RolRepository rolRepository, CustomResponse customResponse) {
        this.repository = repository;
        this.rolRepository = rolRepository;
        this.customResponse = customResponse;
    }

    @Transactional(readOnly = true)
    public ResponseEntity<?> findAll(){
        List<Usuario> usuarios = repository.findAll();
        return customResponse.getOkResponse(usuarios);
    }

    @Transactional(readOnly = true)
    public ResponseEntity<?> findById(Long id) {
        Optional<Usuario> foundUser = repository.findById(id);
        if (foundUser.isEmpty()){
            return customResponse.get400Response(400);
        }
        return customResponse.getOkResponse(foundUser.get());
    }

    @Transactional(rollbackFor = {SQLException.class})
    public ResponseEntity<?> register(UsuarioDTO usuarioDTO) {
        Optional<Rol> foundRol = rolRepository.findById(usuarioDTO.getId_rol());
        if (foundRol.isEmpty()){
            return customResponse.get400Response(400);
        }
        Rol rol = foundRol.get();
        Usuario usuario = new Usuario();
        usuario.setApellido_m(usuarioDTO.getApellido_m());
        usuario.setApellido_p(usuarioDTO.getApellido_p());
        usuario.setContrasena(usuarioDTO.getContrasena());
        usuario.setCorreo(usuarioDTO.getCorreo());
        usuario.setNombre(usuarioDTO.getNombre());
        usuario.setTelefono(usuarioDTO.getTelefono());
        usuario.setRol(rol);
        return customResponse.getCreatedResponse(repository.save(usuario));
    }

    @Transactional(rollbackFor = {SQLException.class})
    public ResponseEntity<?> update(UsuarioDTO usuarioDTO) {
        Optional<Usuario> foundUser = repository.findById(usuarioDTO.getId_usuario());
        if (foundUser.isEmpty()){
            return customResponse.get400Response(400);
        }
        Usuario usuario = foundUser.get();
        usuario.setApellido_m(usuarioDTO.getApellido_m());
        usuario.setApellido_p(usuarioDTO.getApellido_p());
        usuario.setContrasena(usuarioDTO.getContrasena());
        usuario.setCorreo(usuarioDTO.getCorreo());
        usuario.setNombre(usuarioDTO.getNombre());
        usuario.setTelefono(usuarioDTO.getTelefono());
        Optional<Rol> foundRol = rolRepository.findById(usuarioDTO.getId_rol());
        if (foundRol.isEmpty()){
            return customResponse.get400Response(400);
        }
        Rol rol = foundRol.get();
        usuario.setRol(rol);
        return customResponse.getOkResponse(repository.save(usuario));
    }

    @Transactional(rollbackFor = {SQLException.class})
    public ResponseEntity<?> delete(Long id) {
        Optional<Usuario> foundUser = repository.findById(id);
        if (foundUser.isEmpty()){
            return customResponse.get400Response(400);
        }
        repository.deleteById(id);
        return customResponse.getOkResponse("Usuario eliminado");
    }

    @Transactional(rollbackFor = {SQLException.class})
    public ResponseEntity<?> changeContrasena(Long id, UsuarioDTO usuarioDTO) {
        Optional<Usuario> foundUser = repository.findById(id);
        if (foundUser.isEmpty()){
            return customResponse.get400Response(400);
        }
        Usuario usuario = foundUser.get();
        usuario.setContrasena(usuarioDTO.getContrasena());
        return customResponse.getOkResponse(repository.save(usuario));
    }

    @Transactional
    public Optional<Usuario> findUserByCorreo(String correo) {
        return repository.findUsuarioByCorreo(correo);
    }

}
