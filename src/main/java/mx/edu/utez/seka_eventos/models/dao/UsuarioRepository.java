package mx.edu.utez.seka_eventos.models.dao;

import mx.edu.utez.seka_eventos.models.entity.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    @Query(value = "SELECT * FROM usuario WHERE correo = :correo AND contrasena = :contrasena", nativeQuery = true)
    Usuario findByCorreoAndContrasena(@Param("correo") String correo, @Param("contrasena") String contrasena);

    @Query(value = "SELECT * FROM usuario WHERE correo = :correo", nativeQuery = true)
    Usuario findByCorreo(@Param("correo") String correo);

    @Modifying
    @Query(value = "INSERT INTO usuario (id_usuario, correo, contrasena, nombre, apellido_p, apellido_m, telefono, id_rol) VALUES (:id_usuario, :correo, :contrasena, :nombre, :apellido_p, :apellido_m, :telefono, :id_rol)", nativeQuery = true)
    int saveUsuario(@Param("id_usuario") Long id_usuario, @Param("correo") String correo, @Param("contrasena") String contrasena, @Param("nombre") String nombre, @Param("apellido_p") String apellido_p, @Param("apellido_m") String apellido_m, @Param("telefono") String telefono, @Param("id_rol") Long id_rol);
}
