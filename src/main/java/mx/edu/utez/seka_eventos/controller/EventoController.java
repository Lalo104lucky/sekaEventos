package mx.edu.utez.seka_eventos.controller;

import mx.edu.utez.seka_eventos.kernel.CustomResponse;
import mx.edu.utez.seka_eventos.services.EventoService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/evento")
@CrossOrigin(origins = "*")
public class EventoController {

    private final EventoService eventoService;

    public EventoController(EventoService eventoService) {
        this.eventoService = eventoService;
    }

    @GetMapping("/")
    public ResponseEntity<CustomResponse> getAll() {
        return (ResponseEntity<CustomResponse>) eventoService.findAll();
    }
}
