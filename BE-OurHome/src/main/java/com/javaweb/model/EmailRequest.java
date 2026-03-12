package com.javaweb.model;

public class EmailRequest {
    private String email;

    // Getter và Setter

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    @Override
    public String toString() {
        return "EmailRequest{" +
                "email='" + email + '\'' +
                '}';
    }
}
