package com.management.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.management.backend.model.CorporateProfile;

public interface CorporateProfileRepository extends JpaRepository<CorporateProfile, Long> {

}
