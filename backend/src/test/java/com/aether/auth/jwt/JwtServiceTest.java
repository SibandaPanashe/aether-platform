package com.aether.auth.jwt;

import com.aether.auth.entity.Role;
import com.aether.auth.entity.User;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.Base64;

import static org.assertj.core.api.Assertions.assertThat;

class JwtServiceTest {

    private JwtService jwtService;
    private User user;

    @BeforeEach
    void setUp() {
        String secret = Base64.getEncoder().encodeToString(
                "this-is-a-256-bit-secret-key-for-testing-purposes-only!!".getBytes());
        jwtService = new JwtService(secret, 900000L, 604800000L, "aether-test");

        user = User.builder()
                .id(1L)
                .email("test@example.com")
                .role(Role.CITIZEN)
                .build();
    }

    @Test
    void generateAccessToken_ShouldCreateValidToken() {
        String token = jwtService.generateAccessToken(user);

        assertThat(token).isNotNull();
        assertThat(jwtService.extractUserId(token)).isEqualTo(1L);
        assertThat(jwtService.isTokenValid(token, user)).isTrue();
    }

    @Test
    void isTokenValid_ShouldReturnFalseForDifferentUser() {
        User otherUser = User.builder()
                .id(2L)
                .email("other@example.com")
                .role(Role.CITIZEN)
                .build();

        String token = jwtService.generateAccessToken(user);

        assertThat(jwtService.isTokenValid(token, otherUser)).isFalse();
    }
}