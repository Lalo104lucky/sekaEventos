package mx.edu.utez.seka_eventos.security.filters;

import io.jsonwebtoken.Claims;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import mx.edu.utez.seka_eventos.models.entity.Usuario;
import mx.edu.utez.seka_eventos.security.MainSecurity;
import mx.edu.utez.seka_eventos.security.jwt.JWTProvider;
import mx.edu.utez.seka_eventos.security.service.UserDetailsImplService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.util.AntPathMatcher;
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
    private UserDetailsImplService service;

    @Autowired
    private JWTProvider provider;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        try{
            final String AUTH_HEADER = request.getHeader("Authorization");
            String requestUri = request.getRequestURI();
            Set<String> whiteList = Arrays.stream(MainSecurity.getWHITE_LIST()).collect(Collectors.toSet());

            AntPathMatcher matcher = new AntPathMatcher();
            boolean isWhitelisted = whiteList.stream().anyMatch(path -> matcher.match(path, requestUri));

            if (!isWhitelisted) {
                System.out.println("Método de la solicitud: " + request.getMethod());
                System.out.println("Ruta a la que se quiere acceder: " + request.getRequestURI());
                System.out.println("Verificando los encabezados de la solicitud...");

                if (AUTH_HEADER != null && AUTH_HEADER.startsWith("Bearer")) {
                    String token = provider.resolveToken(request);
                    System.out.println("Verificando que el usuario exista...");
                    if (token != null) {
                        Claims claims = provider.resolveClaims(request);
                        if (claims != null && provider.validateClaims(claims, token)) {
                            String username = claims.getSubject();
                            UserDetails usuario = service.loadUserByUsername(username);
                            if (usuario != null){
                                Authentication auth = new UsernamePasswordAuthenticationToken(usuario, null, usuario.getAuthorities());
                                SecurityContextHolder.getContext().setAuthentication(auth);
                            } else{
                                response.sendError(HttpServletResponse.SC_NOT_FOUND, "El usuario no existe");
                                return;
                            }
                        } else {
                            response.sendError(HttpServletResponse.SC_FORBIDDEN, "Token inválido");
                            return;
                        }
                    }
                } else {
                    System.out.println("El usuario no tiene autorización...");
                    response.sendError(HttpServletResponse.SC_FORBIDDEN, "Sin autorización");
                    return;
                }
            } else {
                System.out.println("La ruta solicitada está dentro de la white list...");
            }
        } catch (Exception e){
            e.printStackTrace();
            response.sendError(HttpServletResponse.SC_FORBIDDEN, "Sin autorización");
            return;
        }
        filterChain.doFilter(request, response);
        System.out.println("Cierre del filtro AuthFilter");
    }
}
