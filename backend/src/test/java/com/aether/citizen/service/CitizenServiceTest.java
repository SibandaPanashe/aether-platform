package com.aether.citizen.service;

import com.aether.citizen.dto.CitizenResponse;
import com.aether.citizen.dto.CreateCitizenRequest;
import com.aether.citizen.entity.Citizen;
import com.aether.citizen.repository.CitizenRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class CitizenServiceTest {

    @Mock
    private CitizenRepository citizenRepository;

    @InjectMocks
    private CitizenService citizenService;

    private CreateCitizenRequest createRequest;
    private Citizen citizen;

    @BeforeEach
    void setUp() {
        createRequest = new CreateCitizenRequest();
        createRequest.setFirstName("Tafara");
        createRequest.setLastName("Moyo");
        createRequest.setDateOfBirth(LocalDate.of(1990, 6, 15));
        createRequest.setNationalIdNumber("63-1234567A00");
        createRequest.setGender("Male");

        citizen = Citizen.builder()
                .id("citizen-123")
                .firstName("Tafara")
                .lastName("Moyo")
                .dateOfBirth(LocalDate.of(1990, 6, 15))
                .nationalIdNumber("63-1234567A00")
                .gender("Male")
                .build();
    }

    @Test
    void create_ShouldCreateCitizen() {
        when(citizenRepository.existsByNationalIdNumber("63-1234567A00")).thenReturn(false);
        when(citizenRepository.save(any(Citizen.class))).thenReturn(citizen);

        CitizenResponse response = citizenService.create(createRequest);

        assertThat(response).isNotNull();
        assertThat(response.getFirstName()).isEqualTo("Tafara");
        assertThat(response.getNationalIdNumber()).isEqualTo("63-1234567A00");
        verify(citizenRepository).save(any(Citizen.class));
    }

    @Test
    void create_ShouldThrowWhenNationalIdExists() {
        when(citizenRepository.existsByNationalIdNumber("63-1234567A00")).thenReturn(true);

        assertThatThrownBy(() -> citizenService.create(createRequest))
                .isInstanceOf(RuntimeException.class)
                .hasMessageContaining("Citizen already exists with National ID");
    }

    @Test
    void getById_ShouldReturnCitizen() {
        when(citizenRepository.findById("citizen-123")).thenReturn(Optional.of(citizen));

        CitizenResponse response = citizenService.getById("citizen-123");

        assertThat(response.getId()).isEqualTo("citizen-123");
    }

    @Test
    void getAll_ShouldReturnList() {
        when(citizenRepository.findAll()).thenReturn(List.of(citizen));

        List<CitizenResponse> responses = citizenService.getAll();

        assertThat(responses).hasSize(1);
    }
}