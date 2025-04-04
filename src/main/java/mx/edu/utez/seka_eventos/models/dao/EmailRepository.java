package mx.edu.utez.seka_eventos.models.dao;

import mx.edu.utez.seka_eventos.models.dto.EmailDto;

public interface EmailRepository {
    void sendEmail(EmailDto emailDto);
}
