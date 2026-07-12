package com.aether.citizen.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.Instant;
import java.time.LocalDate;

@Entity
@Table(name = "citizens")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Citizen {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @Column(nullable = false, length = 100)
    private String firstName;

    @Column(nullable = false, length = 100)
    private String lastName;

    @Column(length = 100)
    private String middleName;

    @Column(nullable = false)
    private LocalDate dateOfBirth;

    @Column(length = 10)
    private String gender;

    @Column(length = 50, unique = true)
    private String nationalIdNumber;

    @Column(length = 50, unique = true)
    private String passportNumber;

    @Column(length = 50, unique = true)
    private String driverLicenseNumber;

    @Column(length = 20)
    private String phoneNumber;

    @Column(length = 255)
    private String email;

    @Column(length = 500)
    private String address;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    @Builder.Default
    private VerificationStatus verificationStatus = VerificationStatus.PENDING;

    @Builder.Default
    @Column(nullable = false)
    private Boolean active = true;

    @CreationTimestamp
    @Column(nullable = false, updatable = false)
    private Instant createdAt;

    @UpdateTimestamp
    @Column(nullable = false)
    private Instant updatedAt;
}