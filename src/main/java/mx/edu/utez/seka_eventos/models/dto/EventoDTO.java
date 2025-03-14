package mx.edu.utez.seka_eventos.models.dto;


import java.time.LocalDateTime;
import java.util.List;

public class EventoDTO {

    private Long id_evento;
    private String titulo, estatus;
    private LocalDateTime fecha;
    private List<UsuarioDTO> usuarios;

    public EventoDTO() {

    }

    public EventoDTO(Long id_evento, String titulo, String estatus, LocalDateTime fecha, List<UsuarioDTO> usuarios) {
        this.id_evento = id_evento;
        this.titulo = titulo;
        this.estatus = estatus;
        this.fecha = fecha;
        this.usuarios = usuarios;
    }

    public Long getId_evento() {
        return id_evento;
    }

    public void setId_evento(Long id_evento) {
        this.id_evento = id_evento;
    }

    public String getTitulo() {
        return titulo;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public String getEstatus() {
        return estatus;
    }

    public void setEstatus(String estatus) {
        this.estatus = estatus;
    }

    public LocalDateTime getFecha() {
        return fecha;
    }

    public void setFecha(LocalDateTime fecha) {
        this.fecha = fecha;
    }

    public List<UsuarioDTO> getUsuarios() {
        return usuarios;
    }

    public void setUsuarios(List<UsuarioDTO> usuarios) {
        this.usuarios = usuarios;
    }
}
