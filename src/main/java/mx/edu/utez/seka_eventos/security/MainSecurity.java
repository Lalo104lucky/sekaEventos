package mx.edu.utez.seka_eventos.security;

import mx.edu.utez.seka_eventos.security.filters.AuthFilter;
import mx.edu.utez.seka_eventos.security.interceptors.CustomInterceptor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@EnableWebSecurity
// @EnableMethodSecurity
public class MainSecurity implements WebMvcConfigurer {

    @Autowired
    private AuthFilter customFilter;

    @Autowired
    private CustomInterceptor customInterceptor;

    private final static String[] WHITE_LIST = {
            "/api/test",
            "/api/auth/login",
            "/api/send-email"
    };

    public static String[] getWHITE_LIST() {
        return WHITE_LIST;
    }
    @Bean
    @Primary
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.csrf(csrf -> csrf.disable()).cors(cors -> cors.disable())
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers(WHITE_LIST).permitAll()
                        .requestMatchers("/api/test/secured").hasRole("ADMIN")
                        .requestMatchers("/api/eventos/**").permitAll()
                        .requestMatchers("/api/grupo/**").permitAll()
                        .requestMatchers("/api/rol/**").hasRole("ADMIN")
                        .requestMatchers("/api/tipoevento/**").permitAll()
                        .requestMatchers("/api/usuario/**").permitAll()
                        .anyRequest().authenticated()
                ).addFilterBefore(customFilter, UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(customInterceptor).addPathPatterns("/api/test/secured");
    }

}
