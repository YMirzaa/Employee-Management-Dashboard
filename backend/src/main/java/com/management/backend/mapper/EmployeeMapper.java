package com.management.backend.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

import com.management.backend.dto.EmployeeDto;
import com.management.backend.model.Employee;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.ERROR, uses = { CorporateMapper.class })
public interface EmployeeMapper {

    @Mapping(target = "corporateProfileDto", source = "corporateProfile")
    EmployeeDto toDto(Employee employee);

    @Mapping(target = "corporateProfile", source = "corporateProfileDto")
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "jwtUserDetails", ignore = true)
    @Mapping(target = "createdDate", ignore = true)
    @Mapping(target = "updatedDate", ignore = true)
    Employee toEntity(EmployeeDto employeeDto);

}
