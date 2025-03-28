package mx.edu.utez.seka_eventos.security.entity;

import mx.edu.utez.seka_eventos.models.entity.Usuario;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Collections;
import java.util.Set;


public class UserDetailsImpl implements UserDetails {

    private String usuario;
    private String contrasena;
    private Set<GrantedAuthority> authorities;

    public UserDetailsImpl(String usuario, String contrasena, Set<GrantedAuthority> authorities) {
        this.usuario = usuario;
        this.contrasena = contrasena;
        this.authorities = authorities;
    }

    public static UserDetailsImpl build(Usuario usuario) {
        Set<GrantedAuthority> authorities = Collections.singleton(new SimpleGrantedAuthority("ROLE_" + usuario.getRol().getRol()));
        System.out.println("authorities: " + authorities);
        return new UserDetailsImpl(usuario.getUsuario(), usuario.getContrasena(), authorities);
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    @Override
    public String getPassword() {
        return contrasena;
    }

    @Override
    public String getUsername() {
        return usuario;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
