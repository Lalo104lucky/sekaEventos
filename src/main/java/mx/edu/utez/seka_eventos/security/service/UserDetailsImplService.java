package mx.edu.utez.seka_eventos.security.service;

import mx.edu.utez.seka_eventos.models.entity.Usuario;
import mx.edu.utez.seka_eventos.security.entity.UserDetailsImpl;
import mx.edu.utez.seka_eventos.services.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
public class UserDetailsImplService implements UserDetailsService {

    @Autowired
    @Lazy
    private UsuarioService service;

    public UserDetailsImplService(UsuarioService service) {
        this.service = service;
    }

    @Override
    public UserDetails loadUserByUsername(String usuario) throws UsernameNotFoundException {
        try {
            Optional<Usuario> foundUsuario = service.findUsuario(usuario);
            if (foundUsuario.isEmpty()) {
                throw new UsernameNotFoundException("Usuario no encontrado");
            } else {
                return UserDetailsImpl.build(foundUsuario.get());
            }
        } catch (Exception e) {
            throw new UsernameNotFoundException("Error al cargar el usuario");
        }
    }
}
