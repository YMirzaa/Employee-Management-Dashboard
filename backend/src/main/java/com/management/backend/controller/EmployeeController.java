package com.management.backend.controller;

import org.springframework.data.domain.Page;
import org.springframework.http.MediaType;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.management.backend.common.MessageResponse;
import com.management.backend.common.MessageType;
import com.management.backend.dto.EmployeeDto;
import com.management.backend.security.model.JwtUserDetails;
import com.management.backend.service.EmployeeService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/employee")
public class EmployeeController {

    private final EmployeeService employeeService;

    @GetMapping
    public Page<EmployeeDto> getEmployees(@RequestParam(required = false) String name,
            @RequestParam(defaultValue = "0", required = false) Integer page,
            @RequestParam(defaultValue = "5") Integer size, @RequestParam(defaultValue = "ASC") String direction,
            @RequestParam(defaultValue = "id") String sort) {
        return employeeService.getAllEmployees(name,
                page, size, direction, sort);
    }

    @GetMapping("/{id}")
    public EmployeeDto getEmployeeById(@PathVariable Long id) {
        return employeeService.getEmployeeById(id);
    }

    @PostMapping(value = "/{id}/photo", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public void uploadPhoto(@PathVariable(required = true) Long id, @RequestParam MultipartFile file) {
        employeeService.uploadPhoto(id, file);
    }

    @GetMapping("/{id}/photo")
    public byte[] getPhoto(@PathVariable(required = true) Long id) {
        return employeeService.getPhoto(id);
    }

    @PostMapping
    public MessageResponse createEmployee(@RequestBody EmployeeDto employeeDto) {
        System.out.println(employeeDto);

        employeeService.createEmployee(employeeDto);
        return new MessageResponse("Employee created successfully ",
                MessageType.SUCCESS);
    }

    @PutMapping
    public MessageResponse updateEmployee(@RequestBody EmployeeDto employeeDto) {
        employeeService.updateEmployee(employeeDto);
        return new MessageResponse("Employee updated successfully ",
                MessageType.SUCCESS);
    }

    @GetMapping("/user")
    public EmployeeDto user() {
        Authentication user = SecurityContextHolder.getContext().getAuthentication();
        JwtUserDetails jwtUserDetails = (JwtUserDetails) user.getCredentials();
        return new EmployeeDto(jwtUserDetails.getEmployee());
        // return employeeService.getUser(jwtUserDetails.getUsername());
    }

    // @GetMapping("/search")
    // public List<EmployeeDto> searchEmployees(@RequestParam String queryString) {
    // return employeeService.getEmployeesWithPage(queryString);
    // }

}
