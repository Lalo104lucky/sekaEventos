package mx.edu.utez.seka_eventos.services;

import mx.edu.utez.seka_eventos.kernel.CustomResponse;
import mx.edu.utez.seka_eventos.models.dao.EventoRepository;
import mx.edu.utez.seka_eventos.models.dao.TipoEventoRepository;
import mx.edu.utez.seka_eventos.models.dao.UsuarioRepository;
import mx.edu.utez.seka_eventos.models.dto.EventoDTO;
import mx.edu.utez.seka_eventos.models.entity.Evento;
import mx.edu.utez.seka_eventos.models.entity.TIpoEvento;
import mx.edu.utez.seka_eventos.models.entity.Usuario;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.sql.SQLException;
import java.util.List;
import java.util.Optional;

@Service
public class EventoService {

    private static final String IMAGE_FOLDER = "src/main/resources/images/";
    private final EventoRepository repository;
    private final CustomResponse customResponse;
    private final TipoEventoRepository tipoEventoRepository;
    private final UsuarioRepository usuarioRepository;
    private final EventoRepository eventoRepository;

    public EventoService(EventoRepository repository, CustomResponse customResponse, TipoEventoRepository tipoEventoRepository, UsuarioRepository usuarioRepository, EventoRepository eventoRepository) {
        this.repository = repository;
        this.customResponse = customResponse;
        this.tipoEventoRepository = tipoEventoRepository;
        this.usuarioRepository = usuarioRepository;
        this.eventoRepository = eventoRepository;
    }

    @Transactional(readOnly = true)
    public ResponseEntity<?> findAll(){
        List<Evento> eventos = repository.findAll();
        return customResponse.getOkResponse(eventos);
    }

    @Transactional(readOnly = true)
    public ResponseEntity<?> findById(Long id){
        Optional<Evento> foundEvento = repository.findById(id);
        if(foundEvento.isEmpty()){
            return customResponse.get400Response(404);
        }
        return customResponse.getOkResponse(foundEvento.get());
    }

    @Transactional(rollbackFor = {SQLException.class})
    public ResponseEntity<?> register(EventoDTO eventoDTO, MultipartFile imagen){
        try {
            Optional<TIpoEvento> foundTipoEvento = tipoEventoRepository.findById(eventoDTO.getId_tipoEvento());
            if(foundTipoEvento.isEmpty()){
                return customResponse.get400Response(404);
            }
            Optional<Usuario> foundUsuario = usuarioRepository.findById(eventoDTO.getId_usuario());
            if (foundUsuario.isEmpty()) {
                return customResponse.get400Response(404);
            }
            String imagePath = saveImage(imagen);
            TIpoEvento tIpoEvento = foundTipoEvento.get();
            Evento evento = new Evento();
            Usuario user = foundUsuario.get();
            evento.setTitulo(eventoDTO.getTitulo());
            evento.setFecha(eventoDTO.getFecha());
            evento.setEstatus(eventoDTO.getEstatus());
            evento.setTipoEvento(tIpoEvento);
            evento.setImagen(imagePath);
            evento.setUsuario(user);
            return customResponse.getCreatedResponse(repository.save(evento));
        } catch (IOException e){
            return customResponse.get400Response(500);
        }

    }

    @Transactional(rollbackFor = {SQLException.class})
    public ResponseEntity<?> update(EventoDTO eventoDTO, MultipartFile imagen){
        try{
            Optional<Evento> foundEvento = repository.findById(eventoDTO.getId_evento());
            if(foundEvento.isEmpty()){
                return customResponse.get400Response(404);
            }
            Optional<Usuario> foundUsuario = usuarioRepository.findById(eventoDTO.getId_usuario());
            if (foundUsuario.isEmpty()) {
                return customResponse.get400Response(404);
            }
            String imagePath = saveImage(imagen);
            Evento evento = foundEvento.get();
            Usuario user = foundUsuario.get();
            evento.setUsuario(user);
            evento.setTitulo(eventoDTO.getTitulo());
            evento.setFecha(eventoDTO.getFecha());
            evento.setEstatus(eventoDTO.getEstatus());
            evento.setImagen(imagePath);
            Optional<TIpoEvento> foundTipoEvento = tipoEventoRepository.findById(eventoDTO.getId_tipoEvento());
            if(foundTipoEvento.isEmpty()){
                return customResponse.get400Response(404);
            }
            evento.setTipoEvento(foundTipoEvento.get());
            return customResponse.getOkResponse(repository.save(evento));
        } catch (IOException e) {
            return customResponse.get400Response(500);
        }

    }

    @Transactional(rollbackFor = {SQLException.class})
    public ResponseEntity<?> delete(Long id){
        Optional<Evento> foundEvento = repository.findById(id);
        if(foundEvento.isEmpty()){
            return customResponse.get400Response(404);
        }
        repository.delete(foundEvento.get());
        return customResponse.getOkResponse("Evento eliminado");
    }

    @Transactional(rollbackFor = {SQLException.class})
    public ResponseEntity<?> confirmAsistencia(Long eventoId, Long usuarioId) {
        Optional<Evento> foundEvento = repository.findById(eventoId);
        if(foundEvento.isEmpty()){
            return customResponse.get400Response(404);
        }
        Optional<Usuario> foundUsuario = usuarioRepository.findById(usuarioId);
        if(foundUsuario.isEmpty()){
            return customResponse.get400Response(404);
        }
        
        Evento evento = foundEvento.get();
        Usuario usuario = foundUsuario.get();
        if (!evento.getUsuarios().contains(usuario)) {
            evento.getUsuarios().add(usuario);
            eventoRepository.save(evento);
        }
        return customResponse.getOkResponse("Asistencia confirmada");
    }

    @Transactional(rollbackFor = {SQLException.class})
    public ResponseEntity<?> cancelAsistencia(Long eventoId, Long usuarioId) {
        Optional<Evento> foundEvento = repository.findById(eventoId);
        if(foundEvento.isEmpty()){
            return customResponse.get400Response(404);
        }
        Optional<Usuario> foundUsuario = usuarioRepository.findById(usuarioId);
        if(foundUsuario.isEmpty()){
            return customResponse.get400Response(404);
        }

        Evento evento = foundEvento.get();
        Usuario usuario = foundUsuario.get();
        if (evento.getUsuarios().contains(usuario)) {
            evento.getUsuarios().remove(usuario);
            eventoRepository.save(evento);
        }
        return customResponse.getOkResponse("Asistencia cancelada");
    }

    @Transactional(rollbackFor = {SQLException.class})
    public ResponseEntity<?> changeStatus (Long eventoId, EventoDTO eventoDTO) {
        Optional<Evento> foundEvento = repository.findById(eventoId);
        if(foundEvento.isEmpty()){
            return customResponse.get400Response(404);
        }
        Evento evento = foundEvento.get();
        evento.setEstatus(eventoDTO.getEstatus());
        return customResponse.getOkResponse(repository.save(evento));
    }

    private String saveImage(MultipartFile image) throws IOException {
        if (image != null && !image.isEmpty()) {
            String imagePath = IMAGE_FOLDER + image.getOriginalFilename();
            Path path = Paths.get(imagePath);
            Files.write(path, image.getBytes());
            return "images/" + image.getOriginalFilename();
        }
        return null;
    }

}
