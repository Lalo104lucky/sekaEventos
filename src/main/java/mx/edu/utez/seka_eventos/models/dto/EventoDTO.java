package mx.edu.utez.seka_eventos.models.dto;


import mx.edu.utez.seka_eventos.models.entity.TIpoEvento;

import java.time.LocalDateTime;
import java.util.List;

public class EventoDTO {

    private Long id_evento, id_tipoevento, id_usuario;
    private String titulo, estatus, imagen;
    private LocalDateTime fecha;
    private List<UsuarioDTO> usuarios;

    public EventoDTO() {

    }

    public EventoDTO(Long id_evento, Long id_tipoevento, Long id_usuario, String titulo, String estatus, String imagen, LocalDateTime fecha, List<UsuarioDTO> usuarios) {
        this.id_evento = id_evento;
        this.id_tipoevento = id_tipoevento;
        this.id_usuario = id_usuario;
        this.titulo = titulo;
        this.estatus = estatus;
        this.imagen = imagen;
        this.fecha = fecha;
        this.usuarios = usuarios;
    }

    public Long getId_evento() {
        return id_evento;
    }

    public void setId_evento(Long id_evento) {
        this.id_evento = id_evento;
    }

    public Long getId_tipoevento() {
        return id_tipoevento;
    }

    public void setId_tipoevento(Long id_tipoevento) {
        this.id_tipoevento = id_tipoevento;
    }

    public Long getId_usuario() {
        return id_usuario;
    }

    public void setId_usuario(Long id_usuario) {
        this.id_usuario = id_usuario;
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

    public String getImagen() {
        return imagen;
    }

    public void setImagen(String imagen) {
        this.imagen = imagen;
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
