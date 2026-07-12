package com.aether.document.service;

import com.aether.citizen.entity.Citizen;
import com.aether.citizen.repository.CitizenRepository;
import com.aether.document.dto.DocumentResponse;
import com.aether.document.entity.Document;
import com.aether.document.repository.DocumentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Service
@RequiredArgsConstructor
public class DocumentService {

    private final DocumentRepository documentRepository;
    private final CitizenRepository citizenRepository;
    private final DocumentStorageService storageService;

    @Transactional
    public DocumentResponse upload(String citizenId, MultipartFile file, String documentType, String documentNumber) {
        Citizen citizen = citizenRepository.findById(citizenId)
                .orElseThrow(() -> new RuntimeException("Citizen not found: " + citizenId));

        String filePath = storageService.store(file);

        Document document = Document.builder()
                .citizen(citizen)
                .documentType(com.aether.document.entity.DocumentType.valueOf(documentType))
                .filePath(filePath)
                .originalFileName(file.getOriginalFilename())
                .fileSizeBytes(file.getSize())
                .mimeType(file.getContentType())
                .documentNumber(documentNumber)
                .build();

        documentRepository.save(document);
        return DocumentResponse.from(document);
    }

    @Transactional(readOnly = true)
    public DocumentResponse getById(String id) {
        Document document = documentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Document not found: " + id));
        return DocumentResponse.from(document);
    }

    @Transactional(readOnly = true)
    public List<DocumentResponse> getByCitizenId(String citizenId) {
        return documentRepository.findByCitizenId(citizenId)
                .stream()
                .map(DocumentResponse::from)
                .toList();
    }
}