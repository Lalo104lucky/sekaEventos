package mx.edu.utez.seka_eventos.models.dao;

import mx.edu.utez.seka_eventos.models.entity.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    Optional<Usuario> findUsuarioByUsuario(String usuario);

    Optional<Usuario> findUsuarioByCorreo(String correo);

    @Query(value = "SELECT * FROM usuario WHERE usuario = :usuario AND contrasena = :contrasena", nativeQuery = true)
    Usuario findByUsuarioAndContrasena(@Param("usuario") String usuario, @Param("contrasena") String contrasena);

    @Query(value = "SELECT * FROM usuario WHERE usuario = :usuario", nativeQuery = true)
    Usuario findByUser(@Param("usuario") String usuario);

    @Modifying
    @Query(value = "INSERT INTO usuario (id_usuario, usuario, correo, contrasena, nombre, apellido_p, apellido_m, telefono, id_rol) VALUES (:id_usuario, :usuario,:correo, :contrasena, :nombre, :apellido_p, :apellido_m, :telefono, :id_rol)", nativeQuery = true)
    int saveUsuario(@Param("id_usuario") Long id_usuario, @Param("usuario") String usuario, @Param("correo") String correo, @Param("contrasena") String contrasena, @Param("nombre") String nombre, @Param("apellido_p") String apellido_p, @Param("apellido_m") String apellido_m, @Param("telefono") String telefono, @Param("id_rol") Long id_rol);
}
