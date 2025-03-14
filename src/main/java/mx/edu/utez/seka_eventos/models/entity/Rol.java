package mx.edu.utez.seka_eventos.models.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "rol")
public class Rol {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_rol", nullable = false)
    private Long id_rol;

    @Column(name = "rol", nullable = false)
    private String rol;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "rol")
    @JsonIgnore
    private List<Usuario> usuario;

    public Rol(Long id_rol, String rol, List<Usuario> usuario) {
        this.id_rol = id_rol;
        this.rol = rol;
        this.usuario = usuario;
    }

    public Rol() {

    }

    public Long getId_rol() {
        return id_rol;
    }

    public void setId_rol(Long id_rol) {
        this.id_rol = id_rol;
    }

    public String getRol() {
        return rol;
    }

    public void setRol(String rol) {
        this.rol = rol;
    }

    public List<Usuario> getUsuario() {
        return usuario;
    }

    public void setUsuario(List<Usuario> usuario) {
        this.usuario = usuario;
    }
}
