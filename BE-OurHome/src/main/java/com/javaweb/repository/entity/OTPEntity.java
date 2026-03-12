package com.javaweb.repository.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "otp_verification")
public class OTPEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", columnDefinition = "BIGINT")
    private Long id;  // Sử dụng Long thay vì Integer

    @Column(name = "email")
    private String email;

    @Column(name = "otp_code")
    private String otpCode;

    @Column(name = "expired_at")
    private LocalDateTime expiredAt;

    public OTPEntity() {

    }

    public OTPEntity(Long id, String email, String otpCode, LocalDateTime expiredAt) {
        this.id = id;
        this.email = email;
        this.otpCode = otpCode;
        this.expiredAt = expiredAt;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getOtpCode() {
        return otpCode;
    }

    public void setOtpCode(String otpCode) {
        this.otpCode = otpCode;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDateTime getExpiredAt() {
        return expiredAt;
    }

    public void setExpiredAt(LocalDateTime expiredAt) {
        this.expiredAt = expiredAt;
    }

    // Getters and Setters
}


    // Default constructor

