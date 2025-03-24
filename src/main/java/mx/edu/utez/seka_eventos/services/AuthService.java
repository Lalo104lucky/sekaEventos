package mx.edu.utez.seka_eventos.services;

import mx.edu.utez.seka_eventos.kernel.CustomResponse;
import mx.edu.utez.seka_eventos.models.dao.UsuarioRepository;
import mx.edu.utez.seka_eventos.models.dto.LoginDTO;
import mx.edu.utez.seka_eventos.models.dto.LoginIntoDTO;
import mx.edu.utez.seka_eventos.models.entity.Usuario;
import mx.edu.utez.seka_eventos.security.jwt.JWTProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
public class AuthService {

    @Autowired
    private AuthenticationManager manager;

    @Autowired
    private UsuarioService service;

    @Autowired
    private JWTProvider provider;

    @Autowired
    private CustomResponse customResponse;

    @Autowired
    private UsuarioRepository repository;

    @Transactional(readOnly = true)
    public ResponseEntity<?> login(String correo, String contrasena) {
        try{
            Optional<Usuario> foundUsuario = service.findUserByCorreo(correo);
            if (foundUsuario.isEmpty()) {
                return customResponse.get400Response(404);
            }
            Usuario usuario = foundUsuario.get();
            System.out.println("Usuario Encontrado: " + usuario.getCorreo());
            Authentication auth = manager.authenticate(new UsernamePasswordAuthenticationToken(correo, contrasena));
            SecurityContextHolder.getContext().setAuthentication(auth);
            String token = provider.generateToken(auth);
            LoginIntoDTO logined = new LoginIntoDTO(token, "Bearer", usuario);
            return customResponse.getOkResponse(logined);
        } catch (Exception e){
            String message = "CredentialMismatch";
            if(e instanceof DisabledException){
                message = "UserDisabled";
            }
            return customResponse.get400Response(400);
        }
    }
}
