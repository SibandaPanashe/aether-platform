package com.aether.document.dto;

import com.aether.document.entity.Document;
import lombok.Builder;
import lombok.Getter;

import java.time.Instant;
import java.time.LocalDate;

@Getter
@Builder
public class DocumentResponse {

    private String id;
    private String citizenId;
    private String documentType;
    private String status;
    private String originalFileName;
    private Long fileSizeBytes;
    private String mimeType;
    private String documentNumber;
    private LocalDate expiryDate;
    private String rejectionReason;
    private Instant createdAt;

    public static DocumentResponse from(Document document) {
        return DocumentResponse.builder()
                .id(document.getId())
                .citizenId(document.getCitizen().getId())
                .documentType(document.getDocumentType().name())
                .status(document.getStatus().name())
                .originalFileName(document.getOriginalFileName())
                .fileSizeBytes(document.getFileSizeBytes())
                .mimeType(document.getMimeType())
                .documentNumber(document.getDocumentNumber())
                .expiryDate(document.getExpiryDate())
                .rejectionReason(document.getRejectionReason())
                .createdAt(document.getCreatedAt())
                .build();
    }
}