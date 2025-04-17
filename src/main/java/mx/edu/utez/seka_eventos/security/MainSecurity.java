package mx.edu.utez.seka_eventos.security;

import mx.edu.utez.seka_eventos.security.filters.AuthFilter;
import mx.edu.utez.seka_eventos.security.interceptors.CustomInterceptor;
import mx.edu.utez.seka_eventos.security.service.UserDetailsImplService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Lazy;
import org.springframework.context.annotation.Primary;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.HeadersConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.List;

@Configuration
@EnableWebSecurity
public class MainSecurity implements WebMvcConfigurer {

    @Autowired
    private CustomInterceptor customInterceptor;

    @Autowired
    private AuthFilter authFilter;

    @Autowired
    @Lazy
    private UserDetailsImplService service;

    private final static String[] WHITE_LIST = {
            "/api/test",
            "/api/auth/login",
            "/api/send-email",
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
    public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) throws Exception {
        return configuration.getAuthenticationManager();
    }

    @Bean
    public AuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider dao = new DaoAuthenticationProvider();
        dao.setUserDetailsService(service);
        dao.setPasswordEncoder(passwordEncoder());
        return dao;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.csrf(csrf -> csrf.disable()).cors(Customizer.withDefaults())
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers(WHITE_LIST).permitAll()
                        .requestMatchers("/api/test/secured").hasRole("ADMIN")
                        .requestMatchers("/api/eventos/**").permitAll()
                        .requestMatchers("/api/grupo/**").permitAll()
                        .requestMatchers("/api/rol/**").hasRole("ADMIN")
                        .requestMatchers("/api/tipoevento/**").permitAll()
                        .requestMatchers("/api/usuario/**").permitAll()
                        .requestMatchers("/api/images/**").permitAll()
                        .anyRequest().authenticated()
                ).httpBasic(Customizer.withDefaults())
                .headers(header -> header.frameOptions(HeadersConfigurer.FrameOptionsConfig::sameOrigin))
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authenticationProvider(authenticationProvider())
                .addFilterBefore(authFilter, UsernamePasswordAuthenticationFilter.class)
                .logout(out -> out.logoutUrl("/api/auth/logout").clearAuthentication(true));
        return http.build();
    }

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(customInterceptor).addPathPatterns("/api/test/secured");
    }
    

}
