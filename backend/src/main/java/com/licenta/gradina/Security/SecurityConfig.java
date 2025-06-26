package com.licenta.gradina.Security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
public class SecurityConfig {

    private final JwtFilter jwtFilter;

    public SecurityConfig(JwtFilter jwtFilter) {
        this.jwtFilter = jwtFilter;
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()
                        .requestMatchers(HttpMethod.POST, "/Autentificare/inregistrare").permitAll()
                        .requestMatchers(HttpMethod.POST, "/Autentificare/autentificare").permitAll()
                        .requestMatchers(HttpMethod.GET, "/plante/**").permitAll()

                        .requestMatchers(HttpMethod.POST, "/plante/**").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.PUT, "/plante/**").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.DELETE, "/plante/**").hasRole("ADMIN")

                        .requestMatchers(HttpMethod.GET, "/evenimente/**").permitAll()
                        .requestMatchers(HttpMethod.POST, "/bilete/cumpara-bilete").permitAll()
                        .requestMatchers(HttpMethod.POST, "/abonamente/cumpara").permitAll()
                        .requestMatchers(HttpMethod.GET, "/abonamente/abonamentele-mele").permitAll()

                        .requestMatchers(HttpMethod.POST, "/servicii/calendar/**").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.PUT, "/servicii/calendar/**").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.DELETE, "/servicii/calendar/**").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.GET, "/servicii/calendar/**").permitAll()

                        .requestMatchers(HttpMethod.GET, "/Recenzii").permitAll()
                        .requestMatchers(HttpMethod.POST, "/Recenzii/adauga").permitAll()

                        .requestMatchers(HttpMethod.POST, "/galerie/**").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.DELETE, "/galerie/**").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.GET, "/galerie/**").permitAll()



                        .anyRequest().authenticated()
                )
                .sessionManagement(sess -> sess
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                )
                .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public AuthenticationManager authenticationManager(
            AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }
}
