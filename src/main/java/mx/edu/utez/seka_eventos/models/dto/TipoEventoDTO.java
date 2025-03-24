package mx.edu.utez.seka_eventos.models.dto;


import java.util.List;

public class TipoEventoDTO {

    private Long id_tipoevento;
    private String nombre;

    public TipoEventoDTO() {

    }

    public TipoEventoDTO(Long id_tipoevento, String nombre) {
        this.id_tipoevento = id_tipoevento;
        this.nombre = nombre;
    }

    public Long getId_tipoevento() {
        return id_tipoevento;
    }

    public void setId_tipoevento(Long id_tipoevento) {
        this.id_tipoevento = id_tipoevento;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }
}
