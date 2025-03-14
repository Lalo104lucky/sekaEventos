package mx.edu.utez.seka_eventos.controller;

import mx.edu.utez.seka_eventos.kernel.CustomResponse;
import mx.edu.utez.seka_eventos.services.TipoEventoService;
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
    public ResponseEntity<CustomResponse> getAll() {
        return (ResponseEntity<CustomResponse>) tipoEventoService.findAll();
    }
}