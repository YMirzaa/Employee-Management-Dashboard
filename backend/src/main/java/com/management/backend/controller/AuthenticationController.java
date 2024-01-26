package com.management.backend.controller;

import org.springframework.web.bind.annotation.RestController;

import com.management.backend.common.MessageResponse;
import com.management.backend.dto.LoginRequest;
import com.management.backend.dto.LoginResponse;
import com.management.backend.dto.RegisterRequest;
import com.management.backend.service.AuthenticationService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/auth")
public class AuthenticationController {

    private final AuthenticationService authenticationService;

    @PostMapping("/login")
    public LoginResponse login(@RequestBody @Valid LoginRequest loginRequest) {
        return authenticationService.login(loginRequest);
    }

    // Not null for pathvariable
    @PostMapping("register")
    public MessageResponse registResponse(@RequestBody @Valid RegisterRequest registerRequest) {

        return authenticationService.register(registerRequest);
    }

    // To test the authorization
    @GetMapping("/user")
    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    public String user() {
        return "user";
    }

    @GetMapping("/admin")
    @PreAuthorize("hasAnyRole('ADMIN')")
    public String admin() {
        return "admin";
    }
}
