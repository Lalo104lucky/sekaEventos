package mx.edu.utez.seka_eventos.controller;


import mx.edu.utez.seka_eventos.kernel.CustomResponse;
import mx.edu.utez.seka_eventos.services.RolService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/rol")
@CrossOrigin(origins = "*")
public class RolController {

    private final RolService rolService;

    public RolController(RolService rolService) {
        this.rolService = rolService;
    }

    @GetMapping("/")
    public ResponseEntity<CustomResponse> getAll() {
        return (ResponseEntity<CustomResponse>) rolService.findAll();
    }
}
