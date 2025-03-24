package mx.edu.utez.seka_eventos.controller;

import mx.edu.utez.seka_eventos.kernel.CustomResponse;
import mx.edu.utez.seka_eventos.models.dto.GrupoDTO;
import mx.edu.utez.seka_eventos.services.GrupoService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/grupo")
@CrossOrigin(origins = "*")
public class GrupoController {

    private final GrupoService grupoService;

    public GrupoController(GrupoService grupoService) {
        this.grupoService = grupoService;
    }

    @GetMapping("/")
    public ResponseEntity<?> getAll() {
        return grupoService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getById(Long id) {
        return grupoService.findById(id);
    }

    @PostMapping("/")
    public ResponseEntity<?> create(@RequestBody GrupoDTO grupoDTO) {
        return grupoService.register(grupoDTO);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@RequestBody GrupoDTO grupoDTO) {
        return grupoService.update(grupoDTO);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(Long id) {
        return grupoService.delete(id);
    }
}
