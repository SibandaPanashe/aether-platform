package com.aether.common.api;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ApiError {

    private boolean success;

    private String errorCode;

    private String message;

    @Builder.Default
    private Instant timestamp = Instant.now();

}
