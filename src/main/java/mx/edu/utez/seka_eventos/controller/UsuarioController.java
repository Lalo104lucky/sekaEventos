package mx.edu.utez.seka_eventos.controller;


import mx.edu.utez.seka_eventos.kernel.CustomResponse;
import mx.edu.utez.seka_eventos.services.UsuarioService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/usuario")
@CrossOrigin(origins = "*")
public class UsuarioController {

    private final UsuarioService service;
    private final CustomResponse customResponse;

    public UsuarioController(UsuarioService service, CustomResponse customResponse) {
        this.service = service;
        this.customResponse = customResponse;
    }

    @GetMapping("/")
    public ResponseEntity<Object> getAll() {
        return ResponseEntity.ok(service.findAll());
    }
}
