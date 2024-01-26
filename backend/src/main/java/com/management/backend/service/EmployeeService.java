package com.management.backend.service;

import java.io.IOException;
import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.management.backend.dto.EmployeeDto;
import com.management.backend.mapper.EmployeeMapper;
import com.management.backend.model.Employee;
import com.management.backend.repository.EmployeeRepository;
import com.management.backend.security.model.JwtUserDetails;
import com.management.backend.security.repository.JwtUserDetailsRepository;

import lombok.NonNull;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class EmployeeService {

    private final EmployeeRepository employeeRepository;
    private final JwtUserDetailsRepository JwtUserDetailsRepository;
    private final EmployeeMapper employeeMapper;
    private final S3Service s3Service;

    public Page<EmployeeDto> getAllEmployees(String name,
            Integer page, Integer size, String direction, String sort) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.fromString(direction), sort));
        if (name != null) {
            Page<Employee> employees = employeeRepository.findByName(name, pageable);
            Page<EmployeeDto> employeeDtos = employees.map(employeeMapper::toDto);
            return employeeDtos;
        } else {
            // return employeeRepository.findAll(pageable);
            Page<Employee> employees = employeeRepository.findAll(pageable);
            Page<EmployeeDto> employeeDtos = employees.map(employeeMapper::toDto);
            return employeeDtos;
        }
    }

    public void createEmployee(EmployeeDto employeeDto) {
        Employee employee = employeeMapper.toEntity(employeeDto);
        JwtUserDetails jwtUserDetails = JwtUserDetails.builder().username(employee.getName())
                .password(employee.getLastName()).build();
        // employee.setJwtUserDetails(jwtUserDetails);
        jwtUserDetails.setEmployee(employee);
        JwtUserDetailsRepository.save(jwtUserDetails);
        // employeeRepository.save(employee);

    }

    public void updateEmployee(EmployeeDto employeeDto) {
        Employee employee = employeeRepository.findByEmail(employeeDto.getEmail())
                .orElseThrow(() -> new RuntimeException("Employee not found"));

        employeeRepository.save(employee);
    }

    public EmployeeDto getEmployeeById(@NonNull Long id) {
        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Employee not found"));
        return employeeMapper.toDto(employee);
    }

    public void uploadPhoto(@NonNull Long id, MultipartFile file) {
        Employee employee = employeeRepository.findById(id).orElseThrow(
                () -> new RuntimeException("Employee not found"));
        try {
            String profileImageId = UUID.randomUUID().toString();
            employee.setPhotoId(profileImageId);
            employeeRepository.save(employee);
            s3Service.putObject("tubitak.files", "profile-image/%s/%s".formatted(id, profileImageId),
                    file.getBytes());
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

    }

    public byte[] getPhoto(Long id) {
        Employee employee = employeeRepository.findById(id).orElseThrow(
                () -> new RuntimeException("Employee not found"));

        String profileImageId = employee.getPhotoId();

        return s3Service.getObject("tubitak.files",
                "profile-image/%s/%s".formatted(id, profileImageId));
    }

}
