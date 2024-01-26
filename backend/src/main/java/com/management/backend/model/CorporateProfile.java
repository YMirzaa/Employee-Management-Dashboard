package com.management.backend.model;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Builder
@Table(name = "CorporateProfile")
public class CorporateProfile {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

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
    private LocalDate enterenceDate;

    @JsonBackReference
    @OneToOne(mappedBy = "corporateProfile")
    private Employee employee;

}
