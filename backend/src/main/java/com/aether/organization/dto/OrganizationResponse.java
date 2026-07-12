package com.aether.organization.dto;

import com.aether.organization.entity.Organization;
import lombok.Builder;
import lombok.Getter;

import java.time.Instant;
import java.util.UUID;

@Getter
@Builder
public class OrganizationResponse {

    private UUID id;
    private String name;
    private String code;
    private String email;
    private String phoneNumber;
    private String address;
    private Boolean active;
    private Instant createdAt;
    private Instant updatedAt;

    public static OrganizationResponse from(Organization org) {
        return OrganizationResponse.builder()
                .id(org.getId())
                .name(org.getName())
                .code(org.getCode())
                .email(org.getEmail())
                .phoneNumber(org.getPhoneNumber())
                .address(org.getAddress())
                .active(org.getActive())
                .createdAt(org.getCreatedAt())
                .updatedAt(org.getUpdatedAt())
                .build();
    }
}