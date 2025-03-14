package mx.edu.utez.seka_eventos.services;

import mx.edu.utez.seka_eventos.kernel.CustomResponse;
import mx.edu.utez.seka_eventos.models.dao.UsuarioRepository;
import mx.edu.utez.seka_eventos.models.dto.LoginDTO;
import mx.edu.utez.seka_eventos.models.entity.Usuario;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AuthService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private CustomResponse customResponse;

    @Transactional(readOnly = true)
    public ResponseEntity<?> login(LoginDTO dto) {
        Usuario foundUsuario = usuarioRepository.findByCorreoAndContrasena(dto.getCorreo(), dto.getContrasena());
        System.out.println("Usuario Encontrado: " + foundUsuario);
        if (foundUsuario == null) {
            return customResponse.get400Response(404);
        } else {
            return customResponse.getOkResponse("bearertoken." + foundUsuario.getCorreo() + ".voidtoken");
        }
    }
}
