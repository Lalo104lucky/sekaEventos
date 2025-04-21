package mx.edu.utez.seka_eventos.security.interceptors;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import mx.edu.utez.seka_eventos.models.dao.BitacoraRepository;
import mx.edu.utez.seka_eventos.models.entity.Bitacora;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import java.net.InetAddress;
import java.net.UnknownHostException;
import java.time.LocalDateTime;

@Component
public class CustomInterceptor implements HandlerInterceptor {

    @Autowired
    private BitacoraRepository repository;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        String ip = convertIPv6toIPv4(request.getRemoteAddr());
        System.out.println("Revisando la dirección IP de la solicitud...");
        System.out.println(ip);

        if (ip.startsWith("192.168.0")){
            System.out.println("La dirección IP está bloqueada...");
            response.sendError(HttpServletResponse.SC_FORBIDDEN, "La dirección IP está bloqueada");
            return false;
        }

        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String username = (auth != null && auth.isAuthenticated()) ? auth.getName() : "anónimo";

        Bitacora bitacora = new Bitacora();
        bitacora.setMetodo(request.getMethod());
        bitacora.setEndpoint(request.getRequestURI());
        bitacora.setUsuario(username);
        bitacora.setFecha(LocalDateTime.now());

        repository.save(bitacora);
        return true;
    }

    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {
        System.out.println("Cierre del interceptor");
    }

    private String convertIPv6toIPv4(String ip) {
        try {
            InetAddress inetAddress = InetAddress.getByName(ip);
            byte[] addressBytes = inetAddress.getAddress();

            if (addressBytes.length == 4) {
                return ip;
            }

            if ("0:0:0:0:0:0:0:1".equals(ip) || "::1".equals(ip)) {
                return "127.0.0.1";
            }
        } catch (UnknownHostException ex) {
            System.out.println("La dirección del host es desconocido");
            ex.printStackTrace();
        }
        return ip;
    }
}
