package mx.edu.utez.seka_eventos.controller;

import mx.edu.utez.seka_eventos.models.dto.TipoEventoDTO;
import mx.edu.utez.seka_eventos.services.TipoEventoService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/tipoevento")
@CrossOrigin(origins = "*")
public class TipoEventoController {

    private final TipoEventoService tipoEventoService;


    public TipoEventoController(TipoEventoService tipoEventoService) {
        this.tipoEventoService = tipoEventoService;
    }

    @GetMapping("/")
    public ResponseEntity<?> getAll() {
        return tipoEventoService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getById(@PathVariable Long id) {
        try {
            return tipoEventoService.findById(id);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/")
    public ResponseEntity<?> create(@RequestBody TipoEventoDTO tipoEventoDTO) {
        try {
            return tipoEventoService.register(tipoEventoDTO);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@RequestBody TipoEventoDTO tipoEventoDTO) {
        try {
            return tipoEventoService.update(tipoEventoDTO);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        try {
            return tipoEventoService.delete(id);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

}