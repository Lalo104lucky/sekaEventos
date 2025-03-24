package mx.edu.utez.seka_eventos.models.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "grupo")
public class Grupo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_grupo", nullable = false)
    private Long id_grupo;

    @Column(name = "nombre", nullable = false)
    private String nombre;

    @Column(name = "colonia", nullable = false)
    private String colonia;

    @Column(name = "municipio", nullable = false)
    private String municipio;

    @OneToMany(mappedBy = "grupo", cascade = CascadeType.PERSIST)
    @JsonIgnore
    private List<Usuario> usuarios;

    @OneToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "id_usuario")
    private Usuario usuario;

    public Grupo() {

    }

    public Grupo(Long id_grupo, String nombre, String colonia, String municipio, List<Usuario> usuarios, Usuario usuario) {
        this.id_grupo = id_grupo;
        this.nombre = nombre;
        this.colonia = colonia;
        this.municipio = municipio;
        this.usuarios = usuarios;
        this.usuario = usuario;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

    public Long getId_grupo() {
        return id_grupo;
    }

    public void setId_grupo(Long id_grupo) {
        this.id_grupo = id_grupo;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getColonia() {
        return colonia;
    }

    public void setColonia(String colonia) {
        this.colonia = colonia;
    }

    public String getMunicipio() {
        return municipio;
    }

    public void setMunicipio(String municipio) {
        this.municipio = municipio;
    }

    public List<Usuario> getUsuarios() {
        return usuarios;
    }

    public void setUsuarios(List<Usuario> usuarios) {
        this.usuarios = usuarios;
    }
}
