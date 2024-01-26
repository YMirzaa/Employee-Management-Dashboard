package com.management.backend.dto;

import java.time.LocalDate;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.datatype.jsr310.deser.LocalDateDeserializer;
import com.fasterxml.jackson.datatype.jsr310.ser.LocalDateSerializer;
import com.management.backend.model.Employee;
import com.management.backend.type.BloodType;
import com.management.backend.type.Gender;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@Builder
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class EmployeeDto {
    private Long id;
    private String photoId;
    private String email;
    private String name;
    private String lastName;
    private String phoneNumber;
    private String carPlate;
    private String tcNo;
    private String address;
    private String emergencyContactName;
    private String emergencyContactPhoneNumber;
    private Gender gender;
    private BloodType bloodType;
    private String fullName;

    @JsonDeserialize(using = LocalDateDeserializer.class)
    @JsonSerialize(using = LocalDateSerializer.class)
    private LocalDate birthDate;
    private CorporateProfileDto corporateProfileDto;

    public EmployeeDto(Employee employee) {
        this.email = employee.getEmail();
        this.name = employee.getName();
        this.lastName = employee.getLastName();
        this.phoneNumber = employee.getPhoneNumber();
        this.carPlate = employee.getCarPlate();
        this.tcNo = employee.getTcNo();
        this.address = employee.getAddress();
        this.emergencyContactName = employee.getEmergencyContactName();
        this.emergencyContactPhoneNumber = employee.getEmergencyContactPhoneNumber();
        this.gender = employee.getGender();
        this.bloodType = employee.getBloodType();
        this.fullName = employee.getFullName();
        this.birthDate = employee.getBirthDate();
        this.corporateProfileDto = new CorporateProfileDto(employee.getCorporateProfile());

    }
}
