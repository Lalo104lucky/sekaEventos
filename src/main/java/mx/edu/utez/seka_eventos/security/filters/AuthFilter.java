package mx.edu.utez.seka_eventos.security.filters;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import mx.edu.utez.seka_eventos.models.dao.UsuarioRepository;
import mx.edu.utez.seka_eventos.models.entity.Usuario;
import mx.edu.utez.seka_eventos.security.MainSecurity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Component
public class AuthFilter extends OncePerRequestFilter {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        final String AUTH_HEADER = request.getHeader("Authorization");
        Set<String> whiteList = Arrays.stream(MainSecurity.getWHITE_LIST()).collect(Collectors.toSet());
        String token;
        Usuario usuario = null;

        if (!whiteList.contains(request.getRequestURI())) {
            System.out.println("Método de la solicitud: " + request.getMethod());
            System.out.println("Ruta a la que se quiere acceder: " + request.getRequestURI());
            System.out.println("Verificando los encabezados de la solicitud...");

            if (AUTH_HEADER != null && AUTH_HEADER.startsWith("Bearer")) {
                token = AUTH_HEADER.substring(7);
                System.out.println("Token: " + token);
                String[] partesToken = token.split("\\.");
                String correo = partesToken[1] + "." + partesToken[2] + "." + partesToken[3];
                usuario = usuarioRepository.findByCorreo(correo);
                System.out.println("Correo ingresado: " + correo);
                System.out.println("Usuario: " + usuario);

                System.out.println("Verificando que el usuario exista...");
                if (usuario != null && token != null){
                    List<GrantedAuthority> authorities = Collections.singletonList(new SimpleGrantedAuthority("ROLE_" + usuario.getRol().getRol()));
                    UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(usuario.getCorreo(), null, authorities);

                    SecurityContextHolder.getContext().setAuthentication(authToken);
                    System.out.println("El token de seguridad se ha registrado");
                } else {
                    System.out.println("El usuario no existe...");
                    response.sendError(HttpServletResponse.SC_NOT_FOUND, "El usuario no existe");
                    System.out.println("Cierre del filtro AuthFilter");
                    return;
                }
            } else {
                System.out.println("El usuario no tiene autorización...");
                response.sendError(HttpServletResponse.SC_FORBIDDEN, "Sin autorización");
                return;
            }
        } else {
            System.out.println("La ruta solicitada está dentro de la white list...");
        }

        filterChain.doFilter(request, response);

        System.out.println("Cierre del filtro AuthFilter");
    }
}
