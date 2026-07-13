package com.aether.citizen.dto;

import com.aether.citizen.entity.Citizen;
import lombok.Builder;
import lombok.Getter;

import java.time.Instant;
import java.time.LocalDate;

@Getter
@Builder
public class CitizenResponse {

    private String id;
    private String firstName;
    private String lastName;
    private String middleName;
    private LocalDate dateOfBirth;
    private String gender;
    private String nationalIdNumber;
    private String passportNumber;
    private String driverLicenseNumber;
    private String phoneNumber;
    private String email;
    private String address;
    private String verificationStatus;
    private Boolean active;
    private Instant createdAt;
    private Instant updatedAt;

    public static CitizenResponse from(Citizen citizen) {
        return CitizenResponse.builder()
                .id(citizen.getId())
                .firstName(citizen.getFirstName())
                .lastName(citizen.getLastName())
                .middleName(citizen.getMiddleName())
                .dateOfBirth(citizen.getDateOfBirth())
                .gender(citizen.getGender())
                .nationalIdNumber(citizen.getNationalIdNumber())
                .passportNumber(citizen.getPassportNumber())
                .driverLicenseNumber(citizen.getDriverLicenseNumber())
                .phoneNumber(citizen.getPhoneNumber())
                .email(citizen.getEmail())
                .address(citizen.getAddress())
                .verificationStatus(citizen.getVerificationStatus().name())
                .active(citizen.getActive())
                .createdAt(citizen.getCreatedAt())
                .updatedAt(citizen.getUpdatedAt())
                .build();
    }
}