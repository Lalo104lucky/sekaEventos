package mx.edu.utez.seka_eventos.controller;

import jakarta.servlet.http.HttpServletRequest;
import mx.edu.utez.seka_eventos.models.dto.EventoDTO;
import mx.edu.utez.seka_eventos.services.EventoService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@RestController
@RequestMapping("/api/evento")
@CrossOrigin(origins = "*")
public class EventoController {

    private final EventoService eventoService;

    public EventoController(EventoService eventoService) {
        this.eventoService = eventoService;
    }

    @GetMapping("/")
    public ResponseEntity<?> getAll() {
        return eventoService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getById(@PathVariable Long id) {
        try {
            return eventoService.findById(id);
        } catch (Exception e){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/path/**")
    public ResponseEntity<byte[]> getImagen(HttpServletRequest request) {
        try {
            String relativePath = request.getRequestURI().split("/path/")[1];
            Path imagePath = Paths.get("src/main/resources", relativePath).normalize();
            byte[] imageBytes = Files.readAllBytes(imagePath);
            String contentType = Files.probeContentType(imagePath);
            return ResponseEntity.ok()
                    .header("Content-Type", contentType)
                    .body(imageBytes);
        } catch (IOException | ArrayIndexOutOfBoundsException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @GetMapping("/usuario/{idUsuario}/eventos")
    public ResponseEntity<?> getEventosPorUsuario(@PathVariable Long idUsuario) {
        try {
            return eventoService.findEventosPorUsuario(idUsuario);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/evento/{eventoId}/grupo/{grupoId}/asistentes")
    public ResponseEntity<?> getAsistentesPorEventoYGrupo(@PathVariable Long eventoId, @PathVariable Long grupoId) {
        try {
            return eventoService.findAsistentesPorEventoYGrupo(eventoId, grupoId);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/")
    public ResponseEntity<?> create(@RequestBody EventoDTO eventoDTO) {
        try {
            return eventoService.register(eventoDTO);
        } catch (Exception e){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/{id}/upload-image")
    public ResponseEntity<?> uploadImage(@PathVariable Long id, @RequestParam("imagen") MultipartFile imagen) {
        try{
            return eventoService.uploadImage(id, imagen);
        } catch (Exception e){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }


    @PutMapping("/{id}")
    public ResponseEntity<?> update(@RequestBody EventoDTO eventoDTO) {
        try {
            return eventoService.update(eventoDTO);
        } catch (Exception e){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        try {
            return eventoService.delete(id);
        } catch (Exception e){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/{eventoId}/confirmarAsistencia/{usuarioId}")
    public ResponseEntity<?> confirmarAsistencia(@PathVariable Long eventoId, @PathVariable Long usuarioId) {
        try {
            return eventoService.confirmAsistencia(eventoId, usuarioId);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/{eventoId}/cancelarAsistencia/{usuarioId}")
    public ResponseEntity<?> cancelarAsistencia(@PathVariable Long eventoId, @PathVariable Long usuarioId) {
        try {
            return eventoService.cancelAsistencia(eventoId, usuarioId);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @PatchMapping("/changeStatus/{id}")
    public ResponseEntity<?> changeStatus(@PathVariable Long id, @RequestBody EventoDTO eventoDTO) {
        try {
            return eventoService.changeStatus(id, eventoDTO);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
}
