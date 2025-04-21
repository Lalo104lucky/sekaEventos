package mx.edu.utez.seka_eventos.models.entity;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "bitacora")
public class Bitacora {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id_bitacora;

    @Column(name = "metodo")
    private String metodo;

    @Column(name = "endpoint")
    private String endpoint;

    @Column(name = "usuario")
    private String usuario;

    @Column(name = "fecha")
    private LocalDateTime fecha;

    public Long getId_bitacora() {
        return id_bitacora;
    }

    public void setId_bitacora(Long id_bitacora) {
        this.id_bitacora = id_bitacora;
    }

    public String getMetodo() {
        return metodo;
    }

    public void setMetodo(String metodo) {
        this.metodo = metodo;
    }

    public String getEndpoint() {
        return endpoint;
    }

    public void setEndpoint(String endpoint) {
        this.endpoint = endpoint;
    }

    public String getUsuario() {
        return usuario;
    }

    public void setUsuario(String usuario) {
        this.usuario = usuario;
    }

    public LocalDateTime getFecha() {
        return fecha;
    }

    public void setFecha(LocalDateTime fecha) {
        this.fecha = fecha;
    }
}
