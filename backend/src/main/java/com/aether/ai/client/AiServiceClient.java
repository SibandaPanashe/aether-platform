package com.aether.ai.client;

import com.aether.ai.dto.FaceVerificationResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.*;
import org.springframework.stereotype.Component;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

@Component
public class AiServiceClient {

    private final RestTemplate restTemplate;
    private final String aiServiceUrl;

    public AiServiceClient(@Value("${app.ai.service-url:http://ai-service:8000}") String aiServiceUrl) {
        this.restTemplate = new RestTemplate();
        this.aiServiceUrl = aiServiceUrl;
    }

    public FaceVerificationResponse verifyFace(byte[] referenceImage, byte[] liveImage) {
        String url = aiServiceUrl + "/api/v1/face/verify";

        MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
        body.add("reference_image", new ByteArrayResource(referenceImage) {
            @Override
            public String getFilename() {
                return "reference.jpg";
            }
        });
        body.add("live_image", new ByteArrayResource(liveImage) {
            @Override
            public String getFilename() {
                return "live.jpg";
            }
        });

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.MULTIPART_FORM_DATA);

        HttpEntity<MultiValueMap<String, Object>> requestEntity = new HttpEntity<>(body, headers);

        ResponseEntity<FaceVerificationResponse> response = restTemplate.exchange(
                url, HttpMethod.POST, requestEntity, FaceVerificationResponse.class);

        return response.getBody();
    }
}