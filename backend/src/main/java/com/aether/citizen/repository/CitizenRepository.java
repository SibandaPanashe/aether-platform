package com.aether.citizen.repository;

import com.aether.citizen.entity.Citizen;
import com.aether.citizen.entity.VerificationStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CitizenRepository extends JpaRepository<Citizen, String> {

    Optional<Citizen> findByNationalIdNumber(String nationalIdNumber);

    Optional<Citizen> findByPassportNumber(String passportNumber);

    Optional<Citizen> findByDriverLicenseNumber(String driverLicenseNumber);

    List<Citizen> findByVerificationStatus(VerificationStatus status);

    boolean existsByNationalIdNumber(String nationalIdNumber);

    boolean existsByPassportNumber(String passportNumber);

    boolean existsByDriverLicenseNumber(String driverLicenseNumber);
}