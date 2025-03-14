package mx.edu.utez.seka_eventos.models.dao;

import mx.edu.utez.seka_eventos.models.entity.Rol;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface RolRepository extends JpaRepository<Rol, Long> {

    @Modifying
    @Query(value = "INSERT INTO rol (id_rol, rol) VALUES (:id_rol, :rol)", nativeQuery = true)
    int saveRol(@Param("id_rol") Long id_rol, @Param("rol") String rol);

}
