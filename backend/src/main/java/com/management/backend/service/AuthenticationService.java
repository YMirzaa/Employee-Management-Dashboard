package com.management.backend.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.management.backend.common.MessageResponse;
import com.management.backend.common.MessageType;
import com.management.backend.dto.LoginRequest;
import com.management.backend.dto.LoginResponse;
import com.management.backend.dto.RegisterRequest;
import com.management.backend.security.JwtTokenService;
import com.management.backend.security.model.Authority;
import com.management.backend.security.model.JwtUserDetails;
import com.management.backend.security.repository.JwtAuthorityRepository;
import com.management.backend.security.repository.JwtUserDetailsRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final JwtTokenService jwtTokenService;
    private final JwtUserDetailsRepository jwtUserDetailsRepository;
    private final JwtAuthorityRepository jwtAuthorityRepository;
    private final PasswordEncoder passwordEncoder;

    private final AuthenticationManager authenticationManager;

    public LoginResponse login(LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.username(), loginRequest.password()));

        if (authentication.isAuthenticated()) {

            String token = jwtTokenService.generateToken((JwtUserDetails) authentication.getPrincipal());
            return new LoginResponse(token);
        } else {
            return null;
        }
    }

    // Not neccessary but why not
    @Transactional
    public MessageResponse register(RegisterRequest registerRequest) {

        // Check if user exists
        if (jwtUserDetailsRepository.existsByUsername(registerRequest.username())) {
            return new MessageResponse("User already exists", MessageType.ERROR);
        }
        Authority authority = jwtAuthorityRepository.findByAuthority("ROLE_USER")
                .orElseThrow(() -> new RuntimeException("Authority not found, please contact to admin"));

        JwtUserDetails newUser = JwtUserDetails.builder()
                .username(registerRequest.username())
                .password(passwordEncoder.encode(registerRequest.password()))
                .authorities(Set.of(authority))
                .build();

        // Save user
        jwtUserDetailsRepository.save(newUser);
        return new MessageResponse("User registered successfully", MessageType.SUCCESS);
    }

    // Not used, it puts the authorities in the token
    private Map<String, Object> setExtraClaims(Authentication authentication) {
        Map<String, Object> extraClaims = new HashMap<>();
        List<String> authorities = authentication.getAuthorities().stream()
                .map(authority -> authority.getAuthority()).toList();

        extraClaims.put("authorities", authorities);
        return extraClaims;
    }
}
