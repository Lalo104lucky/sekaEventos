package mx.edu.utez.seka_eventos.controller;

import mx.edu.utez.seka_eventos.kernel.CustomResponse;
import mx.edu.utez.seka_eventos.models.dto.EventoDTO;
import mx.edu.utez.seka_eventos.services.EventoService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
        return new ResponseEntity<>(eventoService.findAll(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getById(@PathVariable Long id) {
        try {
            return new ResponseEntity<>(eventoService.findById(id), HttpStatus.OK);
        } catch (Exception e){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/")
    public ResponseEntity<?> create(@RequestBody EventoDTO eventoDTO) {
        try {
            return new ResponseEntity<>(eventoService.register(eventoDTO), HttpStatus.CREATED);
        } catch (Exception e){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@RequestBody EventoDTO eventoDTO) {
        return eventoService.update(eventoDTO);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        return eventoService.delete(id);
    }

    @PostMapping("/{eventoId}/confirmar-asistencia/{usuarioId}")
    public ResponseEntity<?> confirmarAsistencia(@PathVariable Long eventoId, @PathVariable Long usuarioId) {
        return eventoService.confirmAsistencia(eventoId, usuarioId);
    }
}
