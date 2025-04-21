package mx.edu.utez.seka_eventos.controller;

import mx.edu.utez.seka_eventos.models.dao.BitacoraRepository;
import mx.edu.utez.seka_eventos.models.entity.Bitacora;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/bitacora")
@CrossOrigin(origins = "*")
public class BitacoraController {

    @Autowired
    BitacoraRepository repository;

    @GetMapping("/")
    public ResponseEntity<List<Bitacora>> getAll() {
        return ResponseEntity.ok(repository.findAll());
    }

}
