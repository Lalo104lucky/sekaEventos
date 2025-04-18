package mx.edu.utez.seka_eventos.models.dto;


import mx.edu.utez.seka_eventos.models.entity.TIpoEvento;

import java.time.LocalDateTime;
import java.util.List;

public class EventoDTO {

    private Long id_evento, id_tipoEvento, id_usuario;
    private String titulo, estatus, imagen;
    private LocalDateTime fecha;
    private List<UsuarioDTO> usuarios;

    public EventoDTO() {

    }

    public EventoDTO(Long id_evento, String titulo, String estatus, LocalDateTime fecha, List<UsuarioDTO> usuarios, Long id_tipoEvento, String imagen, Long id_usuario) {
        this.id_evento = id_evento;
        this.titulo = titulo;
        this.estatus = estatus;
        this.fecha = fecha;
        this.usuarios = usuarios;
        this.id_tipoEvento = id_tipoEvento;
        this.imagen = imagen;
        this.id_usuario = id_usuario;
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

    public Long getId_tipoEvento() {
        return id_tipoEvento;
    }

    public void setId_tipoEvento(Long id_tipoEvento) {
        this.id_tipoEvento = id_tipoEvento;
    }

    public String getImagen() {
        return imagen;
    }

    public void setImagen(String imagen) {
        this.imagen = imagen;
    }

    public Long getId_usuario() {
        return id_usuario;
    }

    public void setId_usuario(Long id_usuario) {
        this.id_usuario = id_usuario;
    }
}
