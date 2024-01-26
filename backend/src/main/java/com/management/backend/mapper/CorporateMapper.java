package com.management.backend.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

import com.management.backend.dto.CorporateProfileDto;
import com.management.backend.model.CorporateProfile;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.ERROR)
public interface CorporateMapper {

    CorporateProfileDto toDto(CorporateProfile corporateProfile);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "employee", ignore = true)
    CorporateProfile toEntity(CorporateProfileDto corporateProfileDto);
}
