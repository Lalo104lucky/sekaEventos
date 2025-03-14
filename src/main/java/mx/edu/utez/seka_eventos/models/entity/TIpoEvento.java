package mx.edu.utez.seka_eventos.models.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "tipoevento")
public class TIpoEvento {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_tipoevento", nullable = false)
    private Long id_tipoevento;

    @Column(name = "nombre", nullable = false)
    private String nombre;

    @ManyToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "id_evento")
    private Evento evento;

    public TIpoEvento() {

    }

    public TIpoEvento(Long id_tipoevento, String nombre, Evento evento) {
        this.id_tipoevento = id_tipoevento;
        this.nombre = nombre;
        this.evento = evento;
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

    public Evento getEvento() {
        return evento;
    }

    public void setEvento(Evento evento) {
        this.evento = evento;
    }
}
