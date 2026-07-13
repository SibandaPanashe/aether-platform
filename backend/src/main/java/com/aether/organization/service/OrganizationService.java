package com.aether.organization.service;

import com.aether.organization.dto.CreateOrganizationRequest;
import com.aether.organization.dto.OrganizationResponse;
import com.aether.organization.dto.UpdateOrganizationRequest;
import com.aether.organization.entity.Organization;
import com.aether.organization.repository.OrganizationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class OrganizationService {

    private final OrganizationRepository organizationRepository;

    @Transactional
    public OrganizationResponse create(CreateOrganizationRequest request) {
        if (organizationRepository.existsByCode(request.getCode())) {
            throw new RuntimeException("Organization code already exists: " + request.getCode());
        }
        if (organizationRepository.existsByName(request.getName())) {
            throw new RuntimeException("Organization name already exists: " + request.getName());
        }

        Organization org = Organization.builder()
                .name(request.getName())
                .code(request.getCode())
                .email(request.getEmail())
                .phoneNumber(request.getPhoneNumber())
                .address(request.getAddress())
                .active(true)
                .build();

        organizationRepository.save(org);
        return OrganizationResponse.from(org);
    }

    @Transactional(readOnly = true)
    public OrganizationResponse getById(UUID id) {
        Organization org = organizationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Organization not found: " + id));
        return OrganizationResponse.from(org);
    }

    @Transactional(readOnly = true)
    public OrganizationResponse getByCode(String code) {
        Organization org = organizationRepository.findByCode(code)
                .orElseThrow(() -> new RuntimeException("Organization not found: " + code));
        return OrganizationResponse.from(org);
    }

    @Transactional(readOnly = true)
    public List<OrganizationResponse> getAll() {
        return organizationRepository.findAll()
                .stream()
                .map(OrganizationResponse::from)
                .toList();
    }

    @Transactional
    public OrganizationResponse update(UUID id, UpdateOrganizationRequest request) {
        Organization org = organizationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Organization not found: " + id));

        if (request.getName() != null && !request.getName().equals(org.getName())) {
            if (organizationRepository.existsByName(request.getName())) {
                throw new RuntimeException("Organization name already exists: " + request.getName());
            }
            org.setName(request.getName());
        }
        if (request.getEmail() != null) {
            org.setEmail(request.getEmail());
        }
        if (request.getPhoneNumber() != null) {
            org.setPhoneNumber(request.getPhoneNumber());
        }
        if (request.getAddress() != null) {
            org.setAddress(request.getAddress());
        }
        if (request.getActive() != null) {
            org.setActive(request.getActive());
        }

        organizationRepository.save(org);
        return OrganizationResponse.from(org);
    }

    @Transactional
    public void delete(UUID id) {
        Organization org = organizationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Organization not found: " + id));
        org.setActive(false);
        organizationRepository.save(org);
    }
}