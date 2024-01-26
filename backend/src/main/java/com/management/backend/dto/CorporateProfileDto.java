package com.management.backend.dto;

import java.time.LocalDate;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.datatype.jsr310.deser.LocalDateDeserializer;
import com.fasterxml.jackson.datatype.jsr310.ser.LocalDateSerializer;
import com.management.backend.model.CorporateProfile;

import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CorporateProfileDto {

    private String recordNumber;

    private String personnelCadre;

    private String title;

    private String unit;

    // private String project;

    private String assignment;

    private String workType;

    private String internalNumber;

    private String roomNumber;

    @Temporal(TemporalType.DATE)
    @JsonSerialize(using = LocalDateSerializer.class)
    @JsonDeserialize(using = LocalDateDeserializer.class)
    private LocalDate enterenceDate;

    public CorporateProfileDto(CorporateProfile corporateProfile) {
        this.recordNumber = corporateProfile.getRecordNumber();
        this.personnelCadre = corporateProfile.getPersonnelCadre();
        this.title = corporateProfile.getTitle();
        this.unit = corporateProfile.getUnit();
        // this.project = corporateProfile.getProject();
        this.assignment = corporateProfile.getAssignment();
        this.workType = corporateProfile.getWorkType();
        this.internalNumber = corporateProfile.getInternalNumber();
        this.roomNumber = corporateProfile.getRoomNumber();
        this.enterenceDate = corporateProfile.getEnterenceDate();
    }
}
