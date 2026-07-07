package com.aether.system.controller;

import com.aether.common.api.ApiResponse;
import com.aether.system.dto.SystemInfoResponse;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/system")
public class SystemController {

    @GetMapping("/info")
    public ApiResponse<SystemInfoResponse> info() {

        SystemInfoResponse response = SystemInfoResponse.builder()
                .name("Aether")
                .version("0.1.0")
                .status("UP")
                .build();

        return ApiResponse.<SystemInfoResponse>builder()
                .success(true)
                .message("Aether API is running.")
                .data(response)
                .build();
    }
}
