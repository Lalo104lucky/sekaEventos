package mx.edu.utez.seka_eventos.models.dto;


public class TipoEventoDTO {

    private Long id_tipoevento, id_evento;
    private String nombre;

    public TipoEventoDTO() {

    }

    public TipoEventoDTO(Long id_tipoevento, Long id_evento, String nombre) {
        this.id_tipoevento = id_tipoevento;
        this.id_evento = id_evento;
        this.nombre = nombre;
    }

    public Long getId_tipoevento() {
        return id_tipoevento;
    }

    public void setId_tipoevento(Long id_tipoevento) {
        this.id_tipoevento = id_tipoevento;
    }

    public Long getId_evento() {
        return id_evento;
    }

    public void setId_evento(Long id_evento) {
        this.id_evento = id_evento;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }
}
