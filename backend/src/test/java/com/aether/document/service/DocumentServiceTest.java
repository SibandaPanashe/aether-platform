package com.aether.document.service;

import com.aether.citizen.entity.Citizen;
import com.aether.citizen.repository.CitizenRepository;
import com.aether.document.dto.DocumentResponse;
import com.aether.document.entity.Document;
import com.aether.document.entity.DocumentType;
import com.aether.document.repository.DocumentRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.mock.web.MockMultipartFile;

import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class DocumentServiceTest {

    @Mock
    private DocumentRepository documentRepository;

    @Mock
    private CitizenRepository citizenRepository;

    @Mock
    private DocumentStorageService storageService;

    @InjectMocks
    private DocumentService documentService;

    private Citizen citizen;
    private Document document;
    private MockMultipartFile file;

    @BeforeEach
    void setUp() {
        citizen = Citizen.builder()
                .id("citizen-123")
                .firstName("Tafara")
                .lastName("Moyo")
                .build();

        document = Document.builder()
                .id("doc-123")
                .citizen(citizen)
                .documentType(DocumentType.NATIONAL_ID)
                .originalFileName("id_scan.pdf")
                .fileSizeBytes(1024L)
                .filePath("/uploads/doc-123.pdf")
                .mimeType("application/pdf")
                .build();

        file = new MockMultipartFile(
                "file",
                "id_scan.pdf",
                "application/pdf",
                "test content".getBytes());
    }

    @Test
    void upload_ShouldStoreDocument() {
        when(citizenRepository.findById("citizen-123")).thenReturn(Optional.of(citizen));
        when(storageService.store(any())).thenReturn("/uploads/some-file.pdf");
        when(documentRepository.save(any(Document.class))).thenReturn(document);

        DocumentResponse response = documentService.upload("citizen-123", file, "NATIONAL_ID", "63-1234567A00");

        assertThat(response).isNotNull();
        assertThat(response.getOriginalFileName()).isEqualTo("id_scan.pdf");
        verify(documentRepository).save(any(Document.class));
    }

    @Test
    void getById_ShouldReturnDocument() {
        when(documentRepository.findById("doc-123")).thenReturn(Optional.of(document));

        DocumentResponse response = documentService.getById("doc-123");

        assertThat(response.getId()).isEqualTo("doc-123");
        assertThat(response.getDocumentType()).isEqualTo("NATIONAL_ID");
    }

    @Test
    void getByCitizenId_ShouldReturnList() {
        when(documentRepository.findByCitizenId("citizen-123")).thenReturn(List.of(document));

        List<DocumentResponse> responses = documentService.getByCitizenId("citizen-123");

        assertThat(responses).hasSize(1);
        assertThat(responses.get(0).getDocumentType()).isEqualTo("NATIONAL_ID");
    }
}