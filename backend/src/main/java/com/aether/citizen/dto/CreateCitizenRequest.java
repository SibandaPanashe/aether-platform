package com.aether.citizen.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Past;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class CreateCitizenRequest {

    @NotBlank(message = "First name is required")
    @Size(max = 100)
    private String firstName;

    @NotBlank(message = "Last name is required")
    @Size(max = 100)
    private String lastName;

    @Size(max = 100)
    private String middleName;

    @Past(message = "Date of birth must be in the past")
    private LocalDate dateOfBirth;

    @Size(max = 10)
    private String gender;

    @Size(max = 50)
    private String nationalIdNumber;

    @Size(max = 50)
    private String passportNumber;

    @Size(max = 50)
    private String driverLicenseNumber;

    @Size(max = 20)
    private String phoneNumber;

    @Size(max = 255)
    private String email;

    @Size(max = 500)
    private String address;
}