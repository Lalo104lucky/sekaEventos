package mx.edu.utez.seka_eventos.models.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "tipoevento")
public class TIpoEvento {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_tipoevento", nullable = false)
    private Long id_tipoevento;

    @Column(name = "nombre", nullable = false)
    private String nombre;

    @OneToMany(mappedBy = "tipoEvento", cascade = CascadeType.PERSIST)
    @JsonIgnore
    private List<Evento> eventos;

    public TIpoEvento() {

    }

    public TIpoEvento(Long id_tipoevento, String nombre, List<Evento> eventos) {
        this.id_tipoevento = id_tipoevento;
        this.nombre = nombre;
        this.eventos = eventos;
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

    public List<Evento> getEventos() {
        return eventos;
    }

    public void setEventos(List<Evento> eventos) {
        this.eventos = eventos;
    }
}
