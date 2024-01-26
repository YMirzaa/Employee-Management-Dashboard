package com.management.backend.repository;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.management.backend.model.Employee;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {

    Optional<Employee> findByEmail(String email);

    Page<Employee> findAllByOrderByIdAsc(Pageable pageable);

    Page<Employee> findByName(String name, Pageable pageable);
}
