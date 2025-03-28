package mx.edu.utez.seka_eventos.kernel;


import mx.edu.utez.seka_eventos.models.dao.RolRepository;
import mx.edu.utez.seka_eventos.models.dao.UsuarioRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.transaction.annotation.Transactional;

import java.sql.SQLException;

@Configuration
public class InitialConfig implements CommandLineRunner {

    private final UsuarioRepository usuarioRepository;
    private final RolRepository rolRepository;
    private final PasswordEncoder encoder;

    public InitialConfig(UsuarioRepository usuarioRepository, RolRepository rolRepository, PasswordEncoder encoder) {
        this.usuarioRepository = usuarioRepository;
        this.rolRepository = rolRepository;
        this.encoder = encoder;
    }

    @Override
    @Transactional(rollbackFor = {SQLException.class})
    public void run(String... args) throws Exception {
        if (!rolRepository.existsById(1L)) {
            rolRepository.saveRol(1L, "ADMIN");
        }
        if (!rolRepository.existsById(2L)) {
            rolRepository.saveRol(2L, "ADMIN_GROUP");
        }
        if (!rolRepository.existsById(3L)) {
            rolRepository.saveRol(3L, "USER");
        }
        if (!usuarioRepository.existsById(1L)) {
            usuarioRepository.saveUsuario(1L, "Lalo104lucky","20223tn021@utez.edu.mx", encoder.encode("JaimezFlores104"), "Diego Eduardo", "Jaimez", "Flores", "7772363510", 1L );
        }
        if (!usuarioRepository.existsById(2L)) {
            usuarioRepository.saveUsuario(2L, "Abraham Lincon","20203tn072@utez.edu.mx", encoder.encode("123456"), "Abraham", "Avelino", "Pichardo", "7771234567", 2L );
        }
        if (!usuarioRepository.existsById(3L)) {
            usuarioRepository.saveUsuario(3L, "Axelito","20223tn023@utez.edu.mx", encoder.encode("123456"), "Carlos Axel", "Martinez", "Clemente", "7771234567", 3L );
        }
    }

}
