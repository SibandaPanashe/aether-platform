package com.aether.organization.service;

import com.aether.organization.dto.CreateOrganizationRequest;
import com.aether.organization.dto.OrganizationResponse;
import com.aether.organization.dto.UpdateOrganizationRequest;
import com.aether.organization.entity.Organization;
import com.aether.organization.repository.OrganizationRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class OrganizationServiceTest {

    @Mock
    private OrganizationRepository organizationRepository;

    @InjectMocks
    private OrganizationService organizationService;

    private CreateOrganizationRequest createRequest;
    private Organization organization;
    private UUID orgId;

    @BeforeEach
    void setUp() {
        orgId = UUID.randomUUID();
        createRequest = new CreateOrganizationRequest();
        createRequest.setName("Test Bank");
        createRequest.setCode("TESTBANK");
        createRequest.setEmail("info@testbank.co.zw");

        organization = Organization.builder()
                .id(orgId)
                .name("Test Bank")
                .code("TESTBANK")
                .email("info@testbank.co.zw")
                .active(true)
                .build();
    }

    @Test
    void create_ShouldCreateOrganization() {
        when(organizationRepository.existsByCode("TESTBANK")).thenReturn(false);
        when(organizationRepository.existsByName("Test Bank")).thenReturn(false);
        when(organizationRepository.save(any(Organization.class))).thenReturn(organization);

        OrganizationResponse response = organizationService.create(createRequest);

        assertThat(response).isNotNull();
        assertThat(response.getName()).isEqualTo("Test Bank");
        assertThat(response.getCode()).isEqualTo("TESTBANK");
        verify(organizationRepository).save(any(Organization.class));
    }

    @Test
    void create_ShouldThrowWhenCodeExists() {
        when(organizationRepository.existsByCode("TESTBANK")).thenReturn(true);

        assertThatThrownBy(() -> organizationService.create(createRequest))
                .isInstanceOf(RuntimeException.class)
                .hasMessageContaining("Organization code already exists");
    }

    @Test
    void getById_ShouldReturnOrganization() {
        when(organizationRepository.findById(orgId)).thenReturn(Optional.of(organization));

        OrganizationResponse response = organizationService.getById(orgId);

        assertThat(response.getId()).isEqualTo(orgId);
    }

    @Test
    void getAll_ShouldReturnList() {
        when(organizationRepository.findAll()).thenReturn(List.of(organization));

        List<OrganizationResponse> responses = organizationService.getAll();

        assertThat(responses).hasSize(1);
    }

    @Test
    void delete_ShouldDeactivateOrganization() {
        when(organizationRepository.findById(orgId)).thenReturn(Optional.of(organization));
        when(organizationRepository.save(any(Organization.class))).thenReturn(organization);

        organizationService.delete(orgId);

        assertThat(organization.getActive()).isFalse();
        verify(organizationRepository).save(organization);
    }
}