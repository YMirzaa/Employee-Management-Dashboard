package com.management.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.management.backend.security.JwtAuthenticationFilter;
import com.management.backend.security.JwtUserDetailsService;

import lombok.RequiredArgsConstructor;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity(prePostEnabled = true)
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;
    private final JwtUserDetailsService jwtUserDetailsService;
    // private final JwtAuthenticationProvider jwtAuthenticationProvider;

    @Bean
    public AuthenticationProvider authenticationProvider() {

        // Custom authentication provider
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();

        authProvider.setUserDetailsService(jwtUserDetailsService);
        authProvider.setPasswordEncoder(passwordEncoder());

        return authProvider;

    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }

    @Bean
    protected PasswordEncoder passwordEncoder() {

        return new BCryptPasswordEncoder();
    }

    @Bean
    protected SecurityFilterChain securtiyFilterChain(HttpSecurity http) throws Exception {

        http
                .authorizeHttpRequests(
                        request -> request
                                .requestMatchers("/**")
                                .permitAll()
                                .anyRequest().authenticated())
                // .exceptionHandling(
                // exception -> exception
                // .authenticationEntryPoint(jwtAuthenticationEntryPoint))
                // .cors(
                // cors -> cors
                // .disable())
                .csrf(csrf -> csrf.disable())
                .formLogin(formLogin -> formLogin.disable())
                .logout(logout -> logout.disable())

                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .addFilterBefore(jwtAuthenticationFilter,
                        UsernamePasswordAuthenticationFilter.class);
        // .httpBasic(Customizer.withDefaults());

        return http.build();
    }
}
