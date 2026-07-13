package com.aether.organization.dto;

import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdateOrganizationRequest {

    @Size(max = 150, message = "Name must not exceed 150 characters")
    private String name;

    @Size(max = 255, message = "Email must not exceed 255 characters")
    private String email;

    @Size(max = 30, message = "Phone number must not exceed 30 characters")
    private String phoneNumber;

    @Size(max = 255, message = "Address must not exceed 255 characters")
    private String address;

    private Boolean active;
}