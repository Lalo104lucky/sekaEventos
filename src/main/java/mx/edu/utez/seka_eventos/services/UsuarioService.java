package mx.edu.utez.seka_eventos.services;

import mx.edu.utez.seka_eventos.models.dao.UsuarioRepository;
import mx.edu.utez.seka_eventos.models.entity.Evento;
import mx.edu.utez.seka_eventos.models.entity.Usuario;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UsuarioService {

    private final UsuarioRepository usuarioRepository;

    public UsuarioService(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    public List<Usuario> findAll(){
        return usuarioRepository.findAll();
    }
}
