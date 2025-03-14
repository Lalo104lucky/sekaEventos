package mx.edu.utez.seka_eventos.models.dto;

public class GrupoDTO {

    private Long id_grupo, id_usuario;
    private String nombre, colonia, municipio;

    public GrupoDTO() {

    }

    public GrupoDTO(Long id_grupo, Long id_usuario, String nombre, String colonia, String municipio) {
        this.id_grupo = id_grupo;
        this.id_usuario = id_usuario;
        this.nombre = nombre;
        this.colonia = colonia;
        this.municipio = municipio;
    }

    public Long getId_grupo() {
        return id_grupo;
    }

    public void setId_grupo(Long id_grupo) {
        this.id_grupo = id_grupo;
    }

    public Long getId_usuario() {
        return id_usuario;
    }

    public void setId_usuario(Long id_usuario) {
        this.id_usuario = id_usuario;
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
}
