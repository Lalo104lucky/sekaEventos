package mx.edu.utez.seka_eventos.services;

import mx.edu.utez.seka_eventos.kernel.CustomResponse;
import mx.edu.utez.seka_eventos.models.dao.EmailRepository;
import mx.edu.utez.seka_eventos.models.dto.EmailDto;
import mx.edu.utez.seka_eventos.models.entity.Usuario;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Service
public class EmailService {

    private final EmailRepository emailRepository;
    private final UsuarioService usuarioService;
    private final CustomResponse customResponse;

    public EmailService(EmailRepository emailRepository, UsuarioService usuarioService, CustomResponse customResponse) {
        this.emailRepository = emailRepository;
        this.usuarioService = usuarioService;
        this.customResponse = customResponse;
    }

    public ResponseEntity<?> sendEmail(EmailDto email){
        Optional<Usuario> foundUsuario = usuarioService.findUsuarioByCorreo(email.getDestinatario());
        if (foundUsuario.isEmpty()) {
            return customResponse.get400Response(404);
        }
        Usuario usuario = foundUsuario.get();
        emailRepository.sendEmail(email);
        Map<String, Object> responseBody = new HashMap<>();
        responseBody.put("email", email);
        responseBody.put("id_usuario", usuario.getId_usuario());
        return customResponse.getOkResponse(responseBody);

    }
}
