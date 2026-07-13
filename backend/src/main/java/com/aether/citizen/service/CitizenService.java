package com.aether.citizen.service;

import com.aether.citizen.dto.CitizenResponse;
import com.aether.citizen.dto.CreateCitizenRequest;
import com.aether.citizen.entity.Citizen;
import com.aether.citizen.repository.CitizenRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CitizenService {

    private final CitizenRepository citizenRepository;

    @Transactional
    public CitizenResponse create(CreateCitizenRequest request) {
        if (request.getNationalIdNumber() != null &&
                citizenRepository.existsByNationalIdNumber(request.getNationalIdNumber())) {
            throw new RuntimeException("Citizen already exists with National ID: " + request.getNationalIdNumber());
        }
        if (request.getPassportNumber() != null &&
                citizenRepository.existsByPassportNumber(request.getPassportNumber())) {
            throw new RuntimeException("Citizen already exists with Passport: " + request.getPassportNumber());
        }
        if (request.getDriverLicenseNumber() != null &&
                citizenRepository.existsByDriverLicenseNumber(request.getDriverLicenseNumber())) {
            throw new RuntimeException("Citizen already exists with Driver License: " + request.getDriverLicenseNumber());
        }

        Citizen citizen = Citizen.builder()
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .middleName(request.getMiddleName())
                .dateOfBirth(request.getDateOfBirth())
                .gender(request.getGender())
                .nationalIdNumber(request.getNationalIdNumber())
                .passportNumber(request.getPassportNumber())
                .driverLicenseNumber(request.getDriverLicenseNumber())
                .phoneNumber(request.getPhoneNumber())
                .email(request.getEmail())
                .address(request.getAddress())
                .build();

        citizenRepository.save(citizen);
        return CitizenResponse.from(citizen);
    }

    @Transactional(readOnly = true)
    public CitizenResponse getById(String id) {
        Citizen citizen = citizenRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Citizen not found: " + id));
        return CitizenResponse.from(citizen);
    }

    @Transactional(readOnly = true)
    public List<CitizenResponse> getAll() {
        return citizenRepository.findAll()
                .stream()
                .map(CitizenResponse::from)
                .toList();
    }
}