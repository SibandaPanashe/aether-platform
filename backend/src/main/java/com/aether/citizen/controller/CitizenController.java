package com.aether.citizen.controller;

import com.aether.citizen.dto.CitizenResponse;
import com.aether.citizen.dto.CreateCitizenRequest;
import com.aether.citizen.service.CitizenService;
import com.aether.common.api.ApiResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/citizens")
@RequiredArgsConstructor
public class CitizenController {

    private final CitizenService citizenService;

    @PostMapping
    @PreAuthorize("hasAnyRole('ORGANIZATION_ADMIN', 'VERIFIER')")
    public ResponseEntity<ApiResponse<CitizenResponse>> create(
            @Valid @RequestBody CreateCitizenRequest request) {
        CitizenResponse citizen = citizenService.create(request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success(citizen, "Citizen created successfully"));
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('ORGANIZATION_ADMIN', 'VERIFIER', 'SUPER_ADMIN')")
    public ResponseEntity<ApiResponse<CitizenResponse>> getById(@PathVariable String id) {
        CitizenResponse citizen = citizenService.getById(id);
        return ResponseEntity.ok(ApiResponse.success(citizen, "Citizen retrieved"));
    }

    @GetMapping
    @PreAuthorize("hasAnyRole('ORGANIZATION_ADMIN', 'VERIFIER', 'SUPER_ADMIN')")
    public ResponseEntity<ApiResponse<List<CitizenResponse>>> getAll() {
        List<CitizenResponse> citizens = citizenService.getAll();
        return ResponseEntity.ok(ApiResponse.success(citizens, "Citizens retrieved"));
    }
}