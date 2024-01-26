package com.management.backend.security.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.management.backend.security.model.Authority;

public interface JwtAuthorityRepository extends JpaRepository<Authority, Long> {

    Optional<Authority> findByAuthority(String authority);

}
