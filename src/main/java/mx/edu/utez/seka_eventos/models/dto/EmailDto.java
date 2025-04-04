package mx.edu.utez.seka_eventos.models.dto;

import java.util.Random;

public class EmailDto {

    private String destinatario, asunto, pin;

    private String generatePin() {
        Random random = new Random();
        StringBuilder pinBuilder = new StringBuilder();
        for (int i=0; i<6; i++) {
            pinBuilder.append(random.nextInt(10));
        }
        return pinBuilder.toString();
    }

    public EmailDto(){
        this.pin = generatePin();
    }

    public String getDestinatario() {
        return destinatario;
    }

    public void setDestinatario(String destinatario) {
        this.destinatario = destinatario;
    }

    public String getAsunto() {
        return asunto;
    }

    public void setAsunto(String asunto) {
        this.asunto = asunto;
    }

    public String getPin() {
        return pin;
    }

    public void setPin(String pin) {
        this.pin = pin;
    }
}
