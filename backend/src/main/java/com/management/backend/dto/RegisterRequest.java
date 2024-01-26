package com.management.backend.dto;

import jakarta.validation.constraints.NotBlank;

public record RegisterRequest(

        @NotBlank(message = "Username cannot be blank") String username,
        @NotBlank(message = "Password cannot be blank") String password,
        String email,
        String firstName,
        String lastName,
        String phoneNumber,
        String address) {

    // Not used at the moment because we will encode the password
    // public JwtUserDetails toEntity(Authority authority) {

    // return JwtUserDetails.builder()
    // .username(username)
    // .password(password)
    // .authorities(
    // Set.of(authority))
    // .build();
    // }

}
