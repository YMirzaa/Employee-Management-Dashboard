package com.management.backend.security;
// package com.management.backend.security;

// import org.springframework.security.authentication.AuthenticationProvider;
// import org.springframework.security.authentication.BadCredentialsException;
// import
// org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
// import org.springframework.security.core.Authentication;
// import org.springframework.security.core.AuthenticationException;
// import org.springframework.security.crypto.password.PasswordEncoder;
// import org.springframework.stereotype.Service;

// import com.management.backend.security.model.JwtUserDetails;

// import lombok.RequiredArgsConstructor;

// @Service
// @RequiredArgsConstructor
// public class JwtAuthenticationProvider implements AuthenticationProvider {

// private final JwtUserDetailsService jwtUserDetailsService;
// private final PasswordEncoder passwordEncoder;

// @Override
// public Authentication authenticate(Authentication authentication) throws
// AuthenticationException {
// String username = authentication.getPrincipal().toString();
// String password = authentication.getCredentials().toString();

// JwtUserDetails jwtUserDetails =
// jwtUserDetailsService.loadUserByUsername(username);

// // Check raw password with encoded password
// if (passwordEncoder.matches(password, jwtUserDetails.getPassword())) {
// System.out.println("Password matches");
// // if (jwtUserDetails.getPassword().equals(password)) {
// // Authenticate
// return new UsernamePasswordAuthenticationToken(jwtUserDetails, null,
// jwtUserDetails.getAuthorities());

// } else {
// throw new BadCredentialsException("Username or password is wrong");
// }

// }

// @Override
// public boolean supports(Class<?> authentication) {
// return
// authentication.isAssignableFrom(UsernamePasswordAuthenticationToken.class);
// }

// }
