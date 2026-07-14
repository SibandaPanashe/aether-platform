package com.aether.document.controller;

import com.aether.common.api.ApiResponse;
import com.aether.document.dto.DocumentResponse;
import com.aether.document.service.DocumentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/v1/documents")
@RequiredArgsConstructor
public class DocumentController {

    private final DocumentService documentService;

    @PostMapping("/citizen/{citizenId}/upload")
    public ResponseEntity<ApiResponse<DocumentResponse>> upload(
            @PathVariable String citizenId,
            @RequestParam("file") MultipartFile file,
            @RequestParam("documentType") String documentType,
            @RequestParam(value = "documentNumber", required = false) String documentNumber) {
        DocumentResponse doc = documentService.upload(citizenId, file, documentType, documentNumber);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success(doc, "Document uploaded successfully"));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<DocumentResponse>> getById(@PathVariable String id) {
        DocumentResponse doc = documentService.getById(id);
        return ResponseEntity.ok(ApiResponse.success(doc, "Document retrieved"));
    }

    @GetMapping("/citizen/{citizenId}")
    public ResponseEntity<ApiResponse<List<DocumentResponse>>> getByCitizenId(@PathVariable String citizenId) {
        List<DocumentResponse> docs = documentService.getByCitizenId(citizenId);
        return ResponseEntity.ok(ApiResponse.success(docs, "Documents retrieved"));
    }
}