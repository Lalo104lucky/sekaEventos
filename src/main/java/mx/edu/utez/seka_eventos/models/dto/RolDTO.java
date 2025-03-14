package mx.edu.utez.seka_eventos.models.dto;


public class RolDTO {

    private Long id_rol;
    private String rol;

    public RolDTO() {

    }

    public RolDTO(Long id_rol, String rol) {
        this.id_rol = id_rol;
        this.rol = rol;
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
}
