package com.aether.ai.dto;

import lombok.Data;

@Data
public class FaceVerificationResponse {
    private boolean match;
    private double score;
    private double threshold;
    private String confidence;
}