package com.management.backend.model;

import java.time.LocalDate;
import java.util.Date;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.management.backend.security.model.JwtUserDetails;
import com.management.backend.type.BloodType;
import com.management.backend.type.Gender;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import jakarta.persistence.PrimaryKeyJoinColumn;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import jakarta.persistence.Transient;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Entity
@Builder
@Table(name = "Employee")
public class Employee {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(unique = true)
    private String email;

    private String name;

    private String lastName;

    private String phoneNumber;

    private String carPlate;

    private String tcNo;

    private String address;

    private String emergencyContactName;

    private String emergencyContactPhoneNumber;

    @Column(unique = true)
    private String photoId;

    // @Column(unique = true)
    // private String photoURL;

    @Enumerated(EnumType.STRING)
    private Gender gender;

    @Enumerated(EnumType.STRING)
    private BloodType bloodType;

    @Transient
    private String fullName;

    @CreationTimestamp
    private Date createdDate;

    @UpdateTimestamp
    private Date updatedDate;

    @Temporal(TemporalType.DATE)
    private LocalDate birthDate;

    @JsonBackReference
    @OneToOne(mappedBy = "employee", fetch = FetchType.LAZY)
    private JwtUserDetails jwtUserDetails;

    @JsonManagedReference
    @OneToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @PrimaryKeyJoinColumn
    private CorporateProfile corporateProfile;

    public String getFullName() {
        return name + " " + lastName;
    }
}
