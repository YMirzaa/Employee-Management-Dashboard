package com.management.backend.security;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.management.backend.security.model.JwtUserDetails;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@Service
public class JwtTokenService {

    @Value("${jwt.signKey}")
    private String signKey;

    public String generateToken(JwtUserDetails jwtUserDetails) {
        return generateToken(new HashMap<>(), jwtUserDetails);
    }

    public String generateToken(Map<String, Object> extraClaims, JwtUserDetails jwtUserDetails) {
        return Jwts
                .builder()
                .setClaims(extraClaims)
                .setSubject(jwtUserDetails.getUsername())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 24 * 3))
                .signWith(SignatureAlgorithm.HS256, signKey)
                .compact();
    }

    public Boolean isTokenValid(String token, JwtUserDetails jwtUserDetails) {
        final String username = extractUserName(token);
        return (username.equals(jwtUserDetails.getUsername()) && !isTokenExpired(token));
    }

    private Boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    public String extractUserName(String token) {
        return exctractClaim(token, Claims::getSubject);
    }

    private Date extractExpiration(String token) {
        return exctractClaim(token, Claims::getExpiration);
    }

    // From body of jwt, extract a claim by the desired function.
    public <T> T exctractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    private Claims extractAllClaims(String token) {
        // Extract jwt body
        return Jwts
                .parser()
                .setSigningKey(signKey)
                .parseClaimsJws(token)
                .getBody();
    }

}
