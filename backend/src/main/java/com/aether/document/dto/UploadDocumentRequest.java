package com.aether.document.dto;

import com.aether.document.entity.DocumentType;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UploadDocumentRequest {

    @NotNull(message = "Document type is required")
    private DocumentType documentType;

    private String documentNumber;
}