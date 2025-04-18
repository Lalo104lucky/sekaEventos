package mx.edu.utez.seka_eventos.controller;

import mx.edu.utez.seka_eventos.models.dto.UsuarioDTO;
import mx.edu.utez.seka_eventos.services.UsuarioService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/usuario")
@CrossOrigin(origins = "*")
public class UsuarioController {

    private final UsuarioService service;
    private final PasswordEncoder passwordEncoder;

    public UsuarioController(UsuarioService service, PasswordEncoder passwordEncoder) {
        this.service = service;
        this.passwordEncoder = passwordEncoder;
    }

    @GetMapping("/")
    public ResponseEntity<?> getAll() {
        return service.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getById(@PathVariable Long id) {
        try {
            return service.findById(id);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/")
    public ResponseEntity<?> create(@RequestBody UsuarioDTO usuarioDTO) {
        try {
            return service.register(usuarioDTO);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable Long id ,@RequestBody UsuarioDTO usuarioDTO) {
        try {
            usuarioDTO.setId_usuario(id);
            return service.update(usuarioDTO);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        try {
            return service.delete(id);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @PatchMapping("/changeContra/{id}")
    public ResponseEntity<?> changePassword(@PathVariable Long id, @RequestBody UsuarioDTO usuarioDTO) {
        try {
            return service.changeContrasena(id, usuarioDTO);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @PatchMapping("/reset-password/{id}")
    public ResponseEntity<?> resetPassword(@PathVariable Long id, @RequestBody UsuarioDTO usuarioDTO) {
        try {
            return service.changeContrasena(id, usuarioDTO);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

}
