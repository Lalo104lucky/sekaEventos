package mx.edu.utez.seka_eventos.models.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "evento")
public class Evento {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_evento", nullable = false)
    private Long id_evento;

    @Column(name = "titulo", nullable = false)
    private String titulo;

    @Column(name = "fecha", nullable = false)
    private LocalDateTime fecha;

    @Column(name = "estatus")
    private String estatus;

    @ManyToMany
    @JoinTable(name = "evento_has_usuario",
            joinColumns = @JoinColumn(name = "id_usuario"),
            inverseJoinColumns = @JoinColumn(name = "id_evento")
    )
    private List<Usuario> usuarios;

    @ManyToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "id_tipoEvento")
    private TIpoEvento tipoEvento;


    public Evento(Long id_evento, String titulo, LocalDateTime fecha, String estatus, List<Usuario> usuarios, TIpoEvento tipoEvento) {
        this.id_evento = id_evento;
        this.titulo = titulo;
        this.fecha = fecha;
        this.estatus = estatus;
        this.usuarios = usuarios;
        this.tipoEvento = tipoEvento;
    }

    public Evento() {

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

    public LocalDateTime getFecha() {
        return fecha;
    }

    public void setFecha(LocalDateTime fecha) {
        this.fecha = fecha;
    }

    public String getEstatus() {
        return estatus;
    }

    public void setEstatus(String estatus) {
        this.estatus = estatus;
    }

    public List<Usuario> getUsuarios() {
        return usuarios;
    }

    public void setUsuarios(List<Usuario> usuarios) {
        this.usuarios = usuarios;
    }

    public TIpoEvento getTipoEvento() {
        return tipoEvento;
    }

    public void setTipoEvento(TIpoEvento tipoEvento) {
        this.tipoEvento = tipoEvento;
    }
}
