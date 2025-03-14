package mx.edu.utez.seka_eventos.controller;

import mx.edu.utez.seka_eventos.kernel.CustomResponse;
import mx.edu.utez.seka_eventos.services.GrupoService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/grupo")
@CrossOrigin(origins = "*")
public class GrupoController {

    private final GrupoService grupoService;

    public GrupoController(GrupoService grupoService) {
        this.grupoService = grupoService;
    }

    @GetMapping("/")
    public ResponseEntity<CustomResponse> getAll() {
        return (ResponseEntity<CustomResponse>) grupoService.findAll();
    }
}
