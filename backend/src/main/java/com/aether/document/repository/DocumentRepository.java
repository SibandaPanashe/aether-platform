package com.aether.document.repository;

import com.aether.document.entity.Document;
import com.aether.document.entity.DocumentStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DocumentRepository extends JpaRepository<Document, String> {

    List<Document> findByCitizenId(String citizenId);

    List<Document> findByStatus(DocumentStatus status);

    long countByCitizenIdAndDocumentType(String citizenId, com.aether.document.entity.DocumentType documentType);
}