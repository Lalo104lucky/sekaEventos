package mx.edu.utez.seka_eventos.controller;

import mx.edu.utez.seka_eventos.models.dto.EmailDto;
import mx.edu.utez.seka_eventos.services.EmailService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class EmailController {

    private final EmailService emailService;

    public EmailController(EmailService emailService) {
        this.emailService = emailService;
    }


    @PostMapping("/send-email")
    public ResponseEntity<?> sendEmail(@RequestBody EmailDto email) {
        try {
            return emailService.sendEmail(email);
        } catch (Exception e) {
            return new ResponseEntity<>("Error al enviar el correo", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


}
